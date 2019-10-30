import { Logger, Utils, DB } from '@conectasystems/tools';
Utils.setupEnvironment(__dirname);

export var development = function(){
    return {
        client: 'pg',
        useNullAsDefault: true,
        connection: `postgresql://localhost/${process.env.DB_NAME}`
    };
}();

export var testing = DB.Manager.defaultTesting();

export var production = DB.Manager.defaultProduction();     