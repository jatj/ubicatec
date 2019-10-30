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
    status?: IRoom.StatusEnum;
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
    status?: IRoom.StatusEnum;

    constructor(obj?: IRoom){
        super()
        if(obj == null) return;
        this.idRoom = obj.idRoom;
        this.number = obj.number;
        this.status = obj.status;
    }

    static tableName = 'Room';

    static idColumn = 'idRoom';

    static jsonSchema = {
        type: 'object',
        required: ['module', 'level', 'fkBook', 'idRoom', 'number'],

        properties: {
            idRoom: {
                type: 'integer',
            },
            number: {
                type: 'integer',
            },
            status: {
                type: ['string', null],
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