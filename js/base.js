/**
 * @author Lance YI 
 * @date 2018年10月20日
 * @description 网站公共通用方法和属性
 */
var _Base = {
  userInfo: Cookies.getJSON("userInfo") || {},
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
  /**
   * 判断是否登录
   */
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
}

_Base.init();