var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET apps */
router.get('/', (req, res, next) => {
  db.any('SELECT * FROM apps')
  .then(data => {
    res.json(200, data);
  })
  .catch(error => {
    return next(error);
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
