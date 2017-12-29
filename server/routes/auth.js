var express = require('express');
var passport = require('passport')
var router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({user: req.user});
  } else {
    res.json({user: null});
  } 
});

/* POST login */
router.post('/login', passport.authenticate('olin'),
  (req, res) => {
    res.json(req.user);
});

/* POST logout */
router.post('/logout', passport.authenticate('olin'),
  (req, res) => {
    req.logout();
});

module.exports = router;
