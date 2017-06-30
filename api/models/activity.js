var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	title: String,
	content: String,
	picture_url: String, 
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
})

activitySchema.statics = {
	addActivity(activity) {
		return activity.save();
	},
	getActivityById(id) {
		return this.findById(id);
	},
	getAllActivities() {
		return this.find();
	},
	updateActivity(activity) {
		return activity.save();
	},
	deleteActivity(id) {
		return this.remove({'_id': id});
	}
}

module.exports = activitySchema;