import { injectable } from "tsyringe";
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels, Room } from '../models';

/**
 * Provides endpoints to search and get and search library rooms
 */
@injectable()
export class RoomsService {
    req: API.IServerRequest<UbicaTecAPIModels>;

    constructor() { }

    init(req: API.IServerRequest<UbicaTecAPIModels>) {
        this.req = req;
    }
    
    /**
    * get all the rooms
    * This returns all the rooms of the campus library. 
    * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the 
    * list of rooms and return the [pageIndex] chunk of rooms. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { 'name' | 'category' } orderBy Field to order by the query (optional)
    * @param { 'ASC' | 'DESC' } orderMode Mode to order elements, orderBy has to be specified default is set to asc (optional)
    * @param { number } pageIndex Index of the page to be withdrawn by the API (optional)
    * @param { number } pageSize Size of the chunks of data requested (optional)
    * @param { 'AVAILABLE' | 'RENTED' | 'RESERVED' } roomStatus roomStatus for filter the rooms (optional)
    * @param { string } category category for filter the rooms (optional)
    * @param { string } name name for filter the rooms (optional)
    * @returns { Promise<> }
    **/
    async listRooms (orderBy?: 'name' | 'category', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, roomStatus?: 'AVAILABLE' | 'RENTED' | 'RESERVED', name?: string) {
        try{
            let query = this.req.query<Room>(Room).skipUndefined();
            query = (name) ? query.where('name', 'like', `%${name}%`) : query;
            query = (roomStatus) ? query : query.where({ roomStatus });
            query = (orderBy) ? query.orderBy(orderBy, orderMode || API.Defaults.orderMode) : query;
            query = (!orderBy) ? query.orderBy('idRoom', orderMode || API.Defaults.orderMode) : query;
            return Utils.collectionType<Room>(await query.page(pageIndex || API.Defaults.pageIndex, pageSize || API.Defaults.pageSize), Room);
        }catch(error){
            throw error;
        }
    }

    /**
    * gets an specific room
    * This will return the room that matches with the provided [idRoom]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idRoom idRoom of the searched room 
    * @returns { Promise<> }
    **/
    async getRoom (idRoom: number) {
        try{
            let query = this.req.query<Room>(Room).skipUndefined();
            const room = await query.findById(idRoom);
            if (room == null)
                throw new API.Error(API.Response.NOT_FOUND, 'La sala no existe');
            return room;
        }catch(error){
            throw error;
        }
    }

}