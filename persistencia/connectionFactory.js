const mysql = require('mysql');

// Para acessar via terminal no MacOS: /usr/local/mysql/bin/mysql -u root -p, e logo depois digitar a senha sqlserver
function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sqlserver',
        database: 'payfast'
    });
}

module.exports = function() {
    return createDBConnection;
}