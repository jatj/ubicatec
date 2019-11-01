/**
 * Book
 * Book for the places
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import { Model, ValidationError } from 'objection';
import { BaseModel } from '@conectasystems/tools/DB';

export interface IBook { 
    idBook: number;
    title: string;
    description?: string;
    code?: string;
    status?: IBook.StatusEnum;
    image?: string;
}

export namespace IBook {
    export type StatusEnum = 'AVAILABLE' | 'RENTED' | 'RESERVED';
    export const StatusEnum = {
        AVAILABLE: 'AVAILABLE' as StatusEnum,
        RENTED: 'RENTED' as StatusEnum,
        RESERVED: 'RESERVED' as StatusEnum,
    }
}

export default class Book extends BaseModel implements IBook { 
    idBook: number;
    title: string;
    description?: string;
    code?: string;
    status?: IBook.StatusEnum;
    image?: string;
    isRenter?: boolean;

    constructor(obj?: IBook){
        super()
        if(obj == null) return;
        this.idBook = obj.idBook;
        this.title = obj.title;
        this.description = obj.description;
        this.code = obj.code;
        this.status = obj.status;
        this.image = obj.image;
    }

    static tableName = 'Book';

    static idColumn = 'idBook';

    static jsonSchema = {
        type: 'object',
        required: ['idBook', 'title'],

        properties: {
            idBook: {
                type: 'integer',
            },
            title: {
                type: 'string',
            },
            description: {
                type: ['string', null],
            },
            code: {
                type: ['string', null],
            },
            status: {
                type: ['string', null],
            },
            image: {
                type: ['string', null],
            },
        }
    };
    $beforeInsert() {
        if (this.idBook) {
            delete this.idBook;
        }
    }
}

export { Book }