'use strict';

var Counter = require('../db/counter.js');

exports.generateId = function (name, callback) {
  Counter.findByIdAndUpdate(name, {
    $inc: { seq: 1 }
  }, {
    new: true,
    upsert: true
  }, function (err, counter) {
    if (err)
      return callback.call(this, err);

    callback.call(this, null, counter.seq, counter);
  });
};
