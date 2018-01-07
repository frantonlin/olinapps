var pgp = require('pg-promise')();
const connection = {
  host: 'localhost',
  port: 5432,
  database: [process.env.DB_NAME],
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(connection);

module.exports = db;
