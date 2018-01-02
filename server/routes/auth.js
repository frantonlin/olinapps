var express = require('express');
var passport = require('passport')
var router = express.Router();

/* GET login */
router.get('/login', (req, res, next) => {
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
    if (!user) { return res.json(info); }

    req.logIn(user, err => {
      if (err) { return next(err); }
      if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
        req.session.cookie.expires = false;
      }
      const info = {
        statusCode: 200,
        user: user,
      }
      res.json(info);
    });
  })(req, res, next)
});

/* POST logout */
router.post('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy(function (err) {
      if (err) { return next(err); }
      res.json({message: 'success'});
    });
  } else {
    res.json(400, {error: 'already logged out'});
  }
});

module.exports = router;
