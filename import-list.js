var lineReader = require('line-reader');
var roulette = require('./lib/roulette');

var mongodbConnection = 'mongodb://localhost/roulette';


lineReader.eachLine('./tmp/invitees.csv', function(row,last) {
	var col = row.split(',');

	var name = col[1],
      phone = col[2];

  roulette.connect(mongodbConnection);
  roulette.connection.on('error', function(error) {
    throw new Error(error);
  });

  var inviteePromise = roulette.generate({
    name : name,
    phone: phone
  });
  inviteePromise.then(function(doc) {
  	console.info(doc);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

})

process.exit(1);