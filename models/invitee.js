
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
  id         : { type : ObjectId },
  name       : { type : String, unique: false },
  phone      : { type : String, unique: true },
  isCheckedIn: { type : Boolean, default: false },
  checkedInAt: { type : Date },
  isWinner   : { type : Boolean, default: false }
},options);

exports.Invitee = new wrapper.Model(mongoose.model('Invitee', InviteeSchema));