var configs = require('../../configs/index.js');

Page({
	data: {
		username: '',
		password: ''
	},
	bindUsername: function(e) {
		this.setData({
			username: e.detail.value
		})
	},
	bindPassword: function(e) {
		this.setData({
			password: e.detail.value
		})
	},
	login: function() {
		var vm = this;
		wx.request({
			url: configs.API_BASE + '/users/authorization',
			data: {
				username: vm.data.username,
				password: vm.data.password
			},
			method: 'POST',
			success: function(res) {
				wx.setStorageSync('token', res.data.token);
				wx.setStorageSync('_id', res.data._id);
				wx.switchTab({
					url: '../infor/infor'
				})
			}
		})
	}
})