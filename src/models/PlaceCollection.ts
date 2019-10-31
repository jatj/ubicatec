/**
 * PlaceCollection
 * Stores multiple PlaceSummaries
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Place from './Place';

export interface IPlaceCollection {
    results: Place[];
    total: number;
}


export default class PlaceCollection implements IPlaceCollection {
    results: Place[];
    total: number;

    constructor(obj?: IPlaceCollection) {

        if (obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

    toView(): PlacesView {
        return new PlacesView(this.results);
    }

}

export class PlacesView {
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
    constructor(places: Place[]) {
        let placeViews = [];
        for (let place of places) {
            let placeView = {
                title: place.name,
                image_url: 'https://www.gstatic.com/webp/gallery/1.sm.jpg',
                subtitle: place.description,
                buttons: [
                    {
                        type: 'web_url',
                        url: `https://www.google.com/maps/place/${place.fence.coordinates[0][0][1]},${place.fence.coordinates[0][0][0]}`,
                        title: 'Ir'
                    }
                ]
            }
            placeViews.push(placeView);
        }
        this.messages = [
            {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        image_aspect_ratio: 'square',
                        elements: placeViews
                    }
                }
            }
        ]
    }
}

export { PlaceCollection }