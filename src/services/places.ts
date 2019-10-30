import { injectable } from "tsyringe";
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels, Place } from '../models';

/**
 * Provides endpoints to navigate and search places inside the campus
 */
@injectable()
export class PlacesService {
    req: API.IServerRequest<UbicaTecAPIModels>;

    constructor() { }

    init(req: API.IServerRequest<UbicaTecAPIModels>) {
        this.req = req;
    }

    /**
    * get all the places
    * This returns all the places of the campus.
    * If optional filters in query are provided it will filter by those fields.
    * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the list of places and return the 
    * [pageIndex] chunk of places. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { 'name' | 'nearby' } orderBy Field to order by the query (optional)
    * @param { 'ASC' | 'DESC' } orderMode Mode to order elements, orderBy has to be specified default is set to asc (optional)
    * @param { number } pageIndex Index of the page to be withdrawn by the API (optional)
    * @param { number } pageSize Size of the chunks of data requested (optional)
    * @param { number } nearbyLng longitude of the coordinate to get places nearby (optional)
    * @param { number } nearbyLat latitude of the coordinate to get places nearby (optional)
    * @param { string } name name for filter the places (optional)
    * @returns { Promise<> }
    **/
    async listPlaces (orderBy?: 'name' | 'nearby', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, nearbyLng?: number, nearbyLat?: number, name?: string) {
        try{
            var places;
            if (pageIndex != null && pageSize != null){
                places = await this.req.query<Place>(Place)
                .skipUndefined()
                .page(pageIndex, pageSize);
                return places;
            }
            places = await this.req.query<Place>(Place)
            .skipUndefined()
            return places;
        }catch(error){
            throw error;
        }
    }

    /**
    * gets an specific place
    * This will return the place that matches with the provided [idPlace]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idPlace idPlace of the searched place 
    * @returns { Promise<> }
    **/
    async getPlace (idPlace: number) {
        try{
            const place = await this.req.query<Place>(Place).findById(idPlace)
            return place;
        }catch(error){
            throw error;
        }
    }

}