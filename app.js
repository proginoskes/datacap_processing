var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//var indexRouter = require('./routes/index');

var app = express();

const db = require('./models');
const api = require('./controllers/api')

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use('/', indexRouter);


/* api entrypoints */

// GET
app.get('/processor', api.processors.retrieve);
app.get('/transaction', api.transactions.retrieve);

// POST
app.post('/transaction', api.transactions.create);

// DELETE
app.delete('/transaction', api.transactions.delete);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
