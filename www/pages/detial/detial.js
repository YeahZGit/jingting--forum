var configs = require('../../configs/index.js');
Page({
	data: {
		article: {},
		user: {}
	},
	onLoad: function(options) {
		var id = options.id;
		var vm = this;
		wx.request({
      url: configs.API_BASE + '/articles/' + id,
      success: function(res) {
      	wx.request({
      		url: configs.API_BASE + '/users/' + res.data.author,
      		success: function(res) {
      			vm.setData({
      				user: res.data
      			})
      		}
      	})
        vm.setData({
        	article: res.data
        })
      }
    })
	}
})