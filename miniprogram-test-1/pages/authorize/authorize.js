// pages/authorize/authorize.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              console.log("#############");
              // that.queryUsreInfo();
              console.log("#############");
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo.NICKNAME = e.detail.userInfo.nickName;
      app.globalData.userInfo.GENDER = e.detail.userInfo.gender;
      app.globalData.userInfo.CITY = e.detail.userInfo.city;
    
      //插入登录的用户的相关信息到数据库
      let that = this;
      console.log("*************", app.globalData.userInfo.NAME);
       that.insertUserInfo(e);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  //保存用户信息
  insertUserInfo: function (res) {
    var that = this;
    wx.request({
      url: 'http://10.10.10.14:8080/User/insertUserInfo', //服务器地址
      method: 'post',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        id: app.globalData.OPENID,
        name: app.globalData.userInfo.NICKNAME,
        gender: app.globalData.userInfo.GENDER,
        city: app.globalData.userInfo.CITY
      },
      dataType: 'json',
      header: {// 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {
        //授权成功后，跳转进入小程序首页(展示效果用)
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  //获取用户信息接口
  queryUsreInfo: function () {
   
  },
})