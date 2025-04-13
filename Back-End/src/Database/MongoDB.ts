var mysql = require('mongoose');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'dbTest',
    charset: 'utf8_general_ci'
});

module.exports = conn;