/**
 * APIResponse
 *
 * UbicaTec API version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 */

export interface IAPIResponse { 
    responseCode: number;
    type: IAPIResponse.TypeEnum;
    message: string;
    extra?: any;
    debugMessage?: any;
}

export namespace IAPIResponse {
    export type TypeEnum = 'ERROR' | 'SUCCESS';
    export const TypeEnum = {
        ERROR: 'ERROR' as TypeEnum,
        SUCCESS: 'SUCCESS' as TypeEnum,
    }
}

export default class APIResponse implements IAPIResponse { 
    responseCode: number;
    type: IAPIResponse.TypeEnum;
    message: string;
    extra?: any;
    debugMessage?: any;

    constructor(obj?: IAPIResponse){
        
        if(obj == null) return;
        this.responseCode = obj.responseCode;
        this.type = obj.type;
        this.message = obj.message;
        this.extra = obj.extra;
        this.debugMessage = obj.debugMessage;
    }

}

export { APIResponse }