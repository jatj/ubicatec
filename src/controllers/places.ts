import { API } from '@conectasystems/tools';
import { PlacesService } from '../services/places';
import { UbicaTecAPIModels } from '../models';

/**
 * get all the places
 * This returns all the places of the campus.
 * If optional filters in query are provided it will filter by those fields.
 * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the list of places and return the 
 * [pageIndex] chunk of places. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
 * 
 **/
export const listPlaces: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var orderBy = req.swagger.params['orderBy'].value;
    var orderMode = req.swagger.params['orderMode'].value;
    var pageIndex = req.swagger.params['pageIndex'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    var nearbyLng = req.swagger.params['nearbyLng'].value;
    var nearbyLat = req.swagger.params['nearbyLat'].value;
    var name = req.swagger.params['name'].value;
    try{
        let result = await PlacesService.listPlaces(req, orderBy, orderMode, pageIndex, pageSize, nearbyLng, nearbyLat, name);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * gets an specific place
 * This will return the place that matches with the provided [idPlace]
 **/
export const getPlace: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idPlace = req.swagger.params['idPlace'].value;
    try{
        let result = await PlacesService.getPlace(req, idPlace);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
