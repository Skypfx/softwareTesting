// pages/item-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:  [{
      FOOD_ID: ' ',
      num: 0,
      FOOD_NAME: ' ',
      FOOD_PRICE: ' ',
    }],
    item_id: ' ', 
    img:'',
    title:'',
    price:0,
    num: 0,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    stock : 0
      },
      

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = parseInt(options.id);
    console.log("id", id);
    this.data.item_id = options.id;
    var todo = 'item[0].FOOD_ID';
    this.setData({
      [todo]: this.data.item_id
    })
    console.log("item_id...",this.data.item[0].FOOD_ID);
    var that = this;
    wx.request({
      url: 'http://10.10.10.14:8080/Food/getFoodInfoById', //服务器地址
      method: 'get',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        id: that.data.item_id
      },
      dataType: 'json',
      header: {// 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {
        var todo1 = 'item[0].FOOD_NAME';
        var todo2 = 'item[0].FOOD_PRICE';
        that.setData({
          title: res.data.data.list[0].FOOD_NAME,
          price: res.data.data.list[0].FOOD_PRICE,
          stock: res.data.data.list[0].FOOD_QUANTITY,
          [todo1]: res.data.data.list[0].FOOD_NAME,
          [todo2]: res.data.data.list[0].FOOD_PRICE,
        });
      }
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    var todo = 'item[0].num';
    this.setData({
      num: num,
      [todo]: num
    })
  },
  subCount() {
    let num = this.data.num;
    num--;
    var todo='item[0].num';
    this.setData({
      num: num,
      [todo]: num
    })
  },

  addToCart() {
    var item = this.data.item[0];
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    if (this.data.stock !=0) {
    self.setData({
      show: true
    })
    setTimeout(function () {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function () {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('carts') || [];
    console.log("arr的length", arr.length);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        console.log("arr.....id",arr[j].FOOD_ID)
        if (arr[j].FOOD_ID == this.data.item_id) {
          if(this.data.num!=0){
            // 相等的话，即再次添加入购物车 
            arr[j].num = arr[j].num + this.data.num;
            // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，
            // 因为这个是购物车有的，直接更新当前数组即可） 
            try {
              wx.setStorageSync('carts', arr)
            } catch (e) {
              console.log(e)
            }
            //关闭窗口
            wx.showToast({
              title: '加入购物车成功！',
              icon: 'success',
              duration: 2000
            });
            return;
          }else{
            wx.showModal({
              title: '提示',
              content: '购买数量不能为零！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
            return;
          }
          }
      }
      // 遍历完购物车后，没有对应的item项，把itemslist的当前项放入购物车数组  
      arr.push(this.data.item[0]);
      console.log("item222", this.data.item[0])
    } else {
      if(this.data.num!=0){
        arr.push(this.data.item[0]);
      }else{
        wx.showModal({
          title: '提示',
          content: '购买数量不能为零！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
        return;
      }
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('carts', arr); 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      return;
    } catch (e) {
      console.log(e)
    }
    }else{
      wx.showModal({
        title: '提示',
        content: '对不起，该商品已售罄。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }   
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
})
