import { injectable } from "tsyringe";
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels, Book } from '../models';

/**
 * Provides endpoints to search and get and search books
 */
@injectable()
export class BooksService {
    req: API.IServerRequest<UbicaTecAPIModels>;

    constructor() { }

    init(req: API.IServerRequest<UbicaTecAPIModels>) {
        this.req = req;
    }

    /**
    * get all the books
    * This returns all the books of the campus library. 
    * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the 
    * list of books and return the [pageIndex] chunk of books. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { 'name' | 'category' } orderBy Field to order by the query (optional)
    * @param { 'ASC' | 'DESC' } orderMode Mode to order elements, orderBy has to be specified default is set to asc (optional)
    * @param { number } pageIndex Index of the page to be withdrawn by the API (optional)
    * @param { number } pageSize Size of the chunks of data requested (optional)
    * @param { 'AVAILABLE' | 'RENTED' | 'RESERVED' } bookStatus bookStatus for filter the books (optional)
    * @param { string } category category for filter the books (optional)
    * @param { string } name name for filter the books (optional)
    * @returns { Promise<> }
    **/
    async listBooks (orderBy?: 'name' | 'category', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, bookStatus?: 'AVAILABLE' | 'RENTED' | 'RESERVED', category?: string, name?: string) {
        try{
            var books;
            if (pageIndex != null && pageSize != null){
                books = await this.req.query<Book>(Book)
                .skipUndefined()
                .page(pageIndex, pageSize);
                return books;
            }
            books = await this.req.query<Book>(Book)
            .skipUndefined()
            return books;
        }catch(error){
            throw error;
        }
    }

    /**
    * gets an specific book
    * This will return the book that matches with the provided [idBook]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idBook idBook of the searched book 
    * @returns { Promise<> }
    **/
    async getBook (idBook: number) {
        try{
            const book = await this.req.query<Book>(Book).findById(idBook)
            return book;
        }catch(error){
            throw error;
        }
    }

}