let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '../../images/header2.png',
    identifyNo: '',
    personName: 'XXX',
    fileData: '',
    imgWidth: '',
    imgHeight: '',
    name: "",
    phone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.data);
    let data = app.data.userInfo;
    this.setData({
      imageSrc: data.extInfo.snapOriginalPhotoUri,
      name: data.staffName,
      phone: data.extInfo.cardID
    })
  },

  personNameAct(e) {
    console.log(e.detail.value);
    this.setData({
      personName: e.detail.value
    });
    var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
    var currentPage = pages[pages.length - 1] //当前界面
    var prePage = pages[pages.length - 2] //上一个界面
    prePage.setData({
      name: e.detail.value,
    });
  },
  identifyNoAct(e) {
    console.log(e.detail.value);
    var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
    var currentPage = pages[pages.length - 1] //当前界面
    var prePage = pages[pages.length - 2] //上一个界面
    prePage.setData({
      identifyNo: e.detail.value,
    });
  },
  phoneNoAct(e) {
    var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
    var currentPage = pages[pages.length - 1] //当前界面
    var prePage = pages[pages.length - 2] //上一个界面
    prePage.setData({
      phone: e.detail.value,
    });
  },
  uploadHeaderImage() {
    var _this = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          imageSrc: tempFilePaths[0]
        });
        var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
        var currentPage = pages[pages.length - 1] //当前界面
        var prePage = pages[pages.length - 2] //上一个界面
        prePage.setData({
          src: _this.data.imageSrc,
        });
        console.log(res);
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径 
          encoding: 'base64', //编码格式 
          success: res => {
            //成功的回调 
            console.log('data:image/png;base64,' + res.data);
            prePage.setData({
              fileData: res.data,
            });
          }
        })
        //以下两行注释的是同步方法，不过我不太喜欢用。 
        //
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
        //console.log(base64);
      }
    })
  },

  urlToBase64(res) {
    wx.getImageInfo({
      src: res.tempFilePaths[0],
      success: res => {
        this.setData({
          imgWidth: res.width,
          imgHeight: res.height
        })
      }
    })
    let canvas = wx.createCanvasContext('canvas');
    // 1. 绘制图片至canvas 
    console.log('1. 绘制图片至canvas ');
    canvas.drawImage(res.tempFilePaths[0], 0, 0, this.data.imgWidth, this.data.imgHeight);
    // 绘制完成后执行回调 
    console.log('绘制完成后执行回调  ');
    canvas.draw(false, () => {
      console.log(' 2. 获取图像数据  ');
      // 2. 获取图像数据 
      wx.canvasGetImageData({
        canvasId: 'canvas',
        x: 0,
        y: 0,
        width: this.data.imgWidth,
        height: this.data.imgHeight,
        success(res) {
          // 3. png编码 
          let pngData = upng.encode([res.data.buffer], res.width, res.height);
          // 4. base64编码 
          let base64 = wx.arrayBufferToBase64(pngData);
          console.log(base64);
          // ...
        }
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
  onHide: function() {},

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

  },

  reCertify() {
    wx.navigateTo({
      url: '/pages/againCertify/againCertify',
    })
  }
})