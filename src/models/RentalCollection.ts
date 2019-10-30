/**
 * RentalCollection
 * Stores multiple Rentals
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Rental from './Rental';

export interface IRentalCollection { 
    results: Rental[];
    total: number;
}


export default class RentalCollection implements IRentalCollection { 
    results: Rental[];
    total: number;

    constructor(obj?: IRentalCollection){
        
        if(obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

}

export { RentalCollection }