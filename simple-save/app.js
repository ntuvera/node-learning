var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var errorhandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* Require Mongoose, duh */
var mongoose = require('mongoose');

var routes = require('./routes/index');
var app = express();

// app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Development Only
// if ('development' === app.get('env')) {
//   app.use(express.errorHandler());
//   mongoose.connect('localhost:27017/mydb');
// }

mongoose.connect('mongodb://localhost/mydb/testData');

app.get('/', function (req, res) {
  res.send('ok');
});

/* Create models for mongoose */
mongoose.model('users', {name: String});
/* Singular route for sake of tutorial */
// app.use('/', function (req, res) {
//   mongoose.model('users').find(function (users) {
//     res.send(users);
//   });
// });

app.get('/users', function (req, res) {
  mongoose.model('users').find(function (err, users) {
    res.send(users);
  });
})


// catch 404 and forward to error handler
app.use(function (next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
