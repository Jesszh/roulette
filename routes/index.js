var express = require('express');
var roulette = require('../lib/roulette');
var router = express.Router();

var mongodbConnection = 'mongodb://localhost/roulette';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/checkin', function(req, res, next){
  var phone = req.query.phone;

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var inviteePromise = roulette.update(phone, {isCheckedIn: true});
  inviteePromise.then(function(doc) {
    res.send(doc);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

});


router.get('/win', function(req, res, next){
  var phone = req.query.phone;

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var inviteePromise = roulette.update(phone, {isWinner: true});
  inviteePromise.then(function(doc) {
    res.send(doc);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

});

router.get('/list',function (req, res, next) {

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var list = roulette.available();
  list.then(function(doc) {
    res.send(doc);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

router.get('/create', function (req, res, next) {
  var name = req.query.name,
      phone = req.query.phone;

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var inviteePromise = roulette.generate({
    name : name,
    phone: phone
  });
  inviteePromise.then(function(doc) {
    roulette.retrieve(doc.phone).then(function(result) {
      res.send(result);
    }, function(error) {
      if (error) {
        throw new Error(error);
      }
    });
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

module.exports = router;
