const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.min.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../images/header.png',
    fileData: '',
    userObj: '',
    name: "",
    phone: "",
    expImage: false,
    qrCodeSrc: '',
    isFirstDraw: false
  },
  renzheng() {
    wx.navigateTo({
      url: '../certify/certify',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.api.recordDetail(options.recordUuid).then((res) => {
      console.log(res);
      if (res.data.success) {
        let userObj = res.data.data;
        this.setData({
          userObj: userObj
        });

      }
    })
    // console.log(options);
    // let userObj = {};
    // if (options && options.userObj) {
    //   userObj = JSON.parse(options.userObj);
    //   console.log(userObj);
    // }
    // this.setData({
    //   userObj: userObj
    // });
    // const data = app.data.userInfo;
    // this.setData({
    //   src: data.photoUrl || '../../images/header.png',
    //   name: data.staffName,
    //   phone: data.staffPhoneNo
    // })

  },
  onShow() {
    const data = app.data.userInfo;

    this.setData({
      src: data.extInfo.snapOriginalPhotoUri ? (app.globalData.imageUrl + data.extInfo.snapOriginalPhotoUri) : "../../images/smallheader.png",
      // src: data.extInfo.snapOriginalPhotoUri || '../../images/header.png',
      name: data.staffName,
      phone: data.phoneNo
    })
  },
  navigation() {
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     console.log(res);
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })

    wx.openLocation({ //这里要直接输入该地方的经纬度，由于每个地图得到的经纬度不一样，所以精确度会有差别，我亲测了百度地图和腾讯地图的经纬度，发现使用腾讯地图的经纬度的精确度很高，至于为什么，毕竟都是腾讯应用嘛，大家懂的！后面给大家写了一个获取腾讯地图经纬度的文章：http://www.cnblogs.com/silent007/p/9023799.html
      latitude: 31.22352,
      longitude: 121.45591,
      name: "汉中路恒通大厦",
      address: "汉中路恒通大厦",
      scale: 28
    })
  },
  certifyAct() {
    console.log('认证');
    // wx.navigateTo({
    //   url: '../certify/certify',
    // })
    wx.navigateTo({
      url: '../personInfo/personInfo',
    })
  },
  imageExpand() {
    console.log('1111');
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        // wx.previewImage({
        //   current: tempFilePath, // 当前显示图片的http链接  
        //   urls: [tempFilePath] // 需要预览的图片http链接列表  
        // })

        that.setData({
          expImage: false,
          qrCodeSrc: tempFilePath,
        });
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  hideBoxAct() {
    var isDExpImage = this.data.expImage ? false : true;
    this.setData({
      expImage: isDExpImage,
      modalName: "Image"
    })
  },
  showQrCodeAct() {
    let data = {
      recordUuid: this.data.userObj.recordUuid
    };
    console.log("data===", data);
    console.log("projectUuid===", this.data.projectUuid);
    const _this = this;
    app.api.getDynamicQrcode(data, this.data.userObj.projectUuid).then(res => {
      console.log(res);
      if (res.data.success) {
        _this.showCode(res.data.data.dynamicQrcodeUuid);
      } else {
        wx.showModal({
          content: res.data.msg,
          showCancel: false
        })
      }
    })
  },
  showCode(text) {
    var windowWidth, windowHeight;
    var _this = this;
    // if (!this.data.isFirstDraw) {
      console.log(this.data.userObj.visitorRecordUuid);
      wx.getSystemInfo({
        success: function(res) {
          windowWidth = res.windowWidth;
          windowHeight = res.windowHeight;
          drawQrcode({
            width: windowWidth * 0.94,
            height: windowWidth * 0.94,
            canvasId: 'myQrcode',
            // ctx: wx.createCanvasContext('myQrcode'),
            text,
            // v1.0.0+版本支持在二维码上绘制图片
            // image: {
            //   imageResource: '../../images/icon.png',
            //   dx: 70,
            //   dy: 70,
            //   dWidth: 60,
            //   dHeight: 60
            // }
          })
        }
      });
    // }
    // this.data.isFirstDraw = true;
    this.setData({
      modalName: "Image",
      expImage: true,
    })
    console.log(this.data.modalName);
  },
  hideModal() {
    this.setData({
      modalName: "",
      showCancel: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  cancelRecord() {
    console.log(this.data);
    app.api.cancelAppiont({
      "visitRecordUuid": this.data.userObj.recordUuid
    }).then(res => {
      console.log(res);
      if (res.data.success) {
        wx.showModal({
          showCancel: false,
          title: "取消成功!",
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        wx.showModal({
          showCancel: false,
          title: res.data.msg,
        })
      }
    })
  },
  repeatRecord() {
    let data = {
      respondentPhone: this.data.userObj.staffPhoneNo,
      respondentName: this.data.userObj.staffName,
      licensePlate: this.data.userObj.plateNo,
      reason: this.data.userObj.reason,
      date: app.globalData.formatDate(new Date()),
      time: app.globalData.formatTime(new Date())
    }
    wx.navigateTo({
      url: '../bookingForm/bookingForm?data=' + JSON.stringify(data),
    })
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

  },
  operator() {
    console.log(this.data.userObj);
    let addressArr = this.data.userObj.proAndAddressList || [];
    let address = this.data.userObj.address.replace(/\／/g, "");
    console.log(address);
    let projectUuid = "";
    for (let i = 0, len = addressArr.length; i < len; i++) {
      if (address.indexOf(addressArr[i].adress) != -1) {
        projectUuid = addressArr[i].projectUuid;
      }
    }
    if (projectUuid) {
      // 如果有uuid则查询操作说明
      app.api.getUserDescription({
        projectUuid: projectUuid
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          wx.showModal({
            title: '预约指南',
            content: res.data.data,
            showCancel: false
          })
        }
      })
    } else {
      wx.showToast({
        title: '没有ProjectUuid'
      })
    }
  }
})