let timeId = null;
Page({
  data: {
    items: [],
    value: '',
    showResult: false,
  },
  cancelSearch() {
    this.setData({
      showResult: false,
      value: ''
    })
  },
  searchInput(value) {
    if (value.detail.value!=null&&value.detail.value!=""){
      var that = this;
      wx.request({
        url: 'http://10.10.10.14:8080/Food/getFoodInfoByName', //服务器地址
        method: 'get',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {
          name: value.detail.value
        },
        dataType: 'json',
        header: {// 设置请求的 header
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            items: res.data.data.list,
          });
          if (that.data.items.length > 0) {
            that.setData({
              showResult: true
            })
          }
        }
      })
    }
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/item-detail/index?id=" + e.currentTarget.dataset.id
    })
  },
  onLoad() {
  }
})