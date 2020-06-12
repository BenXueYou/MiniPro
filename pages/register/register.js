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
    disabled: false,
    isSending: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('1111111111111111111111111111111');
    app.init();
    // wx.switchTab({
    //   url: '../booking/booking',
    // });
    // wx.navigateTo({
    //   url: '/pages/againCertify/againCertify',
    // })
  },
  toLoginAct() {
    wx.redirectTo({
      url: '../login/login',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
  //获取验证码的请求
  getMessageCode() {
    var that = this;
    wx.showLoading({
      title: '验证码发送中',
    })
    app.api.getMessageCode(this.data.phone).then(res => {
      console.log(res);
      wx.hideLoading();
      if (res.data.success) {
        wx.showToast({
          title: '验证码已发送',
          type: 'success'
        });

        var currentTime = that.data.currentTime;
        interval = setInterval(function() {
          currentTime--;
          that.setData({
            time: currentTime + '秒'
          });
          if (currentTime <= 0) {
            clearInterval(interval);
            that.setData({
              time: '重新发送',
              currentTime: 61,
              disabled: false
            })
          }
        }, 1000);
      } else {
        that.setData({
          disabled: false
        });
        wx.showToast({
          title: res.data.msg,
          type: 'success',
          duration: 2000
        });
      }
    }).catch(() => {
      that.setData({
        disabled: false
      })
    });
  },
  //点击获取验证码的计时器
  getCode: function(options) {
    if (!this.data.phone && this.data.phone.length < 11) {
      wx.showToast({
        title: '请检查手机号',
        image: '../../images/delete_icon.png',
        duration: 2000
      })
      return;
    };
    var that = this;
    if (this.data.disabled) {
        wx.showToast({
          title: '验证码已发送',
          type: 'success'
        });
      return;
    }
    that.setData({
      disabled: true
    });
    this.getMessageCode();
  },
  //验证短信验证码
  register() {
    console.log(this.data, this.data.isRegisterArgs);
    if (!this.data.isRegisterArgs) {
      wx.showToast({
        title: '请阅读并同意《广拓用户协议》',
        image: '../../images/delete_icon.png',
        duration: 2000
      });
      return;
    }
    if (!this.data.phone && this.data.phone.length < 11) {
      wx.showToast({
        title: '请检查手机号',
        image: '../../images/delete_icon.png',
        duration: 2000
      })
      return;
    };
    if (!this.data.yzCode && !this.data.yzCode.length) {
      wx.showToast({
        title: '验证码不能为空',
        image: '../../images/delete_icon.png',
        duration: 2000
      })
      return;
    };
    var data = {
      cellphoneNo: this.data.phone,
      validateCode: this.data.yzCode
    }
    app.api.sendMessageCode(data).then(res => {
      console.log(res);
      if (res.data.success) {
        let code = res.data.data;
        // this.registerUser(code);
        wx.redirectTo({
          url: '../setPassWord/setPassWord?phone=' + this.data.phone + '&token=' + code,
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