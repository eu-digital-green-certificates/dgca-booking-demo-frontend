/* tslint:disable */
/* eslint-disable */
/**
 * EU Digital COVID Certificate Booking Demo
 * The API provides exemplary booking endpoints
 *
 * OpenAPI spec version: 0.0.1-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface BookingResponse
 */
export interface BookingResponse {
    /**
     * 
     * @type {string}
     * @memberof BookingResponse
     */
    reference?: any;
    /**
     * 
     * @type {Date}
     * @memberof BookingResponse
     */
    time?: any;
    /**
     * 
     * @type {Array&lt;BookingPassengerResponse&gt;}
     * @memberof BookingResponse
     */
    passengers?: any;
    /**
     * 
     * @type {BookingFlightInfoResponse}
     * @memberof BookingResponse
     */
    flightInfo?: any;
}
