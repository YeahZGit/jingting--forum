var Article = require('../models').Article;
var HttpError = require('some-http-error');

var articleController = {}

articleController.addArticle = (req, res, next) => {
	var body = Object.assign(new Article(), req.body);
	Article.addArticle(body).then(article => {
		res.success(article);
	}).catch(next);
}

articleController.getArticleById = (req, res, next) => {
	var id = req.params.id;
	Article.getArticleById(id).then(article => {
		res.success(article);
	}).catch(next);
}

articleController.getAllArticles = (req, res, next) => {
	Article.getAllArticles().then(articles => {
		res.success(articles);
	}).catch(next);
}

articleController.updateArticle = (req, res, next) => {
	var id = req.params.id;
	var body = req.body;
	Article.getArticleById(id).then(article => {
		Object.assign(article, body);
		return Article.updateArticle(article);
	}).then(article => {
		res.success(article);
	}).catch(next);
}

articleController.deleteArticle = (req, res, next) => {
	var id = req.params.id;
	Article.deleteArticle(id).then(article => {
		res.success(null, 204);
	}).catch(next);
}

module.exports = articleController;