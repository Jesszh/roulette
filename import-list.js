var lineReader = require('line-reader');
var roulette = require('./lib/roulette');
var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.mongodb);

lineReader.eachLine('./tmp/invitees.csv', function(row,last) {
	var col = row.split(',');

	var name = col[1],
      phone = col[2],
      role = col[3],
      isAllowedToDraw = col[4],
      remark = col[5];

  var inviteePromise = roulette.generate({
    name : name,
    phone: phone,
    role: role,
    isAllowedToDraw: isAllowedToDraw,
    remark: remark
  });

  inviteePromise.then(function(doc) {
  	// console.info(doc);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });


},function(error){
  console.log(error);
})
