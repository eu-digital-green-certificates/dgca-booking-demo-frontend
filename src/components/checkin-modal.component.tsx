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

import '../i18n';
import { useTranslation } from 'react-i18next';
import utils from '../misc/utils';

import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from 'date-fns/locale/de';

import { Button, Form, Image, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

import airplane from '../assets/images/airplane_outline.png'
import { IPerson } from '../interfaces/person';
import AppContext from '../misc/appContext';
import { useBooking } from '../api';

registerLocale('de', de)

const CheckinModal = (props: any) => {

    const context = React.useContext(AppContext);
    const { t } = useTranslation();
    const [forename, setForname] = React.useState<string>('');
    const [lastname, setLastname] = React.useState<string>('');
    const [bookingCode, setBookingCode] = React.useState<string>('');

    const [dateOfBirth, setDateOfBirth] = React.useState<Date>();

    const handleError = (error: any) => {
        let msg = '';

        if (error) {
            msg = error.message
        }

        props.hide();
        props.setError({ error: error, message: msg, onCancel: context.navigation!.toLanding });
    }

    const [booking, getBooking] = useBooking(undefined, handleError);

    React.useEffect(() => {
        if (booking) {
            props.setBookingResponse(booking);
        }
    }, [booking])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        event.stopPropagation();

        let person: IPerson = {
            forename: forename,
            lastname: lastname,
            dateOfBirth: dateOfBirth!.toISOString(),
            bookingReference: bookingCode
        }

        //TODO: sollte über die Landingpage erfolgen
        getBooking(person);
    }

    const handleDateOfBirthChange = (evt: Date | [Date, Date] | null) => {
        let date: Date;

        if (Array.isArray(evt))
            date = evt[0];
        else
            date = evt as Date;

        if (date) {
            date.setHours(12);
        }

        setDateOfBirth(date);;
    }

    return (
        <Modal contentClassName='checkin-modal'
            show={props.show}
            onHide={props.hide}
            centered
            size='sm'
        >
            <Form className='form-flex' onSubmit={handleSubmit}>
                <ModalHeader className='pb-0 modal-header'>
                    <Image src={airplane} />
                    {t('translation:checkin')}
                </ModalHeader>
                <ModalBody>
                    <Form.Label>
                        {t('translation:plsLogin')}
                    </Form.Label>
                    <Form.Control
                        className="input-checkin input-checkin-modal"
                        placeholder={t('translation:forename') + '*'}
                        type="text"
                        value={forename}
                        onChange={(evt: any) => setForname(evt.target.value)}
                        required
                    />
                    <Form.Control
                        className="input-checkin input-checkin-modal"
                        placeholder={t('translation:lastname') + '*'}
                        type="text"
                        value={lastname}
                        onChange={(evt: any) => setLastname(evt.target.value)}
                        required
                    />
                    <DatePicker
                        selected={dateOfBirth}
                        onChange={handleDateOfBirthChange}
                        locale='de'
                        dateFormat={utils.pickerDateFormat}
                        isClearable
                        placeholderText={t('translation:date-of-birth')  + '*'}
                        className='input-checkin input-date-modal'
                        wrapperClassName='align-self-center mb-3'
                        popperPlacement='bottom'
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                        minDate={new Date(1900, 0, 1, 12)}
                        openToDate={new Date(1990, 0, 1)}
                        required
                    />
                    <Form.Control
                        className="input-checkin input-checkin-modal"
                        placeholder={t('translation:bookingCode') + '*'}
                        type="text"
                        value={bookingCode}
                        onChange={(evt: any) => setBookingCode(evt.target.value)}
                        required
                    />
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button className="botton" type='submit'>Login</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default CheckinModal;