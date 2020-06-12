const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headurl: "../../images/smallheader.png",
    userName: "",
    userPhone: "",
    homeList: [
      //   {
      //   address: "21期／测试楼栋／测试单元／1层",
      //   areaName: "测试小区",
      //   staffNum: 9
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  goPersonInfo() {
    wx.navigateTo({
      url: '/pages/personInfo/personInfo',
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
    this.getData();
  },
  getAddres(phoneNo) {
    app.api.getVisitorAddress({
      phoneNo: phoneNo
    }).then(res => {
      console.log(res);
      if (res.data.success) {
        this.setData({
          homeList: res.data.data || []
        })
      }
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
        this.setData({
          userName: data.staffName || "",
          headurl: imageUlr,
          userPhone: data.phoneNo || ""
        })
        app.data.userInfo = data;
        if (data.phoneNo) {
          this.getAddres(data.phoneNo);
        }
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
    // setTimeout(() => {
    //   wx.stopPullDownRefresh();
    // }, 3000);
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // wx.showToast({
    //   title: '上拉触底事件',
    // })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})