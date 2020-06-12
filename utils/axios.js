let axios = ({
  data,
  method,
  header = {},
  url,
  success = function() {},
  fail = function() {},
  complete = function() {}
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      success(res) {
        success();
        resolve(res);
        if (!res.data.success && res.data.msg != '用户不存在') {
          wx.showModal({
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail(res) {
        fail();
        reject(res);
      },
      complete(res) {
        success();
        resolve(res)
      }
    })
  })
}
module.exports = axios