/**
 * @author Lance YI 
 * @date 2018年10月20日
 * @description 网站公共通用方法和属性
 */
var _Base = {
  userInfo: Cookies.getJSON("userInfo") || {},

  // 更具索引返回中文字
  returnChinese: function (index) {
    switch (index) {
      case 1:
        return "一";
        break;
      case 2:
        return "二";
        break;
      case 3:
        return "三";
        break;
      case 4:
        return "四";
        break;
      case 5:
        return "五";
        break;
    }
  },

  // 随机准确率
  mathRound: function(){
    var num = (Math.random() * 100).toFixed(2);
    if(num >= 90 && num < 100){
      return num + '%';
    }else{
      return '98%';
    }
  },

  // 获取地址栏参数
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },

  // 判断是否登录显示对应的资料
  isLogin: function () {
    if(Cookies.get("isLogin")){
      $("#yesLogin").show();
      $("#noLogin").hide();
      this.userInfo = Object.assign(Cookies.getJSON("userInfo"));
      $("#nickName").html(this.userInfo.u_name)
    }else{
      $("#noLogin").show();
      $("#yesLogin").hide();
    }
  },

  // 初始化
  init: function(){
    // 监听顶部
    var conut = 0;
		$(window).scroll(function () {
			var scrollTops = $(this).scrollTop();
			var scrollTop = scrollTops + 80 * 1;
			if (scrollTops * 1 < 80 && conut == 0) {
				return;
			}
			$(this).scrollTop();
			if (scrollTop > 80) { //显示顶部div

				$(".header").addClass("topFixedShow");
				$(".header").css({
					height: 80 + 'px',
					position: 'fixed'
				});
				$(".header").css("z-index", "9999");
				conut++;
			} else {
				$(".header").removeClass("topFixedShow");
				$(".header").css('height', '');
				$(".header").css('position', 'fixed');
				$(".header").css("z-index", "100");
				conut = 0;
			}
    });

    /**
     * 弹窗集合
     */
    // 登录弹框
    $(document).on("click", "#login", function () {
      CONFIG.showDialog("login")
    })
    // 注册
    $(document).on("click", "#register", function () {
      CONFIG.showDialog("register")
    })
    // 绑定信息
    $(document).on("click", "#bangding", function () {
      CONFIG.showDialog("bindinfo",460,340)
    })
    // 修改登录密码
    $(document).on("click", "#code", function () {
      CONFIG.showDialog("editloginpass",410,360)
    })
    // 修改交易密码
    $(document).on("click", "#Tradercode", function () {
      CONFIG.showDialog("editpaypass",430,360)
    })
    // 提现
    $(document).on("click", "#Withdrawcash", function () {
      CONFIG.showDialog("drawing",450,430);
    })
    // 充值
    $(document).on("click", "#recharge", function () {
      CONFIG.showDialog("recharge",1030,650);
    })
    
    this.isLogin();
  },
  
}

_Base.init();