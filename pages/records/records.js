const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: "",
    noData: false,
    panelData: [
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
    ],
    limit: 10,
    page: 1,
    canLoadData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  clearText() {
    if (this.data.searchText) {
      this.setData({
        searchText: ""
      })
      wx.startPullDownRefresh({

      })
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
      accountUuid: app.data.adminUser.useruuid,
      order: "createTime",
      sort: "DESC",
      condition1: this.data.searchText
    };
    app.api.getAppointList(data).then(res => {
      console.log(res);
      wx.stopPullDownRefresh();
      if (res.data.success) {
        let data = res.data.data || [];
        if (data.length) {
          let num = []
          for (let i = 0, len = data.length; i < len; i++) {
            let d = [];
            if (data[i].staffPhoneNo) {
              d.push({
                title: "被访者电话：",
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
              name: data[i].staffName,
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
  goDetail(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    console.log(this.data.panelData[index].status);
    // if (this.data.panelData[index].status === "approve") {
    console.log(this.data.panelData[index].node);
    wx.navigateTo({
      // url: '../recordDetail/recordDetail?userObj=' + JSON.stringify(this.data.panelData[index].node),
      url: "../recordDetail/recordDetail?recordUuid=" + this.data.panelData[index].node.recordUuid
    })
    // }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.getList();
    wx.startPullDownRefresh({

    });
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

  }
})