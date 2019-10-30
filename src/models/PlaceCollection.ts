/**
 * PlaceCollection
 * Stores multiple PlaceSummaries
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Place from './Place';

export interface IPlaceCollection { 
    results: Place[];
    total: number;
}


export default class PlaceCollection implements IPlaceCollection { 
    results: Place[];
    total: number;

    constructor(obj?: IPlaceCollection){
        
        if(obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

}

export { PlaceCollection }