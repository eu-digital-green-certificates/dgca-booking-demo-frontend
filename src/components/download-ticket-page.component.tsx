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
import { Fade, Container, Row, Col, Button, Table } from 'react-bootstrap';

import AppContext from '../misc/appContext';
import utils from "../misc/utils";

import DemoSpinner from './spinner/spinner.component';

import { BookingResponse } from '../interfaces/booking-response';
import { BookingPassengerResponse } from '../interfaces/booking-passenger-response';

const DownloadTicketPage = (props: any) => {

    const context = React.useContext(AppContext);

    const [isInit, setIsInit] = React.useState(false);
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();

    // on mount
    React.useEffect(() => {
        if (props) {
            setBookingResponse(props.bookingResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // on init --> navigation ist needed
    React.useEffect(() => {
        if (context.navigation) {
            setIsInit(true);
        }
    }, [context.navigation])

    return (!(isInit)
        ? <></>
        : <><Fade appear={true} in={true} >
            <Container className='content-container'>

                <Row >
                    <h1 className='head-line'>Check-in successfull</h1>
                </Row>

                <Row>
                    <Col lg={7} className='mb-3'>
                        You can now download your e-tickets.
                    </Col>

                    <Col lg={5} className="wrapper-flight-information">

                        <Container className="flight-information column-container mb-3">
                            <span className='mb-1'>
                                <strong>Flight AIR094, Group booking</strong>
                            </span>

                            <span className='mb-1'>
                                Booking code {bookingResponse?.reference}<br />
                                {bookingResponse?.flightInfo.from}<br />
                                {bookingResponse?.flightInfo.to}<br />
                                Economy Classic
                            </span>

                            <span className='mb-1'>
                                <strong>{bookingResponse?.passengers.length} Passender(s)</strong>
                            </span>

                            <span >
                                <strong>{utils.convertDateToOutputFormat(bookingResponse?.flightInfo.time)}</strong>
                            </span>
                        </Container>

                    </Col>

                </Row>
                <div className='flex-fill'>
                    {!(bookingResponse?.passengers.length > 0)
                        ? <DemoSpinner />
                        : <Table borderless responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{
                                bookingResponse?.passengers.map((passenger: BookingPassengerResponse, i: number) =>
                                    <tr className='border-bottom border-dark' key={i}>

                                        <td className='tbl-lg-7'>
                                            <span>
                                                <strong>{passenger.forename + ' ' + passenger.lastname}</strong>
                                            </span>
                                        </td>
                                        <td className='tbl-auto align-middle text-center'>
                                            {
                                                <div className='d-grid'>
                                                    <Button className=""
                                                        variant='outline-secondary'
                                                        size='sm'
                                                    >
                                                        Download e-Ticket
                                                    </Button>
                                                </div>
                                            }
                                        </td>
                                        <td className='tbl-auto align-middle text-center'>
                                            {
                                                <div className='d-grid'>
                                                    <Button className=""
                                                        variant='outline-secondary'
                                                        size='sm'
                                                    >
                                                        Send per Email
                                                    </Button>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                </div>
                <Row className='justify-content-end'>
                    <Col lg='5'>
                        <Row >
                            <Col sm='6' className='d-grid mb-2 mb-sm-0' >
                                <Button
                                    className="buttons-line-button"
                                    onClick={context.navigation!.toCheckin}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col sm='6' className='d-grid'>
                                <Button
                                    className="ml-3"
                                    disabled={false}
                                    variant='info'
                                    onClick={context.navigation?.toLanding}
                                >
                                    <strong>OK</strong>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fade>
        </>
    )
}

export default DownloadTicketPage;
