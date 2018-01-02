var pgp = require('pg-promise')();
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'olinapps_dev',
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(connection);

module.exports = db;
