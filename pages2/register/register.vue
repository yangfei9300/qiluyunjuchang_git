<template>
	<view>
		<view class="colonn" style="padding:0rpx 60rpx;">
			<view class="h-100"></view>
			<view class="logintxt">用户注册</view>
			<view class="h-100"></view>
			<view class="colonn m-top-50">
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/shoujiicon.png" class="w-40 h-40"></image>
					<input placeholder="请授权手机号" disabled placeholder-class="fs-30" v-model="form.phone" class="fs-30 m-left-20" />
					<view class="allline"></view>
					<view class="loginivie center_center roww pore"
					style="background-color: #f0a91e;"
					>
						<view class="shenqingyanzhnegm" @click.stop="sendcode">授权手机号</view>
						<button class="poab" style="width: 100%;height: 100%;opacity: 0;"
						open-type="getPhoneNumber"
						@getphonenumber="getphonenumber"
						></button>
					</view>
				</view>
				<view class="h-50"></view>
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/yanzhnegma.png" class="w-40 h-40"></image>
					<input placeholder="请输入验证码" placeholder-class="fs-30" v-model="form.captcha" class="fs-30 m-left-20" />
					<view class="allline"></view>
					<view class="loginivie center_center roww"
					:style="{
									 background:(daojishi==100)?'#f0a91e':'#FED68F'
					}"
					>
						<view class="shenqingyanzhnegm" @click.stop="sendcode">
							<block v-if="daojishi == 100">获取验证码</block>
							<block v-else>重新发送{{ daojishi }}</block>
						</view>
					</view>
				</view>
				<view class="h-50"></view>
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/mimaicon.png" class="w-40 h-40"></image>
					<input placeholder="请输入密码" placeholder-class="fs-30" password v-model="form.password" class="fs-30 m-left-20" />
				</view>
				<view class="h-50"></view>
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/tuijianren.png" class="w-40 h-40"></image>
					<input placeholder="请输入推荐编号" placeholder-class="fs-30" v-model="form.inviter_id" class="fs-30 m-left-20" />
				</view>
			</view>
			<view class="roww">
				<view class="regisertbt" @click="tologin">去登录</view>
				<view class="allline"></view>
				<view class="regisertbt yincang1" style="color:#FED68F;"></view>
			</view>
			<view class="roww center_center m-top-100"><view class="loginbtn"
			 
			 :style="{
			 				 background:(form.phone!=''&&form.captcha.length==6&&form.password.length>=6)?'#f0a91e':'#FED68F'
			 }"
			 
			 
			 @click.stop="toSubmit">注册</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				phone: '', //电话
				captcha: '', //验证码
				password: '', //密码
				inviter_id: '', //推广人id
				client: '' //客户端类型
			},
			// 验证码
			dingshiqi: '',
			daojishi: 100,
			
			logincode:""
		};
	},
	onShow() {
		wx.login({
			success:res=>{
				this.logincode=res.code
			}
		})
	},
	onHide() {
		clearInterval(this.dingshiqi);
	},
	onUnload() {
		clearInterval(this.dingshiqi);
	},
	methods: {
		// 手机号的回调
		getphonenumber(res1){
			this.phtonNumAlert=false;
			this.toAutoLogin(res1.detail,"");
		},
		// 授权登录
		toAutoLogin(phoneInfo,code){
			code=this.logincode;
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
						this.form.phone=res.result.phoneNumber;
			 		} else {
			 			this.$tools.showToast(res.message);
			 		}
			 	})
			 	.catch(err => {
			 		console.log('错误回调', err);
			 	});
		},
		tologin() {
			uni.reLaunch({
				url: '../login/login'
			});
		},
		// 发送验证码
		sendcode() {
			var data1 = this.form;
			if (data1.phone == '' && !this.$tools.isphone(data1.phone)) {
				this.$tools.showToast('请输入正确的手机号');
				return false;
			}
			var data = {
				phone: data1.phone,
				type: '1'
			};
			this.$axios
				.axios('POST', this.$paths.get_sms_captcha, data)
				.then(res => {
					if (res.code == 10000) {
						this.$tools.showToast('短信发送成功');
						this.daojishi = res.result.sms_time;
						clearInterval(this.dingshiqi);
						this.dingshiqi = setInterval(res => {
							if (this.daojishi - 1 <= 0) {
								this.daojishi = res.result.sms_time;
								clearInterval(this.dingshiqi);
							} else {
								this.daojishi = this.daojishi - 1;
							}
						}, 1000);
					} else {
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {
					console.log('错误回调', err);
				});
		},
		//判断是否提交表单
		isSubmit() {
			if (this.form.phone == '') {
				this.$tools.showToast('请输入手机号');
				return false;
			}
			if (!this.$tools.isPhoneNumber(this.form.phone)) {
				this.$tools.showToast('请输入正确的手机号');
				return false;
			}
			if (this.form.captcha == ''||this.form.captcha.length != 6) {
				this.$tools.showToast('请输入正确的验证码');
				return false;
			}
			if (this.form.password == '') {
				this.$tools.showToast('请输入密码');
				return false;
			}
			if (this.form.password.length < 6) {
				this.$tools.showToast('至少输入六位密码');
				return false;
			}
			// if(this.form.inviter_id==''){
			// 	this.$tools.showToast("请输入推荐编号");
			// 	return false;
			// }
			
			
			
			return true;
		},
		// 提交表单
		toSubmit() {
			if (!this.isSubmit()) {
				return false;
			}
			var data = this.form;
			data.openid = uni.getStorageSync('openid');
			this.$axios
				.axios('POST', this.$paths.sms_register, data)
				.then(res => {
					if (res.code == 10000) {
						this.$tools.showToast('注册成功');
						uni.setStorageSync('userInfo', res.result.info);
						uni.setStorageSync('token', res.result.token);
						// username--> 可以用过这个账号加密码的方式登录
						uni.setStorageSync('username', res.result.username);
						uni.reLaunch({
							// url: '/pages/index_1/index_1'
							url: '/pages/live_1/live_1'
						});
					} else {
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {
					console.log('错误回调', err);
				});
		}
	}
};
</script>

<style>
@import url('register.css');
</style>
