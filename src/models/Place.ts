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
    image?: string;
    isRestroom?: boolean;
    centerLat?: number;
    centerLng?: number;
    distanceTo?: number;
}


export default class Place extends BaseModel implements IPlace {
    idPlace: number;
    name: string;
    description?: string;
    fence: any;
    image?: string;
    isRestroom?: boolean;
    centerLat?: number;
    centerLng?: number;
    distanceTo?: number;

    constructor(obj?: IPlace) {
        super()
        if (obj == null) return;
        this.idPlace = obj.idPlace;
        this.name = obj.name;
        this.description = obj.description;
        this.fence = obj.fence;
        this.image = obj.image;
        this.isRestroom = obj.isRestroom;
        this.centerLat = obj.centerLat;
        this.centerLng = obj.centerLng;
        this.distanceTo = obj.distanceTo;
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
            image: {
                type: ['string', null],
            },
            isRestroom: {
                type: ['boolean', null],
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