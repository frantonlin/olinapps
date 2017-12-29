var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./passport.js');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'cats are cool',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set true after setting up SSL/HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

var api = express.Router();
api.get('/', (req, res) => {
  res.json({ message: 'OlinApps API' });
});
app.use('/api', api);

var auth = require('./routes/auth');
app.use('/api', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
