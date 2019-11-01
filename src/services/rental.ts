import { injectable } from "tsyringe";
import { API, Types, Utils, Logger } from '@conectasystems/tools';
import { UbicaTecAPIModels, Rental, IRental, RentalCollection, User, Room, IRoom, Book, IBook } from '../models';
import APIResponse from '../models/APIResponse';
import { transaction } from "objection";

/**
 * Provides endpoints to rent and rent/return/reserve library rooms and books
 */
@injectable()
export class RentalService {
    req: API.IServerRequest<UbicaTecAPIModels>;

    constructor() { }

    init(req: API.IServerRequest<UbicaTecAPIModels>) {
        this.req = req;
    }

    /**
    * rent/return/reserve a room
    * This will rent/return/reserve the library room with the provided [idRoom]
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idRoom id of the room to rent/return/reserve 
    * @param { string } fbUserId id of the fb user that is chatting with chatbot
    * @param { Rental } rental  (optional)
    * @returns { Promise<> }
    **/
    async rentRoom(idRoom: number, fbUserId: string, rental?: Rental) {
        let trx = await transaction.start(this.req.tools.models.User.knex());
        try {
            let user = await this.req.query<User>(User, trx).skipUndefined().findOne({ fbUserId });
            if (user == null) {
                return {
                    messages: [
                        {
                            text: `No estás registrado, por favor registrate e intenta rentar la sala de nuevo`,
                            quick_replies: [
                                {
                                    title: 'Registrarme',
                                    block_names: ['Registro usuario']
                                }
                            ]
                        }
                    ]
                }
            }
            if (rental.type == IRental.TypeEnum.RENT) {
                return this._rentRoom(trx, idRoom, rental, user);
            } else {
                return this._returnRoom(trx, idRoom, rental, user)
            }
        } catch (error) {
            Logger.error(error);
            await trx.rollback();
            throw error;
        }
    }

    async _rentRoom(trx, idRoom: number, rental: Rental, user: User) {
        // Check if room is available
        let room = await this.req.query<Room>(Room, trx).skipUndefined().findById(idRoom);
        if (room == null || room.status != IRoom.StatusEnum.AVAILABLE) {
            return {
                messages: [
                    {
                        text: `La sala no está disponible, intentelo más tarde`,
                        quick_replies: [
                            {
                                title: 'Regresar al menu',
                                block_names: ['Menu']
                            },
                            {
                                title: 'Ver más salas',
                                block_names: ['Mostrar salas']
                            }
                        ]
                    }
                ]
            }
        }
        // Create rental
        rental.fkRoom = idRoom;
        rental.fkUser = user.idUser;
        delete rental.fkBook;
        await this.req.query<Rental>(Rental, trx).skipUndefined().insertAndFetch(rental);
        // Update room status
        await this.req.query<Room>(Room, trx).skipUndefined().patchAndFetchById(idRoom, { status: IRoom.StatusEnum.RENTED });
        await trx.commit();
        return {
            messages: [
                {
                    text: `Gracias ${user.name} ${user.lastname} por rentar la sala: ${room.number}`,
                    quick_replies: [
                        {
                            title: 'Regresar al menu',
                            block_names: ['Menu']
                        },
                        {
                            title: 'Ver más salas',
                            block_names: ['Mostrar salas']
                        }
                    ]
                }
            ]
        }
    }

