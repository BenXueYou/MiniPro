const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.min.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // let text = "123465789123456789";
    //  测试
    options.recordUuid = "0a0aeb18c9484cb1ae264b83ad68534f";
    options.projectUuid = "3f7ab50484644274a830852e1dfba584";
    if (!options.recordUuid || !options.projectUuid) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
      return;
    }
    let data = {
      recordUuid: options.recordUuid
    };
    const _this = this;
    app.api.getDynamicQrcode(data, options.projectUuid).then(res => {
      console.log(res);
      if (res.data.success) {
        _this.shareText(res.data.data.dynamicQrcodeUuid);
      } else {
        wx.showModal({
          content: res.data.msg,
          showCancel: false
        })
      }
    })

  },
  gaLogin() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  shareText(text) {
    wx.getSystemInfo({
      success: function(res) {
        let windowWidth = res.windowWidth;
        let windowHeight = res.windowHeight;
        drawQrcode({
          width: windowWidth * 0.94,
          height: windowWidth * 0.94,
          canvasId: 'myQrcode',
          text,
        })
      }
    });
  },
  savePic() {
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success(res) {
        console.log(res);
        let src = res.tempFilePath;
        if (src) {
          wx.previewImage({
            current: src, // 当前显示图片的http链接  
            urls: [src] // 需要预览的图片http链接列表  
          })
        }
      }
    }, this)
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