var express = require('express');
var router = express.Router();
var roulette = require('../lib/roulette');
var filter = require('../lib/filter');

router.get('/', filter.isAuthenticated, function (req, res, next) {

  var list = roulette.list({isAllowedToDraw: true, isCheckedIn: true, isWinner: false});
  list.then(function(doc) {
    res.render('lottery/index',{data: doc});
  }, function(error) {
    if (error) {
      next(error);
    }
  });
});

router.post('/win', filter.isAuthenticated, function(req, res, next){
  var id = req.body.id;
  var reward = req.body.reward;

  var inviteePromise = roulette.update({_id: id}, {isWinner: true, reward: reward});
  inviteePromise.then(function(doc) {
    res.send(doc);
  }, function(error) {
    if (error) {
      next(error);
    }
  });

});

router.get('/update', filter.isAuthenticated, function (req, res, next) {

  var list = roulette.list({isAllowedToDraw: true, isCheckedIn: true, isWinner: false});
  list.then(function(doc) {
    res.send(doc);
  }, function(error) {
    if (error) {
      next(error);
    }
  });
});

module.exports = router;
