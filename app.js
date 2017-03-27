'use strict'

const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes/routes');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

mongoose.connect('mongodb://admin:4Hkl9Ssc0Pp1S@ds121190.mlab.com:21190/question-answer');

const db = mongoose.connection;

db.on('error', function(err) {
  console.error('connection error: ' + err);
});

db.once('open', function() {
  console.log('db connection successful');
});

app.use('/questions', routes);

app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

//error handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, function(err) {
  console.log('server listening on port ' + port)
});
