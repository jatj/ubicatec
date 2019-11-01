import 'reflect-metadata';
import { container } from "tsyringe";
import { API } from '@conectasystems/tools';
import { BooksService } from '../services/books';
import { UbicaTecAPIModels } from '../models';

/**
 * get all the books
 * This returns all the books of the campus library. 
 * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the 
 * list of books and return the [pageIndex] chunk of books. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
 * 
 **/
export const listBooks: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var fbUserId = req.swagger.params['fbUserId'].value;
    var orderBy = req.swagger.params['orderBy'].value;
    var orderMode = req.swagger.params['orderMode'].value;
    var pageIndex = req.swagger.params['pageIndex'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    var bookStatus = req.swagger.params['bookStatus'].value;
    var category = req.swagger.params['category'].value;
    var name = req.swagger.params['name'].value;
    try{
        const booksService = container.resolve(BooksService);
        booksService.init(req);
        let result = await booksService.listBooks(fbUserId, orderBy, orderMode, pageIndex, pageSize, bookStatus, category, name);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * gets an specific book
 * This will return the book that matches with the provided [idBook]
 **/
export const getBook: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idBook = req.swagger.params['idBook'].value;
    try{
        const booksService = container.resolve(BooksService);
        booksService.init(req);
        let result = await booksService.getBook(idBook);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
