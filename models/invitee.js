
/**
 * @model invitee
 */

var options
  , InviteeSchema
  , mongoose = require('mongoose')
  , wrapper = require('./prototype.js')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

options = {
  versionKey : false
};

InviteeSchema = new Schema({
  id              : { type : ObjectId},
  name            : { type : String },
  phone           : { type : String, unique: true  },
  role            : { type : String },
  isAllowedToDraw : { type : String },
  remark          : { type : String },
  isCheckedIn     : { type : Boolean, default: false },
  checkedInAt     : { type : Date },
  isWinner        : { type : Boolean, default: false },
  reward          : { type : String },
  createdAt       : { type : Date, default: Date.now()},
  updatedAt       : { type : Date, default: Date.now()}
}, options);

exports.Invitee = new wrapper.Model(mongoose.model('Invitee', InviteeSchema));
