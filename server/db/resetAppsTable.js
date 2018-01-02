#!/usr/bin/env node

var db = require('../db');
const pgp = db.$config.pgp;

console.log('Resetting apps Table...');

db.none('DROP TABLE IF EXISTS apps;')
.then(data => {
  console.log('Dropped apps Table');
})
.catch(error => {
  console.log(error);
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
  db.none(createTable)
})
.then(data => {
  console.log('Created apps Table');
  process.exit();
})
.catch(error => {
  console.log(error);
  process.exit();
});
