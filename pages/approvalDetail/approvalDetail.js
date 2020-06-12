const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "../../images/header.png",
    fileData: '',
    userObj: '',
    name: "",
    phone: "",
    expImage: false,
    qrCodeSrc: '',
    isFirstDraw: false,
    addressArr: [],
    addressObjectArr: [],
    isShow_01: false,
    listData_01: [
      ['太阳', '月亮', '星星']
    ],
    addresIndex: -1,
    credentialsArr: [{
      value: "qrcode",
      label: '二维码'
    }, {
      value: "face",
      label: '脸'
    }],
    credentArr: ["二维码", "脸"],
    credentialsIndex: 0,
    time: '',
    date: '',
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
  bindPickerChange(e) {
    this.setData({
      addresIndex: e.detail.value
    })
  },
  bindPickerChange2(e) {
    this.setData({
      credentialsIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("options==", JSON.parse(options.userObj).recordUuid);
    // this.initDetail(JSON.parse(options.userObj).recordUuid);
    app.api.recordDetail(options.recordUuid).then((res) => {
      console.log(res);
      if (res.data.success) {
        let userObj = res.data.data;
        this.setData({
          userObj: userObj
        });
        const data = userObj;
        console.log(app.data.userInfo);
        let index = 0;
        if (data.mediumTypes) {
          for (let i = 0; i < this.data.credentialsArr.length; i++) {
            if (this.data.credentialsArr[i].value == data.mediumTypes[0]) {
              index = i;
              break;
            }
          }
        }

        this.setData({
          credentArr: (res.data.data.verifyState == "identity_verified") ? ["二维码", "脸"] : ["二维码"],
          time: data.estimatedDatetimeLeave.split(" ")[1],
          date: data.estimatedDatetimeLeave.split(" ")[0],
          src: data.snapOriginalPhotoUri ? (app.globalData.imageUrl + data.snapOriginalPhotoUri) : "../../images/smallheader.png",
          // src: app.data.userInfo.extInfo.snapOriginalPhotoUri || '../../images/header.png',
          name: data.visitorName,
          phone: data.phoneNo,
          addressArr: [userObj.proAndAddressList.map((val) => val.adress)],
          addressObjectArr: userObj.proAndAddressList,
          credentialsIndex: index
        })
        console.log(this.data.addressArr);
      }
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

  },
  showPicker_01: function() {
    console.log(1);
    this.setData({
      isShow_01: true
    })
  },
  sureCallBack_01(e) {
    console.log(e);
    let data = e.detail
    this.setData({
      isShow_01: false,
      picker_01_data: e.detail.choosedData,
      addresIndex: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_01() {
    this.setData({
      isShow_01: false,
    })
  },
  agreeApproval(e) {
    console.log(e);
    let op = e.currentTarget.dataset.op;
    console.log(this.data.userObj);
    console.log(app.data);
    if (this.data.credentialsIndex === 1 && app.data.userInfo.extInfo.verifyState !== "identity_verified") {
      wx.showModal({
        content: '开门凭证是人脸，请完成人脸验证！',
        showCancel: false
      })
      return;
    }
    if (this.data.addresIndex === -1) {
      wx.showModal({
        content: '请选择访问地址',
        showCancel: false
      })
      return;
    }
    let user = this.data.userObj;
    console.log(this.data.addressObjectArr);
    console.log(this.data.addresIndex);
    let index = parseInt(this.data.addresIndex.substring(1, this.data.addresIndex.length - 1));
    console.log(index);
    console.log(this.data.credentialsArr)
    console.log(this.data.credentialsIndex)
    let data = {
      "recordUuid": user.recordUuid, //访客预约记录uuid
      "visitorUuid": user.visitorUuid, //访客账号UUID
      "estimatedDatetimeLeave": this.data.date + " " + this.data.time, //预约离开时间
      "address": this.data.addressObjectArr[index].adress,
      //访问地址

      "mediumTypes": [this.data.credentialsArr[this.data.credentialsIndex].value],
      //开门凭证/媒介类型
      "approveState": op == "1" ? "approve" : "rejected",
      //审批状态
      //通过：approve，拒绝：rejected，取消cancled
      "approveUserUuid": app.data.adminUser.useruuid,
      //审批人账号UUID
      "approveDatetime": app.globalData.formatDateTime(new Date())
      //审批时间
    };
    console.log(data);
    app.api.dealApprovalDetail(this.data.addressObjectArr[index].projectUuid, data).then(res => {
      console.log(res);
      if (res.data.success) {
        wx.showModal({
          content: '操作成功',
          showCancel: false,
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        wx.showModal({
          title: '请求失败',
          showCancel: false,
          content: res.data.data,
        })
      }
    })
  },
  initDetail(e) {
    app.api.getApprovalDetail(e).then(res => {
      console.log(res);
      if (res.data.success) {
        // this.setData({
        //   panelData: this.data.panelData.concat(num),
        //   page: this.data.page + 1
        // })
      } else {
        // this.setData({
        //   noData: true
        // })
      }
    })
  }


})