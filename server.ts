import * as express from 'express';
import * as swaggerTools from 'swagger-tools';
import * as jsyaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import { Utils, Logger, API, DB } from '@conectasystems/tools';
import { UbicaTecAPIModels } from './src/models';
import { development, production } from './knexfile';

async function InitializeServer() {
    const app = express();
    const serverPort = process.env.PORT;

    // Set manager configuration
    switch(process.env.DB_ENV as DB.Env){
        case 'DEVELOPMENT':
                DB.Manager.getInstance(null, development);
            break;
        case 'PRODUCTION':
                DB.Manager.getInstance(null, production);
            break;
    }

    // swaggerRouter configuration
    var options = {
        swaggerUi: path.join(__dirname, '/api.json'),
        controllers: path.join(__dirname, './src/controllers')
    };

    // Loads and resolves the swager api
    var apiSpec = API.Parse(jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, './res/ubica_tec.yaml'), 'utf8')));
    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(apiSpec, function (middleware) {

        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerMetadata());

        app.use(API.PreValidator);

        // Validate Swagger requests
        app.use(middleware.swaggerValidator({
            schema: apiSpec,
            validateRequest: true,
            validateResponse: false,
            allowNullable: true
        } as swaggerTools.SwaggerValidatorOptions));

        // Authenticate
        app.use(middleware.swaggerSecurity({
            APPToken: API.APPToken,
            OAuth2: API.OAuth2,
        }));

        // Configure request with user authentication
        app.use((req: API.IServerRequest<UbicaTecAPIModels>, res: API.IServerResponse, next: any) => {
            // Setup dbname configured
            let dbname: string;
            if (req.appInfo != null) {
                dbname = req.appInfo.dbname
            }
            API.ConfigureRequest(req, UbicaTecAPIModels, dbname);
            API.ConfigureResponse(res);
            next();
        });

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter(options));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi({
            apiDocs: `${process.env.DOCS}/api-docs`,
            swaggerUi: process.env.DOCS
        }));

        // Handle errors midleware
        app.use(API.ErrorHandler);

        // Start the server
        http.createServer(app).listen(serverPort, function () {
            Logger.info(`Your server is listening on port ${serverPort} (http://${process.env.HOST}:${serverPort})`);
        });

    });
}

Utils.setupEnvironment();

InitializeServer();