    async _returnRoom(trx, idRoom: number, rental: Rental, user: User) {
        // Check if room is rented
        let room = await this.req.query<Room>(Room, trx).skipUndefined().findById(idRoom);
        if (room == null || room.status != IRoom.StatusEnum.RENTED) {
            return {
                messages: [
                    {
                        text: `La sala no está rentada`,
                        quick_replies: [
                            {
                                title: 'Regresar al menu',
                                block_names: ['Menu']
                            },
                            {
                                title: 'Ver más salas',
                                block_names: ['Mostrar salas']
                            }
                        ]
                    }
                ]
            }
        }
        // Check if room is rented by the user
        let prevRental = await this.req.query<Rental>(Rental, trx).skipUndefined().findOne({ fkRoom: idRoom, fkUser: user.idUser, type: IRental.TypeEnum.RENT });
        if (prevRental == null) {
            return {
                messages: [
                    {
                        text: `La sala se encuentra rentada por alguien más`,
                        quick_replies: [
                            {
                                title: 'Regresar al menu',
                                block_names: ['Menu']
                            },
                            {
                                title: 'Ver más salas',
                                block_names: ['Mostrar salas']
                            }
                        ]
                    }
                ]
            }
        }
        // Update rental
        await this.req.query<Rental>(Rental, trx).skipUndefined().patchAndFetchById(prevRental.idRental, { type: IRental.TypeEnum.RETURN });
        // Update room status
        await this.req.query<Room>(Room, trx).skipUndefined().patchAndFetchById(idRoom, { status: IRoom.StatusEnum.AVAILABLE });
        await trx.commit();
        return {
            messages: [
                {
                    text: `Gracias ${user.name} ${user.lastname} por regresar la sala: ${room.number}`,
                    quick_replies: [
                        {
                            title: 'Regresar al menu',
                            block_names: ['Menu']
                        },
                        {
                            title: 'Ver más salas',
                            block_names: ['Mostrar salas']
                        }
                    ]
                }
            ]
        }
    }

    /**
    * rent/return/reserve a book
    * This will rent/return/reserve the library book with the provided [idBook]
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idBook id of the book to rent/return/reserve 
    * @param { string } fbUserId id of the fb user that is chatting with chatbot
    * @param { Rental } rental  (optional)
    * @returns { Promise<> }
    **/
    async rentBook(idBook: number, fbUserId: string, rental?: Rental) {
        let trx = await transaction.start(this.req.tools.models.User.knex());
        try {
            let user = await this.req.query<User>(User, trx).skipUndefined().findOne({ fbUserId });
            if (user == null) {
                return {
                    messages: [
                        {
                            text: `No estás registrado, por favor registrate e intenta rentar el libro de nuevo`,
                            quick_replies: [
                                {
                                    title: 'Registrarme',
                                    block_names: ['Registro usuario']
                                }
                            ]
                        }
                    ]
                }
            }
            if (rental.type == IRental.TypeEnum.RENT) {
                return this._rentBook(trx, idBook, rental, user);
            } else {
                return this._returnBook(trx, idBook, rental, user)
            }

        } catch (error) {
            Logger.error(error);
            await trx.rollback();
            throw error;
        }
    }

    async _rentBook(trx, idBook: number, rental: Rental, user: User) {
        // Check if book is available
        let book = await this.req.query<Book>(Book, trx).skipUndefined().findById(idBook);
        if (book == null || book.status != IBook.StatusEnum.AVAILABLE) {
            return {
                messages: [
                    {
                        text: `El libro no está disponible, intentelo más tarde`,
                        quick_replies: [
                            {
                                title: 'Regresar al menu',
                                block_names: ['Menu']
                            },
                            {
                                title: 'Ver más libros',
                                block_names: ['Mostrar libros']
                            }
                        ]
                    }
                ]
            }
        }
        // Create rental
        rental.fkBook = idBook;
        rental.fkUser = user.idUser;
        delete rental.fkRoom;
        await this.req.query<Rental>(Rental, trx).skipUndefined().insertAndFetch(rental);
        // Update room status
        await this.req.query<Book>(Book, trx).skipUndefined().patchAndFetchById(idBook, { status: IBook.StatusEnum.RENTED });
        await trx.commit();
        return {
            messages: [
                {
                    text: `Gracias ${user.name} ${user.lastname} por rentar el libro: ${book.title}`,
                    quick_replies: [
                        {
                            title: 'Regresar al menu',
                            block_names: ['Menu']
                        },
                        {
                            title: 'Ver más libros',
                            block_names: ['Mostrar libros']
                        }
                    ]
                }
            ]
        }
    }

