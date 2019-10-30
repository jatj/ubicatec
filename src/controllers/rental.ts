import 'reflect-metadata';
import { container } from "tsyringe";
import { API } from '@conectasystems/tools';
import { RentalService } from '../services/rental';
import { UbicaTecAPIModels } from '../models';
import { APIResponse } from '../models/APIResponse';

/**
 * rent/return/reserve a room
 * This will rent/return/reserve the library room with the provided [idRoom]
 * 
 **/
export const rentRoom: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idRoom = req.swagger.params['idRoom'].value;
    var rental = req.swagger.params['rental'].value;
    try{
        const rentalsService = container.resolve(RentalService);
        rentalsService.init(req);
        let result = await rentalsService.rentRoom(idRoom, rental);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * rent/return/reserve a book
 * This will rent/return/reserve the library book with the provided [idBook]
 * 
 **/
export const rentBook: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idBook = req.swagger.params['idBook'].value;
    var rental = req.swagger.params['rental'].value;
    try{
        const rentalsService = container.resolve(RentalService);
        rentalsService.init(req);
        let result = await rentalsService.rentBook(idBook, rental);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * gets the book rentals of a specific user
 * This will return a collection of book rentals from an specific user that matches the specific [idUser]
 **/
export const getBookRentals: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idUser = req.swagger.params['idUser'].value;
    try{
        const rentalsService = container.resolve(RentalService);
        rentalsService.init(req);
        let result = await rentalsService.getBookRentals(idUser);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * gets the room rentals of a specific user
 * This will return a collection of room rentals from an specific user that matches the specific [idUser]
 **/
export const getRoomRentals: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idUser = req.swagger.params['idUser'].value;
    try{
        const rentalsService = container.resolve(RentalService);
        rentalsService.init(req);
        let result = await rentalsService.getRoomRentals(idUser);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
