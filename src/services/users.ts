import { transaction } from 'objection';
import { API, Types, Utils } from '@conectasystems/tools';
import { UbicaTecAPIModels } from '../models';
import User from '../models/User';

/**
 * Provides endpoints to authenticate users
 */
export class UsersService {

    /**
    * get all the users
    * This returns all the active users of the ubicatec by default, can include the inactive ones if [inactive] is set to true. 
    * If optional filters in query are provided it will filter by name, lastname or email.
    * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the list of users and return the 
    * [pageIndex] chunk of users. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
    * 
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { 'name' | 'lastname' | 'email' | 'username' } orderBy Field to order by the query (optional)
    * @param { 'ASC' | 'DESC' } orderMode Mode to order elements, orderBy has to be specified default is set to asc (optional)
    * @param { number } pageIndex Index of the page to be withdrawn by the API (optional)
    * @param { number } pageSize Size of the chunks of data requested (optional)
    * @param { string } email email for filter the users (optional)
    * @param { string } lastname lastname for filter the users (optional)
    * @param { string } name name for filter the users (optional)
    * @param { boolean } inactive whether or not include inactive users (optional)
    * @returns { Promise<> }
    **/
    static async listUsers (req: API.IServerRequest<UbicaTecAPIModels>, orderBy?: 'name' | 'lastname' | 'email' | 'username', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, email?: string, lastname?: string, name?: string, inactive?: boolean) {
        try{
            var users;
            if (pageIndex != null && pageSize != null){
                users = await req.query<User>(User)
                .skipUndefined()
                .page(pageIndex, pageSize);
                return users;
            }
            users = await req.query<User>(User)
            .skipUndefined()
            return users;
        }catch(error){
            throw error;
        }
    }

    /**
    * gets an specific user
    * This will return the user that matches with the provided [idUser]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idUser idUser of the searched user 
    * @param { boolean } inactive whether or not include inactive users (optional)
    * @returns { Promise<> }
    **/
    static async getUser (req: API.IServerRequest<UbicaTecAPIModels>, idUser: number, inactive?: boolean) {
        try{
            const user = await req.query<User>(User).findById(idUser)
            return user;
        }catch(error){
            throw error;
        }
    }

    /**
    * creates a new user
    * This will create a new user with the provided data in rawUser
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { User } newUser User necessary data to create a new user (optional)
    * @returns { Promise<> }
    **/
    static async createUser (req: API.IServerRequest<UbicaTecAPIModels>, newUser?: User) {
        try{
            throw new API.Error(API.Response.UNHANDLED_ERROR, 'Not implemented');
        }catch(error){
            throw error;
        }
    }

}