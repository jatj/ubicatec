/**
 * BookCollection
 * Stores multiple Books
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Book from './Book';

export interface IBookCollection { 
    results: Book[];
    total: number;
}


export default class BookCollection implements IBookCollection { 
    results: Book[];
    total: number;

    constructor(obj?: IBookCollection){
        
        if(obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

}

export { BookCollection }