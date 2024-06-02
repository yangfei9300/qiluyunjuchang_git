<template>
	<view>
		<view class="roww center_center p-all-20 border_bottom">
			<view class="w-150">手机号</view>
			<input v-model="phone" placeholder="请输入手机号" />
			<view class="allline"></view>
		</view>
		<view class="roww center_center p-all-20 border_bottom">
			<view class="w-150">验证码</view>
			<input v-model="auth_code"  placeholder="请输入验证码" />
			<view class="allline"></view>
			<view class="loginivie"
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
		<view class="roww center_center" >
			<view class="tijaobtns" @click.stop="toSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				auth_code:'',//验证码
				phone:'',//电话
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
			toSubmit(){
				if(this.auth_code==''){
					this.$tools.showToast("请输入验证码");
					return false;
				}
				var data={
					auth_code:this.auth_code
				}
				this.$axios
					.axiosDate('POST', 
					this.$paths.bind_mobile_step2,
					data)
					.then(res => {
						if(res.code==10000){
							this.$tools.showToast("修改成功");
							
							setTimeout(res=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else{
							this.$tools.showToast(res.message);
						}
					})  
					.catch(err => {
						console.log('错误回调', err);
					});
				
			},
			
			// 发送验证码
			sendcode(){
								if(this.phone==''){
									this.$tools.showToast("请输入手机号");
									return false;
								}
								var data={
									mobile:this.phone
								};
								this.$axios
									.axiosDate('POST', 
									this.$paths.bind_mobile_step1, 
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
		}
	}
</script>

<style>
@import url("updatephone.css");
</style>
