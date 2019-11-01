import { injectable } from "tsyringe";
import { API, Types, Utils, Logger } from '@conectasystems/tools';
import { UbicaTecAPIModels, Book, BookCollection, User, IBook, Rental, IRental } from '../models';

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
    async listBooks (fbUserId: string, orderBy?: 'name' | 'category', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, bookStatus?: 'AVAILABLE' | 'RENTED' | 'RESERVED', category?: string, name?: string) {
        try{
            let query = this.req.query<Book>(Book).skipUndefined();
            query = (name) ? query.where('name', 'like', `%${name}%`) : query;
            query = (bookStatus) ? query : query.where({ bookStatus });
            query = (category) ? query.where('category', 'like', `%${category}%`) : query;
            query = (orderBy) ? query.orderBy(orderBy, orderMode || API.Defaults.orderMode) : query;
            query = (!orderBy) ? query.orderBy('idBook', orderMode || API.Defaults.orderMode) : query;
            let res = await query.page(pageIndex || API.Defaults.pageIndex, pageSize || API.Defaults.pageSize)
            let user = await this.req.query<User>(User).skipUndefined().findOne({ fbUserId });
            for(let i in res.results){
                if(res.results[i].status == IBook.StatusEnum.RENTED){
                    let rental = await this.req.query<Rental>(Rental).skipUndefined().findOne({fkBook: res.results[i].idBook, type: IRental.TypeEnum.RENT});
                    if(rental != null && user != null && rental.fkUser == user.idUser){
                        res.results[i].isRenter = true;
                    }
                }
            }
            return new BookCollection(res).toView();
        }catch(error){
            Logger.error(error);
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
            let query = this.req.query<Book>(Book).skipUndefined();
            const book = await query.findById(idBook);
            if (book == null)
                throw new API.Error(API.Response.NOT_FOUND, 'El libro no existe');
            return book;
        }catch(error){
            throw error;
        }
    }

}