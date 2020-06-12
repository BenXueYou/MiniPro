// pages/setPassWord/setPassWord.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password1: '',
    passWord2: '',
    phone: '',
    token: '',
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let phone = options.phone;
    let code = options.token;
    this.setData({
      phone: phone,
      token: code
    });
  },
  passInput1(evt) {
    this.setData({
      password1: evt.detail.value
    });
    console.log(evt);
  },
  passInput2(evt) {
    this.setData({
      password2: evt.detail.value
    });
    console.log(evt);
  },
  setPasswordAct() {
    console.log(this.data);
    if (!this.data.password1) {
      wx.showToast({
        title: '请输入密码',
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    if (!this.data.password2) {
      wx.showToast({
        title: '请输入确认密码',
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    if (this.data.password1 === this.data.password2) {
      // app.getPersonInfo();
      // wx.navigateTo({
      //   url: '../booking/booking',
      // })

    } else {
      wx.showToast({
        title: '输入密码不一致',
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    this.setData({
      loading: true
    });
    this.getJsCode();
  },

  //获取当前的code
  getJsCode() {
    var _this = this;
    wx.login({
      success(res) {
        console.log(res);
        let js_code = res.code
        _this.setPasswordToRegister(js_code);
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  //设置账号正式注册用户
  setPasswordToRegister(js_code) {
    console.log(js_code);
    let data = {
      cellphoneNo: this.data.phone,
      password: this.data.password1,
      validateToken: this.data.token,
      js_code: js_code
    };
    app.api.setPassword(data).then(res => {
      console.log(res);
      this.setData({
        loading: false
      });
      if (res.data.success) {
        let token = res.data.data;
        console.log('------------', token);
        try {
          wx.setStorageSync('token', token);
          app.init();
          wx.switchTab({
            url: '../booking/booking',
          });
        } catch (e) {}
      } else {
        wx.showToast({
          title: res.data.msg,
          image: '../../images/delete_icon.png',
          duration: 1500
        });
      }
    }).catch(err => {
      this.setData({
        loading: false
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})