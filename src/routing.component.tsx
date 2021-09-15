/*
 * eu-digital-green-certificates/ dgca-booking-demo-frontend
 *
 * (C) 2021, T-Systems International GmbH
 *
 * Deutsche Telekom AG and all other contributors /
 * copyright owners license this file to you under the Apache
 * License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import './i18n';
import { useTranslation } from 'react-i18next';

import useNavigation from './misc/useNavigation';

import LandingPage from './components/landing-page.component';

// import PrivateRoute from './components/private-route.component';
import IError from './misc/error';
import Header from './components/header.component';
import AppContext, { IAppContext } from './misc/appContext';
import utils from './misc/utils';
import RecordCheckinPage from './components/record-checkin-page.component';
import { BookingResponse } from './interfaces/booking-response';
import ErrorPage from './components/error-page.component';

const Routing = () => {
    const { t } = useTranslation();

    const [error, setError] = React.useState<IError>();
    const [errorShow, setErrorShow] = React.useState(false);
    const [isInit, setIsInit] = React.useState(false);
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();

    const context: IAppContext = {
        navigation: useNavigation(),
        utils: utils
    }

    document.title = t('translation:title');

    React.useEffect(() => {
        if (error) {
            setErrorShow(true);
        }
    }, [error])

    React.useEffect(() => {
        if (!errorShow) {
            setError(undefined);
        }
    }, [errorShow])

    React.useEffect(() => {
        if (context.navigation)
            setIsInit(true);
    }, [context.navigation])

    return (!(isInit && context.navigation) ? <></> ://<Spinner background='#cfcfcf' /> :
        <>
            <AppContext.Provider value={context}>
                {/*
    header, every time shown. fit its children
    */}
                <Route path={context.navigation.routes.root}>
                    <Header />
                    <ErrorPage error={error} show={errorShow} onCancel={error?.onCancel} onHide={() => setErrorShow(false)} />
                </Route>

                {/*
    Content area. fit the rest of screen and children
    */}
                <Container className='p-0'>

                    {/* Landing */}
                    <Route
                        exact
                        path={context.navigation.routes.landing}
                    >
                        <LandingPage setBookingResponse={setBookingResponse} bookingResponse={bookingResponse} setError={setError}/>
                    </Route>
                    <Route
                        exact
                        path={context.navigation.routes.checkin}
                        render={ (props) => <RecordCheckinPage setBookingResponse={setBookingResponse} bookingResponse={bookingResponse}/>}
                    />

                </Container>
            </AppContext.Provider>
        </>
    )
}

export default Routing;