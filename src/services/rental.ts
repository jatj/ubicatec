import { injectable } from "tsyringe";
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels } from '../models';
import APIResponse from '../models/APIResponse';

/**
 * Provides endpoints to rent and rent/return/reserve library rooms and books
 */
@injectable()
export class RentalService {
    req: API.IServerRequest<UbicaTecAPIModels>;

    constructor() { }

    init(req: API.IServerRequest<UbicaTecAPIModels>) {
        this.req = req;
    }

    /**
    * rent/return/reserve a room
    * This will rent/return/reserve the library room with the provided [idRoom]
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idRoom id of the room to rent/return/reserve 
    * @param { APIResponse } rental  (optional)
    * @returns { Promise<> }
    **/
    async rentRoom (idRoom: number, rental?: APIResponse) {
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
    async rentBook (idBook: number, rental?: APIResponse) {
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
    async getBookRentals (idUser: number) {
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
    async getRoomRentals (idUser: number) {
        try{
            throw new API.Error(API.Response.UNHANDLED_ERROR, 'Not implemented');
        }catch(error){
            throw error;
        }
    }

}