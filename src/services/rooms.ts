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
    async listRooms (orderBy?: 'name' | 'category', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, roomStatus?: 'AVAILABLE' | 'RENTED' | 'RESERVED', category?: string, name?: string) {
        try{
            var rooms;
            if (pageIndex != null && pageSize != null){
                rooms = await this.req.query<Room>(Room)
                .skipUndefined()
                .page(pageIndex, pageSize);
                return rooms;
            }
            rooms = await this.req.query<Room>(Room)
            .skipUndefined()
            return rooms;
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
            const room = await this.req.query<Room>(Room).findById(idRoom)
            return room;
        }catch(error){
            throw error;
        }
    }

}