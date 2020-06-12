let httpHeader = "https://www.guangtuo.com";
// let httpHeader = "http://192.168.9.16:15000";
// let httpHeader = "http://180.167.210.2:51882";


//获取短信验证码
let getMessageCodeUrl = `${httpHeader}/backstage-v1/cellphone/validateCode`;
//验证短信验证码
let sendMessageCodeUrl = `${httpHeader}/backstage-v1/cellphone/validate`;
//开始注册
let registerUrl = `${httpHeader}/backstage-v1/register/cellphone`;
//判断是否注册
let loginUrl = `${httpHeader}/oauth-v1/authentication/code`;
let uploadImageUrl = `${httpHeader}`;
//开始预约
let appointUrl = `${httpHeader}/visitant-v1/project/visitors/reservations`
// 用户登陆
let loginUserUrl = `backstage-v1/register/cellphone`
let getAppointListUrl = `${httpHeader}/visitant-v1/project/visitors/reservations/list`
let getUserInfoUrl = `${httpHeader}/backstage-v1/accountManage/login/info`
let setUserInfoUrl = `${httpHeader}/backstage-v1/accountManage/login/info`

let imageUrl = `${httpHeader}/fileforward-server-v1/project/test_database_api/fileforward/fileByUrl?fileUrl=`

//验证用户名和密码
let loginUserPswUrl = `${httpHeader}/oauth-v1/authentication/form`
//设置用户名密码
let setPasswordUrl = `${httpHeader}/backstage-v1/register/cellphone`
//我的审批
let approvalListUrl = `${httpHeader}/visitant-v1/project/visitors/reservations/list`
let approvalVisitorUrl = `${httpHeader}/visitant-v1/project/265656/visitors/reservations/approval`
let approvalDetailUrl = `${httpHeader}/visitant-v1/project/visitors/reservations`

//访客邀请管理
let addInvitationUrl = `${httpHeader}/visitant-v1/project/visitors/invitations`
let invitationListUrl = `${httpHeader}/visitant-v1/project/visitors/invitations/page`
let invitationDetailUrl = `${httpHeader}/visitant-v1/project/visitors/invitations/record`
let getAddresslUrl = `${httpHeader}/visitant-v1/project/visitors/staff/address`
let dynamicQrcodlUrl = `${httpHeader}/visitant-v1/project`
let getIdCardInforlUrl = `${httpHeader}/visitant-v1/idcard/verify`
let checkIdPersonlUrl = `${httpHeader}/visitant-v1/staff/idacrd/verify`
// 获取预约记录详情
let recordDetailUrl = (recordUuid) => `${httpHeader}/visitant-v1/project/visitors/reservations/${recordUuid}`
// 处理审批记录
let dealApprovalDetailUrl = (projectUuid) => `${httpHeader}/visitant-v1/project/${projectUuid}/visitors/reservations/approval`
// let dealApprovalDetailUrl = (projectUuid) => `http://192.168.9.166:15019/project/${projectUuid}/visitors/reservations/approval`
// 预约取消
let cancelAppiontUrl = `${httpHeader}/visitant-v1/visitors/program/cancel`;
// 获取用户地址
// let getVisitorAddressUrl = `${httpHeader}/visitant-v1/visitor/address`
let getVisitorAddressUrl = `${httpHeader}/visitant-v1/visitor/address`;
let getUserDescriptionUrl = `${httpHeader}/visitant-v1/visitor/description`;
module.exports = {
  getVisitorAddressUrl,
  getUserDescriptionUrl,
  registerUrl,
  dealApprovalDetailUrl,
  cancelAppiontUrl,
  sendMessageCodeUrl,
  getMessageCodeUrl,
  loginUrl,
  appointUrl,
  loginUserUrl,
  getAppointListUrl,
  recordDetailUrl,
  getUserInfoUrl,
  setUserInfoUrl,
  setPasswordUrl,
  imageUrl,
  loginUserPswUrl,
  approvalListUrl,
  approvalVisitorUrl,
  addInvitationUrl,
  invitationListUrl,
  invitationDetailUrl,
  approvalDetailUrl,
  getAddresslUrl,
  dynamicQrcodlUrl,
  getIdCardInforlUrl,
  checkIdPersonlUrl
}