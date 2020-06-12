const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "../../images/smallheader.png",
    username: "张三",
    userPhone: "1388888888",
    picbasedata: "",
    base64: "",
    loading: false,
    verifyState: "",
    reson: ""
  },
  save() {
    const _this = this;
    // 保存数据
    console.log(this.data);
    // if (!this.data.picbasedata && this.data.src == "../../images/smallheader.png") {
    //   wx.showToast({
    //     title: '请选择重新设置人脸照',
    //   });
    //   return;
    // }
    console.log(this.data.src);
    _this.setData({
      loading: true
    });
    if (this.data.src.indexOf("guangtuo") != -1) {
      this.data.picbasedata = "";
      _this.submit();
      return;
    }
    wx.getFileSystemManager().readFile({
      filePath: this.data.src,
      encoding: "base64",
      success(res) {
        console.log(res);
        _this.setData({
          picbasedata: "png:" + res.data
        });
        _this.submit();
      },
      fail(res) {
        console.log(res);
        _this.setData({
          loading: false
        })
      },
      complete(res) {
        console.log(res);
      }
    })
    // app.api.setUserInfo({
    //   nickname: this.data.username,
    //   photoBase64: this.data.picbasedata
    // })
  },
  submit() {
    const _this = this;
    console.log("aa");
    wx.showLoading({
      title: '正在保存',
    });
    // setTimeout(function() {
    //   wx.hideLoading()
    // }, 10000)
    app.api.setUserInfo({
      phoneNo: this.data.userPhone,
      staffName: this.data.username,
      snapOriginalPhotoUriBase64: this.data.picbasedata
    }).then(res => {
      console.log(res);
      wx.hideLoading();
      if (res.data.success) {
        wx.showToast({
          title: '修改成功！',
        });
        app.getPersonInfo();
        wx.navigateBack({
          delta: '1'
        })
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
  nameChnage(e) {
    this.setData({
      username: e.detail.value
    })
  },
  changeName() {
    wx.navigateTo({
      url: `../rename/rename?text=${this.data.username}&type=name`,
    })
  },
  changePhone() {
    wx.navigateTo({
      url: `../rename/rename?text=${this.data.userPhone}&type=phone`,
    })
  },
  phoneChange(e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.startPullDownRefresh({

    })
  },

  getData() {
    app.api.getUserInfo().then(res => {
      console.log(res);
      if (res.data.success) {
        let data = res.data.data || {};
        console.log(data);
        // data.extInfo.snapOriginalPhotoUri = 'http://192.168.9.44:9333/5,01daa12f5fe351.jpg';
        let imageUlr = data.extInfo.snapOriginalPhotoUri ? app.globalData.imageUrl + data.extInfo.snapOriginalPhotoUri : "../../images/smallheader.png";
        data.photoUrl = imageUlr;
        app.data.userInfo = data;
        let userInfo = app.data.userInfo || {};
        this.setData({
          src: userInfo.extInfo.snapOriginalPhotoUri ? (app.globalData.imageUrl + userInfo.extInfo.snapOriginalPhotoUri) : "../../images/smallheader.png",
          username: userInfo.staffName || "",
          userPhone: userInfo.phoneNo || "",
          verifyState: userInfo.extInfo.verifyState,
          reson: userInfo.extInfo.reason
        })
      } else {
        wx.showToast({
          title: "请求不成功!",
        })
      }
    });
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  selectLocalPhoto() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        let size = res.tempFiles[0].size;
        if (size > 3 * 1024 * 1024) {
          wx.showToast({
            title: '图片不超过3MB',
          })
          return;
        }
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        _this.setData({
          src: tempFilePaths
        })
        console.log(tempFilePaths);
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths,
          encoding: "base64",
          success(res) {
            console.log(res);
            _this.setData({
              picbasedata: "png:" + res.data
            })
          }
        })
      }
    })
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

    this.getData();
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

  reauthentication() {
    wx.navigateTo({
      url: '/pages/certify/certify',
    })
  }
})