var Activity = require('../models').Activity;
var HttpError = require('some-http-error');

var activityController = {}

activityController.addActivity = (req, res, next) => {
	var body = Object.assign(new Activity(), req.body);
	Activity.addActivity(body).then(activity => {
		res.success(activity);
	}).catch(next);
}

activityController.getActivityById = (req, res, next) => {
	var id = req.params.id;
	Activity.getActivityById(id).then(activity => {
		res.success(activity);
	}).catch(next);
}

activityController.getAllActivities = (req, res, next) => {
	Activity.getAllActivities().then(activities => {
		res.success(activities);
	}).catch(next);
}

activityController.updateActivity = (req, res, next) => {
	var id = req.params.id;
	var body = req.body;
	Activity.getActivityById(id).then(activity => {
		Object.assign(activity, body);
		return Activity.updateActivity(activity);
	}).then(activity=> {
		res.success(activity);
	}).catch(next);
}

activityController.deleteActivity = (req, res, next) => {
	var id = req.params.id;
	Activity.deleteActivity(id).then(activity => {
		res.success(null, 204);
	}).catch(next);
}

module.exports = activityController;