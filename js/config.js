// 导入es6语法支持
var head = document.getElementsByTagName('head')[0];
var es6script = document.createElement('script');
es6script.setAttribute('type','text/javascript');
es6script.setAttribute('src','./js/bluebird.min.js');
head.appendChild(es6script);


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
          <li><a href="news.html"><em>行业资讯</em></a></li>\
          <li><a href="skilliinfo.html"><em>玩法技巧</em></a></li>\
          <li><a href="extend.html"><em>推广赚钱</em></a></li>\
         <li><a href="vip.html"><em>开通VIP</em></a></li>\
      </ul>\
    </div>\
    <div class="login" id="noLogin">\
      <span><a  href="javascript:void(0);" id="login">登录</a>|<a  href="javascript:void(0);" id="register">注册</a></span>\
      <a href="javascript:void(0)" onclick="CONFIG._addFavorite()">收藏</a>\
    </div>\
    <div class="menber" id="yesLogin"  style="display: none;">\
      <a class="mb" href="member.html" id="nickName"></a>\
      <a class="quit" href="javascript:void(0);" onclick="CONFIG._logout()">退出</a>\
    </div>\
  </div>',

  copyrightHtml: '<div class="footsever">\
    <ul class="clearfix">\
      <li><a href="javascript:void(0);" onclick="Api.checkLogin(\'expertplan.html?key=1&gmKey=1\')"><i class="iconfont icon-anquan"></i><em>计划</em></a></li>\
      <li><a href="extend.html"><i class="iconfont icon-fenxi"></i><em>推广</em></a></li>\
      <li><a href="javascript:void(0);" onclick="Api.checkLogin(\'member.html\')"><i class="iconfont icon-wo"></i><em>我</em></a></li>\
      <li><a href="javascript:void(0);" onclick="_Base.showKefu()"><i class="iconfont icon-kefu1"></i><em>客服</em></a></li>\
    </ul>\
  </div>\
  <div class="footer">\
      <div class="mian clearfix">\
      <div class="left">\
          <div class="btnlogo"></div>\
          <div class="main">\
            <a href="">如何充值</a>\
            <a href="news.html">相关攻略</a>\
            <a href="skilliinfo.html">玩法技巧</a>\
      </div>\
        </div>\
        <div class="center">\
          <div class="tit">合作伙伴</div>\
          <div class="main">\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">新浪彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">网易彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">百度彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">腾讯彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">淘宝彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">中国体彩</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">福利彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">360彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">500彩票</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">中国体彩</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">四川福彩</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">重庆福彩</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">重庆体彩</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">上海福彩</a>\
            <a href="http://9923d.com/expertplan.html?key=1&gmKey=1">上海体彩</a>\
          </div>\
        </div>\
        <div class="right">\
          <div class="tit">联系我们</div>\
          <div class=""><i class="iconfont icon-xxx"></i></div>\
          <div class=""><i class="iconfont icon-xxx"></i>客服 QQ：1739626824</div>\
          <div class=""><i class="iconfont icon-xxx"></i>客服微信：lang25852</div>\
          <div class=""><i class="iconfont icon-xxx"></i>客服邮箱：lsdj@sina.com</div>\
        </div>\
    </div>\
    <div class="copyright">\
    <div class="main">\
      <p>Copyright&copy;2015-2018 北京红杉嘉禾资产管理中心(版权所有)京ICP备14021035号-1</p>\
      <p class="color">郑重申明：本站提供专业全面的彩票数据走势服务，不销售彩票！！也未与任何销售平台合作！</p>\
    </div>\
  </div>\
  </div>',
  qqkefuHtml: '<div id="online_qq_layer">\
    <div id="online_qq_tab">\
      <a id="floatShow" style="display:block;" href="javascript:void(0);">收缩</a>\
      <a id="floatHide" style="display:none;" href="javascript:void(0);">展开</a>\
    </div>\
    <div id="onlineService">\
      <div class="onlineMenu">\
        <h3 class="tQQ">QQ在线客服</h3>\
        <ul>\
          <li class="tli zixun">在线咨询</li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服001" /></a></li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服002" /></a></li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服001" /></a></li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服001" /></a></li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服001" /></a></li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服001" /></a></li>\
          <li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1739626824&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer"><img src="./images/default/pa.gif" width="74" height="22" alt="客服001" /></a></li>\
        </ul>\
        <div class="cold">\
          <span>【客服微信】</span>\
          <img src="./images/default/code1.jpg" width="74" height="22" alt="" />\
        </div>\
        <div class="cold phone">\
        </div>\
        <div class="cold time">\
          <span>【工作时间】</span>\
          <em>(10:30-22:30)</em>\
        </div>\
      </div>\
      <div class="btmbg"></div>\
    </div>\
  </div>',
  // 玩法对象
  _payGameList: [
    {
      key: 1,
      icon: '<i class="iconfont icon-cqssc"></i>',
      name: "重庆时时彩",
      list: [
        { key: 1 , name: '前二复式'},
        { key: 2 , name: '后二复式'},
        { key: 3 , name: '前三复式'},
        { key: 4 , name: '中三复式'},
        { key: 5 , name: '后三复式'},
        { key: 6 , name: '五星定1胆'},
        { key: 7 , name: '五星双胆'},
        { key: 8 , name: '万位定位6码'},
        { key: 9 , name: '万位定位5码'},
        { key: 10 , name: '千位定位6码'},
        { key: 11 , name: '千位定位5码'},
        { key: 12 , name: '个位定位6码'},
        { key: 13 , name: '个位定位5码'},
        { key: 14 , name: '后二单式平刷'},
        { key: 15 , name: '后三单式平刷'}
      ]
    },
    {
      key: 26,
      icon: '<i class="iconfont icon-tengxunfenfencai"></i>',
      name: "腾讯分分彩",
      list: [
        { key: 1 , name: '前二复式'},
        { key: 2 , name: '后二复式'},
        { key: 3 , name: '前三复式'},
        { key: 4 , name: '中三复式'},
        { key: 5 , name: '后三复式'},
        { key: 6 , name: '五星定1胆'},
        { key: 7 , name: '五星双胆'},
        { key: 8 , name: '万位定位6码'},
        { key: 9 , name: '万位定位5码'},
        { key: 10 , name: '千位定位6码'},
        { key: 11 , name: '千位定位5码'},
        { key: 12 , name: '个位定位6码'},
        { key: 13 , name: '个位定位5码'},
        { key: 14 , name: '后二单式平刷'},
        { key: 15 , name: '后三单式平刷'}
      ]
    },
    {
      key: 20,
      icon: '<i class="iconfont icon-pk10"></i>',
      name: "北京PK10",
      list: [
        { key: 16 , name: '猜冠军'},
        { key: 17 , name: '猜亚军'},
        { key: 18 , name: '猜季军'},
        { key: 19 , name: '冠军大小'},
        { key: 20 , name: '亚军大小'},
        { key: 21 , name: '冠军单双'},
        { key: 22 , name: '亚军单双'},
        { key: 23 , name: '猜冠亚军'},
        { key: 24 , name: '猜冠亚季军'}    
      ]
    },
    {
      key: 14,
      icon: '<i class="iconfont icon-pk10"></i>',
      name: "山东11选5",
      list: [
        { key: 25 , name: '任选1中1'},
        { key: 26 , name: '任选2中2'},
        { key: 27 , name: '任选3中3'},
        { key: 28 , name: '任选4中4'},
        { key: 29 , name: '任选5中5'},
      ]
    },
    {
      key: 7,
      icon: '<i class="iconfont icon-pk10"></i>',
      name: "江苏快3",
      list: [
        { key: 30 , name: '号码类型'},
        { key: 31 , name: '胆码玩法'},
        { key: 32 , name: '2码玩法'},
        { key: 33 , name: '2不同号玩法'},
        { key: 34 , name: '合值玩法'},
        { key: 35 , name: '合值大小'},
        { key: 36 , name: '合值单双'},
        { key: 37 , name: '二同号'},
        { key: 38 , name: '三连号'},
      ]
    },
  ],
  // 显示弹出框
  _showDialog: function (path, width, height) {
    if(!arguments[1]) width = 410;
    if(!arguments[2]) height = 380;
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
    $(".dialog").load('./dialog-' + path + '.html');
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
      ,time: 3 //3秒后自动关闭
    });
  },

  // 显示警告框
  _showAlert: function (title,msg) {
    layer.open({
      title: [title,'background-color: #0088dd; color:#fff;']
      ,content: msg
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
  _logout: function () {
    Cookies.remove("isLogin");
    Cookies.remove("guid");
    Cookies.remove("userInfo");
    Cookies.remove("isVip");
    this._closeDialog();
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
    // if(!/[!@#$%^&*()_?<>{}]{1}/.test(dom.val())){
    //   dom.parent().next().children(".tipTxt").text("必须包含特殊字符!@#$%^&*()_?<>{}");
    //   return false;
    // }
    // if(!/([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,18}/.test(dom.val())){
    //   dom.parent().next().children(".tipTxt").text("密码长度为6-18位");
    //   return false;
    // }
    if(!/([a-zA-Z0-9]){6,18}/.test(dom.val())){
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
    $(".lay-footer").append(this.qqkefuHtml);

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