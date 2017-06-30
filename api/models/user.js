var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: { type: String, select: false },
	picture_url: String,
	introduction: String
})

userSchema.statics = {
	addUser(user) {
		return user.save();
	},
	getUser(username, password) {
		return this.findOne({username, password});
	},
	getUserById(id) {
		return this.findById(id);
	},
	getAllUsers() {
		return this.find();
	},
	updateUser(user) {
		return user.save();
	},
	deleteUser(id) {
		return this.remove({'_id': id});
	}
}

module.exports = userSchema;