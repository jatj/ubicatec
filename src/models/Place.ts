/**
 * Place
 * Place of the ubicatec that can create events
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import { Model, ValidationError } from 'objection';
import { BaseModel } from '@conectasystems/tools/DB';

export interface IPlace { 
    idPlace: number;
    name: string;
    description?: string;
    fence: any;
}


export default class Place extends BaseModel implements IPlace { 
    idPlace: number;
    name: string;
    description?: string;
    fence: any;

    constructor(obj?: IPlace){
        super()
        if(obj == null) return;
        this.idPlace = obj.idPlace;
        this.name = obj.name;
        this.description = obj.description;
        this.fence = obj.fence;
    }

    static tableName = 'Place';

    static idColumn = 'idPlace';

    static jsonSchema = {
        type: 'object',
        required: ['idPlace', 'name', 'fence'],

        properties: {
            idPlace: {
                type: 'integer',
            },
            name: {
                type: 'string',
            },
            description: {
                type: ['string', null],
            },
            fence: {
                type: 'jsonb',
            },
        }
    };
    $beforeInsert() {
        if (this.idPlace) {
            delete this.idPlace;
        }
    }
}

export { Place }