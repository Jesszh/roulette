var mongoose = require('mongoose')
  , Promise = require('node-promise').Promise
  , Invitee = require('../models/invitee').Invitee;


/**
 * @method connect
 * @param {String} mongodb Mongo DB String to connect to
 */

exports.connect = function(mongodb) {
  if (mongoose.connection.readyState === 0)
    mongoose.connect(mongodb);

  exports.connection = mongoose.connection;
};

/**
 * @method generate
 * @param {Object} document Must at least include a `name` & a `phone` attribute
 */

exports.generate = function(document) {
  var generatePromise
    , promise = new Promise();

  document['data'] = document.data || null;

  generatePromise = Invitee.findOrCreate({phone : document.phone}, document, {});

  generatePromise.then(function(InviteeObject) {
    promise.resolve(InviteeObject);
  }, function(error) {
    promise.reject(error, true);
  });

  return promise;
};

/**
 * @method retrieve
 * @param {String} phone - must include a `phone` attribute
 */

exports.retrieve = function(phone) {
  var promise = new Promise();
  var query = { phone : phone };
  var retrievePromise = Invitee.findOne(query);
  retrievePromise.then(function(InviteeObject) {
    if (InviteeObject && InviteeObject !== null) {
      promise.resolve(InviteeObject);
    } else {
      promise.reject(new Error('MongoDB - Cannot find Document'), true);
    };
  }, function(error) {
    promise.reject(error, true);
  });
  return promise;
};

/**
 * @method update
 * @param {String} phone - must include a `phone` attribute
 * @param {Object} updates - must include either a `URL` or `data` attribute
 */

exports.update = function(phone, updates) {
  var promise = new Promise();
  Invitee.findOne({phone: phone}, function(err, doc) {
    if (updates.isCheckedIn) {
      doc.isCheckedIn = updates.isCheckedIn;
      doc.checkedInAt = Date.now();
    }
    if (updates.isWinner) {
      doc.isWinner = updates.isWinner;
      doc.reward = updates.reward;
    }
    doc.save(function(err, updatedObj, numAffected) {
      if (err) {
        promise.reject(new Error('MongoDB - Cannot save updates'), true);
      } else {
        promise.resolve(updatedObj);
      }
    });
  });
  return promise;
};

/**
 * @method list
 * @description List all Invitees
 * @object options
 */

exports.list = function(options) {
  return Invitee.find(options);
};

/**
 * @method extend
 * @description Private function to extend objects
 * @param {Object} original The original object to extend
 * @param {Object} updates The updates; new keys are added, existing updated
 */

var extend = function(original, updates) {
  Object.keys(updates).forEach(function(key) {
    original[key] = updates[key];
  });
  return original;
};
