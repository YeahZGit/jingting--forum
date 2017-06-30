var User = require('../models').User;
var jwt = require('../common/jwt'); 
var HttpError = require('some-http-error');

var userController = {}

userController.authorize = (req, res, next) => {
	var body = req.body;
	User.getUser(body.username, body.password).then(user => {
		if(user){
			var token = jwt.create({name: body.username});
			var id = user._id;
			res.success({token: token, _id: id});
		}
		else{
			next(new HttpError.BadRequestError('Username or password error'));
		}
	}).catch(next);
};

userController.addUser = (req, res, next) => {
	var body = Object.assign(new User(), req.body);
	User.addUser(body).then(user => {
		res.success(user);
	}).catch(next);
}

userController.getUserById = (req, res, next) => {
	var id = req.params.id;
	User.getUserById(id).then(user => {
		res.success(user);
	}).catch(next);
}

userController.getAllUsers = (req, res, next) => {
	User.getAllUsers().then(users => {
		res.success(users);
	}).catch(next);
}

userController.updateUser = (req, res, next) => {
	var id = req.params.id;
	var body = req.body;
	User.getUserById(id).then(user => {
		Object.assign(user, body);
		return User.updateUser(user);
	}).then(user => {
		res.success(user);
	}).catch(next);
}

userController.deleteUser = (req, res, next) => {
	var id = req.params.id;
	User.deleteUser(id).then(user => {
		res.success(null, 204);
	}).catch(next);
}

module.exports = userController;