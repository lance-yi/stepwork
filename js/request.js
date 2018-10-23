var baseUrl = 'http://211.149.192.163/ajax';
var Api = {
  user: baseUrl + "/user.ashx",
  notice: baseUrl + '/notice.ashx',
  gamerelation: baseUrl + '/gamerelation.ashx',
  openCode: baseUrl + '/openCode.ashx',
  basicinfo: baseUrl + '/basicinfo.ashx',
  recharge: baseUrl + '/recharge.ashx',
  gainsLosses: baseUrl + '/gainsLosses.ashx',

  // 登录
  login: function (name,pwd) {
    new ajaxRequest({
      url: this.user,
      param: {
        action: 17,
        name: name,
        pwd: $.md5(pwd).toUpperCase()
      },
      callBack:function (res) {  
        if(res.state == 10000){
          Cookies.set("guid",res.pageUrl,{expires: 7, path: '/'});
          Cookies.set("isLogin",true,{expires: 7,path: '/'});
          Api.getUserInfo();
          layerModelHide();
          CONFIG.showMsg(res.message);
        }
      }
    })
  },
  // 获取用户信息
  getUserInfo: function () {
    new ajaxRequest({
      url: this.user,
      param: {
        action: 1
      },
      callBack:function (res) {  
        if(res.state == 1){
          Cookies.set("userInfo",res.data[0])
          _Base.isLogin();
        }else{
          CONFIG.showMsg(res.message);
        }
      }
    })
  },
  // 获取公告函数
  getIndexNotice: function (type) {
    return new Promise((resolve)=>{
      new ajaxRequest({
        url: this.notice,
        param: {
          action: 3,
          type: type
        },
        callBack:function (res) {  
          if(res.state == 1){
            resolve(res.data);  
          }else{
            CONFIG.showMsg(res.message);
          }
        }
      })
    })
  },
  // 获取首页函数
  getIndexPlane: function () {
    return new Promise((resolve)=>{
      new ajaxRequest({
        url: this.gamerelation,
        param: {
          action: 2
        },
        callBack:function (res) {  
          if(res.state == 1){
            resolve(res.data);  
          }else{
            CONFIG.showMsg(res.message);
          }
        }
      })
    })
  },
  init: function () {
    // this.getUserInfo();
  }
}

Api.init();

// 首页
// http://211.149.192.163/ajax/user.ashx?action=17';//登陆请求   name  账号         pwd   密码
// http://211.149.192.163//ajax/user.ashx?action=30';//注册请求  name  账号        pwd    密码           pid   推荐人编号
// http://211.149.192.163//ajax/notice.ashx?action=3';//首页公告     type 类型  0行业资讯  1玩法技巧
// http://211.149.192.163//ajax/gamerelation.ashx?action=2';//首页计划显示     无参数
// 专家计划
// http://211.149.192.163//ajax/openCode.ashx?action=2';//当前开奖     key 彩种 
// http://211.149.192.163//ajax/gamerelation.ashx?action=1';//查询计划  gt_key 彩种   gm_key 玩法   pwd_guid 用户登录返回GUID
// 开奖号码
// http://211.149.192.163//ajax/openCode.ashx?action=4';//当天开奖    key 彩种 
// 行业资讯 玩法技巧
// http://211.149.192.163//ajax/notice.ashx?action=1';//活动分类     type 类型  0行业资讯  1玩法技巧     带分页返回
// http://211.149.192.163//ajax/notice.ashx?action=4';//活动详细    id  公告编号
// 推广赚钱
// http://211.149.192.163//ajax/basicinfo.ashx?action=3';//获取推广地址   pwd_guid 用户登录返回GUID
// 会员中心
// http://211.149.192.163//ajax/user.ashx?action=1';//用户信息          pwd_guid 用户登录返回GUID
// http://211.149.192.163//ajax/user.ashx?action=11';//绑定银行卡     pwd_guid 用户登录返回GUID    bankType 银行类型 1支付宝 2微信    bankCard 卡号   bankName 姓名
// http://211.149.192.163//ajax/recharge.ashx?action=1';//提现          pwd_guid 用户登录返回GUID   money  提款金额  pwd 提款密码 需要MD5加密
// http://211.149.192.163//ajax/user.ashx?action=12';//修改登陆密码  pwd_guid 用户登录返回GUID   pwd  旧密码   newPwd 新密码 
// http://211.149.192.163//ajax/user.ashx?action=13';//修改提现密码  pwd_guid 用户登录返回GUID   pwd  旧密码   newPwd 新密码
// http://211.149.192.163//ajax/user.ashx?action=2';//团队管理          pwd_guid 用户登录返回GUID   
// http://211.149.192.163//ajax/gainsLosses.ashx?action=3';//团队佣金   pwd_guid 用户登录返回GUID
// http://211.149.192.163//ajax/gainsLosses.ashx?action=2';//资金明细   pwd_guid 用户登录返回GUID



