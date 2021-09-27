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
import { Fade, Container, Row, Col, Button, Collapse, Spinner } from 'react-bootstrap';
import AppContext from '../misc/appContext';
import { BookingResponse } from '../interfaces/booking-response';
import { BookingPassengerResponse } from '../interfaces/booking-passenger-response';
import utils from "../misc/utils";
import { useGetInitialize, useStatus } from '../api';
import { DisplayPassenger } from '../interfaces/display-passenger';
import DemoSpinner from './spinner/spinner.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export interface IStatus {
    [key: string]: string;
}

const RecordCheckinPage = (props: any) => {

    const { t } = useTranslation();
    const context = React.useContext(AppContext);

    const [isInit, setIsInit] = React.useState(false);
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();
    const [displayPassengers, setDisplayPassengers] = React.useState<DisplayPassenger[]>([]);
    const displayPassengersRef = React.useRef(displayPassengers);
    displayPassengersRef.current = displayPassengers;

    const handleError = (error: any) => {
        let msg = '';

        if (error) {
            console.log(error);
            msg = error.message
        }

        props.setError({ error: error, message: msg, onCancel: context.navigation!.toLanding });
    }

    const [qrCode, getQrCode, getQrCodePromise] = useGetInitialize(undefined, handleError);
    const [getStatusPromise] = useStatus(undefined, handleError);


    // on mount
    React.useEffect(() => {
        if (props) {
            setBookingResponse(props.bookingResponse);
        }
    }, [])


    // on init --> navigation ist needed
    React.useEffect(() => {
        if (context.navigation) {
            setIsInit(true);
        }
    }, [context.navigation])

    // on bookingResponse change --> set displaydata and init polling
    React.useEffect(() => {
        if (bookingResponse) {

            const tmpDisplayPassengers: DisplayPassenger[] = [];
            let timeoutIds: NodeJS.Timeout[] = [];
            let intervalIds: number[] = [];

            for (const passenger of bookingResponse.passengers) {
                // create display passenger from passenger
                let tmpDisplayPassenger: DisplayPassenger = { ...passenger };

                getQrCodePromise(passenger.id)
                    .then(response => {
                        // token for upcomming pollin
                        tmpDisplayPassenger.token = response.data.token;
                        // qr-code for display
                        tmpDisplayPassenger.qrCode = JSON.stringify(response.data);

                        // timeout and interval for status polling
                        timeoutIds.push(setTimeout(() => {
                            getStatus(passenger.id);
                            intervalIds.push(setInterval(getStatus, 1000, passenger.id));
                        }, 5000));

                    })
                    .catch(error => {
                        handleError(error);
                    })
                    .finally(() => {
                        // collect all displaypassengers
                        tmpDisplayPassengers.push(tmpDisplayPassenger);

                        // set all display passengers at once
                        if (tmpDisplayPassengers.length === bookingResponse.passengers.length) {
                            setDisplayPassengers(tmpDisplayPassengers);
                        }
                    });
            }

            // on unmount all open timeouts and intervals will be canceled
            return () => {
                timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
                intervalIds.forEach(intervalId => clearInterval(intervalId));
            };
        }

    }, [bookingResponse])

    const getStatus = (id: string) => {
        // find current passenger from Ref --> it will be called by timeout
        const passenger = displayPassengersRef.current.find(p => p.id === id);

        if (passenger) {
            getStatusPromise(passenger)
                .then(response => {
                    // update status
                    passenger.status = response.status;
                })
                .catch(error => {
                    handleError(error);
                })
                .finally(() => {
                    // spread all current display passengers into help array
                    let tmpDisplayPassengers: DisplayPassenger[] = [...displayPassengersRef.current];
                    // set updated array
                    setDisplayPassengers(tmpDisplayPassengers);
                });
        }
    }

    const getStatusIcon = (code: number | undefined): any => {
        let status = {};

        switch (code) {
            case 200:
                status = <FontAwesomeIcon icon={faCheckCircle} color="green" />;
                break;
            case 401:
                status = <FontAwesomeIcon icon={faTimesCircle} color="red" />;
                break;
            case 410:
                status = "Gone";
                break;
            case 204:
            default:
                status = <Spinner
                    animation="border"
                    className='d-flex mx-auto'
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    variant='primary'
                />
                break;
        }
        return status;
    }

    return (!(isInit)
        ? <></>
        : <>
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
                        {/* <Col xs={12} sm={2} lg={2} className="shrink-grow">
                            <span className="text-vertical-center">
                                {t('translation:lblUpload')}
                            </span>
                        </Col>
                        <Col xs={12} sm={1} lg={1} className="no-grow">
                            <span className="text-vertical-center">
                                {t('translation:or')}
                            </span>
                        </Col> */}
                        <Col xs={12} sm={5} lg={5} className="shrink-grow">
                            <span className="text-vertical-center">
                                {t('translation:lblScan')}
                            </span>
                        </Col>
                    </Row>
                    <hr />

                    {!(displayPassengers.length > 0)
                        ? <DemoSpinner />
                        : <Collapse appear={true} in={true} >
                            <div>
                                {
                                    displayPassengers.map((passenger: DisplayPassenger) =>
                                        <Fragment key={passenger.id}>
                                            <Row>
                                                <Col xs={12} sm={1} lg={1}>
                                                    {getStatusIcon(passenger.status)}
                                                </Col>
                                                <Col xs={12} sm={6} lg={6}>{passenger.forename + ' ' + passenger.lastname}
                                                </Col>
                                                {/* <Col xs={12} sm={2} lg={2} className="shrink-grow"><Button className="upload-botton">{t('translation:upload')}</Button>
                                </Col>
                                //Colum for or
                                <Col xs={12} sm={1} lg={1} className="no-grow">
                                    &nbsp;
                                </Col> */}
                                                <Col xs={12} sm={5} lg={5} className="shrink-grow qr-code-container">
                                                    {
                                                        passenger.qrCode ? <> <QRCode id='qr-code-pdf' size={256} renderAs='svg' value={passenger.qrCode} />
                                                        </> : <></>
                                                    }
                                                </Col>
                                            </Row>
                                            <hr />
                                        </Fragment>
                                    )}
                            </div>
                        </Collapse>
                    }
                    <Row xs={12} sm={12} lg={12}>
                        <Container className="buttons-line">
                            <Button className="buttons-line-button" onClick={context.navigation!.toLanding}>{t('translation:cancel')}</Button>
                            <Button className="buttons-line-button" disabled={false}>{t('translation:submitCheckin')}</Button>
                        </Container>
                    </Row>
                </Container>
            </Fade>
        </>)
}

export default RecordCheckinPage;
