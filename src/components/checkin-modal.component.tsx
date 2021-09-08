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
import { Button, Col, Form, Image, Modal, ModalBody, ModalFooter, Row } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

import airplane from '../assets/images/airplane_outline.png'

const CheckinModal = (props: any) => {

    const { t } = useTranslation();
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {
        if (props)
            setShow(props.show);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show])

    const handleCheckin = () => {
        // if (props.handleCheckin) {
            console.log("handleCheckin");
            props.handleCheckin();
            setShow(false);
            
        // }
    }

    return (
        <Modal contentClassName='checkin-modal'
            show={show}
            backdrop="static"
            keyboard={false}
            centered
        >

            <ModalHeader className='pb-0 modal-header'>
                <Image src={airplane} />
                {t('translation:checkin')}
            </ModalHeader>
            <ModalBody>
                <Form.Control
                    className="input-checkin"
                    placeholder={t('translation:forename')}
                    type="text"
                />
                <Form.Control
                    className="input-checkin"
                    placeholder={t('translation:lastname')}
                    type="text"
                />
                <Form.Control
                    className="input-checkin"
                    placeholder={t('translation:bookingCode')}
                    type="text"
                />
            </ModalBody>
            <ModalFooter className="modal-footer">
                <Button className="botton" onClick={handleCheckin}>Login</Button>
            </ModalFooter>

        </Modal>
    );
}

export default CheckinModal;