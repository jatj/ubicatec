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
    fkUser: number;
    fkBook?: number;
    fkRoom?: number;
    type: IRental.TypeEnum;
    book?: Book;
    room?: Room;
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
    fkUser: number;
    fkBook?: number;
    fkRoom?: number;
    type: IRental.TypeEnum;
    book?: Book;
    room?: Room;

    constructor(obj?: IRental){
        super()
        if(obj == null) return;
        this.idRental = obj.idRental;
        this.fkUser = obj.fkUser;
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
        required: ['type', 'fkUser'],

        properties: {
            idRental: {
                type: 'integer',
            },
            fkUser: {
                type: 'integer',
            },
            fkBook: {
                type: ['integer', null],
            },
            fkRoom: {
                type: ['integer', null],
            },
            type: {
                type: 'string',
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

    static relationMappings = {
        room: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Room`,
            join: {
                from: 'Rental.fkRoom',
                to: 'Room.idRoom',
            }
        },
        book: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Book`,
            join: {
                from: 'Rental.fkBook',
                to: 'Book.idBook',
            }
        },
    };
}

export { Rental }