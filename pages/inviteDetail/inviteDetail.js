// pages/inviteDetail/inviteDetail.js
const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.min.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    modalName: "",
    visitorName: "",
    phoneNo: "",
    reason: "",
    address: "",
    mediumTypes: "",
    estimatedDatetimeArrive: "",
    estimatedDatetimeLeave: "",
    reservationRecordUuid: "",
    projectUuid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options==", options.userObj)
    this.initDetail(options.userObj);
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
  share() {
    let data = {
      recordUuid: this.data.reservationRecordUuid
    };
    console.log("data===", data);
    console.log("projectUuid===", this.data.projectUuid);
    if (!this.data.reservationRecordUuid || !this.data.projectUuid) {
      wx.showModal({
        content: "获取二维码失败",
        showCancel: false
      })
      return;
    }
    app.api.getDynamicQrcode(data, this.data.projectUuid).then(res => {
      console.log(res);
      if (res.data.success) {
        // this.setData({
        //   adressArr: res.data.data,
        //   projectUuid: res.data.data[0].projectUuid,
        //   addAdress: res.data.data[0].adress,
        //   staffUuid: res.data.data[0].staffUuid,
        // })
        // this.data.dynamicQrcodeUuid = res.data.data.dynamicQrcodeUuid;
        drawQrcode({
          width: 200,
          height: 200,
          canvasId: 'myQrcode',
          // ctx: wx.createCanvasContext('myQrcode'),
          text: res.data.data.dynamicQrcodeUuid,
          // v1.0.0+版本支持在二维码上绘制图片
          // image: {
          //   imageResource: '../../images/icon.png',
          //   dx: 70,
          //   dy: 70,
          //   dWidth: 60,
          //   dHeight: 60
          // }
        })
        this.setData({
          modalName: "Image"
        })
      } else {
        wx.showModal({
          content: res.data.msg,
          showCancel: false
        })
      }
    })
    // drawQrcode({
    //   width: 200,
    //   height: 200,
    //   canvasId: 'myQrcode',
    //   // ctx: wx.createCanvasContext('myQrcode'),
    //   text: '这里是16位的字符串uuid',
    //   // v1.0.0+版本支持在二维码上绘制图片
    //   // image: {
    //   //   imageResource: '../../images/icon.png',
    //   //   dx: 70,
    //   //   dy: 70,
    //   //   dWidth: 60,
    //   //   dHeight: 60
    //   // }
    // })
    // this.setData({
    //   modalName: "Image"
    // })
  },
  hideModal() {
    this.setData({
      modalName: "",
      showCancel: false
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
    let path = "/pages/share/share?recordUuid=" + this.data.reservationRecordUuid + "&projectUuid=" + this.data.projectUuid;
    console.log(path);
    return {
      title: "二维码分享",
      path
    }
  },

  initDetail(e) {
    app.api.getInvitationInfo(e).then(res => {
      console.log(res);
      if (res.data.success) {
        let mediumTypes = "";
        if (res.data.data.mediumTypes.toString() == "qrcode") {
          mediumTypes = "二维码";
        } else if (res.data.data.mediumTypes.toString() == "card") {
          mediumTypes = "卡";
        } else if (res.data.data.mediumTypes.toString() == "face") {
          mediumTypes = "脸";
        } else if (res.data.data.mediumTypes.toString() == "fingerprint") {
          mediumTypes = "指纹";
        }
        this.setData({
          src: app.globalData.imageUrl + res.data.data.photoUri,
          visitorName: res.data.data.visitorName,
          phoneNo: res.data.data.phoneNo,
          reason: res.data.data.reason,
          address: res.data.data.address,
          estimatedDatetimeArrive: res.data.data.estimatedDatetimeArrive,
          estimatedDatetimeLeave: res.data.data.estimatedDatetimeLeave,
          mediumTypes: mediumTypes,
          reservationRecordUuid: res.data.data.recordUuid,
          projectUuid: res.data.data.projectUuid
          // page: this.data.page + 1
        })
      } else {
        // this.setData({
        //   noData: true
        // })
      }
    })
  }
})