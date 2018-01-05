#!/usr/bin/env node

require('dotenv').config({path: __dirname+'/../.env'});
var db = require('../db');
const pgp = db.$config.pgp;

const padPrint = (str) => {
  process.stdout.write(str.padEnd(40, '.'));
}

console.log('RESETTING TABLES');

padPrint('DROP TABLE IF EXISTS apps');
db.none('DROP TABLE IF EXISTS apps;')
.then(() => {
  console.log('Success');

  padPrint('CREATE TABLE apps');
  const createTable =
   `CREATE TABLE apps (
      app_id SERIAL PRIMARY KEY,
      name VARCHAR,
      url VARCHAR,
      img_url VARCHAR,
      sort_name VARCHAR,
      color CHAR(7),
      intranet BOOLEAN,
      keywords VARCHAR,
      section_id INT
    );`;
  return db.none(createTable);
})
.then(() => {
  console.log('Success');

  padPrint('DROP TABLE IF EXISTS sections');
  return db.none('DROP TABLE IF EXISTS sections;');
})
.then(() => {
  console.log('Success');

  padPrint('CREATE TABLE sections');
  const createTable =
   `CREATE TABLE sections (
      section_id SERIAL PRIMARY KEY,
      name VARCHAR,
      position INT
    );`;
  return db.none(createTable);
})
.then(() => {
  console.log('Success');
})
.catch(error => {
  console.log('Failure');
  throw error;
});
