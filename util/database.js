const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "nodejs",
    password: "vinayarva1306",
    port:2000,
});

module.exports = pool.promise();