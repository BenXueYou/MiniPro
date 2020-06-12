// pages/invition/invition.js
const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.min.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRequest: false,
    reservationRecordUuid: "",
    staffUuid: "",
    projectUuid: "",
    adressArr: [],
    index: 0,
    isAnnual: 0, //收入状况默认选择的下标
    medium: [{
        key: "二维码",
        value: "qrcode"
      },
      {
        key: "脸",
        value: "face"
      }
    ],
    select: false,
    selectAdress: false,
    tihuoWay: '门店自提',
    panelData: [{
      title: "被访者电话：",
      value: "13844541245",
      src: "../../images/phone.png"
    }, {
      title: "预约原因：",
      value: "朋友做客",
      src: "../../images/yuyuereson.png"
    }, {
      title: "访问地址：",
      value: "恒通大厦11层",
      src: "../../images/homeaddress.png"
    }, {
      title: "到访时间：",
      value: "2018-8-8 08:00",
      src: "../../images/arrivetime.png"
    }, {
      title: "离开时间：",
      value: "2018-8-9 08:00",
      src: "../../images/leavetime.png"
    }],
    src: "../../images/smallheader.png",
    time1: '12:01',
    date1: '2019-5-20',
    time2: '12:01',
    date2: '2019-5-20',
    addName: "",
    addPhone: "",
    addReason: "",
    addAdress: "",
    addIdInput: "二维码",
    picbasedata: "",
    modalName: "",
    mediumTypes: ["qrcode"],
    dynamicQrcodeUuid: "",
    photoSuffix: "",
    originalPhotoBase64Code: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let dateNow = new Date();
    this.setData({
      date1: app.globalData.formatDate(dateNow),
      time1: app.globalData.formatTime(dateNow),
      date2: app.globalData.formatDate(dateNow),
      time2: "23:59:59",
    });
    console.log("data==", app.data.userInfo)
    this.initAddress();
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
  goInviteDetail() {
    wx.navigateTo({
      url: '/pages/inviteDetail/inviteDetail',
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

  selectLocalPhoto() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        _this.setData({
          src: tempFilePaths,
          picbasedata: res.tempFilePaths[0]
        })
        console.log(tempFilePaths);
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths,
          encoding: "base64",
          success(res) {
            console.log(res);
            _this.setData({
              originalPhotoBase64Code: res.data,
              photoSuffix: _this.data.picbasedata.substring(_this.data.picbasedata.lastIndexOf('.') + 1)
            })
          }
        })
      }
    })
  },

  TimeChange1(e) {
    this.setData({
      time1: e.detail.value + ":00"
    })
  },
  DateChange1(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  TimeChange2(e) {
    this.setData({
      time2: e.detail.value + ":00"
    })
  },
  DateChange2(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  addNameInput(evt) {
    this.setData({
      addName: evt.detail.value
    });
  },
  addPhoneInput(evt) {
    this.setData({
      addPhone: evt.detail.value
    });
  },
  addReasonInput(evt) {
    this.setData({
      addReason: evt.detail.value
    });
  },
  addAdressInput(evt) {
    this.setData({
      addAdress: evt.detail.value
    });
  },
  goAdd() {
    if (this.data.addPhone=="") {
      wx.showToast({
        title: "手机号为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    if (this.data.addName == "") {
      wx.showToast({
        title: "姓名为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    this.setData({
      isRequest: true
    });
    let dateNow = new Date();
    let invitationDatetime = app.globalData.formatDate(dateNow) + " " + app.globalData.formatTime(dateNow);
    let estimatedDatetimeArrive = this.data.date1 + " " + this.data.time1;
    let estimatedDatetimeLeave = this.data.date2 + " " + this.data.time2;
    if ((new Date(estimatedDatetimeLeave)).getTime() <= (new Date(estimatedDatetimeArrive)).getTime()) {
      wx.showToast({
        title: "离开时间太小",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    let data = {
      // recordUuid: "",//记录UUID
      projectUuid: this.data.projectUuid, //项目UUID
      accountUuid: app.data.userInfo.accountUuid, //被访者（邀请人）账号UUID
      staffUuid: this.data.staffUuid, //被访者（邀请人）账号UUID
      visitorName: this.data.addName, //访客（被邀请人）姓名
      // gender: "",//访客（被邀请人）性别
      originalPhotoBase64Code: this.data.originalPhotoBase64Code, //访客（被邀请人）照片原图Base64Code
      photoSuffix: this.data.photoSuffix, //访客（被邀请人）照片文件后缀
      // originalPhotoUri: "",//访客（被邀请人）照片缩略图URI
      phoneNo: this.data.addPhone, //访客（被邀请人）手机号码
      // plateNo: "",//访客（被邀请人）车牌号
      // company: "",//访客（被邀请人）单位
      reason: this.data.addReason, //拜访事由（翻译后的string，utf-8）
      // belongings: [""],//携带物品
      address: this.data.addAdress, //访问地址（utf-8）
      invitationDatetime: invitationDatetime, //预约时间
      estimatedDatetimeArrive: estimatedDatetimeArrive, //预计到达时间
      estimatedDatetimeLeave: estimatedDatetimeLeave, //预计离开时间
      source: "smallprogram", //来源（smallprogram/APP/...）
      mediumTypes: this.data.mediumTypes, //，媒介类型
      // remarks: "", //备注
      // extInfo: {}//扩展信息
    };
    console.log("data===", data);
    app.api.addInvitation(data).then(res => {
      console.log(res);
      if (res.data.success) {
        if (this.data.mediumTypes.toString() == "qrcode") {
          this.data.reservationRecordUuid = res.data.data.reservationRecordUuid;
          this.getDynamicQrcode();
        } else if (this.data.mediumTypes.toString() == "face") {
          wx.switchTab({
            url: '../invition/invition',
          });
        }

      } else {
        // wx.showToast({
        //   title: res.data.msg,
        //   image: '../../images/delete_icon.png',
        //   duration: 1500
        // });
      }
      this.setData({
        isRequest: false
      });
    })
  },
  hideModal() {
    this.setData({
      modalName: ""
    })
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      selectAdress: false
    })
  },
  bindShowAdress() {
    this.setData({
      selectAdress: !this.data.selectAdress,
      select: false
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    let mediumArr = [];
    mediumArr.push(e.currentTarget.dataset.value);
    console.log("e====", e.currentTarget);
    this.setData({
      addIdInput: name,
      select: false,
      mediumTypes: mediumArr
    })
  },
  mySelectAdress(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      addAdress: name,
      selectAdress: false
    })
  },
  initAddress() {
    let data = {
      // staffName: app.data.userInfo.staffName,
      staffPhoneNo: app.data.userInfo.phoneNo,
      staffName: null, 
      // staffPhoneNo: "18291881410"
    };
    console.log("data===", data);
    app.api.getAddressList(data).then(res => {
      console.log(res);
      if (res.data.success) {
        if (!res.data.data.length) {
          wx.showModal({
            content: '用户没有地址，返回上一页',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({
            adressArr: res.data.data,
            projectUuid: res.data.data[0].projectUuid,
            addAdress: res.data.data[0].adress,
            staffUuid: res.data.data[0].staffUuid,
          })
        }

      } else {}
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', this.data.medium[e.detail.value].value)
    let mediumTypes = [];
    mediumTypes.push(this.data.medium[e.detail.value].value);
    this.setData({
      isAnnual: e.detail.value,
      mediumTypes: mediumTypes
    })
  },
  bindPickerAdress(e) {
    console.log('picker发送选择改变，携带值为', this.data.adressArr[e.detail.value])
    this.setData({
      index: e.detail.value,
      projectUuid: this.data.adressArr[e.detail.value].projectUuid,
      addAdress: this.data.adressArr[e.detail.value].adress,
      staffUuid: this.data.adressArr[e.detail.value].staffUuid,
    })
  },
  getDynamicQrcode() {
    let data = {
      recordUuid: this.data.reservationRecordUuid
    };
    console.log("data===", data);
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
      } else {}
    })
  }

})