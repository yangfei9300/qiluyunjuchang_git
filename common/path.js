// 项目域名
// export const BASE_URL = 'https://www.sdyygh.cn/qlyjc'
// export const BASE_URL = 'https://yjc.qlypt.com/yjc'
// 
// 齐鲁云剧场域名
export const BASE_URL = 'https://qlyjc.zsyflive.com/api'
// 投票域名
// export const BASE_URL1 = 'http://192.168.0.17:9003/api'
// export const BASE_IMG1 = 'http://192.168.0.17:9003'
export const BASE_URL1 = "https://qlyjctp.zsyflive.com/api"
export const BASE_IMG1 = 'https://qlyjctp.zsyflive.com'

// 
export const BASE_IMG2 = 'https://qlyjc.zsyflive.com'


  


//----------项目接口请求路径-----------
// 手机好注册接口
const sms_register =BASE_URL + '/Connect/sms_register' 
// 获取验证码接口  
const get_sms_captcha =BASE_URL + '/Connect/get_sms_captcha'
// 登录接口 （账号密码登录）
const indexLogin =BASE_URL + '/Login/index' 
// 登录 （验证码登录） 
// 手机找回密码 
const find_password =BASE_URL + '/Connect/find_password' 
// 获取个人信息
const indexMember =BASE_URL + '/Member/index' 
// 修改头像
const edit_memberavatar =BASE_URL + '/Member/edit_memberavatar' 
//手机号验证码  
const sms_loginconnect =BASE_URL + '/connect/sms_login' 
 // 充值明细  
const pdrechargelist =BASE_URL + '/Memberfund/pdrechargelist' 
 // 体现记录  
const pdcashlistMemberFund =BASE_URL + '/MemberFund/pdcashlist' 
 // 退出登录 
const indexLogout =BASE_URL + '/Logout/index'
 // 修改登录密码 
const modify_password =BASE_URL + '/Memberaccount/modify_password'
 // 修改密码验证吗接口
 const send_auth_code =BASE_URL + '/Memberaccount/send_auth_code'
// 
 const check_auth_code =BASE_URL + '/Memberaccount/check_auth_code'
//修改支付密码  
 const modify_paypwd =BASE_URL + '/Memberaccount/modify_paypwd'
 // 修改手机号需要的验证码接口
const bind_mobile_step1 =BASE_URL + '/Memberaccount/bind_mobile_step1'
 //修改手机号的接口
const bind_mobile_step2 =BASE_URL + '/Memberaccount/bind_mobile_step2'
 // 获取学历等分类信息  
 const get_classinfo =BASE_URL + '/Index/get_classinfo'
 // 获取分类列表 
 const get_classlist =BASE_URL + '/Index/get_classlist'
 // 修改个人信息
 const edit_information =BASE_URL + '/Member/edit_information'
 // 用户协议  
 const agreement =BASE_URL + '/Document/agreement'
 // 收藏列表  
 const favorites_list =BASE_URL + '/memberfavorites/favorites_list'
 // 获取新闻列表  
 const article_list =BASE_URL + '/Article/article_list'
 // 获取信息详情
 const article_show =BASE_URL + '/Article/article_show'
 // 获取收藏状态  
 const check_state =BASE_URL + '/memberfavorites/check_state'
 // 获取视频分类
 const goodsclass =BASE_URL + '/Goodsclass/index'//废弃
 const getGoodsClassList =BASE_URL + '/Index/getGoodsClassList'
 
 // 获取视频列表 
 const goods_list =BASE_URL + '/Goods/goods_list'
 // 获取视频详情  
 const goods_detail =BASE_URL + '/Goods/goods_detail'
 // 添加评价
 const add_evaluate =BASE_URL + '/Memberevaluate/add_evaluate'
 // 获取评价列表  
 const goods_evaluatelist =BASE_URL + '/Goods/goods_evaluatelist'
 
 // 添加收藏 
 const favorites_add =BASE_URL + '/memberfavorites/favorites_add'
 // 添加点赞  
 const memberthumbsupindex =BASE_URL + '/memberthumbsup/index'
 // 获取点赞状态 
 const check_statememberthumbsup =BASE_URL + '/memberthumbsup/check_state'
 // 获取贴片广告  
 const get_adv_video =BASE_URL + '/Index/get_adv_video'
 // 获取banner图  
 const getIndexAdList =BASE_URL + '/Index/getIndexAdList'
// 热剧精选 
 const getCommendList =BASE_URL + '/Index/getCommendList'
// 获取分享海报  
 const goods_wxposter =BASE_URL + '/Member/goods_wxposter'
// 删除收藏  
 const favorites_del =BASE_URL + '/memberfavorites/favorites_del'
// 活动专题列表 
 const indexActivity =BASE_URL + '/Activity/index'
// 专题中的院团列表  
 const apply_storeActivity =BASE_URL + '/Activity/apply_store'
