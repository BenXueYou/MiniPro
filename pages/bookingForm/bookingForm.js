// pages/bookingForm/bookingForm.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['朋友做客', '原因2', '原因3', '原因4'],
    index: 0,
    time: '',
    date: '',
    src: "../../images/header.png",
    fileData: '',
    name: "--",
    phone: "xxxx-xxxx-xxxx",
    identifyNo: '',
    respondentPhone: '',
    respondentName: '',
    reason: '',
    licensePlate: '',
    submitBtnDisabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // 判断options有没有参数，表示
    if (options.data) {
      let {
        respondentPhone,
        respondentName,
        licensePlate,
        reason,
        date,
        time
      } = JSON.parse(options.data);
      this.setData({
        respondentPhone,
        respondentName,
        licensePlate,
        reason,
        date,
        time
      })
    } else {
      this.setData({
        date: app.globalData.formatDate(new Date()),
        time: app.globalData.formatTime(new Date()),
      })
    }

    //获取数据 
    const _this = this;
    const data = app.data.userInfo;
    if (!data.username) {
      app.getPersonInfo().then(() => {
        _this.fuzhi();
      })
    } else {
      this.fuzhi();
    }

  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  reasonInput(evt) {
    this.setData({
      reason: evt.detail.value
    });
  },
  respondentPhoneInput(evt) {
    this.setData({
      respondentPhone: evt.detail.value
    });
  },
  respondentNameInput(evt) {
    this.setData({
      respondentName: evt.detail.value
    });
  },
  submitAct() {
    console.log("提交预约");
    if (!this.data.respondentName) {
      wx.showToast({
        title: "被访人姓名为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return
    }
    if (!this.data.respondentPhone) {
      wx.showToast({
        title: "被访人电话为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return
    }
    if (!this.data.reason) {
      wx.showToast({
        title: "预约原因为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return
    }
    if (this.data.name && this.data.phone) {
      // if (1) {
      // let data = {
      //   "base64": this.data.fileData,
      //   "licensePlate": this.data.licensePlate,
      //   "photoUrl": this.data.src,
      //   "reason": this.data.reason,
      //   "respondentName": this.data.respondentName,
      //   "respondentPhone": this.data.respondentPhone,
      //   "visitTime": this.data.date + ' ' + this.data.time + ":00",
      //   "visitorName": this.data.name,
      //   "visitorPhone": this.data.phone
      // }
      let data = {
        "visitorInfo": {
          "phoneNo": this.data.phone, //手机号码
          "visitorName": this.data.name, //姓名
          "visitorUuid": app.data.adminUser.useruuid, //访客uuid
          // // "gender": "string", //性别
          // // "certificateType": "string", //访客证件类型
          // // "certificateNo": "322210198412052130", //证件号
          // // "certificatePhotoUri": "string",
          // //访客证件照片原图URI
          // "snapPhotoUri": "string",
          // //访客登记时抓拍照片URI
          // "snapOriginalPhotoUri": "string",
          // //访客登记时抓拍照片缩略图URI
          "plateNo": this.data.licensePlate,
          // //车牌号码
          // "company": "上海广拓" //访客单位
        },
        "staffInfo": {
          // "staffUuid": "string", //被访者UUID
          "staffName": this.data.respondentName, //被访者姓名
          "staffPhoneNo": this.data.respondentPhone //被访者手机号码
        },
        "visitationInfo": {
          // "projectUuid": "asdasfas",
          // "belongings": ["string", "string"],
          // //携带物品
          // "remarks": "string", //备注 
          // "reservationType": "", //预约/邀请
          "reason": this.data.reason,
          // //预约原因/拜访事由
          // "validDatetimeBegin": this.data.reason,
          // //访客有效期开始时间
          // "validDatetimeEnd": "2019-06-18 12:34",
          // //访客有效期结束时间
          "estimatedDatetimeLeave": this.data.date + ' 23:59:59',
          // //预计到访时间
          "estimatedDatetimeArrive": this.data.date + ' ' + this.data.time,
          // //预计离开时间
          "source": "smallprogram",
          // //预约来源（访客机/APP/...）
          // "deviceUuid": "dsfgserhsrth"
          // //如果是访客机登记，此处填写访客机UUID
        },
        // "approveState": "string", //审批状态
        // "visitState": "string" //来访状态
      }
      wx.showLoading({
        title: '正在提交',
      });
      this.setData({
        submitBtnDisabled: true
      });
      var that = this;
      setTimeout(function() {
        wx.hideLoading();
        that.setData({
          submitBtnDisabled: false
        });
      }, 10000)
      app.api.sendAppoint(data).then(res => {
        console.log(res);
        wx.hideLoading();
        this.setData({
          submitBtnDisabled: false
        });
        console.log(this.data);
        let userData = {
          respondentName: this.data.respondentName,
          respondentPhone: this.data.respondentPhone,
          reason: this.data.reason,
          date: this.data.date,
          time: this.data.time
        }
        if (res.data.success) {
          wx.navigateTo({
            url: '../appointSuccess/appointSuccess?userObj=' + JSON.stringify(userData),
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            image: '../../images/delete_icon.png',
            duration: 1500
          });
        }
      });
    } else {
      wx.showToast({
        title: "完善拜访人信息",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
    }
  },
  licensePlateInput(evt) {
    this.setData({
      licensePlate: evt.detail.value
    });
  },
  certifyAct() {
    console.log('认证');
    wx.navigateTo({
      url: '../personInfo/personInfo',
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
    this.fuzhi();
  },
  //获取当前用户信息
  fuzhi() {
    const data = app.data.userInfo;
    console.log(app.data);
    let dateNow = new Date();
    if (data) {
      this.setData({
        src: data.extInfo && data.extInfo.snapOriginalPhotoUri ? (app.globalData.imageUrl + data.extInfo.snapOriginalPhotoUri) : "../../images/smallheader.png",
        name: data.staffName || "",
        phone: data.phoneNo || ""
      })
    }
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