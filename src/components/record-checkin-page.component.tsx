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
import { useGetInitialize, useStatus } from '../api';
import { DisplayPassenger } from '../interfaces/display-passenger';

const RecordCheckinPage = (props: any) => {

    const { t } = useTranslation();
    const context = React.useContext(AppContext);

    const [isInit, setIsInit] = React.useState(false);
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();
    const [displayPassengers, setDisplayPassengers] = React.useState<DisplayPassenger[]>([]);

    const handleError = (error: any) => {
        let msg = '';

        if (error) {
            console.log(error);
            msg = error.message
        }

        // props.setError({ error: error, message: msg, onCancel: context.navigation!.toLanding });
    }

    const [qrCode, getQrCode, getQrCodePromise] = useGetInitialize(undefined, handleError);
    const [getStatusPromise] = useStatus(undefined, handleError);
    let intervalIds : any = [];

    React.useEffect(() => {
        if (context.navigation) {
            setBookingResponse(props.bookingResponse);
            setIsInit(true);
        }

    }, [context.navigation])

    React.useEffect(() => {
        if (displayPassengers) {
            displayPassengers.map((passenger: DisplayPassenger) => {
            //     const intervalId = setInterval(() => {
            //         getStatus(passenger);
            //     }, 1000, passenger)
            //     intervalIds.push(intervalId);
                setTimeout(() => {
                            getStatus(passenger);
                        }, 5000, passenger);

                        setTimeout(() => {
                            getStatus(passenger);
                        }, 5000, passenger);


                //getStatus(passenger);


                // intervalId = setInterval(getStatus, 500, passenger);
                // return () => clearInterval(intervalId);
            })
        }

        // intervalIds.forEach((d : number) => clearInterval(d));
    }, [displayPassengers])

    const getStatus = (passenger: DisplayPassenger) => {
        getStatusPromise(passenger)
            .then(response => {
                passenger.status = response.data.result;
                console.log("Response vom status: " + JSON.stringify(response.data));
                console.log("status: " + passenger.status);
            })
            .catch(error => {
                //TODO: Fehlermeldung
                console.log("Der Status für die Person : " + passenger.id + "konnte nicht geholt werden./n" + error);
            })
            .finally(() => {
            });
    }

    React.useEffect(() => {
        if (bookingResponse) {
            const tmpDisplayPassengers: DisplayPassenger[] = [];
            bookingResponse?.passengers.map((passenger: BookingPassengerResponse) => {
                let tmpDisplayPassenger: DisplayPassenger = { ...passenger };
                getQrCodePromise(passenger.id)
                    .then(response => {
                        console.log("initialize: " + JSON.stringify(response.data));
                        tmpDisplayPassenger.qrCode = JSON.stringify(response.data);
                        tmpDisplayPassenger.token = response.data.token;
                    })
                    .catch(error => {
                        //TODO: Fehlermeldung
                        console.log("QR konnte nicht geholt werden:" + tmpDisplayPassenger.id)
                    })
                    .finally(() => {
                        tmpDisplayPassengers.push(tmpDisplayPassenger);
                        if (tmpDisplayPassengers.length === bookingResponse.passengers.length) {
                            setDisplayPassengers(tmpDisplayPassengers);
                        }
                    });
            })
        }

    }, [bookingResponse])



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
                    {displayPassengers.map((passenger: DisplayPassenger) =>
                        <Fragment key={passenger.id}>
                            <Row>
                                <Col xs={12} sm={1} lg={1}>{passenger.status}
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