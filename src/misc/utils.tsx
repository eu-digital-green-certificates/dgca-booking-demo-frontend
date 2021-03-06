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

import moment from "moment";

export interface IUtils {
    pattern: { [key: string]: string }
    isStandardisedNameValid: (value: string) => boolean,
    pickerDateFormat: string,
    pickerDateTimeFormat: string,
    momentDateFormat: string,
    momentDateTimeFormat: string,
    convertDateToOutputFormat: (dateString?: string) => string
}

const pattern = {
    sequence: '^([1-9]{1,6})',
    tot: '^([1-9]{1,2})',
    standardisedName: '^[A-Z<]*$'
}

const standardisedNameRegExp = new RegExp(pattern.standardisedName);

const convertDateToOutputFormat = (dateString?: string): string => dateString ? moment(dateString).format(utils.momentDateTimeFormat).toString() : '';

const utils: IUtils = {
    pattern: pattern,
    isStandardisedNameValid: (value: string) => standardisedNameRegExp.test(value),
    pickerDateFormat: 'yyyy-MM-dd',
    pickerDateTimeFormat: 'yyyy-MM-dd / hh:mm a',
    momentDateFormat: 'yyyy-MM-DD',
    momentDateTimeFormat: 'dddd, yyyy-MM-DD / hh:mm A',
    convertDateToOutputFormat: convertDateToOutputFormat
}

export default utils;