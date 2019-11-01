/**
 * RentalCollection
 * Stores multiple Rentals
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Rental from './Rental';
import { IRental } from '.';
import { RoomsView } from './RoomCollection';
import { BooksView } from './BookCollection';

export interface IRentalCollection {
    results: Rental[];
    total: number;
}


export default class RentalCollection implements IRentalCollection {
    results: Rental[];
    total: number;

    constructor(obj?: IRentalCollection) {

        if (obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

    toView(): RentalsView {
        return new RentalsView(this.results);
    }
}

export class RentalsView {
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
    constructor(rentals: Rental[]) {
        let rentalViews = [];
        for (let rental of rentals) {
            let rentalView;
            if (rental.fkBook != null) {
                let buttons = [];
                if (rental.type == IRental.TypeEnum.RENT) {
                    buttons = [
                        {
                            type: 'show_block',
                            block_names: ["Regresar libro"],
                            title: 'Regresar',
                            set_attributes: {
                                fkBook: rental.fkBook,
                                rentalType: IRental.TypeEnum.RETURN
                            },
                        }
                    ]
                }
                rentalView = {
                    title: rental.book.title,
                    image_url: rental.book.image,
                    subtitle: `${rental.book.code} - ${BooksView.getStatus(rental.book.status)} - ${rental.book.description}`,
                    buttons
                }
            } else {
                let buttons = [];
                if (rental.type == IRental.TypeEnum.RENT) {
                    buttons = [
                        {
                            type: 'show_block',
                            block_names: ["Regresar sala"],
                            title: 'Regresar',
                            set_attributes: {
                                fkRoom: rental.fkRoom,
                                rentalType: IRental.TypeEnum.RENT
                            },
                        }
                    ]
                }
                rentalView = {
                    title: `Sala: ${rental.room.number}`,
                    image_url: rental.room.image,
                    subtitle: `${RoomsView.getStatus(rental.room.status)}`,
                    buttons
                }
            }

            rentalViews.push(rentalView);
        }
        this.messages = [
            {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        image_aspect_ratio: 'square',
                        elements: rentalViews
                    }
                }
            }
        ]
    }
}


export { RentalCollection }