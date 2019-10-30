const fs = require('fs');
const path = require('path');
const files = [
    '../../node_modules/@kubernetes/client-node/dist/log.d.ts'
];
function patch(f) {
    fs.readFile(f, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let result = data.replace("import { default as request } from 'request';", "import * as request from 'request';");

        fs.writeFile(f, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

for(let file of files){
    patch(path.resolve(__filename, file));
}