//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    items:[ ],
    imgUrls:[
      '../../images/items/1.jpg',
      '../../images/items/2.jpg',
      '../../images/items/3.jpg',
    ],
    category: [
     "Snack",
      "Drink",
      "Fruit",
      "Food",
      "Festival"
    ],
    interval: 3000,
    duration: 800,
    id: 0,
    userInfo: {},
    hasUserInfo: false,
   
  },
  
  onLoad: function () {
    var that = this;
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
            }
          })
        } else {//未授权，跳到授权页面
          wx.redirectTo({
            url: '../authorize/authorize',//授权页面
          })
        }
      }
    })
    

    //获取后端数据
    wx.request({
      url: 'http://10.10.10.14:8080/Food/inquireOfFood', //服务器地址
      method: 'get',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        
      },
      dataType: 'json',
      header: {// 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
        items: res.data.data.list,
        
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/item-detail/index?id=" + e.currentTarget.dataset.id
    })
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > 150) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})
