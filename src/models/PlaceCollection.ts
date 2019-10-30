/**
 * PlaceCollection
 * Stores multiple PlaceSummaries
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import PlaceCollection from './PlaceCollection';

export interface IPlaceCollection { 
    results: PlaceCollection[];
    total: number;
}


export default class PlaceCollection implements IPlaceCollection { 
    results: PlaceCollection[];
    total: number;

    constructor(obj?: IPlaceCollection){
        
        if(obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

}

export { PlaceCollection }