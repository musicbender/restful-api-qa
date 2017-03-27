'use strict'

const mongoose = require('mongoose');

mongose.connect('mongodb://localhost27017/sandbox');

const db = mongoose.connection;

db.on('error', function(err) {
  console.error('connection error: ' + err);
});

db.once('open', function() {
  console.log('db connection successful');

  var Schema = mongoose.Schema;
  var AnimalSchema =  new Schema({
    type:  {type: String, default: "goldfish"},
    size:  {type: String, default: "small"},
    color: {type: String, default: "golden"},
    mass:  {type: Number, default: 0.007},
    name:  {type: String, default: "Gloria"}
  });

  const Animal = mongoose.model('Animal', AnimalSchema);

  const elephant = new Animal({
    type: "elephant",
    size: "big",
    color: "gray",
    mass: 6000,
    name: "Lawrence"
  });

  elephant.save(function(err) {
    if (err) {
      console.log('Save failed ' + err);
    } else {
      console.log('saved');
      db.close();
    }


  });
});
