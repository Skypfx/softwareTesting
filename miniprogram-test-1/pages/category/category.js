// pages/catagory/catagory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   items: [],
   type: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("type",options.id);
    this.setData({
      type: options.id
    })
    // 获取后端数据
    var that = this;
    wx.request({
      url: 'http://10.10.10.14:8080/Food/getFoodInfoByType', //服务器地址
      method: 'get',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        type: options.id
      },
      dataType: 'json',
      header: {// 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          items: res.data.data.list,

        });
        console.log("message from network>>>>", that.data.items);
      }
    })

  },

  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/item-detail/index?id=" + e.currentTarget.dataset.id
    })
  },
})