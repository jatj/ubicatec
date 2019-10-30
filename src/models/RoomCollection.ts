/**
 * RoomCollection
 * Stores multiple Rooms
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Room from './Room';

export interface IRoomCollection { 
    results: Room[];
    total: number;
}


export default class RoomCollection implements IRoomCollection { 
    results: Room[];
    total: number;

    constructor(obj?: IRoomCollection){
        
        if(obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

}

export { RoomCollection }