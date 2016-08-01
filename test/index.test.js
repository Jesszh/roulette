
/**
 * @list dependencies
 */

var vows = require('vows')
  , assert = require('assert')
  , mongoose = require('mongoose')
  , roulette = require('../lib/roulette');

mongoose.set('debug', true);

/**
 * @description connect to mongodb
 */

roulette.connect('mongodb://localhost/roulette');

/**
 * @description add suites to vows
 */

vows.describe('general module tests').addBatch({

  'when instantiating roulette':{
    topic: function(){
      return roulette;
    },
    'short should be an object': function(topic) {
      assert.isObject(topic);
    }
  },

  'when creating a invitee and then retrieving it':{
    topic:function() {
      var context = this;
      var generatePromise = roulette.generate({ name : 'Bill', phone : '13800000000' });
      generatePromise.then(function(InviteeObject) {
        var phone = InviteeObject.phone
          , retrievePromise = roulette.retrieve(phone);
        retrievePromise.then(function(InviteeObject) {
          context.callback(null, InviteeObject);
        }, function(error) {
          context.callback(error, null);
        })
      }, function(error) {
        context.callback(error, null);
      });
    },
    'there should be no errors':function(error, InviteeObject) {
      assert.isNull(error);
    },
    'Invitee should be defined':function(error, InviteeObject) {
      assert.isNotNull(InviteeObject);
    },
    'Invitee should be an object':function(error, InviteeObject) {
      assert.isObject(InviteeObject);
    },
    'and Invitee phone number should be "13800000000"':function(error, InviteeObject) {
      assert.equal(InviteeObject.phone, '13800000000');
    }
  }

}).export(module);
