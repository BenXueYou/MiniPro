import api from './utils/api.js';
import urlList from './utils/url.js';
import util from './utils/util.js';
console.log(api);
App({
  onLaunch: function() {
    this.init();
  },
  init() {
    const that = this;
    // 刚进来获取用户的code,然后根据后端判断是否注册过，没有注册过就行注册。
    wx.showLoading({
      title: '验证中',
    });
    wx.login({
      success(res) {
        console.log(res);
        wx.hideLoading();
        wx.showLoading({
          title: '验证中',
        });
        api.loginUser(res.code).then(result => {
          console.log(res.code, result);
          wx.hideLoading();
          if (result.data.success) {
            console.log(getCurrentPages());
            let pages = getCurrentPages();
            if (pages[0].route === "pages/share/share") {
              return;
            }
            // 根据返回的结果，判断用户是否注册过，1.没有注册过，就跳转到注册页面；2.注册过，就跳转到首页
            let data = result.data.data;
            that.data.token = data.token;
            that.data.adminUser = data.adminUser;
            console.log(data);
            try {
              wx.setStorageSync('token', data);
              wx.switchTab({
                url: '/pages/booking/booking',
              });
            } catch (e) {}
            console.log(result);
            console.log('预约');
            wx.switchTab({
              url: '/pages/booking/booking',
            });
            that.getPersonInfo();
          } else {
            console.log('注册');
            // 默认首页就是注册页面，就不用进行条状了。
            var pages = getCurrentPages() //获取加载的页面
            console.log(pages);
            if (pages.length) {
              var currentPage = pages[pages.length - 1] //获取当前页面的对象
              var url = currentPage.route //当前页面url 
              if (url === 'pages/register/register') return;
              wx.redirectTo({
                url: '/pages/register/register',
              })
            }
          }
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    api_token: '',
    imageUrl: urlList.imageUrl,
    formatDateTime: util.formatDateTime,
    formatDate: util.formatDate,
    formatTime: util.formatTime
  },
  getPersonInfo() {
    const that = this;
    // 获取用户的信息
    return new Promise((resolve, reject) => {
      api.getUserInfo().then(res => {
        console.log(res);
        if (res.data.success) {
          let data = res.data.data || {};
          console.log(that.globalData.imageUrl);
          let imageUlr = data.photoUrl ? that.globalData.imageUrl + data.photoUrl : "../../images/smallheader.png";
          // nickname: "",
          // photoUrl: "",
          // username: "",
          // useruuid: ""
          data.photoUrl = imageUlr;
          data.username = data.staffName;

          that.data.userInfo = data;
        } else {
          wx.showToast({
            title: "请求不成功!",
          })
        }
        resolve();
      })
    })
  },
  api: api, // 没有请求调用的入口函数
  data: {
    openId: "", //用户Id的唯一值
    userInfo: {
      nickname: "",
      photoUrl: "",
      username: "",
      useruuid: ""
    },
    token: {
      accessToken: "4fd81974-c9b3-4648-b501-ef42dcc6db17",
      expiresIn: 603694,
      refreshToken: "981a265f-e9e4-4b22-9fb2-d8f41329eb60",
      scope: "all,read,write",
      tokenType: "bearer"
    }
  } // 用来存储全局的变量
})