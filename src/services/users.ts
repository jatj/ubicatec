import { injectable } from "tsyringe";
import { API, Types, Utils, Logger } from '@conectasystems/tools';
import { UbicaTecAPIModels, User } from '../models';
import { transaction } from "objection";
import { OcrService, CredentialDetails } from "../utils/ocrService";

/**
 * Provides endpoints to authenticate users
 */
@injectable()
export class UsersService {
    req: API.IServerRequest<UbicaTecAPIModels>;
    private readonly chatbotId = '5db87cef0dd4ac000108ac01';
    private readonly chatbotToken = 'mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD';

    constructor() { }

    init(req: API.IServerRequest<UbicaTecAPIModels>) {
        this.req = req;
    }

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
    async listUsers(orderBy?: 'name' | 'lastname' | 'email' | 'username', orderMode?: 'ASC' | 'DESC', pageIndex?: number, pageSize?: number, studentNumber?: string, fbUserId?: string, lastname?: string, name?: string) {
        try {
            let query = this.req.query<User>(User).skipUndefined();
            query = (name) ? query.where('name', 'like', `%${name}%`) : query;
            query = (lastname) ? query.where('lastname', 'like', `%${lastname}%`) : query;
            query = (studentNumber) ? query.where('studentNumber', 'like', `%${studentNumber}%`) : query;
            query = (fbUserId) ? query.where('fbUserId', 'like', `%${fbUserId}%`) : query;
            query = (orderBy) ? query.orderBy(orderBy, orderMode || API.Defaults.orderMode) : query;
            query = (!orderBy) ? query.orderBy('idUser', orderMode || API.Defaults.orderMode) : query;
            return Utils.collectionType<User>(await query.page(pageIndex || API.Defaults.pageIndex, pageSize || API.Defaults.pageSize), User);
        } catch (error) {
            throw error;
        }
    }

    /**
    * gets an specific user
    * This will return the user that matches with the provided [idUser]
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { number } idUser idUser of the searched user 
    * @returns { Promise<> }
    **/
    async getUser(idUser: number) {
        try {
            let query = this.req.query<User>(User).skipUndefined();
            const user = await query.findById(idUser);
            if (user == null)
                throw new API.Error(API.Response.NOT_FOUND, 'El usuario no existe');
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
    * creates a new user
    * This will create a new user with the provided data in newUser
    * @param { API.IServerRequest<UbicaTecAPIModels> } req request object from the client
    * @param { User } newUser User necessary data to create a new user (optional)
    * @returns { Promise<> }
    **/
    async createUser(newUser?: User) {
        let trx = await transaction.start(this.req.tools.models.User.knex());
        try {
            let fbUser = await this.req.query<User>(User, trx).findOne({ fbUserId: newUser.fbUserId });
            if (fbUser != null) {
                return {
                    messages: [
                        {
                            text: `Ya existes en nuestro sistema, estas registrado como ${fbUser.name} ${fbUser.lastname}`,
                            quick_replies: [
                                {
                                    title: 'Ir al menu',
                                    block_names: ['Menu']
                                }
                            ]
                        }
                    ]
                }
            }
            let validStudentNumber = newUser.studentNumber.match(/[AL](\d{8})/gi)
            if (!validStudentNumber || validStudentNumber.length <= 0) {
                return {
                    messages: [
                        {
                            text: `La matricula ${newUser.studentNumber} tiene un formato invalido, intenta de nuevo`,
                            quick_replies: [
                                {
                                    title: 'Intentar de nuevo',
                                    block_names: ['Registro usuario']
                                }
                            ]
                        }
                    ]
                }
            }
            let studentNumberUser = await this.req.query<User>(User, trx).findOne({ studentNumber: newUser.studentNumber });
            if (studentNumberUser != null) {
                return {
                    messages: [
                        {
                            text: `Ya existes en nuestro sistema, estas registrado como ${studentNumberUser.name} ${studentNumberUser.lastname}`,
                            quick_replies: [
                                {
                                    title: 'Ir al menu',
                                    block_names: ['Menu']
                                }
                            ]
                        }
                    ]
                }
            }
            let user = await this.req.query<User>(User, trx).insertAndFetch(newUser);

            await trx.commit();
            return {
                messages: [
                    {
                        text: `Gracias por registrarte ${user.name} ${user.lastname}`
                    }
                ]
            }
        } catch (error) {
            Logger.error(error);
            await trx.rollback();
            throw error;
        }
    }

    /**
    * parse the user credential
    * This will apply ocr to the user's credential
    * @param { credential } credential user credential link
    * * @param { fbUserId } fbUserId facebook id
    * @returns { Promise<> }
    **/
    async parseUser(credential?: string, fbUserId?: string) {
        try {
            OcrService.scanCredential(credential, async (credential: CredentialDetails) => {
                // Broadcast to chatbot
                await Utils.httpRequest({
                    method: 'POST',
                    url: `https://api.chatfuel.com/bots/${this.chatbotId}/users/${fbUserId}/send?chatfuel_token=${this.chatbotToken}&chatfuel_block_name=Confirma%20registro&studentName=${credential.name}&studentNumber=${credential.studentNumber}&studentProgram=${credential.program}`
                });
            });
            return {
                messages: [
                    {
                        text: `Estamos procesando tu credencial por favor espera...`,
                    }
                ]
            }

        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

}