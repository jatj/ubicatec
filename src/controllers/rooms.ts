import { API } from '@conectasystems/tools';
import { RoomsService } from '../services/rooms';
import { UbicaTecAPIModels } from '../models';

/**
 * get all the rooms
 * This returns all the rooms of the campus library. 
 * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the 
 * list of rooms and return the [pageIndex] chunk of rooms. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
 * 
 **/
export const listRooms: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var orderBy = req.swagger.params['orderBy'].value;
    var orderMode = req.swagger.params['orderMode'].value;
    var pageIndex = req.swagger.params['pageIndex'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    var roomStatus = req.swagger.params['roomStatus'].value;
    var category = req.swagger.params['category'].value;
    var name = req.swagger.params['name'].value;
    try{
        let result = await RoomsService.listRooms(req, orderBy, orderMode, pageIndex, pageSize, roomStatus, category, name);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * gets an specific room
 * This will return the room that matches with the provided [idRoom]
 **/
export const getRoom: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idRoom = req.swagger.params['idRoom'].value;
    try{
        let result = await RoomsService.getRoom(req, idRoom);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