// 专题中的院团列表  
 const detailActivity =BASE_URL + '/Activity/detail'
 // 搜索
 const searchIndex =BASE_URL + '/Index/search'
 // 猜你习惯 
 const getGuessLike =BASE_URL + '/Index/getGuessLike'
  // 订单 
 const order_listMember =BASE_URL + '/Member/order_list'
  // 获取直播列表
 const store_listIndex =BASE_URL + '/Index/store_list'
  // 点赞直播
 const live_favoritesIndex =BASE_URL + '/Index/live_favorites'
  // 直播详情
 const live_detailIndex =BASE_URL + '/Index/live_detail'
 // 直播观看人数  
 const live_loadingIndex =BASE_URL + '/Index/live_loading'
 // 下单获取订单号  
 const buy_step2 =BASE_URL + '/Membervrbuy/buy_step2'
 // 获取VIP下单
 const buy_vipMember =BASE_URL + '/Member/buy_vip'
 // 支付接口 
 const payMembervrbuy =BASE_URL + '/Membervrbuy/pay'
 // 表情里诶包 
 const expressionindex =BASE_URL + '/index/expression'
 // 视频支付  
 const video_payMembervrbuy =BASE_URL + '/Membervrbuy/video_pay'
 // 直播列表  
 const get_live_listMemberLive =BASE_URL + '/MemberLive/get_live_list'
 // 第三方授权
 const bindLogin =BASE_URL + '/Login/bind'
 // 订阅直播 
 const subscribeIndex =BASE_URL + '/Index/subscribe'
 // 取消订阅直播
 const del_subscribeIndex =BASE_URL + '/Index/del_subscribe'
 
 // 通过参数获取手机号
 const get_wx_mobile =BASE_URL + '/Index/get_wx_mobile'
 // 微信登錄 
 const wxloginLogin =BASE_URL + '/Login/wxlogin'
 // 獲取價格 https://qlyjc.zsyflive.com/api/Index/get_member_price
 const get_member_price =BASE_URL + '/Index/get_member_price'
 
 // 投票项目接口、
 const listActivity =BASE_URL1 + '/Activity/list'
 // 查询选手列表  
 const listPlayer =BASE_URL1 + '/Player/list'
 // 获取选手排行榜  list/order
 const orderlistPlayer =BASE_URL1 + '/Player/list/order'
 // 上传图片
 const commonupload =BASE_URL1 + '/common/upload'
 // 添加报名信息
 const enrollPlayer =BASE_URL1 + '/Player/enroll'
 const updatePlayer =BASE_URL1 + '/Player/update'
 
 
 // 获取报名详情  /api/Player/info
 const infoPlayer =BASE_URL1 + '/Player/info'
 // 为选手投票  /api/Player/vote
 const votePlayer =BASE_URL1 + '/Player/vote'
 // 搜索好友 
 const searchPlayer =BASE_URL1 + '/Player/search'
 // 获取选手详情 /api/Player/byid
 const byidPlayer =BASE_URL1 + '/Player/byid'
 // 获取礼物列表 /api/gift/list
 const listgift =BASE_URL1 + '/gift/list'
 // 获取套餐接口  
 const paymeallist =BASE_URL1 + '/pay/meal/list'
 // 预下单 
 const wxpaywxpay =BASE_URL1 + '/wxpay/wxpay'
 // 支付  uploadoss
 const commonuploadoss =BASE_URL1 + '/common/uploadoss'
 // 支付记录 
 const paypaylog =BASE_URL1 + '/pay/paylog'
 // 赠送礼物口路  
 const giftlog =BASE_URL1 + '/gift/log'
 // 赠送礼物口路
 const balancepay =BASE_URL1 + '/pay/balance'
 // 活动配置表 
 const configActivity =BASE_URL1 + '/Activity/config'
 // 获取用户openid 
 const memberwxcode =BASE_URL1 + '/member/wxcode'
 // 获取广告
 const open_screen =BASE_URL + '/Index/open_screen'
 

// 抖音兼容  https://qlyjc.zsyflive.com/Login/dylogin 
 const dylogin =BASE_URL + '/Login/dylogin'

 
 
 
 export default {
	 memberwxcode,open_screen,dylogin,
	 balancepay,configActivity,
	 updatePlayer,paypaylog,giftlog,
	 paymeallist,wxpaywxpay,commonuploadoss,
	 searchPlayer,byidPlayer,listgift,
	 BASE_URL1,listActivity,BASE_IMG1,listPlayer,infoPlayer,
	 orderlistPlayer,commonupload,enrollPlayer,votePlayer,
	 wxloginLogin,get_member_price,
	 video_payMembervrbuy,get_live_listMemberLive,bindLogin,subscribeIndex,
	 buy_step2,buy_vipMember,payMembervrbuy,expressionindex,get_wx_mobile,
	 order_listMember,store_listIndex,live_favoritesIndex,live_detailIndex,
	 apply_storeActivity,detailActivity,searchIndex,getGuessLike,
	 goods_wxposter,favorites_del,indexActivity,live_loadingIndex,
	 get_adv_video,getIndexAdList,getGoodsClassList,getCommendList,
	 check_state,goodsclass,goods_list,goods_detail,add_evaluate,goods_evaluatelist,
	 agreement,favorites_list,article_list,article_show,memberthumbsupindex,
 	sms_register,get_sms_captcha,indexLogin,favorites_add,
	find_password,indexMember,edit_memberavatar,check_statememberthumbsup,
	sms_loginconnect,pdrechargelist,pdcashlistMemberFund,
	indexLogout,modify_password,send_auth_code,check_auth_code,
	modify_paypwd,bind_mobile_step2,bind_mobile_step1,
	get_classinfo,get_classlist,edit_information,
 }
 