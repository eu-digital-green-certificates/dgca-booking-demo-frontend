/*
 * Corona-Warn-App / cwa-quick-test-frontend
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

import axios from 'axios';
import React from 'react';
import { BookingRequest } from './interfaces/booking-request';
import { BookingResponse } from './interfaces/booking-response';
import { DisplayPassenger } from './interfaces/display-passenger';
import { IPerson } from './interfaces/person';

export const api = axios.create({
    baseURL: ''
});

export const useBooking = (onSuccess?: () => void, onError?: (error: any) => void) => {
    const [result, setResult] = React.useState<BookingResponse>();

    const baseUri = '/booking';

    const header = {
        'Content-Type': 'application/json'
    };

    const getBooking = (person: IPerson) => {
        console.log('Person: '); console.log(JSON.stringify(person));


        const bookingRequest: BookingRequest = { ...person }

        console.log('BookingRequest: '); console.log(JSON.stringify(bookingRequest));

        api.post(baseUri, bookingRequest, { headers: header })
            .then(response => {

                console.log('response: '); console.log(JSON.stringify(response.data));

                setResult(response.data);
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch(error => {
                if (onError) {
                    onError(error);
                }
            });
    }

    return [
        result,
        getBooking
    ] as const;
}

export interface IQrCode {
    [key: string]: string;
}

export const useGetInitialize = (onSuccess?: () => void, onError?: (error: any) => void) => {
    const [qrCode, setQrCode] = React.useState<IQrCode>({});

    const baseUri = '/initialize/';

    const header = {
        'Content-Type': 'application/json'
    };

    /**
     * TODO: not used
     * Returns a QR-Code
     * 
     * @param id Id of the Person 
     */
    const getQrCode = (id: string) => {
        const url = baseUri + id;

        api.get(url, { headers: header })
            .then(response => {

                //qrCode[id] = JSON.stringify(response.data);
                qrCode[id] = response.data;
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch(error => {
                if (onError) {
                    onError(error);
                }
            });
    }

    /**
     * Returns a QR-Code Promise
     * 
     * @param id Id of the Person 
     */
     const getQrCodePromise = (id: string) => {
        const url = baseUri + id;

        //Promis ohne then
        return api.get(url, { headers: header })
            
    }

    return [
        qrCode,
        getQrCode,
        getQrCodePromise
    ] as const;
}


export const useStatus = (onSuccess?: () => void, onError?: (error: any) => void) => {
    const baseUri = '/status';

    /**
     * Returns a QR-Code Promise
     * 
     * @param person DisplayPassenger  
     */
     const getStatusPromise = (person: DisplayPassenger) => {
        console.log("Person.token: " + person.token);
        
        const header = {
            "Authorization": `Bearer ${person.token}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };

        console.log("header: " + header);

        const url = baseUri;

        //Promis ohne then
        return api.get(url, { headers: header })
     }

    return [
        getStatusPromise
    ] as const;
}