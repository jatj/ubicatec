/**
 * Room
 * Room for the places
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import { Model, ValidationError } from 'objection';
import { BaseModel } from '@conectasystems/tools/DB';

export interface IRoom { 
    idRoom: number;
    number: number;
    image?: string;
    status: IRoom.StatusEnum;
}

export namespace IRoom {
    export type StatusEnum = 'AVAILABLE' | 'RENTED' | 'RESERVED';
    export const StatusEnum = {
        AVAILABLE: 'AVAILABLE' as StatusEnum,
        RENTED: 'RENTED' as StatusEnum,
        RESERVED: 'RESERVED' as StatusEnum,
    }
}

export default class Room extends BaseModel implements IRoom { 
    idRoom: number;
    number: number;
    image?: string;
    status: IRoom.StatusEnum;

    constructor(obj?: IRoom){
        super()
        if(obj == null) return;
        this.idRoom = obj.idRoom;
        this.number = obj.number;
        this.image = obj.image;
        this.status = obj.status;
    }

    static tableName = 'Room';

    static idColumn = 'idRoom';

    static jsonSchema = {
        type: 'object',
        required: ['status', 'number', 'idRoom'],

        properties: {
            idRoom: {
                type: 'integer',
            },
            number: {
                type: 'integer',
            },
            image: {
                type: ['string', null],
            },
            status: {
                type: 'string',
            },
        }
    };
    $beforeInsert() {
        if (this.idRoom) {
            delete this.idRoom;
        }
    }
}

export { Room }