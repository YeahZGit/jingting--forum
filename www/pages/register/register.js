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
	commit: function() {
		var vm = this;
		wx.request({
			url: 'http://localhost:4000/users',
			data: {
				username: vm.data.username,
				password: vm.data.password
			},
			method: 'POST',
			success: function() {
				wx.showToast({
					title: '注册成功'
				})
			}
		})
	}
})