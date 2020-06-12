Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    status: {
      type: String,
      value: "审批通过"
    },
    name: {
      type: String,
      value: ""
    },
    data: {
      type: Array,
      value: [{
        title: "被访者电话：",
        value: "13844541245",
        src: "../images/phone.png"
      }, {
        title: "预约原因：",
        value: "朋友做客",
        src: "../images/yuyuereson.png"
      }, {
        title: "访问地址：",
        value: "恒通大厦11层",
        src: "../images/homeaddress.png"
      }, {
        title: "到访时间：",
        value: "2018-8-8 08:00",
        src: "../images/arrivetime.png"
      }, {
        title: "离开时间：",
        value: "2018-8-9 08:00",
        src: "../images/leavetime.png"
      }]
    }
  },

  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {},
    moved() {},
    detached() {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {},
    hide() {},
    resize() {},
  },

  methods: {
    onMyButtonTap() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod() {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange(newVal, oldVal) {

    }
  }

})