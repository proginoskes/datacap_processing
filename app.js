require('dotenv').config();

const createError = require('http-errors');
const express = require('express');

const path = require('path');
const logger = require('morgan');

var app = express();

const db = require('./models');
const api = require('./controllers/api')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* api entrypoints */

// GET
app.get('/processor', api.processors.retrieve);
app.get('/transaction', api.transactions.retrieve);

// POST
app.post('/transaction', api.transactions.create);

// DELETE
app.delete('/transaction', api.transactions.delete);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
});

module.exports = app;
