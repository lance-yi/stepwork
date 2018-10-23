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
          <li><a href="expertplan.html"><em>专家计划</em></a></li>\
          <li><a href="award.html"><em>开奖号码</em></a></li>\
          <li><a href="trend.html"><em>走势图表</em></a></li>\
          <li><a href="news.html"><em>行业资讯</em></a></li>\
          <li><a href="skilliinfo.html"><em>玩法技巧</em></a></li>\
          <li><a href="extend.html"><em>推广赚钱</em></a></li>\
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

  // 显示弹出框
  showDialog: function (path, width = 410, height = 380) {
    $(".dialog").layerModel({
      init: function () {},
      title: "提示",
      drag: true,
      locked: true,
      head: true,
      width: width,
      height: height,
      isClose: true,
    });
    $(".dialog").load('dialog-' + path + '.html');
  },
  showMsg: function (msg) {
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
  _logout(){
    Cookies.remove("isLogin");
    Cookies.remove("guid");
    this.showMsg("退出成功!")
    _Base.isLogin();
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