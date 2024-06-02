<template>
	<view>
		<view class="colonn" style="padding:0rpx 60rpx;">
			<view class="h-100"></view>
			<view class="logintxt">找回密码</view>
			<view class="h-100"></view>
			<view class="colonn m-top-50">
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/shoujiicon.png"
					class="w-40 h-40"
					></image>
					<input placeholder="请输入手机号"
					 placeholder-class="fs-30"
					 v-model="form.phone"
					 class="fs-30 m-left-20"
					 />
				</view>
				<view class="h-50"></view>
					<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
						<image src="../../static/yanzhnegma.png"
						class="w-40 h-40"
						></image>
						<input placeholder="请输入验证码"
						 placeholder-class="fs-30"
					 v-model="form.captcha"
						 class="fs-30 m-left-20"
						 />
						 <view class="allline"></view>
						 <view class="loginivie center_center roww"
						 :style="{
						 				 background:(daojishi==100&&form.phone.length==11)?'#f0a91e':'#FED68F'
						 }"
						 >
							 
							 <view class="shenqingyanzhnegm"
							 
							
							 
							 				@click.stop="sendcode"
							 				>
							 				<block v-if="daojishi==100">
							 					获取验证码
							 				</block>
							 				<block v-else>
							 					重新发送{{daojishi}}
							 				</block>
							 				</view>
						 </view>
					</view>
			<view class="h-50"></view>
				<view class="roww  p-right-20 p-bottom-20 border_bottom m-bottom-20">
					<image src="../../static/mimaicon.png"
					class="w-40 h-40"
					></image>
					<input placeholder="请输入密码"
					 placeholder-class="fs-30" password
					 v-model="form.password"
					 class="fs-30 m-left-20"
					 />
				</view>
			</view>
			<view class="roww">
				<view class="regisertbt"@click="tologin">去登录</view>
				<view class="allline"></view>
				<view class="regisertbt yincang1"
				style="color:#1AB6F1;"
				></view>
			</view>
			<view class="roww center_center m-top-100">
				<view class="loginbtn" @click.stop="toSubmit"
				
				:style="{
								 background:(form.phone!=''&&form.captcha.length==6&&form.password.length>=6)?'#f0a91e':'#FED68F'
				}"
				>确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					phone:"",//电话
					captcha:"",//验证码
					'password':"",//密码
					'client':"wechat",//客户端类型
				},
				// 验证码 
				'dingshiqi':"",
				daojishi:100,
			}
		},
		onHide() {
			clearInterval(this.dingshiqi)
		},
		onUnload() {
			clearInterval(this.dingshiqi)
		},
		methods: {
			tologin(){
				uni.reLaunch({
					url:"../login/login"
				})
			},
			// 发送验证码
			sendcode(){
								var data1=this.form;
								if(data1.phone==""&&!this.$tools.isphone(data1.phone)){
									this.$tools.showToast("请输入正确的手机号");
									return false;
								}
								var data={
									phone:data1.phone,
									'type':'3'
								}
								this.$axios
									.axios('POST', 
									this.$paths.get_sms_captcha, 
									data)
									.then(res => {
										if(res.code==10000){
											this.$tools.showToast("短信发送成功");
											this.daojishi=res.result.sms_time;
											 clearInterval(this.dingshiqi);  
											this.dingshiqi=setInterval(res=>{
												if(this.daojishi-1<=0){
													this.daojishi=res.result.sms_time;
													 clearInterval(this.dingshiqi);  
												}else{
													this.daojishi=this.daojishi-1
												}
											},1000)
										}else{
											this.$tools.showToast(res.message);
										}
									})  
									.catch(err => {
										console.log('错误回调', err);
									});
							},
			//判断是否提交表单
			isSubmit(){
				if(this.form.phone==''){
					this.$tools.showToast("请输入手机号");
					return false;
				}
				if(!this.$tools.isPhoneNumber(this.form.phone)){
					this.$tools.showToast("请输入正确的手机号");
					return false;
				}
				if(this.form.captcha==''){
					this.$tools.showToast("请输入验证码");
					return false;
				}
				if(this.form.password==''){
					this.$tools.showToast("请输入密码");
					return false;
				}
				if(this.form.password.length<6){
					this.$tools.showToast("至少输入六位密码");
					return false;
				}
				if(this.form.inviter_id==''){
					this.$tools.showToast("请输入推荐编号");
					return false;
				}
				return true;
			},
			// 提交表单
			toSubmit(){
				if(!this.isSubmit()){
					return false;
				}
				var data=this.form;
				this.$axios
					.axios('POST', this.$paths.find_password, data)
					.then(res => {
						if(res.code==10000){
							this.$tools.showToast("密码修改成功");
							setTimeout(res=>{
								uni.reLaunch({
									url:"../login/login"
								})
							},1000)
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			}
		}
	}
</script>

<style>
@import url("findpassword.css");
</style>
