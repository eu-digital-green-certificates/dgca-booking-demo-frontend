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
import { Fade, Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import AppContext from '../misc/appContext';
import { BookingResponse } from '../interfaces/booking-response';
import { BookingPassengerResponse } from '../interfaces/booking-passenger-response';
import utils from "../misc/utils";
import { useGetInitialize, useStatus } from '../api';
import { DisplayPassenger } from '../interfaces/display-passenger';
import Spinner from './spinner/spinner.component';

export interface IStatus {
    [key: string]: string;
}

const RecordCheckinPage = (props: any) => {

    const { t } = useTranslation();
    const context = React.useContext(AppContext);

    const [isInit, setIsInit] = React.useState(false);
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();
    const [displayPassengers, setDisplayPassengers] = React.useState<DisplayPassenger[]>([]);
<<<<<<< Updated upstream
    const [status, setStatus] = React.useState<IStatus>({});
=======
    const displayPassengersRef = React.useRef(displayPassengers);
    displayPassengersRef.current = displayPassengers;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

        const intervalIds: number[] = [];
        let timeoutId: any = {};
        
        if (displayPassengers) {
            displayPassengers.map((passenger: DisplayPassenger) => {

                timeoutId = setTimeout(() => {
                    getStatus(passenger);
                    const intervalId = setInterval(getStatus, 15000, passenger);
                    intervalIds.push(intervalId);
                }, 15000, passenger);

            })
=======
        if (context.navigation) {
            setIsInit(true);
>>>>>>> Stashed changes
        }
    }, [context.navigation])

<<<<<<< Updated upstream
        //Unmount
        return () => {
            clearTimeout(timeoutId);
            intervalIds.map(intervalId => clearInterval(intervalId));

        };

    }, [displayPassengers])

    const getStatus = (passenger: DisplayPassenger) => {
        getStatusPromise(passenger)
            .then(response => {
                console.log("Response vom status: " + JSON.stringify(response));
                passenger.status = response.data.result;
                let tmpStatus: IStatus = {};
                tmpStatus[passenger.id] = 'ok';
                setStatus(tmpStatus);
            })
            .catch(error => {
                //TODO: Fehlermeldung
                status[passenger.id] = 'false';
                console.log("Der Status für die Person : " + passenger.id + "konnte nicht geholt werden./n" + error);
                let tmpStatus: IStatus = {};
                tmpStatus[passenger.id] = 'false';
                setStatus(tmpStatus);
            })
            .finally(() => {
            });
    }

=======
    // on bookingResponse change --> set displaydata and init polling
>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
=======
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



    const getStatusText = (code: number): string => {
        console.log("Bin im getStatusText" + code);
        let status = "";
        switch (code) {
            case 200:
                status = "OK";
                break;
            case 204:
                status = "Waiting...";
                break;
            case 401:
                status = "Not authorized";
                break;
            case 410:
                status = "Gone";
                break;
            default:
                break;
        }
        return status;
    }
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                    {displayPassengers.map((passenger: DisplayPassenger) =>
                        <Fragment key={passenger.id}>
                            <Row>
                                <Col xs={12} sm={1} lg={1}>{status[passenger.id]}
                                </Col>
                                <Col xs={12} sm={6} lg={6}>{passenger.forename + ' ' + passenger.lastname}
                                </Col>
                                {/* <Col xs={12} sm={2} lg={2} className="shrink-grow"><Button className="upload-botton">{t('translation:upload')}</Button>
=======

                    {!(displayPassengers.length > 0)
                        ? <Spinner />
                        : <Collapse appear={true} in={true} >
                            <div>
                                {
                                    displayPassengers.map((passenger: DisplayPassenger) =>
                                        <Fragment key={passenger.id}>
                                            <Row>
                                                <Col xs={12} sm={1} lg={1}>{passenger.status}
                                                </Col>
                                                <Col xs={12} sm={6} lg={6}>{passenger.forename + ' ' + passenger.lastname}
                                                </Col>
                                                {/* <Col xs={12} sm={2} lg={2} className="shrink-grow"><Button className="upload-botton">{t('translation:upload')}</Button>
>>>>>>> Stashed changes
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
