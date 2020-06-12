const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    text: "",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let text = options.text;
    let type = options.type;
    this.setData({
      text,
      type
    })
    console.log(this.data);
    if (type == 'name') {
      wx.setNavigationBarTitle({
        title: "设置名字" //页面标题为路由参数
      })
    } else if (type == 'phone') {
      wx.setNavigationBarTitle({
        title: "设置手机号码" //页面标题为路由参数
      })
    }

  },
  changeText(e) {
    this.setData({
      text: e.detail.value
    })
  },
  save() {
    const _this = this;
    console.log("aa");
    wx.showLoading({
      title: '正在保存',
    });
    // setTimeout(function() {
    //   wx.hideLoading()
    // }, 10000)
    // {
    //   phoneNo: this.data.userPhone,
    //     staffName: this.data.username,
    //       snapOriginalPhotoUriBase64: this.data.picbasedata
    // }
    let data = {};
    if (this.data.type == "name") {
      data.staffName = this.data.text;
    } else if (this.data.type == "phone") {
      data.phoneNo = this.data.text;
    }
    app.api.setUserInfo(data).then(res => {
      console.log(res);
      wx.hideLoading();
      if (res.data.success) {
        wx.showToast({
          title: '修改成功！',
        });
        app.getPersonInfo().then(res => {
          wx.navigateBack({
            delta: '1'
          })
        });

      } else {
        wx.showToast({
          title: res.data.data.msg,
        });
      }
      _this.setData({
        loading: false
      })
    })
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