import { APIResponse, IAPIResponse } from './APIResponse'
import { User, IUser } from './User'
import { UserCollection, IUserCollection } from './UserCollection'
import { Place, IPlace } from './Place'
import { PlaceCollection, IPlaceCollection } from './PlaceCollection'
import { Book, IBook } from './Book'
import { BookCollection, IBookCollection } from './BookCollection'
import { Room, IRoom } from './Room'
import { RoomCollection, IRoomCollection } from './RoomCollection'
import { Rental, IRental } from './Rental'
import { RentalCollection, IRentalCollection } from './RentalCollection'

export { 
    APIResponse, IAPIResponse,
    User, IUser,
    UserCollection, IUserCollection,
    Place, IPlace,
    PlaceCollection, IPlaceCollection,
    Book, IBook,
    BookCollection, IBookCollection,
    Room, IRoom,
    RoomCollection, IRoomCollection,
    Rental, IRental,
    RentalCollection, IRentalCollection,
}

export interface UbicaTecAPIModels {
    User: typeof User,
    Place: typeof Place,
    Book: typeof Book,
    Room: typeof Room,
    Rental: typeof Rental,
    
}
export const UbicaTecAPIModels: UbicaTecAPIModels = {
    User,
    Place,
    Book,
    Room,
    Rental,
     
}