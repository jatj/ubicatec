/**
 * UserCollection
 * Stores multiple UserSummaries
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import User from './User';

export interface IUserCollection { 
    results: User[];
    total: number;
}


export default class UserCollection implements IUserCollection { 
    results: User[];
    total: number;

    constructor(obj?: IUserCollection){
        
        if(obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

}

export { UserCollection }