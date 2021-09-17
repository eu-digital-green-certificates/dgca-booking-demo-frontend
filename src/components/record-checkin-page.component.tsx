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

import '../i18n';
import { useTranslation } from 'react-i18next';

import QRCode from 'qrcode.react';

import React, { Fragment } from 'react';
import { Fade, Container, Row, Col, Button } from 'react-bootstrap';
import AppContext from '../misc/appContext';
import { BookingResponse } from '../interfaces/booking-response';
import { BookingPassengerResponse } from '../interfaces/booking-passenger-response';
import utils from "../misc/utils";
import { useGetValidationStatus } from '../api';

const RecordCheckinPage = (props: any) => {

    const { t } = useTranslation();
    const context = React.useContext(AppContext);

    const [isInit, setIsInit] = React.useState(false);
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();
    const [qrCodeValue, setQrCodeValue] = React.useState('');

    const handleError = (error: any) => {
        let msg = '';

        if (error) {
            msg = error.message
        }

        // props.setError({ error: error, message: msg, onCancel: context.navigation!.toLanding });
    }
    const [validationStatus, getValidationStatus] = useGetValidationStatus(undefined, handleError);

    React.useEffect(() => {
        if (context.navigation) {
            setBookingResponse(props.bookingResponse);
            setIsInit(true);
            //TODO:
            setQrCodeValue(dcc);
        }

    }, [context.navigation])

    React.useEffect(() => {
        if (bookingResponse) {
            getValidationStatus();
            console.log(validationStatus);
        }

    }, [bookingResponse])

    

    //TODO: have to be taken from backend!
    const dcc = JSON.stringify(JSON.parse("{\"protocol\":\"DCCVALIDATION\",\"protocolVersion\":\"1.0.0\",\"serviceIdentity\":\"dgca-booking-demo-eu-test.cfapps.eu10.hana.ondemand.com/identity\",\"token\":\"eyJ0eXAiOiJKV1QiLCJraWQiOiJiUzhEMi9XejV0WT0iLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJWYWxpZGF0aW9uIERlY29yYXRvciBEZXJ2aWNlIiwiZXhwIjoxNjMxODYyNTgwLCJzdWIiOiIyNjdkNmI4Yy00NTU0LTQ0YzctYTY4NC00MWNiZTUwYTJmYzcifQ.NIkl_YOeMuUoP_RWsk-FNmzGOvm2gv1Tl16xL2LWK_QLTWcjuxwFgOYWipjxEHQ1-0KsioDZ_ymPBOzyBo1w7A\",\"consent\":\"Please confirm to start the DCC Exchange flow. If you not confirm, the flow is aborted.\",\"subject\":\"267d6b8c-4554-44c7-a684-41cbe50a2fc7\",\"serviceProvider\":\"Booking Demo\"}"));

    return (!isInit && bookingResponse ? <></> :
        <>
            <Fade appear={true} in={true} >
                <Container className='content-container'>
                    <Row>
                        <h1>{t('translation:checkin')}</h1>
                    </Row>
                    <Row>
                        <Col xs={12} sm={7} lg={7}>
                            {t('translation:infoCheckin1')}<br />
                            {t('translation:infoCheckin2')}<br />
                            {t('translation:infoCheckin3')}<br /><br />
                            {t('translation:infoCheckin4')}<br /><br />
                            {t('translation:infoCheckin5')}
                        </Col>
                        <Col xs={12} sm={5} lg={5}>
                            <Container className="wrapper-flight-information">
                                <Container className="padding-checkin flight-information mb-2">
                                    {/* TODO:  */}
                                    Flight AIR094, Group booking<br />
                                    Booking code {bookingResponse?.reference}<br />
                                    {bookingResponse?.flightInfo.from}<br />
                                    {bookingResponse?.flightInfo.to}<br />
                                    Economy Classic<br />
                                    {bookingResponse?.passengers.length} Passender(s)<br />
                                    {utils.convertDateToOutputFormat(bookingResponse?.flightInfo.time)}
                                </Container>
                                <Container className="padding-checkin flight-information mb-2">
                                    <span className="logo" />
                                    <span className="text-vertical-center">
                                        {t('translation:dccCertificate')}
                                    </span>
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                    <Row className="bold">
                        <Col xs={12} sm={1} lg={1}>
                            <span className="text-vertical-center">
                                {t('translation:conditionFulfilled')}
                            </span>
                        </Col>
                        <Col xs={12} sm={6} lg={6}>
                            <span className="text-vertical-center">
                                {t('translation:name')}
                            </span>
                        </Col>
                        <Col xs={12} sm={2} lg={2} className="shrink-grow">
                            <span className="text-vertical-center">
                                {t('translation:lblUpload')}
                            </span>
                        </Col>
                        <Col xs={12} sm={1} lg={1} className="no-grow">
                            <span className="text-vertical-center">
                                {t('translation:or')}
                            </span>
                        </Col>
                        <Col xs={12} sm={2} lg={2} className="shrink-grow">
                            <span className="text-vertical-center">
                                {t('translation:lblScan')}
                            </span>
                        </Col>
                    </Row>
                    <hr />
                    {bookingResponse?.passengers.map((passenger: BookingPassengerResponse) =>
                        <Fragment key={passenger.id}>
                            <Row>
                                <Col xs={12} sm={1} lg={1}>{passenger.dccStatus}
                                </Col>
                                <Col xs={12} sm={6} lg={6}>{passenger.forename + ' ' + passenger.lastname}
                                </Col>
                                <Col xs={12} sm={2} lg={2} className="shrink-grow"><Button className="upload-botton">{t('translation:upload')}</Button>
                                </Col>
                                {/* Attention column for or */}
                                <Col xs={12} sm={1} lg={1} className="no-grow">
                                    &nbsp;
                                </Col>
                                <Col xs={12} sm={2} lg={2} className="shrink-grow qr-code-container">
                                    {qrCodeValue ? <> <QRCode id='qr-code-pdf' size={256} renderAs='svg' value={qrCodeValue} />
                                        </> : <></>}
                                </Col>
                            </Row>
                            <hr />
                        </Fragment>
                    )}
                    <Row xs={12} sm={12} lg={12}>
                        <Container className="buttons-line">
                            <Button className="buttons-line-button" onClick={context.navigation!.toLanding}>{t('translation:cancel')}</Button>
                            <Button className="buttons-line-button" disabled={validationStatus !== '404' }>{t('translation:submitCheckin')}</Button>
                        </Container>
                    </Row>
                </Container>
            </Fade>
        </>)

}

export default RecordCheckinPage;