    async _returnBook(trx, idBook: number, rental: Rental, user: User) {
        // Check if book is rented
        let book = await this.req.query<Book>(Book, trx).skipUndefined().findById(idBook);
        if (book == null || book.status != IBook.StatusEnum.RENTED) {
            return {
                messages: [
                    {
                        text: `El libro no está rentado`,
                        quick_replies: [
                            {
                                title: 'Regresar al menu',
                                block_names: ['Menu']
                            },
                            {
                                title: 'Ver más libros',
                                block_names: ['Mostrar libros']
                            }
                        ]
                    }
                ]
            }
        }
        // Check if book is rented by the user
        let prevRental = await this.req.query<Rental>(Rental, trx).skipUndefined().findOne({ fkBook: idBook, fkUser: user.idUser, type: IRental.TypeEnum.RENT });
        if (prevRental == null) {
            return {
                messages: [
                    {
                        text: `El libro se encuentra rentado por alguien más`,
                        quick_replies: [
                            {
                                title: 'Regresar al menu',
                                block_names: ['Menu']
                            },
                            {
                                title: 'Ver más libros',
                                block_names: ['Mostrar libros']
                            }
                        ]
                    }
                ]
            }
        }
        // Update rental
        await this.req.query<Rental>(Rental, trx).skipUndefined().patchAndFetchById(prevRental.idRental, { type: IRental.TypeEnum.RETURN });
        // Update room status
        await this.req.query<Book>(Book, trx).skipUndefined().patchAndFetchById(idBook, { status: IBook.StatusEnum.AVAILABLE });
        await trx.commit();
        return {
            messages: [
                {
                    text: `Gracias ${user.name} ${user.lastname} por regresar el libro: ${book.title}`,
                    quick_replies: [
                        {
                            title: 'Regresar al menu',
                            block_names: ['Menu']
                        },
                        {
                            title: 'Ver más libros',
                            block_names: ['Mostrar libros']
                        }
                    ]
                }
            ]
        }
    }

    /**
    * gets the book rentals of a specific user
    * This will return a collection of book rentals from an specific user that matches the specific [fbUserId]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { string } fbUserId fbUserId of the searched user 
    * @returns { Promise<> }
    **/
    async getBookRentals(fbUserId: string) {
        try {
            let user = await this.req.query<User>(User).skipUndefined().findOne({ fbUserId });
            if (user == null) {
                return {
                    messages: [
                        {
                            text: `No podemos ver tus rentas porque no estas registrado, por favor registrate e intenta rentar el libro de nuevo`,
                            quick_replies: [
                                {
                                    title: 'Registrarme',
                                    block_names: ['Registro usuario']
                                }
                            ]
                        }
                    ]
                }
            }
            let query = this.req.query<Rental>(Rental).skipUndefined();
            query = query.where({ fkUser: user.idUser, type: IRental.TypeEnum.RENT }).andWhere('fkBook', '>', '0').eager('[book]');
            let res = await query.page(0, 10);
            if (res == null || res.results == null || res.results.length == 0) {
                return {
                    messages: [
                        {
                            text: 'No tienes ningún libro rentado',
                            quick_replies: [
                                {
                                    title: 'Rentar libros',
                                    block_names: ['Mostrar libros']
                                }
                            ]
                        }
                    ]
                }
            }
            return new RentalCollection(res).toView();
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    /**
    * gets the room rentals of a specific user
    * This will return a collection of room rentals from an specific user that matches the specific [fbUserId]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { string } fbUserId fbUserId of the searched user 
    * @returns { Promise<> }
    **/
    async getRoomRentals(fbUserId: string) {
        try {
            let user = await this.req.query<User>(User).skipUndefined().findOne({ fbUserId });
            if (user == null) {
                return {
                    messages: [
                        {
                            text: `No podemos ver tus rentas porque no estas registrado, por favor registrate e intenta rentar el libro de nuevo`,
                            quick_replies: [
                                {
                                    title: 'Registrarme',
                                    block_names: ['Registro usuario']
                                }
                            ]
                        }
                    ]
                }
            }
            let query = this.req.query<Rental>(Rental).skipUndefined();
            query = query.where({ fkUser: user.idUser, type: IRental.TypeEnum.RENT }).andWhere('fkRoom', '>', '0').eager('[room]');
            let res = await query.page(0, 10);
            if (res == null || res.results == null || res.results.length == 0) {
                return {
                    messages: [
                        {
                            text: 'No tienes ninguna sala rentada',
                            quick_replies: [
                                {
                                    title: 'Rentar salas',
                                    block_names: ['Mostrar salas']
                                }
                            ]
                        }
                    ]
                }
            }
            return new RentalCollection(res).toView();
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

}