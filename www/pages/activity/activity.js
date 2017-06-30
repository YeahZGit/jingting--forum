var configs = require('../../configs/index.js');

Page({
	data: {
		activity: {}
	},
	onLoad: function(options) {
		var id = options.id;
		var vm = this;
		wx.request({
      url: configs.API_BASE + '/activities/' + id,
      success: function(res) {
        vm.setData({
        	activity: res.data
        })
      }
    })
	}	
})