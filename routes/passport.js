var express = require('express');
var router = express.Router();
var passport = require('passport');
var filter = require('../lib/filter');

router.get('/', function(req, res) {
    res.render('passport/index'); 
});


module.exports = router;