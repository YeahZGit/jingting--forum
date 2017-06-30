var activityController = require('./activity');
var adminController = require('./admin');
var articleController = require('./article');
var userController = require('./user');
var uploadController = require('./upload');
var multer = require('multer');
var auth = require('../middlewares/auth');

var router = require('express').Router();
var HttpError = require('some-http-error');

router.route('/activities')
	.get(activityController.getAllActivities)
	.post(auth.adminRequired, activityController.addActivity)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

 router.route('/activities/:id')
 	.get(activityController.getActivityById)
 	.put(activityController.updateActivity)
 	.delete(activityController.deleteActivity)
 	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/admin/authorization')
	.post(adminController.authorize)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

 router.route('/articles')
 	.get(articleController.getAllArticles)
 	.post(articleController.addArticle)
 	.all(() => {throw new HttpError.MethodNotAllowedError()});

 router.route('/articles/:id')
 	.get(articleController.getArticleById)
 	.put(articleController.updateArticle)
 	.delete(articleController.deleteArticle)
 	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/upload/picture')
	.post(multer({storage: multer.diskStorage(uploadController.storagePicture)}).single('picture'),
		uploadController.handleResult)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/users/authorization')
	.post(userController.authorize)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/users')
	.post(userController.addUser)
	.get(userController.getAllUsers)
	.all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/users/:id')
	.get(userController.getUserById)
	.put(userController.updateUser)
	.delete(userController.deleteUser)
	.all(() => {throw new HttpError.MethodNotAllowedError()});


module.exports = router;