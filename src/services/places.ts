import { injectable } from "tsyringe";
import { API, Types, Utils, Logger } from '@conectasystems/tools';
import { UbicaTecAPIModels, Place, PlaceCollection } from '../models';

export type Point = {
    type: string
    coordinates: [number, number]
}

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

    static contained(point): string {
        return `ST_Contains(ST_GeomFromGeoJSON(fence::TEXT), ST_GeomFromGeoJSON('${JSON.stringify(point)}'))`;
    }

    static distanceTo(point): string {
        return `ST_Distance(ST_GeomFromGeoJSON(fence::TEXT), ST_GeomFromGeoJSON('${JSON.stringify(point)}'), false)`;
    }

    /**
    * get all the places
    * This returns all the places of the campus.
    * If optional filters in query are provided it will filter by those fields.
    * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the list of places and return the 
    * [pageIndex] chunk of places. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { boolean } restrooms If it will show only restrooms (optional)
    * @param { 'name' | 'nearby' } orderBy Field to order by the query (optional)
    * @param { 'ASC' | 'DESC' } orderMode Mode to order elements, orderBy has to be specified default is set to asc (optional)
    * @param { number } pageIndex Index of the page to be withdrawn by the API (optional)
    * @param { number } pageSize Size of the chunks of data requested (optional)
    * @param { string } nearby google maps link to the location (optional)
    * @param { string } name name for filter the places (optional)
    * @returns { Promise<> }
    **/
    async listPlaces(restrooms?: boolean, orderBy?: 'name' | 'nearby', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, nearby?: string, name?: string) {
        try {
            let nearbyPoint = this.getPointFromURL(nearby);
            if (nearbyPoint != null) {
                // Filter nearby places
                let result: any;
                if(restrooms){
                    result = await this.req.tools.models.Place.raw(`SELECT *, ${PlacesService.distanceTo(nearbyPoint)} as distanceTo FROM "Place" WHERE "isRestroom" = true ORDER BY distanceTo LIMIT 10`);
                }else {
                    result = await this.req.tools.models.Place.raw(`SELECT *, ${PlacesService.distanceTo(nearbyPoint)} as distanceTo FROM "Place" ORDER BY distanceTo LIMIT 10`);
                }
                let places: Array<Place> = [];
                for (let place of result.rows) {
                    place.distanceTo = place.distanceto;
                    places.push(place);
                }
                return new PlaceCollection({ results: places, total: places.length }).toView();
            } else {
                let query = this.req.query<Place>(Place).skipUndefined();
                query = (name) ? query.where('name', 'like', `%${name}%`) : query;
                query = (restrooms) ? query.where({isRestroom: true}) : query;
                query = (orderBy) ? query.orderBy(orderBy, orderMode || API.Defaults.orderMode) : query;
                query = (!orderBy) ? query.orderBy('idPlace', orderMode || API.Defaults.orderMode) : query;
                return new PlaceCollection(await query.page(pageIndex || API.Defaults.pageIndex, pageSize || API.Defaults.pageSize)).toView();
            }
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    /**
    * get the place that contains the lat and lng point
    * This returns the place that contains the lat and lng point if no place contains that point it will throw an exception
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { string } location google maps link to the location 
    * @returns { Promise<> }
    **/
    async findPlace(location: string) {
        try {
            let point = this.getPointFromURL(location);
            if (point == null) 
                throw new API.Error(API.Response.BAD_REQUEST, 'La ubicación es requerida');

            let result = await this.req.tools.models.Place.raw(`SELECT * FROM "Place" WHERE ${PlacesService.contained(point)}`);
            let places: Array<Place> = [];
            for (let place of result.rows) {
                places.push(place);
            }

            if (places.length == 0) 
                throw new API.Error(API.Response.PRECONDITION_FAILED, 'La ubicación no se encuentra dentro de ningún lugar');
            return places[0];
        } catch (error) {
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
    async getPlace(idPlace: number) {
        try {
            let query = this.req.query<Place>(Place).skipUndefined();
            const place = await query.findById(idPlace);
            if (place == null)
                throw new API.Error(API.Response.NOT_FOUND, 'El lugar no existe');
            return place;
        } catch (error) {
            throw error;
        }
    }

    // -------- HELPERS

    getPoint(lat: number, lng: number): Point {
        if (lat == null || lng == null) {
            return null;
        }
        return {
            type: 'Point',
            coordinates: [lng, lat]
        }
    }

    getPointFromURL(url): Point{
        if(url == null) return null;
        let lat = url.match(/\/([\d\.]+),/gi)[0];
        if(lat == null) return null;
        lat = lat.substr(1,lat.length-2);
        let lng = url.match(/[,]([-\d \.]+)/gi)[0];
        if(lng == null) return null;
        lng = lng.substr(1);
        return this.getPoint(parseFloat(lat), parseFloat(lng));
    }

}