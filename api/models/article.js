var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var articleSchema = new Schema({
	title: String,
	picture_url: String,
	content: String,
	author: { type: ObjectId, ref: 'User' },
	set_top: { type: Boolean, default: false },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
})

articleSchema.statics = {
	addArticle(article) {
		return article.save();
	},
	getArticleById(id) {
		return this.findById(id);
	},
	getAllArticles() {
		return this.find();
	},
	updateArticle(article) {
		return article.save();
	},
	deleteArticle(id) {
		return this.remove({'_id': id});
	}
}

module.exports = articleSchema;