var configs = require('../../configs/index.js');
var app = getApp()
Page({
  data: {
    activityList: [],
    specials: [],
    articleList: []
  },
  classify: function(list) {
    var specialsTemp = [];
    var articleListTemp = [];
    list.forEach(function(val){
      if(val.set_top) {
        specialsTemp.push(val);
      }
      else {
        articleListTemp.push(val);
      }
    })
    this.setData({
      specials: specialsTemp,
      articleList: articleListTemp 
    })
  },
  getPictureUrl: function(id) {

  },
  onShow: function () {
    var vm = this;
    wx.request({
      url: configs.API_BASE + '/activities',
      success: function(res) {
        vm.setData({
          activityList: res.data
        })
      }
    });
    wx.request({
      url: configs.API_BASE + '/articles',
      success: function(res) {
        var temp = res.data;
        for(var i = 0; i < temp.length; i ++) {
          (function(){
            var index = i;
            wx.request({
              url: configs.API_BASE + '/users/' + temp[index].author,
              success: function(res) {
                temp[index].user_pic = res.data.picture_url
                vm.classify(temp);
              }
            })
          }())
        }
      }
    })
  },
  onPullDownRefresh: function(){
    this.onShow();
    wx.stopPullDownRefresh()
  }
})
