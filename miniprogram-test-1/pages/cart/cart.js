// page/component/new-pages/cart/cart.js
var util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    curStock: 0,     //当前商品库存
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
  },

  onShow() {
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('carts') || [];
    console.log("list:::",arr);
    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {
      // 更新数据  
      this.setData({
        carts: arr,
        hasList: true,
      });
      console.info("缓存数据：" + this.data.carts);
    } else {
      this.setData({
        hasList: false,
      });
    }
    this.getTotalPrice();
  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.
    dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    wx.setStorageSync('carts', carts);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    // console.log("KKKKK",carts);
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].FOOD_PRICE;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  getOrders(){
    let carts = this.data.carts; 
    // 获取订单的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('orders') || [];
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {
        var that = this;
        wx.request({
          url: 'http://10.10.10.14:8080/Food/getFoodInfoById', //服务器地址
          method: 'get',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            id: carts[i].FOOD_ID
          },
          dataType: 'json',
          header: {// 设置请求的 header
            'content-type': 'application/json'
          },
          success: function (res) {
              that.data.curStock = res.data.data.list[0].FOOD_QUANTITY;
               /*若将以下判断条件放入success函数外，则会导致操作延迟，即需点击两次才能判断正确
               因为程序会先执行success后面的东西，请求返回后才会执行success函数。 */
            if (carts[i].num <= that.data.curStock) {
              arr.push(carts[i]);
              var DATE = util.formatDate(new Date());
              wx.request({
                url: 'http://10.10.10.14:8080/Sell/insertSellInfo', //服务器地址
                method: 'post',// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                data: {
                  uid: app.globalData.OPENID,
                  id: carts[i].FOOD_ID,
                  name: carts[i].FOOD_NAME,
                  quantity: carts[i].num,
                  price: carts[i].FOOD_PRICE,
                  date: DATE
                },
                dataType: 'json',
                header: {// 设置请求的 header
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(">>>>>>>", res.data);
                }
              })
              carts.splice(i--, 1);
              //关闭窗口
              wx.showToast({
                title: '购物成功！',
                icon: 'success',
                duration: 2000
              });
            } else {
              wx.showModal({
                title: '提示',
                content: carts[i].FOOD_NAME + '库存不足，请适当减少购买数量',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }                      
            that.setData({
              carts: carts
            });
            wx.setStorageSync('carts', carts)
            if (!carts.length) {
              that.setData({
                hasList: false
              });
            }
            console.log("arr的length", arr.length);
            // 最后，把订单数据，存放入缓存  
            try {
              wx.setStorageSync('orders', arr);
              console.log("缓存数据：" + wx.getStorageSync('orders'));
              return;
            } catch (e) {
              console.log(e)
            }
          }
        })
      }
    }
  }
})