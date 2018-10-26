// 网站公共方法、对象、初始化
var CONFIG = {
  pathName: window.location.pathname,
  headHtml: '<div class="wid1200">\
    <div class="logo">\
        <a href="javascript:void(0);">彩票预测</a>\
    </div>\
    <div class="mainNav">\
      <ul class="navLst">\
          <li><a href="index.html"><em>首页</em></a></li>\
          <li><a href="javascript:void(0)" onclick="Api.checkLogin(\'expertplan.html?key=1&gmKey=1\')"><em>专家计划</em></a></li>\
          <li><a href="award.html?key=1"><em>开奖号码</em></a></li>\
          <li><a href="trend.html"><em>走势图表</em></a></li>\
          <li><a href="news.html"><em>行业资讯</em></a></li>\
          <li><a href="skilliinfo.html"><em>玩法技巧</em></a></li>\
          <li><a href="javascript:void(0)" onclick="Api.checkLogin(\'extend.html\')"><em>推广赚钱</em></a></li>\
      </ul>\
    </div>\
    <div class="login" id="noLogin">\
      <span><a  href="javascript:void(0);" id="login">登录</a>|<a  href="javascript:void(0);" id="register">注册</a></span>\
      <a href="javascript:void(0)" onclick="CONFIG._addFavorite()">收藏</a>\
    </div>\
    <div class="menber" id="yesLogin"  style="display: none;">\
      <a class="mb" href="member.html" id="nickName">janena</a>\
      <a class="quit" href="javascript:void(0);" onclick="CONFIG._logout()">退出</a>\
    </div>\
  </div>',

  copyrightHtml: '<div class="footsever">\
    <ul class="clearfix">\
      <li><i class="iconfont icon-anquan"></i>账户安全</li>\
      <li><i class="iconfont icon-fenxi"></i>专家分析</li>\
      <li><i class="iconfont icon-icon1"></i>专业预测</li>\
      <li><i class="iconfont icon-shencha"></i>优质服务</li>\
    </ul>\
  </div>\
  <div class="footer">\
      <div class="mian clearfix">\
      <div class="left">\
          <div class="btnlogo"></div>\
          <div class="main">\
            <a href="javascript:void(0);">关于我们</a>\
            <a href="javascript:void(0);">推广赚钱</a>\
            <a href="javascript:void(0);">在线客服</a>\
      </div>\
        </div>\
        <div class="center">\
          <div class="tit">友情链接</div>\
          <div class="main">\
            <a href="javascript:void(0);">智能彩票推荐</a>\
            <a href="javascript:void(0);">360彩票预测</a>\
            <a href="javascript:void(0);">彩票彩票智能彩票推荐</a>\
            <a href="javascript:void(0);">智能彩票推荐</a>\
            <a href="javascript:void(0);">360彩票预测</a>\
            <a href="javascript:void(0);">智能彩票推荐</a>\
          </div>\
        </div>\
        <div class="right">\
          <div class="tit">联系我们</div>\
          <div class=""><i class="iconfont icon-xxx"></i>联系邮箱：seaono@onon.com</div>\
          <div class=""><i class="iconfont icon-xxx"></i>QQ客服：845465885</div>\
        </div>\
    </div>\
    <div class="copyright">\
    <div class="main">\
      <p>Copyright©2005-2018 360.cn版权所有</p>\
      <p>京ICP备08010314号-6</p>\
      <p class="color">本站为专业大数据分析平台  只提供彩票预测方案，预测有风险，消费需谨慎！</p>\
    </div>\
  </div>\
  </div>',

  _payGameList: [
    // 重庆时时彩
    {
      key: 1,
      icon: '<i class="iconfont icon-cqssc"></i>',
      name: "重庆时时彩",
      list: [
        { key: 1 , name: '万位杀1码'},
        { key: 2 , name: '千位杀1码'},
        { key: 3 , name: '百位杀1码'},
        { key: 4 , name: '十位杀1码'},
        { key: 5 , name: '个位杀1码'},
        { key: 6 , name: '万位杀2码'},
        { key: 7 , name: '千位杀2码'},
        { key: 8 , name: '百位杀2码'},
        { key: 9 , name: '十位杀2码'},
        { key: 10 , name: '个位杀2码'},
        { key: 11 , name: '万位杀3码'},
        { key: 12 , name: '千位杀3码'},
        { key: 13 , name: '百位杀3码'},
        { key: 14 , name: '十位杀3码'},
        { key: 15 , name: '个位杀3码'},
        { key: 16 , name: '前二杀1码'},
        { key: 17 , name: '后二杀1码'},
        { key: 18 , name: '前二杀2码'},
        { key: 19 , name: '后二杀2码'},
        { key: 20 , name: '前三杀1码'},
        { key: 21 , name: '中三杀1码'},
        { key: 22 , name: '后三杀1码'},
        { key: 23 , name: '前四杀1码'},
        { key: 24 , name: '后四杀1码'},
        { key: 25 , name: '五星杀1码'},
        { key: 27 , name: '五星定位1胆'},
        { key: 28 , name: '五星定位2胆'},
        { key: 29 , name: '龙虎'},
        { key: 30 , name: '万位定胆'},
        { key: 31 , name: '千位定胆'},
        { key: 32 , name: '百位定胆'},
        { key: 33 , name: '十位定胆'},
        { key: 34 , name: '个位定胆'},
        { key: 35 , name: '万位大小'},
        { key: 36 , name: '千位大小'},
        { key: 37 , name: '百位大小'},
        { key: 38 , name: '十位大小'},
        { key: 39 , name: '个位大小'},
        { key: 40 , name: '万位单双'},
        { key: 41 , name: '千位单双'},
        { key: 42 , name: '百位单双'},
        { key: 43 , name: '十位单双'},
        { key: 44 , name: '个位单双'},
        { key: 45 , name: '后二直选'},
        { key: 46 , name: '前二直选'},
        { key: 47 , name: '前三直选'},
        { key: 48 , name: '中三直选'},
        { key: 49 , name: '后三直选'},
        { key: 50 , name: '前二012路'},
        { key: 51 , name: '后二012路'},
        { key: 52 , name: '前二合值'},
        { key: 53 , name: '后二合值'},
        { key: 54 , name: '前二跨度'},
        { key: 55 , name: '后二跨度'},
        { key: 26 , name: '前三组三'},
        { key: 56 , name: '中三组三'},
        { key: 57 , name: '后三组三'},
        { key: 58 , name: '前三组六'},
        { key: 59 , name: '中三组六'},
        { key: 60 , name: '后三组六'},
      ]
    },
  ],

  // 显示弹出框
  _showDialog: function (path, width = 410, height = 380) {
    $(".dialog").layerModel({
      init: function () {},
      title: "提示",
      drag: false,
      locked: true,
      head: true,
      width: width,
      height: height,
      isClose: true,
    });
    // 本地 和 服务器端配置
    $(".dialog").load(window.location.href.indexOf("www") > -1 ? './dialog-' + path + '.html' : './www/dialog-' + path + '.html');
  },

  // 关闭弹出框
  _closeDialog: function () {
    layerModelHide();
  },
  
  // 显示msg
  _showMsg: function (msg) {
    layer.open({
      content: msg
      ,skin: 'msg'
      ,anim: "scale"
      ,time: 2 //2秒后自动关闭
    });
  },

  // 收藏
  _addFavorite: function () {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
      alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    } else if (ua.indexOf("msie 8") > -1) {
      window.external.AddToFavoritesBar(url, title); //IE8
    } else if (document.all) { //IE类浏览器
      try {
        window.external.addFavorite(url, title);
      } catch (e) {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
      }
    } else if (window.sidebar) { //firfox等浏览器；
      window.sidebar.addPanel(title, url, "");
    } else {
      alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
  },

  // 退出登录
  _logout(){
    Cookies.remove("isLogin");
    Cookies.remove("guid");
    layerModelHide();
    this._showMsg("退出成功!")
    _Base.isLogin();
    window.location.href = "./index.html";
  },
  
  // 判断是否已经登录
  _isLoginSuccess: function(){
		if(!Cookies.get("isLogin")){
			CONFIG._showMsg("非法访问,请重新登录!");
			window.location.href = './index.html'
			return;
		}
  },

  // 检查提现金额函数
  _checkDrawMoney: function (dom) {
    if(dom.val() == ''){
      dom.parent().next().children(".tipTxt").text("请输入提款金额");
      return false;
    }
    if(isNaN(dom.val())){
      dom.parent().next().children(".tipTxt").text("请输入正确的金额");
      return false;
    }
    if(dom.val() < 0){
      dom.parent().next().children(".tipTxt").text("提现金额不能低于10元");
      return false;
    }
    if(dom.val() > Cookies.getJSON("userInfo").u_money){
      dom.parent().next().children(".tipTxt").text("提现金额不能大于可用余额");
      return false;
    }
    dom.parent().next().children(".tipTxt").text("");
    return true;
  },
  
  // 检查提现支付密码
  _checkPayWord: function (dom) {
    if(dom.val() == ''){
      dom.parent().next().children(".tipTxt").text("请输入提款密码");
      return false;
    }
    dom.parent().next().children(".tipTxt").text("");
    return true;
  },

  // 检查用户名
  _checkUserName: function (dom) {
    if(dom.val() == ''){
      dom.parent().next().children(".tipTxt").text("请输入用户名");
      return false;
    }
    if(!/^[a-zA-Z0-9_-]{4,16}$/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("用户名长度为4到16位（字母，数字，下划线，减号）");
      return false;
    }
    if(!/[a-zA-Z]+/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("必须包含字母");
      return false;
    }
    if(!/[0-9]+/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("必须包含数字");
      return false;
    }
    dom.parent().next().children(".tipTxt").text("");
    return true;
  },
  // 检查注册密码
  _checkRegisterWord: function (dom) {
    if(dom.val() == ''){
      dom.parent().next().children(".tipTxt").text("请输入密码");
      return false;
    }
    if(!/[a-zA-Z]+/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("必须包含字母");
      return false;
    }
    if(!/[0-9]+/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("必须包含数字");
      return false;
    }
    if(!/[!@#$%^&*()_?<>{}]{1}/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("必须包含特殊字符!@#$%^&*()_?<>{}");
      return false;
    }
    if(!/([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,18}/.test(dom.val())){
      dom.parent().next().children(".tipTxt").text("密码长度为6-18位");
      return false;
    }
    dom.parent().next().children(".tipTxt").text("");
    return true;
  },


  init: function () {
    // 初始化头部.版权
    $(".header").html(this.headHtml);
    $(".lay-footer").html(this.copyrightHtml);

    if (this.pathName.indexOf("/index.html") > -1) {
      $(".navLst>li:eq(0)").addClass("cur");
    } else if (this.pathName.indexOf("/expertplan.html") > -1) {
      $(".navLst>li:eq(1)").addClass("cur");
    } else if (this.pathName.indexOf("/award.html") > -1) {
      $(".navLst>li:eq(2)").addClass("cur");
    } else if (this.pathName.indexOf("/trend.html") > -1) {
      $(".navLst>li:eq(3)").addClass("cur");
    } else if (this.pathName.indexOf("/news") > -1) {
      $(".navLst>li:eq(4)").addClass("cur");
    } else if (this.pathName.indexOf("/skilliinfo") > -1) {
      $(".navLst>li:eq(5)").addClass("cur");
    } else if (this.pathName.indexOf("/extend.html") > -1) {
      $(".navLst>li:eq(6)").addClass("cur");
    } else {}
  }
}

CONFIG.init();

/*
 * ///////////////封装ajax///////////////
 * type              请求的方式  默认为get
 * url               发送请求的地址
 * param             发送请求的参数
 * isShowLoader      是否显示loader动画  默认为false
 * dataType          返回JSON数据  默认为JSON格式数据
 * callBack          请求的回调函数
 */
(function () {
  function ajaxRequest(opts) {
    this.type = opts.type || "get";
    this.url = opts.url;
    this.param = Cookies.get("guid") ? $.extend({pwd_guid: Cookies.get("guid")}, opts.param) : opts.param || {};
    this.isShowLoader = opts.isShowLoader || false;
    this.dataType = opts.dataType || "jsonp";
    this.callBack = opts.callBack;
    this.init();
  }
  ajaxRequest.prototype = {
    //初始化
    init: function () {
      this.sendRequest();
    },
    //渲染loader
    showLoader: function () {
      if (this.isShowLoader) {
        var loader = '<div class="ajaxLoader"><div class="loader">加载中...</div></div>';
        $("body").append(loader);
      }
    },
    //隐藏loader
    hideLoader: function () {
      if (this.isShowLoader) {
        $(".ajaxLoader").remove();
      }
    },
    //发送请求
    sendRequest: function () {
      var self = this;
      $.ajax({
        type: this.type,
        url: this.url,
        data: this.param,
        dataType: this.dataType,
        beforeSend: this.showLoader(),
        success: function (res) {
          self.hideLoader();
          if (res != null && res != "") {
            if (self.callBack) {
              //Object.prototype.toString.call方法--精确判断对象的类型
              if (Object.prototype.toString.call(self.callBack) === "[object Function]") { 
                self.callBack(res);
              } else {
                console.log("callBack is not a function");
              }
            }
          }
        }
      });
    }
  };
  window.ajaxRequest = ajaxRequest;
})();