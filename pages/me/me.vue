<template>
	<view>
		<view class="roww center_center" style="padding:40rpx 20rpx 30rpx 20rpx;">
			<block v-if="userInfo">
				<image :src="userInfo.member_avatar" class="headimgd"></image>
				<view class="fs-30 txtShowLength w-300">
					<block v-if="userInfo.member_nickname">
						{{userInfo.member_nickname}}
					</block>
					<block v-else>
						普通会员
					</block>
				</view>
				<view class="allline"></view>
				<view class="colonn fs-30 ">
					<navigator url="../../pages1/updateInfo/updateInfo" hover-class="none">
						<view class="updateinfo roww center_center">
							<view class="fs-25">编辑资料</view>
							<image src="../../static/youjiantous.png" class="w-25 h-25"></image>
						</view>
					</navigator>

					<view class="loadinfo roww center_center m-top-10" @click.stop="getUserProfile">
						<view class="fs-25" style="color: #007AFF;">刷新头像</view>
						<image src="../../static/shuaixns.png" class="w-25 h-25 m-left-10"></image>
					</view>
				</view>
			</block>
			<block v-else>
				<navigator url="../../pages2/login/login" hover-class="none">
					<view>立即登录</view>
				</navigator>

			</block>
		</view>
		<view class="colonn m-top-10">
			<!-- <navigator url="../../pages1/my_wallet/my_wallet" hover-class="none">
				<view class="roww center_center border_bottom p-all-25">
					<image src="../../static/qianbao.png" class="w-45 h-45 m-right-20"></image>
					<view class="fs-30">我的钱包</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
				</view>
			</navigator> -->

			<!-- <navigator url="../../pages1/my_points/my_points" hover-class="none">
				<view class="roww center_center border_bottom p-all-25">
					<image src="../../static/integral.png" class="w-45 h-45 m-right-20"></image>
					<view class="fs-30">我的积分</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
				</view>
			</navigator> -->

			
				<view class="roww center_center border_bottom p-all-25"
				@click="toPage('../../pages1/my_collection_1/my_collection_1')"
				>
					<image src="../../static/dingdanicon.png" 
					class="w-45 h-45 m-right-20"></image>
					<view class="fs-30">我的订单</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
				</view>
				<view class="roww center_center border_bottom p-all-25"
				
				@click="toPage('../../pages1/my_collection_1/my_collection_1')"
				>
					<image src="../../static/shoucang.png" class="w-45 h-45 m-right-20"></image>
					<view class="fs-30">我的收藏</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
				</view>

			<!-- <view class="roww center_center border_bottom p-all-25">
				<image src="../../static/huodong.png" class="w-45 h-45 m-right-20"></image>
				<view class="fs-30">我参加过的活动</view>
				<view class="allline"></view>
				<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
			</view> -->
			<!-- <view class="roww center_center border_bottom p-all-25">
				<image src="../../static/jiangpin.png" class="w-45 h-45 m-right-20"></image>
				<view class="fs-30">我的奖品</view>
				<view class="allline"></view>
				<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
			</view> -->
			<navigator
			url="../../pages1/about_us/about_us"
			hover-class="none"
			>
				<view class="roww center_center border_bottom p-all-25">
					<image src="../../static/ianxiwomen.png" class="w-45 h-45 m-right-20"></image>
					<view class="fs-30">关于我们</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
				</view>
			</navigator>
			

			<navigator hover-class="none" url="../../pages2/setting/setting">
				<view class="roww center_center border_bottom p-all-25">
					<image src="../../static/shezhi.png" class="w-45 h-45 m-right-20"></image>
					<view class="fs-30">设置</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou2.png" class="w-35 h-35 "></image>
				</view>
			</navigator>

		</view>


		<view class="huuibeijing colonn center_center" v-if="codeAlert" @click.stop="hideshowCodeAlert">
			<view class="colonn center_center w-650  background1 p-top-40 p-bottom-40" style="border-radius: 15rpx;"
				@click.stop="aaaaa">
				<view>验证码</view>
				<view class="roww border_bottom center_center p-all-20 m-top-20 p-top-40 m-bottom-40">
					<!-- <view class="w-150">手机号</view> -->
					<input placeholder-class="text_align1_r" class="text_align1_r" placeholder="请输入验证码" />
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
				userInfo: null,

			}
		},
		onLoad() {},
		onShow() {
			var userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				this.userInfo = userInfo;
				this.getUserInfo();
			}
		},
		methods: {
			toPage(pageurl){
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
						url:pageurl
					})
			},
			// 通过微信获取个人信息
			getUserProfile() {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res)
						this.$tools.showToast("获取用户信息成功");
						this.loadUserInfo(res.userInfo);
					}
				})
			},
			// 加载个人信息
			loadUserInfo(wxuserinfo) {
				var data = {
					memberavatar: wxuserinfo.avatarUrl,
					member_nickname: wxuserinfo.nickName
				}
				this.$axios
					.axiosDate('POST', this.$paths.edit_memberavatar, data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("修改成功");
							setTimeout(res => {
								this.getUserInfo();
							}, 1000)
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 从后台获取个人信息
			getUserInfo() {

				var data = {};
				this.$axios
					.axiosDate('POST', this.$paths.indexMember, data)
					.then(res => {
						if (res.code == 10000) {
							uni.setStorageSync("userInfo", res.result.member_info)
							this.userInfo = res.result.member_info;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
	@import url("me.css");
</style>
