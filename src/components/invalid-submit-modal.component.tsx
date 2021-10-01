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

import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';

const InvalidSubmitModal = (props: any) => {

    return (
        <Modal contentClassName='checkin-modal'
            show={props.show}
            onHide={props.hide}
            centered
            size='lg'
        >
            <ModalBody className=''>
                <h2><strong>Conditions of the check-in not fulfilled</strong></h2>
                <span>
                    Unfortunately, one or several certificates are invalid or not available. <br />
                    Therefore, we cannot offer you an e-ticket at that moment.<br /><br />

                    <strong>You have two options:</strong><br /><br />

                    Either, you to catch up on a quick test and use this online check-in again.<br /><br />

                    Otherwise you can undergo a quick test directly at the airport. You are welcome to use the<br />
                    counter service afterwards in order to finish the check-in and to receive you ticket(s).
                </span>

            </ModalBody>
            <ModalFooter className="modal-footer justify-content-end border-0">
                <Button className='buttons-line-button tbl-3' onClick={props.hide} >OK</Button>
            </ModalFooter>
        </Modal>
    );
}

export default InvalidSubmitModal;