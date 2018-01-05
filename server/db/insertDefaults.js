#!/usr/bin/env node

require('dotenv').config({path: __dirname+'/../.env'});
var defaultApps = require('./defaultApps');
var db = require('../db');
const pgp = db.$config.pgp;

const padPrint = (str) => {
  process.stdout.write(str.padEnd(40, '.'));
}

console.log('INSERTING DEFAULTS');

padPrint('INSERT INTO sections');
const columnSet = new pgp.helpers.ColumnSet(['name', 'position'], {table: 'sections'});
sectionPositions = {
  Forms: 1,
  Organizations:2,
  Resources:3,
  Portals:4,
  Clubs:5,
  Departments:6,
  Schools:7
};
const defaultSections = Object.entries(sectionPositions).map(([name, position]) => {
  return {name, position};
});
const query = pgp.helpers.insert(defaultSections, columnSet);
db.none(query)
.then(() => {
  console.log('Success');

  padPrint('INSERT INTO apps');
  const columnSet = new pgp.helpers.ColumnSet(
    ['name', 'url', 'img_url', 'sort_name', 'color', 'intranet', 'keywords', 'section_id'],
    {table: 'apps'});
  const defaultAppsSections = defaultApps.map(app => {
    return {...app, section_id: sectionPositions[app.section]};
  });
  const query = pgp.helpers.insert(defaultAppsSections, columnSet);
  return db.none(query);
})
.then(() => {
  console.log('Success');
})
.catch(error => {
  throw error
});
