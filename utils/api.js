import urlList from './url.js';
import axios from './axios.js'

let tokenObj = wx.getStorageSync('token')

// 发送验证码code给后端
const sendMessageCode = (data) => {
  let url = urlList.sendMessageCodeUrl;
  return axios({
    url,
    method: "post",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
// 验证短信验证码
const sendMeaasgeCode = (data) => {
  console.log(urlList);
  let url = urlList.sendMeaasgeCodeUrl;
  return axios({
    url,
    method: "post",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}

//获取短信验证码
const getMessageCode = (xhr) => {
  let api = urlList.getMessageCodeUrl;
  console.log(api);
  let data = {
    cellphoneNo: xhr
  };
  return axios({
    url: api,
    method: 'get',
    data: data,
  });
}
//发起预约
const sendAppoint = (data) => {
  let api = urlList.appointUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'post',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data,
  });
}

//登录用户
const loginUser = (data) => {
  let api = urlList.loginUrl;
  console.log(data);
  let params = {
    'code': data
  };
  return axios({
    url: api,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  });
}
//开始注册
const register = (data) => {
  let api = urlList.registerUrl;
  return axios({
    url: api,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });
}

// 查询预约记录
const getAppointList = (data) => {
  let api = urlList.getAppointListUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 查询预约记录
const getUserDescription = (data) => {
  let api = urlList.getUserDescriptionUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 查询用户地址
const getVisitorAddress = (data) => {
  let api = urlList.getVisitorAddressUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 查询预约记录的详情
const recordDetail = (uuid) => {
  let api = urlList.recordDetailUrl(uuid);
  let tokenObj = wx.getStorageSync('token');
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    }
  });
}
// 查询预约记录
const dealApprovalDetail = (uuid, data) => {
  let api = urlList.dealApprovalDetailUrl(uuid);
  let tokenObj = wx.getStorageSync('token');
  return axios({
    url: api,
    method: 'put',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 取消预约记录
const cancelAppiont = (data) => {
  let api = urlList.cancelAppiontUrl;
  let tokenObj = wx.getStorageSync('token');
  return axios({
    url: api,
    method: 'put',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 查询用户信息
const getUserInfo = (data) => {
  let api = urlList.getUserInfoUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 设置用户信息
const setUserInfo = (data) => {
  let api = urlList.setUserInfoUrl;
  let tokenObj = wx.getStorageSync('token');
  return axios({
    url: api,
    method: 'put',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
//设置用户密码
const setPassword = (data) => {
  let api = urlList.setPasswordUrl;
  return axios({
    url: api,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });
}

//验证用户名和密码
const loginUserPsw = (data) => {
  let api = urlList.loginUserPswUrl;
  let tokenObj = wx.getStorageSync('token');
  return axios({
    url: api,
    method: 'post',
    header: {
      'Authorization': 'Basic d2ViOjEyMzQ1Ng==' + tokenObj.token.accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });
}

// 查询审批记录
const getApprovalList = (data) => {
  let api = urlList.approvalListUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}

// 查询审批详情
const getApprovalDetail = (data) => {
  let api = urlList.approvalDetailUrl + "/" + data;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
  });
}

//修改审批
const modifyApproval = (data) => {
  let api = urlList.approvalVisitorUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'put',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
//新增访客邀请信息
const addInvitation = (data) => {
  let api = urlList.addInvitationUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'post',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data,
  });
}
// 查询访客邀请列表
const getInvitationList = (data) => {
  let api = urlList.invitationListUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}
// 查询访客邀请信息
const getInvitationInfo = (data) => {
  let api = urlList.invitationDetailUrl + "/" + data;;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
  });
}

// 查询访客邀请二维码
const getDynamicQrcode = (data, projectUuid) => {
  let api = urlList.dynamicQrcodlUrl + "/" + projectUuid + "/visitQRcode";
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}

// 查询地址列表
const getAddressList = (data) => {
  let api = urlList.getAddresslUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'get',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data
  });
}

// 识别证件信息
const getIdCardInfor = (data) => {
  let api = urlList.getIdCardInforlUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'post',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data,
  });
}

// 人证核验
const checkIdPersonInfor = (data) => {
  let api = urlList.checkIdPersonlUrl;
  let tokenObj = wx.getStorageSync('token');
  console.log(tokenObj);
  return axios({
    url: api,
    method: 'post',
    header: {
      'Authorization': 'bearer ' + tokenObj.token.accessToken
    },
    data,
  });
}

module.exports = {
  register,
  getUserDescription,
  sendMessageCode,
  getMessageCode,
  loginUser,
  sendAppoint,
  getUserInfo,
  setUserInfo,
  getAppointList,
  recordDetail,
  setPassword,
  loginUserPsw,
  getApprovalList,
  modifyApproval,
  dealApprovalDetail,
  addInvitation,
  getInvitationList,
  getInvitationInfo,
  getApprovalDetail,
  getAddressList,
  getDynamicQrcode,
  cancelAppiont,
  getIdCardInfor,
  checkIdPersonInfor,
  getVisitorAddress
}