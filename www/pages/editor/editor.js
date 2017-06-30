var configs = require('../../configs/index.js');

Page({
	data: {
		article: {}
	},
	inputTitle: function(e) {
		this.data.article.title = e.detail.value;
		this.setData({
			article: this.data.article
		})
	},
	inputContent: function(e) {
		this.data.article.content = e.detail.value;
		this.setData({
			article: this.data.article
		})
	},
	choosePic: function() {
		var vm = this;
		wx.chooseImage({
			count: 1,
			success: function(res) {
				wx.uploadFile({
					url: configs.API_BASE + '/upload/picture',
					filePath: res.tempFilePaths[0],
					name: 'picture',
					success: function(res){
						vm.data.article.picture_url = configs.API_BASE + JSON.parse(res.data).url;
						vm.setData({
							article: vm.data.article
						})
					}
				})
			}
		})
	},
	release: function() {
		this.data.article.author = wx.getStorageSync('_id');
		var vm = this;
		wx.request({
			url: configs.API_BASE + '/articles',
			data: vm.data.article,
			method: 'POST',
			success: function(res) {
				wx.showToast({
					title: '发布成功'
				})
			}
		})
	}
})