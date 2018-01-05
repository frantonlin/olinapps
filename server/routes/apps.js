var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET apps */
router.get('/', (req, res, next) => {
  let data = {};
  const query =
   `SELECT apps.*, sections.name as section
    FROM apps
    JOIN sections ON apps.section_id=sections.section_id
    ORDER BY sort_name;`;
  db.many(query)
  .then(apps => {
    data.apps = apps;

    const query = `SELECT name FROM sections ORDER BY position;`;
    return db.many(query);
  })
  .then(sections => {
    data.sections = sections;
    res.json(200, data);
  })
  .catch(error => {
    err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  });
});

/* GET apps/:id */
router.get('/:id', (req, res, next) => {

});

/* POST apps */
router.post('/', (req, res, next) => {

});

/* PUT apps/:id */
router.put('/:id', (req, res, next) => {

});

/* DELETE apps/:id */
router.delete('/:id', (req, res, next) => {

});

module.exports = router;
