// pages/againCertify/againCertify.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '../../images/smallheader.png',
    identifyNo: '',
    personName: '',
    fileData: '',
    imgWidth: '',
    imgHeight: '',
    isSnap: true,
    nameInput: '',
    idNumberInput: '',
    addressInput: '',
    isCertify: true,
    faceSrc: '../../images/smallheader.png',
    nameCom: '',
    idNumberCom: '',
    adressCom: "",
    nameCertify: '',
    idNumberCertify: '',
    addressCertify: '',
    uploadIdNumber: false,
    uploadPortrait: false,
    uploadIdIcon: "./../../images/appoint_bg.png",
    uploadHeaderIcon: "./../../images/appoint_bg.png",
    nameVal: '',
    idNumberVal: '',
    addressVal: '',
    headerSuffix: '',
    tempFilePaths: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  personNameAct(e){
    console.log(e.detail.value);
    this.setData({
      personName:e.detail.value
    });
    var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
    var currentPage = pages[pages.length - 1] //当前界面
    var prePage = pages[pages.length - 2] //上一个界面
    prePage.setData({
      name: e.detail.value,
    });
  },
  identifyNoAct(e){
    console.log(e.detail.value);
    var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
    var currentPage = pages[pages.length - 1] //当前界面
    var prePage = pages[pages.length - 2] //上一个界面
    prePage.setData({
      identifyNo: e.detail.value,
      
    });
  },
  phoneNoAct(e){
    var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
    var currentPage = pages[pages.length - 1] //当前界面
    var prePage = pages[pages.length - 2] //上一个界面
    prePage.setData({
      phone: e.detail.value,
    });
  },
  uploadIdNumberImage() {
    var _this = this;
    wx.chooseImage({
      success(res) {
        console.log("res11111====", res);
        const tempFilePaths = res.tempFilePaths;
        // _this.identifyIdCardInfor(tempFilePaths[0]);
        _this.setData({
          tempFilePaths: tempFilePaths[0]
        });
        var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
        var currentPage = pages[pages.length - 1] //当前界面
        var prePage = pages[pages.length - 2] //上一个界面
        console.log(res);
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径 
          encoding: 'base64', //编码格式 
          success: res => {
            //成功的回调 
            // console.log('data:image/png;base64,' + res.data);
            // prePage.setData({
            //   fileData1: res.data,
            // });
            console.log("fileData==", res)
            _this.identifyIdCardInfor(res.data)
          }
        })
        //以下两行注释的是同步方法，不过我不太喜欢用。 
        //
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
        //console.log(base64);
      }
    })
  },

  urlToBase64(res) {
    wx.getImageInfo({
      src: res.tempFilePaths[0],
      success: res => {
        this.setData({
          imgWidth: res.width,
          imgHeight: res.height
        })
      }
    })
    let canvas = wx.createCanvasContext('canvas');
    // 1. 绘制图片至canvas 
    console.log('1. 绘制图片至canvas ');
    canvas.drawImage(res.tempFilePaths[0], 0, 0, this.data.imgWidth, this.data.imgHeight);
    // 绘制完成后执行回调 
    console.log('绘制完成后执行回调  ');
    canvas.draw(false, () => {
      console.log(' 2. 获取图像数据  ');
      // 2. 获取图像数据 
      wx.canvasGetImageData({
        canvasId: 'canvas',
        x: 0,
        y: 0,
        width: this.data.imgWidth,
        height: this.data.imgHeight,
        success(res) {
          // 3. png编码 
          let pngData = upng.encode([res.data.buffer], res.width, res.height);
          // 4. base64编码 
          let base64 = wx.arrayBufferToBase64(pngData);
          console.log(base64);
          // ...
        }
      })
    })

  },

  uploadHeaderImage() {
    var _this = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        console.log("tempFilePaths===", tempFilePaths[0].substring(tempFilePaths[0].lastIndexOf('.')+1));
        _this.setData({
          uploadHeaderIcon: tempFilePaths[0],
          uploadPortrait: true,
        });
        var pages = getCurrentPages() // 获取栈中全部界面的, 然后把数据写入相应界面
        var currentPage = pages[pages.length - 1] //当前界面
        var prePage = pages[pages.length - 2] //上一个界面
        prePage.setData({
          src: _this.data.imageSrc
        });
        console.log(res);
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径 
          encoding: 'base64', //编码格式 
          success: res => {
            //成功的回调 
            // console.log('data:image/png;base64,' + res.data);
            _this.setData({
              fileData: res.data,
              headerSuffix: _this.data.uploadHeaderIcon.substring(_this.data.uploadHeaderIcon.lastIndexOf('.') + 1)
            });
          }
        })
        //以下两行注释的是同步方法，不过我不太喜欢用。 
        //
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
        //console.log(base64);
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
    console.log("返回")
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

  switchSnap() {
    this.setData({
      isSnap: true
    });
  },

  switchInput() {
    this.setData({
      isSnap: false
    });
  },
  
  save() {
    this.setData({
      isCertify: false
    });
  },
  identifyIdCardInfor(e) {
    let data = {
      image: e,
      suffix: this.data.tempFilePaths.substring(this.data.tempFilePaths.lastIndexOf('.') + 1)
    };
    console.log("data===", data);
    app.api.getIdCardInfor(data).then(res => {
      console.log(res);
      if (res.data.success) {
        if (res.data.data.name) {
          this.setData({
            nameCertify: res.data.data.name,
            idNumberCertify: res.data.data.idcardNum,
            addressCertify: res.data.data.address,
            uploadIdNumber: true,
            uploadIdIcon: 'data:image/jpeg;base64,' + e
          });
        } else {
          wx.showToast({
            title: "证件识别失败",
            image: '../../images/delete_icon.png',
            duration: 1500
          });
        }
      } else {
        wx.showToast({
          title: "证件识别失败",
          image: '../../images/delete_icon.png',
          duration: 1500
        });
      }
    })
  },
  saveConfirm() {
    let idNumber,name,adress;
    if (this.data.isSnap) {
      console.log("拍摄录入");
      idNumber = this.data.idNumberCertify;
      name = this.data.nameCertify;
      adress = this.data.addressCertify;
    } else {
      console.log("手动输入");
      idNumber = this.data.idNumberVal;
      name = this.data.nameVal;
      adress = this.data.addressVal;
    }
    if (idNumber == "") {
      wx.showToast({
        title: "身份证不能为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    if (name == "") {
      wx.showToast({
        title: "姓名不能为空",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    // if (adress == "") {
    //   wx.showToast({
    //     title: "地址不能为空",
    //     image: '../../images/delete_icon.png',
    //     duration: 1500
    //   });
    //   return;
    // }
    if (this.data.fileData == "") {
      console.log("this.data===", this.data);
      wx.showToast({
        title: "请上传人像面",
        image: '../../images/delete_icon.png',
        duration: 1500
      });
      return;
    }
    this.setData({
      faceSrc: 'data:image/png;base64,' + this.data.fileData,
      nameCom: name,
      idNumberCom: idNumber,
      adressCom: adress,
      isCertify: false
    });
  
  },
  nameInput(evt) {
    this.setData({
      nameVal: evt.detail.value
    });
  },
  idNumberInput(evt) {
    this.setData({
      idNumberVal: evt.detail.value
    });
  },
  addressInput(evt) {
    this.setData({
      addressVal: evt.detail.value
    });
  },
  saveCommit() {
    let data = {
      idCard: this.data.idNumberCom,
      image: this.data.fileData, //image与url 字段二选一，当url 有值时，image 字段内容忽略 
      livenessControl: "NORMAL", //NONE，LOW，NORMAL，HIGH
      name: this.data.nameCom,
      qualityControl: "NORMAL", //NONE，LOW，NORMAL，HIGH
      url: "",
      suffix: this.data.headerSuffix
    }
    app.api.checkIdPersonInfor(data).then(res => {
      console.log(res);
      if (res.data.success) {
        wx.switchTab({
          url: '../peron/peron',
        });
      } else {
      }
    })
  }


})