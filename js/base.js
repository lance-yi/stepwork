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
      case 1: return "一";
      case 2: return "二";
      case 3: return "三";
      case 4: return "四";
      case 5: return "五";
      case 6: return "六";
      case 7: return "七";
      case 8: return "八";
      case 9: return "九";
      case 10: return "十";
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

  // 将数值四舍五入(保留2位小数)后格式化成金额形式
  formatCurrency: function(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
  },

  // 获取地址栏参数
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },

  // 级别类型中文
  filterRank: function (type) {
    switch (type) {
      case 1: return "管理员";
      case 2: return "管理员1";
      case 3: return "管理员2";
      case 4: return "管理员3";
    }
  },

  // 返回银行类型
  filterBankType: function(number) {
    switch (number) {
        case 0: return '未绑定';
        case 1: return '工商银行';
        case 2: return '建设银行';
        case 3: return '中国银行';
        case 4: return '农业银行';
        case 5: return '招商银行';
        case 6: return '交通银行';
        case 7: return '中信银行';
        case 8: return '兴业银行';
        case 9: return '光大银行';
        case 10: return '浦发银行';
        case 11: return '民生银行';
        case 15: return '邮政银行';
        case 17: return '支付宝';
        case 18: return '广西农村信用村';
    }
  },

  // 彩种转换
  filterlottery_zh: function (key) {
    switch (parseInt(key)) {
      case 1: return '重庆时时彩';
      case 2: return '天津时时彩';
      case 3: return '福彩3D';
      case 4: return '体彩P3';
      case 5: return '广东11选5';
      case 6: return '江西11选5';
      case 7: return '江苏快3';
      case 8: return '新疆时时彩';
      case 10: return '5分彩';
      case 11: return '分分彩';
      case 12: return '3分彩';
      case 13: return '体彩P5';
      case 14: return '山东11选5';
      case 15: return '上海11选5';
      case 16: return '韩国1点5分彩';
      case 17: return '吉林快3';
      case 18: return '广西快3';
      case 19: return '安徽快3';
      case 20: return '北京PK10';
      case 21: return '北京5分彩';
      case 22: return '重庆幸运农场';
      case 23: return '香港六合彩';
      case 24: return '幸运28';
      case 28: return '重庆牛牛';
      case 29: return '5分牛牛';
      case 30: return '3分PK10';
      default: return '未知';
    }
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
      CONFIG._showDialog("login")
    })

    // 注册
    $(document).on("click", "#register", function () {
      CONFIG._showDialog("register")
    })

    // 绑定信息
    $(document).on("click", "#bangding", function () {
      CONFIG._showDialog("bindinfo",460,340)
    })

    // 修改登录密码
    $(document).on("click", "#code", function () {
      CONFIG._showDialog("editloginpass",410,360)
    })

    // 修改交易密码
    $(document).on("click", "#Tradercode", function () {
      CONFIG._showDialog("editpaypass",430,360)
    })

    // 提现
    $(document).on("click", "#Withdrawcash", function () {
      CONFIG._showDialog("drawing",450,430);
    })

    // 充值
    $(document).on("click", "#recharge", function () {
      CONFIG._showDialog("recharge",1030,650);
    })
    
    /**
     * 顶部用户名显示判断
     */
    this.isLogin();
    

    console.log(Cookies.getJSON("userInfo"))
  },
  
}

_Base.init();