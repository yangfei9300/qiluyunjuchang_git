<template>
	<view>
		<view class="roww center_center p-all-20 border_bottom"> 
			<view class="w-150">新密码密码</view>
			<input v-model="form.password" placeholder="请输入新密码" />
			<view class="allline"></view>
		</view>
		<view class="roww center_center p-all-20 border_bottom">
			<view class="w-150">新密码</view>
			<input v-model="form.password1"  placeholder="请再次输入新密码" />
			<view class="allline"></view>
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
				form:{
					password:"",//	23456	是	string	新登录密码
					password1:"",//	23456	是	string	新登录密码确认
				},
				type:1,//1是登录密码2是支付密码
			}
		},
		// /Memberaccount/modify_paypwd
		onLoad(options) {
			this.options=options;
			this.type=options.type;
			if(options.type==1){
				uni.setNavigationBarTitle({
					title:"修改登录密码"
				})
			}else if(options.type==2){
					uni.setNavigationBarTitle({
						title:"修改支付密码"
					})
			}
		},
		methods: {
			isSUbmit(){
				if(this.form.password==""){
					this.$tools.showToast("请输入新密码");
					return false;
				}
				if(this.form.password1==""){
					this.$tools.showToast("请再次输入新密码");
					return false;
				}
				if(this.form.password!=this.form.password1){
					this.$tools.showToast("两次密码输入不一致");
					return false;
				}
				if(this.form.password1.length<6||this.form.password.length<6){
					this.$tools.showToast("新密码至少6位");
					return false;
				}
				return true;
			},
			toSubmit(){
				if(!this.isSUbmit()){
					return false;
				}
				var data=this.form;
				if(this.type==1){
					var url=this.$paths.modify_password;
				}else{
					var url=this.$paths.modify_paypwd;
				}
				this.$axios
					.axiosDate('POST',url,data)
					.then(res => {
						if(res.code==10000){
							this.$tools.showToast("密码修改成功");
							
							if(this.type==1){
								setTimeout(res=>{
									uni.reLaunch({
										url:"../../pages2/login/login"
									})
								},1000)
							}else{
								setTimeout(res=>{
								uni.navigateBack({
									delta:2
								})
								},1000)
							}
							
							
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
					});
			}
		}
	}
</script>

<style>
@import url("updatePwd.css");
</style>
