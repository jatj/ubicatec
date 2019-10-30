import { Logger, Utils, DB } from '@conectasystems/tools';
Utils.setupEnvironment(__dirname);

export var development = DB.Manager.defaultDevelopment();

export var testing = DB.Manager.defaultTesting();

export var production = DB.Manager.defaultProduction();