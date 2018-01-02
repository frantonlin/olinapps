#!/usr/bin/env node

var defaultApps = require('./defaultApps');
var db = require('../db');
const pgp = db.$config.pgp;

const columnSet = new pgp.helpers.ColumnSet(
  ['name', 'url', 'img_url', 'type', 'intranet', 'keywords'],
  {table: 'apps'});
const query = pgp.helpers.insert(defaultApps, columnSet);

console.log('Inserting Default Apps...');
db.none(query)
.then(() => {
  console.log('Success!');
  process.exit();
})
.catch(error => {
  console.log(error);
  process.exit();
});
