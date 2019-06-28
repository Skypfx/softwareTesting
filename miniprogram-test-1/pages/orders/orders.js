// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    hasList: false,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var arr = wx.getStorageSync('orders') || [];
    console.log("list:::", arr);
    // 有数据的话，就遍历数据  
    if (arr.length > 0) {
      // 更新数据  
      this.setData({
        orders: arr,
        hasList: true,
      });
    } else {
      this.setData({
        hasList: false,
      });
    }

  },
})