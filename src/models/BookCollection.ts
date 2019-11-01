/**
 * BookCollection
 * Stores multiple Books
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Book from './Book';
import { IBook, IRental } from '.';

export interface IBookCollection {
    results: Book[];
    total: number;
}


export default class BookCollection implements IBookCollection {
    results: Book[];
    total: number;

    constructor(obj?: IBookCollection) {

        if (obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

    toView(): BooksView {
        return new BooksView(this.results);
    }

}

export class BooksView {
    messages: Array<{
        attachment: {
            type: string
            payload: {
                template_type: string
                image_aspect_ratio: string
                elements: Array<{
                    title: string
                    image_url: string
                    subtitle: string
                    buttons: Array<
                        {
                            type: string,
                            url: string
                            title: string
                        }
                    >
                }>
            }
        }
    }>
    constructor(books: Book[]) {
        let bookViews = [];
        for (let book of books) {
            let buttons;
            if(book.status == IBook.StatusEnum.AVAILABLE){
                buttons = [
                    {
                        type: 'show_block',
                        block_names: ["Rentar libro"],
                        title: 'Rentar',
                        set_attributes: {
                            fkBook: book.idBook,
                            bookTitle: book.title,
                            rentalType: IRental.TypeEnum.RENT
                        },
                    }
                ]
            } else if(book.status == IBook.StatusEnum.RENTED && book.isRenter) {
                buttons = [
                    {
                        type: 'show_block',
                        block_names: ["Regresar libro"],
                        title: 'Regresar',
                        set_attributes: {
                            fkBook: book.idBook,
                            bookTitle: book.title,
                            rentalType: IRental.TypeEnum.RETURN
                        },
                    }
                ]
            }
            let bookView = {
                title: book.title,
                image_url: book.image,
                subtitle: `${book.code} - ${BooksView.getStatus(book.status)} - ${book.description}`,
                buttons
            }
            bookViews.push(bookView);
        }
        this.messages = [
            {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        image_aspect_ratio: 'square',
                        elements: bookViews
                    }
                }
            }
        ]
    }

    static getStatus(status: IBook.StatusEnum) {
        switch (status) {
            case 'AVAILABLE':
                return 'Disponible';
            case 'RESERVED':
                return 'Reservado';
            case 'RENTED':
                return 'Rentado';
        }
    }
}

export { BookCollection }