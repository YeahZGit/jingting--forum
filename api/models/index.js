var mongoose = require('mongoose');
var configs = require('../configs');

var Activity = require('./activity');
var Admin = require('./admin');
var Acticle = require('./article');
var User = require('./user');

mongoose.connect(configs.mongodb);

exports.Activity = mongoose.model('Activity', Activity);
exports.Admin = mongoose.model('Admin', Admin);
exports.Article = mongoose.model('Acticle', Acticle);
exports.User = mongoose.model('User', User);
