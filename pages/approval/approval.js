// pages/approval/approval.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
    limit: 10,
    page: 1,
    searchText: "",
    panelData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getList();
  },
  clearText() {
    if (this.data.searchText !== "") {
      this.setData({
        searchText: ""
      });
      wx.startPullDownRefresh();
    }

  },
  searchTextChange(e) {
    this.setData({
      searchText: e.detail.value
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
    wx.startPullDownRefresh({

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
    // wx.showToast({
    //   title: '监听用户下拉动作',
    // });
    this.setData({
      noData: false,
      page: 1,
      panelData: []
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.noData) {
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  goApprovalDetail: function(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../approvalDetail/approvalDetail?recordUuid=' + this.data.panelData[index].node.recordUuid,
    })
    // if (this.data.panelData[index].node.approveState == "unexamine") {

    // }

  },
  startSearch() {
    this.setData({
      noData: false,
      page: 1,
      panelData: []
    })
    this.getList();
  },
  getList() {
    console.log(app.data);
    let data = {
      limit: this.data.limit,
      page: this.data.page,
      staffPhoneNo: app.data.userInfo.phoneNo,
      order: "createTime",
      sort: "DESC",
      condition1: this.data.searchText
    };
    if (this.data.noData) {
      console.log('没有数据了！');
      return;
    }
    app.api.getAppointList(data).then(res => {
      console.log(res);

      wx.stopPullDownRefresh();
      if (res.data.success) {
        // if (this.data.page === 1 && this.panelData.length) {
        //   wx.showToast({
        //     title: '已刷新'
        //   })
        // }
        let data = res.data.data || [];
        // [{
        //   title: "被访者电话：",
        //   value: "13844541245",
        //   src: "../../images/phone.png"
        // }, { 
        //   title: "预约原因：",
        //   value: "朋友做客",
        //   src: "../../images/yuyuereson.png"
        // }, {
        //   title: "访问地址：",
        //   value: "恒通大厦11层",
        //   src: "../../images/homeaddress.png"
        // }, {
        //   title: "到访时间：",
        //   value: "2018-8-8 08:00",
        //   src: "../../images/arrivetime.png"
        // }, {
        //   title: "离开时间：",
        //   value: "2018-8-9 08:00",
        //   src: "../../images/leavetime.png"
        // }]
        if (data.length) {
          // address: ""
          // approveState: "string"
          // estimatedDatetimeArrive: ""
          // estimatedDatetimeLeave: "2019-07-08 16:03:09"
          // phoneNo: ""
          // plateNo: "11111"
          // reason: ""
          // recordUuid: "a199c49aa26749b4b3e7f5caaf826eab"
          // reservationDatetime: "2019-07-08 16:03:46"
          // staffName: "asdgasd"
          // staffPhoneNo: "13325879632"
          // visitorName: ""
          let num = []
          for (let i = 0, len = data.length; i < len; i++) {
            let d = [];
            if (data[i].staffPhoneNo) {
              d.push({
                title: "访客电话：",
                value: data[i].staffPhoneNo || "",
                src: "../../images/phone.png"
              });
            }
            // if (data[i].reason) {
            d.push({
              title: "预约原因：",
              value: data[i].reason || "",
              src: "../../images/yuyuereson.png"
            })
            // }
            // if (data[i].respondentAdress) {
            d.push({
              title: "访问地址：",
              value: data[i].address || "",
              src: "../../images/homeaddress.png"
            });

            // }
            // if (data[i].visitTime) {
            d.push({
              title: "到访时间：",
              value: data[i].estimatedDatetimeArrive || "",
              src: "../../images/arrivetime.png"
            });
            if (data[i].approveState != "unexamine" && (data[i].approveState == "cancled" && data[i].projectUuid)) {
              d.push({
                title: "离开时间：",
                value: data[i].estimatedDatetimeLeave || "",
                src: "../../images/arrivetime.png"
              });
            }
            // }
            num.push({
              data: d,
              name: data[i].visitorName,
              status: data[i].approveState,
              node: data[i]
            });
          }
          console.log(num);
          this.setData({
            panelData: this.data.panelData.concat(num),
            page: this.data.page + 1
          })
        } else {
          this.setData({
            noData: true
          })
        }
      } else {
        wx.showModal({
          content: res.data.msg,
          showCancel: false
        })
      }
    })
  },

})