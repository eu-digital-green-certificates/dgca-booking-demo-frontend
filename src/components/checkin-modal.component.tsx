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

import '../i18n';
import { useTranslation } from 'react-i18next';
import { Button, Form, Image, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

import airplane from '../assets/images/airplane_outline.png'
import { IPerson } from '../misc/person';
import AppContext from '../misc/appContext';

const CheckinModal = (props: any) => {

    const context = React.useContext(AppContext);
    const { t } = useTranslation();

    const [show, setShow] = React.useState(false);
    const [forename, setForname] = React.useState<string>();
    const [lastname, setLastname] = React.useState<string>();
    const [bookingCode, setBookingCode] = React.useState<string>();

    React.useEffect(() => {
        if(props.show) {
            handleShow();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show])

    const handleClose = () => {
        props.handleCheckin();
        setShow(false);

    }
    const handleShow = () => setShow(true);

    const handleCheckin = () => {
        let person: IPerson = {
            forename: forename!,
            lastname: lastname!,
            bookingCode: bookingCode!
        }
        context.navigation!.toCheckin();  
    }

    return (
        <Modal contentClassName='checkin-modal'
            show={show}
            onHide={handleClose}
            centered
            size='sm'
        >
            <Form className='form-flex' onSubmit={handleCheckin}>
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