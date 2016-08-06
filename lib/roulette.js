var mongoose = require('mongoose')
  , Promise = require('node-promise').Promise
  , Invitee = require('../models/invitee').Invitee;

exports.connection = mongoose.connection;

/**
 * @method generate
 * @param {Object} document Must at least include a `name` & a `phone` attribute
 */

exports.generate = function(document) {
  var generatePromise
    , promise = new Promise();

  document['data'] = document.data || null;

  generatePromise = Invitee.findOrCreate({phone : document.phone, name: document.name}, document, {});
  generatePromise.then(function(InviteeObject) {
    promise.resolve(InviteeObject);
  }, function(error) {
    promise.reject(error, true);
  });

  return promise;
};

/**
 * @method retrieve
 * @param {Object} options - must include a `phone` attribute
 */

exports.retrieve = function(options) {
  var promise = new Promise();
  var retrievePromise = Invitee.findOne(options);
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
 * @param {Object} options
 * @param {Object} updates
 */

exports.update = function(options, updates) {
  var promise = new Promise();
  Invitee.findOne(options, function(err, doc) {
    
    extend(doc,updates)

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
