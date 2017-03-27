'use strict'

const express = require('express')
const router = express.Router();
const Question = require('./models').Question;

// GET /questions
router.get('/', function(req, res, next) {
  Question.find({}, null, {sort: (createdAt: -1}}, function(err, questions) {
    if(err) { return next(err); }
    res.json(questions);
  });
  res.json({response: "you sent a GET requestion!"});
});

router.post('/', function(req, res,next) {
  const question = new Question(req.body);
  question.save(function(err, question) {
    if(err) { return next(err); }
    res.status(201);
    res.json(question);
  });
  res.json({
    response: "You sent a POST request",
    body: req.body
  });
});

router.get('/:qID', function(req, res) {
  res.json({
    response: "You sent a GET for id " + req.params.id
  })
});

router.post('/:qID/answers', function(req, res) {
  res.json({
    response: "You sent a POST request to /answers",
    body: req.body
  });
});

router.put('/:qID/answers/:aID', function(req, res) {
  res.json({
    response: "You sent a PUT request to /answers id " + req.params.aID,
    body: req.body
  });
});

router.delete('/:qID/answers/:aID', function (req, res) {
  res.json({
    response: "You sent a DELETE request to /answers id",
    questionId: req.params.qID,
    answerId: req.params.aID
  });
});

router.post('/:qID/answers/:aID/vote-:dir', function() {
  if(req.params.dir.search(/^(up|down)$/) === -1) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
  }
}, function (req, res) {
  res.json({
    response: "You sent a POST request to /vote-" + req.params.dir,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
  });
});

module.exports = router;
