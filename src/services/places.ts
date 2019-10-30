import { injectable } from "tsyringe";
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels, Place } from '../models';

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
        return `ST_Contains(ST_GeomFromGeoJSON(fence), ST_GeomFromGeoJSON('${JSON.stringify(point)}'))`;
    }

    static distanceTo(point): string {
        return `ST_Distance(ST_GeomFromGeoJSON(fence), ST_GeomFromGeoJSON('${JSON.stringify(point)}'), false)`;
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
    async listPlaces(orderBy?: 'name' | 'nearby', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, nearbyLng?: number, nearbyLat?: number, name?: string) {
        try {
            let nearbyPoint = this.getPoint(nearbyLat, nearbyLng);
            if (nearbyPoint != null) {
                // Filter nearby places
                let result = await this.req.tools.models.Place.raw(`SELECT *, ${PlacesService.distanceTo(nearbyPoint)} as distance FROM "Place" ORDER BY distance`);
                let places: Array<Place> = [];
                for (let place of result.rows) {
                    places.push(place);
                }
                return Utils.collectionType<Place>({ results: places, total: places.length }, Place);
            } else {
                let query = this.req.query<Place>(Place).skipUndefined();
                query = (name) ? query.where('name', 'like', `%${name}%`) : query;
                query = (orderBy) ? query.orderBy(orderBy, orderMode || API.Defaults.orderMode) : query;
                query = (!orderBy) ? query.orderBy('idPlace', orderMode || API.Defaults.orderMode) : query;
                return Utils.collectionType<Place>(await query.page(pageIndex || API.Defaults.pageIndex, pageSize || API.Defaults.pageSize), Place);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
    * get the place that contains the lat and lng point
    * This returns the place that contains the lat and lng point if no place contains that point it will throw an exception
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } lat latitude of the coordinate to find the place 
    * @param { number } lng longitude of the coordinate to find the place 
    * @returns { Promise<> }
    **/
    async findPlace(lat: number, lng: number) {
        try {
            let point = this.getPoint(lat, lng);
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

    getPoint(lat: number, lng: number): Point {
        if (lat == null || lng == null) {
            return null;
        }
        return {
            type: 'Point',
            coordinates: [lng, lat]
        }
    }

}