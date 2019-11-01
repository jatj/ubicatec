import 'reflect-metadata';
import { container } from "tsyringe";
import { API } from '@conectasystems/tools';
import { UsersService } from '../services/users';
import { UbicaTecAPIModels } from '../models';

/**
 * get all the users
 * This returns all the active users of the ubicatec by default, can include the inactive ones if [inactive] is set to true. 
 * If optional filters in query are provided it will filter by name, lastname or email.
 * If [pageSize] and [pageIndex] are provided, the API will divide in chunks of size [pageSize] the list of users and return the 
 * [pageIndex] chunk of users. If paging parameters are not the default values are pageIndex = 0, pageSize = 100
 * 
 **/
export const listUsers: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var orderBy = req.swagger.params['orderBy'].value;
    var orderMode = req.swagger.params['orderMode'].value;
    var pageIndex = req.swagger.params['pageIndex'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    var studentNumber = req.swagger.params['studentNumber'].value;
    var fbUserId = req.swagger.params['fbUserId'].value;
    var lastname = req.swagger.params['lastname'].value;
    var name = req.swagger.params['name'].value;
    try{
        const usersService = container.resolve(UsersService);
        usersService.init(req);
        let result = await usersService.listUsers(orderBy, orderMode, pageIndex, pageSize, studentNumber, fbUserId, lastname, name);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * gets an specific user
 * This will return the user that matches with the provided [idUser]
 **/
export const getUser: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var idUser = req.swagger.params['idUser'].value;
    try{
        const usersService = container.resolve(UsersService);
        usersService.init(req);
        let result = await usersService.getUser(idUser);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
/**
 * creates a new user
 * This will create a new user with the provided data in rawUser
 **/
export const createUser: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var newUser = req.swagger.params['newUser'].value;
    try{
        const usersService = container.resolve(UsersService);
        usersService.init(req);
        let result = await usersService.createUser(newUser);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}

/**
 * parse the user credential
 * This will apply ocr to the user's credential
 **/
export const parseUser: API.NextHandleFunction<UbicaTecAPIModels> = async (req, res, next) => {
    var credential = req.swagger.params['credential'].value;
    var fbUserId = req.swagger.params['fbUserId'].value;
    try{
        const usersService = container.resolve(UsersService);
        usersService.init(req);
        let result = await usersService.parseUser(credential, fbUserId);
        res.respond(result);
    }catch (error) {
        next(error);
    }
}
