var configs = require('../../configs/index.js');

Page({
	data: {
		editor: false,
		login: false,
		user: {}
	},
	onShow: function() {
		var vm = this;
		var id = wx.getStorageSync('_id');
		var token = wx.getStorageSync('token');
		if(token) {
			wx.request({
				url: configs.API_BASE + '/users/' + id,
				success: function(res) {
					vm.setData({
						login: true,
						user: res.data
					})
				}
			})
		}
	},
	editorInfor: function() {
		this.setData({
			editor: true
		})
	},
	editorFinish: function() {
		var vm = this;
		vm.setData({
			editor: false
		})
		var id = wx.getStorageSync('_id');
		wx.request({
			url: configs.API_BASE + '/users/' + id, 
			data: vm.data.user,
			method: 'PUT',
			success: function(res) {
				vm.setData({
					user: res.data
				})
			}
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
						console.log(res)
						vm.data.user.picture_url = configs.API_BASE + JSON.parse(res.data).url;
						console.log(vm.data.user.picture_url)
						vm.setData({
							user: vm.data.user
						})
					}
				})
			}
		})
	},
	inputIntro: function(e) {
		this.data.user.introduction = e.detail.value;
		this.setData({
			user: this.data.user
		})
	},
	logout: function() {
		wx.clearStorageSync();
		this.setData({
			login: false,
			user: {}
		})
	}
})
