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
router.post('/login', (req, res, next) => {
  passport.authenticate('olin', (err, user, info) => {
    if (err) { return next(err); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
        req.session.cookie.expires = false;
      }
      return res.json(user);
    });
  })(req, res, next)
});

/* POST logout */
router.post('/logout', passport.authenticate('olin'),
  (req, res) => {
    req.logout();
});

module.exports = router;
