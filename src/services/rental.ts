import { transaction } from 'objection';
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels } from '../models';
import APIResponse from '../models/APIResponse';

/**
 * Provides endpoints to rent and rent/return/reserve library rooms and books
 */
export class RentalService {

    /**
    * rent/return/reserve a room
    * This will rent/return/reserve the library room with the provided [idRoom]
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idRoom id of the room to rent/return/reserve 
    * @param { APIResponse } rental  (optional)
    * @returns { Promise<> }
    **/
    static async rentRoom (req: API.IServerRequest<UbicaTecAPIModels>, idRoom: number, rental?: APIResponse) {
        try{
            throw new API.Error(API.Response.UNHANDLED_ERROR, 'Not implemented');
        }catch(error){
            throw error;
        }
    }

    /**
    * rent/return/reserve a book
    * This will rent/return/reserve the library book with the provided [idBook]
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idBook id of the book to rent/return/reserve 
    * @param { APIResponse } rental  (optional)
    * @returns { Promise<> }
    **/
    static async rentBook (req: API.IServerRequest<UbicaTecAPIModels>, idBook: number, rental?: APIResponse) {
        try{
            throw new API.Error(API.Response.UNHANDLED_ERROR, 'Not implemented');
        }catch(error){
            throw error;
        }
    }

    /**
    * gets the book rentals of a specific user
    * This will return a collection of book rentals from an specific user that matches the specific [idUser]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idUser idUser of the searched user 
    * @returns { Promise<> }
    **/
    static async getBookRentals (req: API.IServerRequest<UbicaTecAPIModels>, idUser: number) {
        try{
            throw new API.Error(API.Response.UNHANDLED_ERROR, 'Not implemented');
        }catch(error){
            throw error;
        }
    }

    /**
    * gets the room rentals of a specific user
    * This will return a collection of room rentals from an specific user that matches the specific [idUser]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idUser idUser of the searched user 
    * @returns { Promise<> }
    **/
    static async getRoomRentals (req: API.IServerRequest<UbicaTecAPIModels>, idUser: number) {
        try{
            throw new API.Error(API.Response.UNHANDLED_ERROR, 'Not implemented');
        }catch(error){
            throw error;
        }
    }

}