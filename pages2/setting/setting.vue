<template>
	<view>
		<view class="roww center_center border_bottom p-all-25"
		@click.stop="sendcode(1)"
		>
			<image 
			src="../../static/setting/shezhi_03.png"
			class="w-45 h-45 m-right-20"
			></image>
			<view class="fs-30">修改登录密码</view>
			<view class="allline"></view>
			<image src="../../static/youjiantou2.png"
			class="w-35 h-35 "
			></image>
		</view>
		<view class="roww center_center border_bottom p-all-25"
		@click.stop="sendcode(2)"
		>
			<image src="../../static/setting/shezhi_06.png"
			class="w-45 h-45 m-right-20"
			></image>
			<view class="fs-30">修改支付密码</view>
			<view class="allline"></view>
			<image src="../../static/youjiantou2.png"
			class="w-35 h-35 "
			></image>
		</view>
		<view class="roww center_center border_bottom p-all-25"
		@click.stop="tophone"
		>
			<image  src="../../static/setting/shezhi_08.png"
			class="w-45 h-45 m-right-20"
			></image>
			<view class="fs-30">修改手机号</view>
			<view class="allline"></view>
			<image src="../../static/youjiantou2.png"
			class="w-35 h-35 "
			></image>
		</view>
		
		<navigator
		:url="'../agreement/agreement?type=1'"
		hover-class="none"
		>
		<view class="roww center_center border_bottom p-all-25"
		>
			<image   src="../../static/setting/shezhi_10.png"
			class="w-45 h-45 m-right-20"
			></image>
			<view class="fs-30">用户协议</view>
			<view class="allline"></view>
			<image src="../../static/youjiantou2.png"
			class="w-35 h-35 "
			></image>
		</view>
		</navigator>
		
		
		
		<view class="roww center_center border_bottom p-all-25"
		@click.stop="loginout"
		>
			<image src="../../static/setting/shezhi_12.png"
			class="w-45 h-45 m-right-20"
			></image>
			<view class="fs-30">退出登录</view>
			<view class="allline"></view>
			<image src="../../static/youjiantou2.png"
			class="w-35 h-35 "
			></image>
		</view>
		
		<view
		class="huuibeijing colonn center_center"
		v-if="codeAlert"
		@click.stop="hideshowCodeAlert"
		>
			<view class="colonn center_center w-650  background1 p-top-40 p-bottom-40"
			style="border-radius: 15rpx;"
			@click.stop="aaaaa"
			>
				 <view>验证码</view>
				 <view class="roww border_bottom center_center p-all-20 m-top-20 p-top-40 m-bottom-40">
					 <!-- <view class="w-150">手机号</view> -->
					 <input 
					 placeholder-class="text_align1_r" 
					 class="text_align1_r" v-model="codeFrom.auth_code"
					 placeholder="请输入验证码" />
				 </view>
				<view class="roww rowsa allline">
					<view class="tijiaosn" @click.stop="hideshowCodeAlert">取消</view>
					<view class="w-20"></view>
					<view class="tijiaosn" @click.stop="verification_code">确认</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeAlert:false,
				codeFrom:{
					auth_code:''
				},
				pwdtype:1,
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
				this.getUserInfo();
			}
		},
		methods: {
			tophone(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
					},1000)
					return false;
				}
				uni.navigateTo({
					url:"../updatephone/updatephone"
				})
			},
			// 从后台获取个人信息
			getUserInfo(){
				var data={};
				this.$axios
					.axiosDate('POST', this.$paths.indexMember, data)
					.then(res => {
						if(res.code==10000){
							uni.setStorageSync("userInfo",res.result.member_info)
										this.userInfo=res.result.member_info;
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
					});
			},
			aaaaa(){},
			// 验证验证码的准确定
			verification_code(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
						
					},1000)
					return false;
				}
				if(this.codeFrom.auth_code==""){
					this.$tools.showToast("请输入验证码");
					return false;
				}
				var data=this.codeFrom
				this.$axios
					.axiosDate('POST',this.$paths.check_auth_code,data)
					.then(res => {
						if(res.code==10000){
							this.$tools.showToast("验证成功");
							setTimeout(res=>{
								uni.navigateTo({
									url:"../../pages2/updatePwd/updatePwd"
								})
							},1000)
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
					});
			},
			// 显示隐藏验证码对话框
			hideshowCodeAlert(){
				this.codeAlert=!this.codeAlert;
			},
			// 判断发送验证码哪一类验证码
			ischeckcode(){
			},
			//发送验证码
			sendcode(type){
			
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
						
					},1000)
					return false;
				}
					
				 var data={};
				if(this.userInfo.member_mobilebind=='1'){
					data.type='mobile';
				}else{
					this.$tools.showToast("请先完善手机号");
					return false;
				}
				this.pwdtype=type;
				this.$axios
					.axiosDate('POST',this.$paths.send_auth_code,data)
					.then(res => {
						if(res.code==10000){
							this.$tools.showToast("验证码发送成功");
							this.codeAlert=true;
						}else{
							this.$tools.showToast(res.message);
							
						}
					})
					.catch(err => {
					});
			},
			// 去修改登录密码界面
			toUpdatePwd(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
						
					},1000)
					return false;
				}
				uni.navigateTo({
					url:"../../pages2/updatePwd/updatePwd?type="+this.pwdtype
				})
			},
			// /退出登录事件
			loginout(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
						
					},1000)
					return false;
				}
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success:  (res)=> {
						if (res.confirm) {
							
							this.indexLogout();
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			indexLogout(){
				var data={
					username:this.userInfo.member_name,//	test666	是	string	用户名
					client:"wechat",//	wap	是	string	客户端类型 android wap wechat ios windows jswechat ‘minipro
				}
				this.$axios
					.axiosDate('POST',this.$paths.indexLogout,data)
					.then(res => {
						if(res.code==10000){
							this.$tools.showToast("退出成功");
							uni.removeStorageSync("userInfo")
							uni.removeStorageSync("token")
							
							setTimeout(res=>{
								uni.reLaunch({
									url:"../../pages2/login/login"
								})
							},1000)
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
					});
			},
		}
	}
</script>

<style>
@import url("setting.css");
</style>
