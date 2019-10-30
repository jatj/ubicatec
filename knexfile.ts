import { Logger, Utils, DB } from '@conectasystems/tools';
Utils.setupEnvironment(__dirname);

export var development = function(){
    return {
        client: 'pg',
        useNullAsDefault: true,
        connection: `postgresql://${process.env.DB_HOST}/${process.env.DB_NAME}`
    };
}();

export var testing = DB.Manager.defaultTesting();

export var production = function(){
    return {
        client: 'pg',
        useNullAsDefault: true,
        connection: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    };
}();