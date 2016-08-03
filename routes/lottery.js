var express = require('express');
var roulette = require('../lib/roulette');
var router = express.Router();

var mongodbConnection = 'mongodb://localhost/roulette';

router.get('/', function (req, res, next) {

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var list = roulette.list({isCheckedIn: true, isWinner: false});
  list.then(function(doc) {
    res.render('lottery/index',{data: doc});
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

module.exports = router;
