// pages/invition/invition.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 10,
    page: 1,
    panelData: [],
    searchCondition: ""
    // panelData: [{
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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

    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  goInviteDetail(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/inviteDetail/inviteDetail?userObj=' + this.data.panelData[index].recordUuid,
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
    this.setData({
      panelData: [],
      page: 1,
      condition1: "",
      searchCondition: ""
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  goAdd(e) {
    wx.navigateTo({
      url: '/pages/invititeAdd/invititeAdd',
    })
  },

  getList() {
    let data = {
      limit : this.data.limit,
      page: this.data.page,
      accountUuid: app.data.userInfo.accountUuid,
      condition1: this.data.searchCondition
    };
    app.api.getInvitationList(data).then(res => {
      console.log(res);
      // if (this.data.page === 1) {
      //   wx.showToast({
      //     title: '已刷新'
      //   })
      // }
      wx.stopPullDownRefresh();
      if (res.data.success) {
        let data = res.data.data.list || [];
        if (data.length) {
          this.setData({
            panelData: data,
            page: this.data.page + 1
          })
        } else {
          // this.setData({
          //   noData: true
          // })
        }
      }
    })
  },
  searchInput(evt) {
    this.setData({
      searchCondition: evt.detail.value
    });
  },
  seachList() {
    this.setData({
      panelData: [],
      page: 1
    });
    this.getList();
  }
})