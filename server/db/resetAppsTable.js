#!/usr/bin/env node

require('dotenv').config({path: __dirname+'/../.env'});
var db = require('../db');
const pgp = db.$config.pgp;

console.log('Resetting apps Table...');

db.none('DROP TABLE IF EXISTS apps;')
.then(data => {
  console.log('Dropped apps Table');
})
.catch(error => {
  throw error;
})
.then(() => {
  const createTable =
   `CREATE TABLE apps (
      app_id SERIAL PRIMARY KEY,
      name VARCHAR,
      url VARCHAR,
      img_url VARCHAR,
      type VARCHAR,
      intranet BOOLEAN,
      keywords VARCHAR
    );`
  return db.none(createTable)
})
.then(data => {
  console.log('Created apps Table');
})
.catch(error => {
  throw error;
});
