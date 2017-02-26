'use strict'

const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes/routes');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

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
