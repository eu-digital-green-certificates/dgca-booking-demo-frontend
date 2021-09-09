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
import { Col, Container, Fade, Image, Row } from 'react-bootstrap'

import '../i18n';
import { useTranslation } from 'react-i18next';

import logo from '../assets/images/airplane_outline.png'

const Header = (props: any) => {

    const { t } = useTranslation();

    const [isInit] = React.useState(true);

    return (!isInit ? <></> :
        <>
            <Fade appear={true} in={true} >
                <Container className='w100'>
                    <Row id='header'>
                        <Col className='d-flex p-0'>
                            <Image className='demo-logo' src={logo} />
                            <h1 className='header-title'>{t('translation:title')}</h1>
                        </Col>
                        <Col id='header-right'>
                            <span className='header-text' >Login</span>
                            <span id='user' />
                            <span className='header-text' >Menü</span>
                            <span id='menu' />
                        </Col>
                    </Row>
                </Container>
            </Fade>
        </>
    )
}

export default Header;