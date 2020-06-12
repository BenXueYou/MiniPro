const app = getApp();
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    yzCode: "",
    isRegisterArgs: true,
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('22222222222222222222222222');
    app.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput(e) {
    this.setData({
      yzCode: e.detail.value
    })
  },
  //验证短信验证码
  loginAct() {
    console.log(this.data, this.data.isRegisterArgs);
    if (!this.data.isRegisterArgs) {
      wx.showToast({
        title: '未同意广拓用户协议',
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    if (!this.data.phone && this.data.phone.length < 11) {
      wx.showToast({
        title: '请检查手机号',
        image: '../../images/delete_icon.png',
        duration: 1500
      })
      return;
    };
    if (!this.data.yzCode && !this.data.yzCode.length) {
      wx.showToast({
        title: '密码不能为空',
        image: '../../images/delete_icon.png',
        duration: 1500
      })
      return;
    };
    var data = {
      username: this.data.phone,
      password: this.data.yzCode,
      grant_type:'password'
    }
    app.api.loginUserPsw(data).then(res => {
      console.log(res);
      if (res.data.success) {
        wx.switchTab({
          url: '../booking/booking',
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          image: '../../images/delete_icon.png',
          duration: 2000
        });
      }
    });
    // wx.switchTab({
    //   url: '../booking/booking',
    // });
  },
  //开始注册用户
  registerUser(code) {
    let data = {
      cellphoneNo: this.data.phone,
      validateCode: this.data.yzCode,
      validateToken: code
    }
    app.api.register(data).then(res => {
      console.log(res);
      if (res.data.success) {
        wx.redirectTo({
          url: '../setPassWord/setPassWord',
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          image: '../../images/delete_icon.png',
          duration: 2000
        });
      }
    });
  },
  checkedChange(val) {
    console.log(val.detail.value);
    if (val.detail.value && val.detail.value.length) {
      this.setData({
        isRegisterArgs: true
      });
    } else {
      this.setData({
        isRegisterArgs: false
      });
    }
  },
  toRegisterAct() {
    wx.redirectTo({
      url: '../register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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