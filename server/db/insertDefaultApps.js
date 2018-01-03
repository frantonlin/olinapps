#!/usr/bin/env node

require('dotenv').config({path: __dirname+'/../.env'});
var defaultApps = require('./defaultApps');
var db = require('../db');
const pgp = db.$config.pgp;

const columnSet = new pgp.helpers.ColumnSet(
  ['name', 'url', 'img_url', 'letter', 'color', 'type', 'intranet', 'keywords'],
  {table: 'apps'});
const query = pgp.helpers.insert(defaultApps, columnSet);

console.log('Inserting Default Apps...');
db.none(query)
.then(() => {
  console.log('Success!');
})
.catch(error => {
  throw error
});
