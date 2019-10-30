/**
 * Rental
 * Rental of books and rooms
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import { Model, ValidationError } from 'objection';
import { BaseModel } from '@conectasystems/tools/DB';
import Book from './Book';
import Room from './Room';

export interface IRental { 
    idRental: number;
    fkBook: number;
    fkRoom?: number;
    type?: IRental.TypeEnum;
    book?: any;
    room?: any;
}

export namespace IRental {
    export type TypeEnum = 'RENT' | 'RESERVE' | 'RETURN';
    export const TypeEnum = {
        RENT: 'RENT' as TypeEnum,
        RESERVE: 'RESERVE' as TypeEnum,
        RETURN: 'RETURN' as TypeEnum,
    }
}

export default class Rental extends BaseModel implements IRental { 
    idRental: number;
    fkBook: number;
    fkRoom?: number;
    type?: IRental.TypeEnum;
    book?: any;
    room?: any;

    constructor(obj?: IRental){
        super()
        if(obj == null) return;
        this.idRental = obj.idRental;
        this.fkBook = obj.fkBook;
        this.fkRoom = obj.fkRoom;
        this.type = obj.type;
        this.book = obj.book;
        this.room = obj.room;
    }

    static tableName = 'Rental';

    static idColumn = 'idRental';

    static jsonSchema = {
        type: 'object',
        required: ['module', 'level', 'fkBook', 'idRental'],

        properties: {
            idRental: {
                type: 'integer',
            },
            fkBook: {
                type: 'integer',
            },
            fkRoom: {
                type: ['integer', null],
            },
            type: {
                type: ['string', null],
            },
            book: {
                type: ['object', null],
            },
            room: {
                type: ['object', null],
            },
        }
    };
    $beforeInsert() {
        if (this.idRental) {
            delete this.idRental;
        }
    }
}

export { Rental }