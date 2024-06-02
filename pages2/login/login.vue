<template>
	<view>
		<view class="colonn" style="padding:0rpx 60rpx;">
			<view class="h-100"></view>
			<view class="logintxt">登录</view>
			<view class="h-100"></view>
			<view class="center_center roww " >
				<v-tabs  :scroll="false" :lineScale="lineScale" activeColor="#000000" v-model="current"
					lineColor="#FED68F" :tabs="tabs" @change="changeTab"></v-tabs>
			</view>
			<view class="h-50"></view>
			<view class="colonn m-top-50">
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/shoujiicon.png" class="w-40 h-40"></image>
					<input :adjust-position="adjust_position"  placeholder="请输入手机号" placeholder-class="fs-30" v-model="form.username"
						class="fs-30 m-left-20" />
						
				</view>
				<view class="h-50"></view>
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20" v-if="current==0">
					<image src="../../static/mimaicon.png" class="w-40 h-40"></image>
					<input :adjust-position="adjust_position" 
					placeholder="请输入密码" password v-model="form.password" placeholder-class="fs-30"
						class="fs-30 m-left-20" />
				</view>  
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20" v-if="current==1">
					<image src="../../static/yanzhnegma.png" class="w-40 h-40"></image>
					<input :adjust-position="adjust_position" 
					placeholder="请输入验证码" placeholder-class="fs-30" class="fs-30 m-left-20"
						v-model="form.password" />
					<view class="allline"></view>
					<view class="loginivie center_center roww"
					:style="{
									 background:(daojishi==100&&form.username.length==11)?'#f0a91e':'#FED68F'
					}"
					>  
					
						<view class="shenqingyanzhnegm"
						 @click.stop="sendcode">
							<block v-if="daojishi==100">
								获取验证码
							</block>
							<block v-else>
								重新发送{{daojishi}}
							</block>
						</view>
					</view>
				</view>
				<view class="roww   p-bottom-20  m-bottom-20">
					<navigator url="../register/register" hover-class="none">
						<view class="regisertbt" >注册</view>
					</navigator>

					<view class="allline"></view>
					
					<navigator url="../findpassword/findpassword" hover-class="none">
						<view class="regisertbt" style="color:#f0a91e;">忘记密码</view>
					</navigator>

				</view>
			</view>

		</view>

		<view class="roww center_center m-top-100">
			<view class="loginbtn"
			 :style="{
				 background:(form.username!=''&&form.password.length>0)?'#f0a91e':'#FED68F'
			 }"
			 @click.stop="toSubmit">登录</view>
		</view>
		
		
		<!--  #ifdef  MP-WEIXIN -->
			<view class="colonn pore center_center m-top-50"
			@click.stop="wxloginLogin"
			>
				<image src="../../static/weixin.png"
				class="w-70 h-70 m-bottom-10"
				></image>
				<view class="fs-25">微信登录</view>
			</view>
		<!--  #endif -->
		<!--  #ifdef  MP-TOUTIAO -->
			<view class="colonn pore center_center m-top-50"
			>
			<!-- @click.stop="dyLogin()" -->
				<image src="../../static/douyinm.png"
				class="w-70 h-70 m-bottom-10" style="border-radius: 50%;"
				></image>
				<view class="fs-25">抖音登录</view>
				<view class="roww center_center poab" style="top: 0rpx;width: 100%;height: 100%;">
					<button open-type="getUserInfo" class="poab  yincang1"
					style="height: 100%;width: 100rpx;background-color: #f0a91e;" @tap="ttGetuserinfo"
					></button>
				</view>
			</view>
		<!--  #endif -->
		
		
		<view class="colonn center_center huuibeijing br-20" style="z-index: 2000;"
		v-if="phtonNumAlert"
		@click.stop="phtonNumAlertClick"
		>
			<view class="w-600 h-450 colonn rowsal center_center p-all-20 background1" @click.stop="aaaa"> 
				<view class="fs-40 fw-b">授权手机号</view>
				<view class="m-top-25 m-bottom-25 w-550">获取您的手机号来同步同步艺票通信息</view>
				<view class="roww w-600 rowsa">
					<button @click.stop="phtonNumAlertClick">取消</button>
					<button type="primary"
					open-type="getPhoneNumber"
					@getphonenumber="getphonenumber"
					>确认</button>
				</view>
			</view>
		</view>
		
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				
				adjust_position:true,
				
				current: 0,
				tabs: [
				 '账号密码登录',
					'验证码登录',
				],
				lineScale: 0.2,
				form: {
					username: "",
					'password': "",
					client: 'wechat'
				},

				// 验证码
				'dingshiqi': "",
				daojishi: 100,
				phone_userInfo:[0,0],
				phtonNumAlert:false,
				wxuserinfo:{},
				dayin:"",
				logincode:"",
				phonenumber:"",//用户编号
			}
		},
		onShow() {
			// #ifdef  MP-WEIXIN
				wx.login({
					success:res=>{
						this.logincode=res.code
					}
				})
			// #endif
			// #ifdef  MP-TOUTIAO
				tt.login({  
					success:res=>{
						console.log("抖音登录",res.code)
						this.logincode=res.code
					}       
				})
			// #endif
			
		},
		onHide() {
			clearInterval(this.dingshiqi)
		},
		onUnload() {
			clearInterval(this.dingshiqi)
		},
		methods: {
			ttGetuserinfo(){
				tt.getUserProfile({
				  success:(res)=> {
					  console.log("抖音给的个人信息",res.userInfo)
					this.dyLogin(res.userInfo);
				  },
				  fail:(res)=>{
				    console.log("getUserProfile 调用失败", res);
				  },
				});
			},
			// 抖音登录
			dyLogin(userinfo){ 
				var data={
					code:this.logincode,
					'avatarUrl':userinfo.avatarUrl,
					'nickName':userinfo.nickName,
				}
				console.log("抖音登录参数",data);
				this.$axios
					.axios('POST',
						this.$paths.dylogin,
						data)
					.then(res => {
						console.log("抖音登录结果",res);
						if (res.code == 10000) {
							 this.$tools.showToast("授权成功");
							 // setTimeout(res=>{
								//  uni.reLaunch({
								//  	url:"/pages/me_1/me_1"
								//  })  
							 // },1000)
							 uni.setStorageSync("openid",res.result.info.member_wxopenid)
							 uni.setStorageSync("token",res.result.token)
							 uni.setStorageSync("userInfo",res.result.info)
						} else {
							this.$tools.showToast(res.err_tips);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			
			// 维系登录
			wxloginLogin(){
				var data={
					openid:uni.getStorageSync("openid"),
					client:"wx"
				}
				if(this.phonenumber){
					data.mobile=this.phonenumber;
				}
				this.$axios
					.axios('POST',
						this.$paths.wxloginLogin,
						data)
					.then(res => {
						if (res.code == 10000) {
							this.loginSuccess(res);
						} else {
							this.phtonNumAlert=true;
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 登录成功
			loginSuccess(res){
				this.$tools.showToast("登录成功");
				uni.setStorageSync("userInfo", res.result.info)
				uni.setStorageSync("token", res.result.token)
				this.getUserInfo();
				setTimeout(res=>{
					uni.switchTab({
						url: "../../pages/index_1/index_1",
						// url: "/pages/live_1/live_1",
						fail: (res) => {
							console.log(res)
						},
						complete(res) {
							console.log(res)
						}
					})
				},1000)
			},
			
			// 手机号的回调
			getphonenumber(res1){
				this.phtonNumAlert=false;
				this.toAutoLogin(res1.detail,"");
			},
			// 获取手机号
			toAutoLogin(phoneInfo,code){
				code=this.logincode;
				this.dayin=code+"分界线"+phoneInfo.encryptedData+'分界线'+phoneInfo.iv
				// return false;
				 var data={
					 code:code,
					 encryptedData:phoneInfo.encryptedData,
					 iv:phoneInfo.iv,
				 }
				 this.$axios  
				 	.axios('POST',
				 		this.$paths.get_wx_mobile,
				 		data)
				 	.then(res => {
				 		if (res.code == 10000) {
							// -41001
							if(res.result.code<0){
								this.$tools.showToast("请稍后重试！");
								return false;
							}
							this.phonenumber=res.result.phoneNumber;
							this.wxloginLogin();
				 		} else {
				 			this.$tools.showToast(res.message);
				 		}
				 	})
				 	.catch(err => {
				 		console.log('错误回调', err);
				 	});
			},
			phtonNumAlertClick(){
				this.phtonNumAlert=!this.phtonNumAlert;
			},
			// 点击事件获取用户信息
			getClickUserInfo(){
					wx.getUserProfile({
					      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					      success: (res1) => {
							  console.log("用户信息",res1);
							  this.wxuserinfo=res1.userInfo;
							  this.phtonNumAlertClick();
					      },
						  fail:(res)=> {
							  console.log(res)
						  	this.$tools.showToast("获取个人信息失败");
						  }
					    })
			},
			toAuthLogin(userInfo){
				var data={
					type:"1",//	1	是	int	类型 1注册 0绑定,2登录
					user:"",//	test666	否	string	用户名，type=1和type=0时必填
					password:"",//	222222	否	string	账号密码，type=1时必填
					from:"wx",//	wx	是	string	来源 wx，qq，sina
					openid:uni.getStorageSync("openid"),//	111111	是	string	第三方用户ID
					unionid:"",//	111111	是	string	开发者帐号唯一标识
					inviter_id:"",//		否	int	推荐人id
					client:"wechat",//	wap	是	string	客户端类型 android wap wechat ios windows jswechat ‘minipro
					nickname:userInfo.nickName,//	测试第三方	否	string	第三方昵称 type=1时必填
					headimgurl:userInfo.avatarUrl,//		否	string	第三方头像
				}
				this.$axios
					.axios('POST',
						this.$paths.bindLogin,
						data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("授权成功");
							console.log(res)
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 发送验证码
			sendcode() {
				var data1 = this.form;
				if (data1.username == "" && !this.$tools.isphone(data1.username)) {
					this.$tools.showToast("请输入正确的手机号");
					return false;
				}
				if(this.daojishi<100){
					return false;
				}
				var data = {
					phone: data1.username,
					'type': '2'
				}
				this.$axios
					.axios('POST',
						this.$paths.get_sms_captcha,
						data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("短信发送成功");
							this.daojishi = res.result.sms_time;
							clearInterval(this.dingshiqi);
							this.dingshiqi = setInterval(res => {
								if (this.daojishi - 1 <= 0) {
									this.daojishi = res.result.sms_time;
									clearInterval(this.dingshiqi);
								} else {
									this.daojishi = this.daojishi - 1
								}
							}, 1000)
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 提交登录
			toSubmit() {
				if (!this.isSubmit()) {
					return false;
				}
				if (this.current == 1) {
					var data = {
						usermobile: this.form.username, //	String	手机号
						mobilecode: this.form.password, //	String	验证码
						client: "wechat", //	String	客户端类型 android wap wechat ios windows jswechat
					};
					var url = this.$paths.sms_loginconnect
				} else {
					var data = this.form;
					var url = this.$paths.indexLogin;
				}
				this.$axios
					.axios('POST', url, data)
					.then(res => {
						if (res.code == 10000) {
							
							console.log(res)
							this.loginSuccess(res);
							// uni.setStorageSync("userInfo", res.result.info)
							// uni.setStorageSync("token", res.result.token)
							// this.getUserInfo();
							// setTimeout(res=>{
							// 	uni.switchTab({
							// 		url: "../../pages/index_1/index_1",
							// 		fail: (res) => {
							// 			console.log(res)
							// 		},
							// 		complete(res) {
							// 			console.log(res)
							// 		}
							// 	})
							// },1000)
							
							
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			getUserInfo(){
				var data={};
				this.$axios
					.axiosDate('POST', this.$paths.indexMember, data)
					.then(res => {
						if(res.code==10000){
							uni.setStorageSync("userInfo",res.result.member_info)
						}else{
							this.showToast(res.message);
						}
					})
					.catch(err => {
					});
			},
			// 是否登录
			isSubmit() {
				if (this.form.username == "") {
					this.$tools.showToast("请输入账号");
					return false;
				}
				if (this.form.password == "") {
					if (this.current == 1) {
						this.$tools.showToast("请输入验证码");
					} else {
						this.$tools.showToast("请输入密码");
					}
					return false;
				}
				return true;
			},
			//登录类型切换
			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.form.password="";
				this.current=index;
			},
			aaaa(){}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
