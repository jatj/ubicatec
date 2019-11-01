/**
 * RoomCollection
 * Stores multiple Rooms
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */
import Room from './Room';
import { IRoom, IRental } from '.';

export interface IRoomCollection {
    results: Room[];
    total: number;
}


export default class RoomCollection implements IRoomCollection {
    results: Room[];
    total: number;

    constructor(obj?: IRoomCollection) {

        if (obj == null) return;
        this.results = obj.results;
        this.total = obj.total;
    }

    toView(): RoomsView {
        return new RoomsView(this.results);
    }

}

export class RoomsView {
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
    constructor(rooms: Room[]) {
        let roomViews = [];
        for (let room of rooms) {
            let buttons;
            if(room.status == IRoom.StatusEnum.AVAILABLE){
                buttons = [
                    {
                        type: 'show_block',
                        block_names: ["Rentar sala"],
                        title: 'Rentar',
                        set_attributes: {
                            fkRoom: room.idRoom,
                            roomNumber: room.number,
                            rentalType: IRental.TypeEnum.RENT
                        },
                    }
                ]
            } else if(room.status == IRoom.StatusEnum.RENTED && room.isRenter) {
                buttons = [
                    {
                        type: 'show_block',
                        block_names: ["Regresar sala"],
                        title: 'Regresar',
                        set_attributes: {
                            fkRoom: room.idRoom,
                            roomNumber: room.number,
                            rentalType: IRental.TypeEnum.RETURN
                        },
                    }
                ]
            }
            let roomView = {
                title: `Sala: ${room.number}`,
                image_url: room.image,
                subtitle: `${RoomsView.getStatus(room.status)}`,
                buttons
            }
            roomViews.push(roomView);
        }
        this.messages = [
            {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        image_aspect_ratio: 'square',
                        elements: roomViews
                    }
                }
            }
        ]
    }

    static getStatus(status: IRoom.StatusEnum) {
        switch (status) {
            case 'AVAILABLE':
                return 'Disponible';
            case 'RESERVED':
                return 'Reservada';
            case 'RENTED':
                return 'Ocupada';
        }
    }
}

export { RoomCollection }