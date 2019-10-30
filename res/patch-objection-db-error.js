const fs = require('fs');
const path = require('path');
const files = [
    '../../node_modules/db-errors/lib/parsers/mssql/DBError/ForeignKeyViolationError/parser.js',
    '../../node_modules/db-errors/lib/parsers/mysql/DBError/ConstraintViolationError/ForeignKeyViolationError/parser.js',
    '../../node_modules/db-errors/lib/parsers/postgres/DBError/ConstraintViolationError/ForeignKeyViolationError/parser.js',
    '../../node_modules/db-errors/lib/parsers/sqlite/DBError/ConstraintViolationError/ForeignKeyViolationError/parser.js'
];
function patch(f) {
    fs.readFile(f, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let result = data.replace(/\\\)\\\)/g, "\\\)");

        fs.writeFile(f, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

for(let file of files){
    patch(path.resolve(__filename, file));
}