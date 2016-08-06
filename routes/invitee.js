var express = require('express');
var router = express.Router();
var roulette = require('../lib/roulette');
var filter = require('../lib/filter');

router.get('/list', filter.isAuthenticated, function(req, res, next) {

  var key = req.query.key == undefined? '':req.query.key;

  var list = roulette.list({phone: new RegExp(key)});
  list.then(function(doc) {
    res.render('invitee/list', { invitees: doc , key: key});
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

router.get('/winner', filter.isAuthenticated, function(req, res, next) {

  var list = roulette.list({isWinner: true});
  list.then(function(doc) {
    res.render('invitee/winner', { invitees: doc});
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});


router.post('/check', filter.isAuthenticated, function(req, res, next){
  var id = req.body.id;

  var inviteePromise = roulette.update({_id:id}, {isCheckedIn: true, checkedInAt: Date.now()});
  inviteePromise.then(function(doc) {
    res.redirect('/invitee/' + doc._id)
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

});


router.post('/recall', filter.isAuthenticated, function(req, res, next){
  var id = req.body.id;

  var inviteePromise = roulette.update({_id: id}, {isCheckedIn: false, checkedInAt: null});
  inviteePromise.then(function(doc) {
    res.redirect('/invitee/' + doc._id)
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

});


router.get('/edit', filter.isAuthenticated, function (req, res,next) {
  if(req.query.id){
    var id = req.query.id;
    var invitee = roulette.retrieve({_id: id});
    invitee.then(function(doc) {
      res.render('invitee/edit', { invitee: doc});
    }, function(error){
      if (error) {
        throw new Error(error);
      }
    })
  }else{
    res.render('invitee/edit');
  }

})

router.post('/edit', filter.isAuthenticated, function (req, res, next) {
  var id = req.body.id;

  object = {
    name: req.body.name, 
    phone: req.body.phone, 
    role: req.body.role, 
    isAllowedToDraw: req.body.isAllowedToDraw, 
    remark: req.body.remark
  }

  if(id){

    var inviteePromise = roulette.update( {_id: id }, object );

    inviteePromise.then(function(doc) {
      res.redirect('/invitee/' + doc._id.toString())
    }, function(error) {
      if (error) {
        throw new Error(error);
      }
    });
    
  } else {

    var inviteePromise = roulette.generate(object);

    inviteePromise.then(function(doc) {
      res.redirect('/invitee/' + doc._id.toString())
    }, function(error) {
      if (error) {
        throw new Error(error);
      }
    });
  }
});

router.get('/:id', filter.isAuthenticated, function(req, res, next){
  var id = req.params.id;
  var invitee = roulette.retrieve({_id: id});
  invitee.then(function(doc) {
    res.render('invitee/index', { invitee: doc});
  }, function(error){
    if (error) {
      throw new Error(error);
    }
  })
});


module.exports = router;
