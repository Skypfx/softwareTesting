//app.js
const APPID ='wx0b5672956ddcafbe';
const SECRET ='a395383b8aba4d51316d1d887419b795'
App({
  globalData: {
    userInfo: {
      NICKNAME: '',
      GENDER: '',
      CITY: '',
    },
    OPENID: '',
    CODE: ''
  },

  onLaunch: function () {
    var that = this;
    var status = false;
    wx.login({
      //获取code
      success: function (res) {
        that.globalData.CODE = res.code //返回code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + that.globalData.CODE + '&grant_type=authorization_code',
          method: 'get',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.globalData.OPENID = res.data.openid //返回openid

            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                }else{
                  wx.reLaunch({
                    url: '/pages/authorize/authorize',
                  })
                }
              }
            });
          }
        })
      }
    })
  },
})