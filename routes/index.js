var express = require('express');
var roulette = require('../lib/roulette');
var router = express.Router();

var mongodbConnection = 'mongodb://localhost/roulette';

router.get('/', function(req, res, next) {
  var key = req.query.key;

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var list = roulette.list({phone: new RegExp(key)});
  list.then(function(doc) {
    res.render('index', { invitees: doc , key: key});
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

router.get('/lucky', function(req, res, next) {

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var list = roulette.list({isWinner: true});
  list.then(function(doc) {
    res.render('lucky', { invitees: doc});
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

router.get('/lottery', function (req, res, next) {

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var list = roulette.list({isCheckedIn: true, isWinner: false});
  list.then(function(doc) {
    res.render('lottery',{data: doc});
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

router.get('/check', function(req, res, next){
  var phone = req.query.phone;

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var inviteePromise = roulette.update(phone, {isCheckedIn: true});
  inviteePromise.then(function(doc) {
    res.redirect('/?key=' + doc.phone)
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

router.get('/create', function (req, res,next) {
  res.render('create');
})

router.post('/create', function (req, res, next) {
  var name = req.body.name,
      phone = req.body.phone;

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var inviteePromise = roulette.generate({
    name : name,
    phone: phone
  });
  inviteePromise.then(function(doc) {
    res.redirect('/?key=' + doc.phone)
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

module.exports = router;
