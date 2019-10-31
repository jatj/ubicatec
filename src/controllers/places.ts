import 'reflect-metadata';
import { container } from "tsyringe";
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
    var restrooms = req.swagger.params['restrooms'].value;
    var orderBy = req.swagger.params['orderBy'].value;
    var orderMode = req.swagger.params['orderMode'].value;
    var pageIndex = req.swagger.params['pageIndex'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    var nearby = req.swagger.params['nearby'].value;
    var name = req.swagger.params['name'].value;
    try{
        const placesService = container.resolve(PlacesService);
        placesService.init(req);
        let result = await placesService.listPlaces(restrooms, orderBy, orderMode, pageIndex, pageSize, nearby, name);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * get the place that contains the lat and lng point
 * This returns the place that contains the lat and lng point if no place contains that point it will throw an exception
 * 
 **/
export const findPlace: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var location = req.swagger.params['location'].value;
    try{
        const placesService = container.resolve(PlacesService);
        placesService.init(req);
        let result = await placesService.findPlace(location);
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
        const placesService = container.resolve(PlacesService);
        placesService.init(req);
        let result = await placesService.getPlace(idPlace);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
