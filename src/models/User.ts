/**
 * User
 * User of the ubicatec that can create events
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import { Model, ValidationError } from 'objection';
import { BaseModel } from '@conectasystems/tools/DB';

export interface IUser { 
    idUser?: number;
    name: string;
    lastname?: string;
    studentNumber: string;
    fbUserId: string;
    program?: string;
}


export default class User extends BaseModel implements IUser { 
    idUser?: number;
    name: string;
    lastname?: string;
    studentNumber: string;
    fbUserId: string;
    program?: string;

    constructor(obj?: IUser){
        super()
        if(obj == null) return;
        this.idUser = obj.idUser;
        this.name = obj.name;
        this.lastname = obj.lastname;
        this.studentNumber = obj.studentNumber;
        this.fbUserId = obj.fbUserId;
        this.program = obj.program;
    }

    static tableName = 'User';

    static idColumn = 'idUser';

    static jsonSchema = {
        type: 'object',
        required: ['name', 'studentNumber', 'fbUserId'],

        properties: {
            idUser: {
                type: ['integer', null],
            },
            name: {
                type: 'string',
            },
            lastname: {
                type: ['string', null],
            },
            studentNumber: {
                type: 'string',
            },
            fbUserId: {
                type: 'string',
            },
            program: {
                type: ['string', null],
            },
        }
    };
    $beforeInsert() {
        if (this.idUser) {
            delete this.idUser;
        }
    }
}

export { User }