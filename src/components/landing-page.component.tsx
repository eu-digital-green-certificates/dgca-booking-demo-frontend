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

import React, { Fragment } from 'react';
import { Col, Container, Fade, Image, Row, Form, Button, InputGroup } from 'react-bootstrap';

import '../i18n';
// import { useTranslation } from 'react-i18next';

import AppContext from '../misc/appContext';

import flightIcon from '../assets/images/icon_fluege.png';
import flighthotelIcon from '../assets/images/icon_flughotel.png';
import hotelIcon from '../assets/images/icon_hotel.png';
import rentalcarIcon from '../assets/images/icon_mietwagen.png';

import CheckinModal from './checkin-modal.component';

import { IPerson } from '../interfaces/person';
import { BookingResponse } from '../interfaces/booking-response';

import { useBooking } from '../api';

const LandingPage = (props: any) => {

    const context = React.useContext(AppContext);
    // const { t } = useTranslation();

    const [isInit, setIsInit] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [booking, getBooking] = useBooking();
    const [bookingResponse, setBookingResponse] = React.useState<BookingResponse>();

    React.useEffect(() => {
        if (context.navigation)
            setIsInit(true);
    }, [context.navigation])

    React.useEffect(() => {
        if (bookingResponse) {
            props.setBookingResponse(bookingResponse);
            context.navigation!.toCheckin();
        }
    }, [bookingResponse, setBookingResponse])

    //TODO: braucht man das?
    const handleCheckinClick = (event: any) => {
        setShowModal(true);
    }

    //TODO: braucht man das?
    const handleCheckin = (person: IPerson) => {
        getBooking(person);
    }

    return (!isInit ? <></> :
        <>
            <Fade appear={true} in={true} >
                <Fragment>
                    <Container className='p-0 booking-container'>
                        <Row className="search">
                            <Row className="p-0 m-0 search-header">
                                <Col xs='auto' className="search-header-element">
                                    <Image className="icon" src={flightIcon} />{'Flights'}
                                </Col>
                                <Col xs='auto' className="search-header-element">
                                    <Image className="icon" src={flighthotelIcon} />Flight &amp; Hotel
                                </Col>
                                <Col xs='auto' className="search-header-element">
                                    <Image className="icon" src={rentalcarIcon} />Rental Car
                                </Col>
                                <Col xs='auto' className="search-header-element">
                                    <Image className="icon" src={hotelIcon} />Hotel
                                </Col>
                            </Row>
                            <Row className="p-0 m-0 search-content">
                                <Row className="m-0 d-flex align-content-center">
                                    <span className="from">from</span>
                                </Row>
                                <Row className="m-0 d-flex pb-4">
                                    <Form>
                                        <Form.Group as={Row}>
                                            <Col xs lg="4" md="4">
                                                <InputGroup className="input-transparent">
                                                    <Form.Control
                                                        className="input-transparent"
                                                        placeholder="From"
                                                        type="text"
                                                    />
                                                    <InputGroup.Text className="input-transparent">
                                                        <span className="location-icon" />
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                            <Col xs lg="1" md="1">
                                                <div className="change-icon" />
                                            </Col>

                                            <Col xs lg="4" md="4">
                                                <Form.Control
                                                    className="input-transparent"
                                                    placeholder="To"
                                                    type="text"
                                                />
                                            </Col>
                                            <Col xs lg="3" md="3">
                                                <Button className="botton" type="submit">Next</Button>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Row>
                            </Row>
                        </Row>
                    </Container>
                    <Container className='content-container'>
                        <Row className='p-0'>
                            <Container fluid className='check-in-container'>
                                <Col xs="12" lg="3" md="3" className="p-0">
                                    <InputGroup className="input-checkin">
                                        <Form.Control
                                            className="input-checkin"
                                            placeholder="Check-in"
                                            type="text"
                                        />
                                        <InputGroup.Text className="input-checkin">
                                            <span className="plus-icon" onClick={handleCheckinClick} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs="12" lg="3" md="3" className="p-0">
                                    <InputGroup className="input-checkin">
                                        <Form.Control
                                            className="input-checkin"
                                            placeholder="Flight status"
                                            type="text"
                                        />
                                        <InputGroup.Text className="input-checkin">
                                            <span className="plus-icon" />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs="12" lg="3" md="3" className="p-0">
                                    <InputGroup className="input-checkin">
                                        <Form.Control
                                            className="input-checkin"
                                            placeholder="My bookings"
                                            type="text"
                                        />
                                        <InputGroup.Text className="input-checkin">
                                            <span className="plus-icon" />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Container>
                        </Row>
                        <Row className='card-group'>
                            <Col sm='6' md='4' className='col-item' >

                            </Col>
                            <Col sm='6' md='4' className='col-item' >

                            </Col>
                            <Col sm='6' md='4' className='col-item' >

                            </Col>
                            <Col sm='6' md='4' className='col-item' >

                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            </Fade>
            <CheckinModal
                show={showModal}
                hide={() => setShowModal(false)}
                handleCheckin={handleCheckin}
                setBookingResponse={setBookingResponse}
                setError={props.setError}
            />
        </>)
}

export default LandingPage;