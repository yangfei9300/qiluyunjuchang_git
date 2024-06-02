<template>
	<view>
		<view
		v-if="pagetopScroll>10"
		style="background: linear-gradient(106deg, #FFC7AF 5%, #FFF17B 100%);height:34px;width:750rpx;position: fixed;top: 0rpx;z-index:1003;">
		</view>
		<view class="colonn topview">
			<view class="h-48"></view>
			<view class="topallview "
			style="z-index:1000"
			:style="{
				width:info.safeArea.width+'px',
				height:(menuButton.height+menuButton.top+8)+'px',
				top:'0px'
			}"
			>
				<view class="capsulevioew roww center_center"
				:style="{
					height:(menuButton.height)+'px',
					top:(menuButton.top)+'px',
					left:(info.windowWidth-menuButton.right)+'px',
				}"
				@click.stop="toSearch "
				>
					<view class="font_size7_r">我的</view>
				</view>
			</view>
			
			<view class="roww center_center" style="padding:0rpx 20rpx 30rpx 20rpx;">
				<block v-if="userInfo">
					<image :src="userInfo.member_avatar" mode="aspectFill" class="headimgd"></image>
					<view class="colonn">
						<view class="fs-30 txtShowLength w-300">
							<block v-if="userInfo.member_nickname">
								{{userInfo.member_nickname}}
							</block>
							<block v-else>
								普通会员
							</block>
						</view>
						<view class="roww m-top-10">
							<view class="vipicoc roww endend" v-if="userInfo.level==1">
								<image src="/static/wode_11.png" class="w-40 h-34"
								style="position: relative;left:-10rpx;"
								></image>
								<view class="allline"></view>
								<view class="vipf">v{{userInfo.level}}</view>
								<view class="w-10"></view>
							</view>
							<view class="vipicoc roww endend"
							 style="background: linear-gradient(90deg, #FDF0D0 0%, #FFB566 99%);"
							 v-else>
								<image src="/static/wode_12.png" class="w-40 h-34"
								style="position: relative;left:-10rpx;"
								></image>
								<view class="allline"></view>
								<view class="vipf vipf1">v{{userInfo.level}}</view>
								<view class="w-10"></view>
							</view>
						</view>
					</view>
					<view class="allline"></view>
					<view class="colonn fs-30 ">
						<navigator url="../../pages1/updateInfo/updateInfo" hover-class="none">
							<view class="updateinfo roww center_center">
								<image src="../../static/wode_06.png" 
								class="w-25 h-30 m-right-10"></image>
								<view class="fs-25">编辑资料</view>
								<view class="w-10"></view>
							</view>
						</navigator>
			
						<view class="loadinfo roww center_center m-top-10" @click.stop="getUserProfile">
							<view class="fs-25" style="color: #999999;">刷新头像</view>
							<image src="../../static/wode_13.png" 
							class="w-25 h-25 m-left-10"></image>
						</view>
					</view>
				</block>
				<block v-else>
					
					
					<!--  #ifdef  MP-TOUTIAO -->
					<view @click.stop="toLoginToutiao">立即登录</view>
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<navigator url="../../pages2/login/login" hover-class="none">
						<view>立即登录</view>
					</navigator>
					<!--  #endif -->
					
				
			
				</block>
			</view>
			
			<view class="h-20"></view>
			<view class="shuziInfo rowsa center_center">
				<view class="colonn allline center_center">
					<view class="jinetxt m-bottom-15">{{userInfo?userInfo.available_predeposit:0}}元</view>
					<view class="fs-25 m-top-15">余额</view>
				</view>
				<view style="height: 65rpx;width: 1px;background-color: #f5f5f5"></view>
				<view class="colonn allline center_center">
					<view class="jinetxt m-bottom-15">{{userInfo?userInfo.member_points:0}}</view>
					<view class="fs-25 m-top-15">积分</view>
				</view>
			</view>
			
		</view>
		
		
		<view class="vipbigview roww rowsb center_center"
		@click.stop="tobuyvip"
		>
			<view class="colonn">
				<view class="viphuiyuantexain">VIP会员享特权</view>
				<block v-if="userInfo&&userInfo.level>1">
					<view class="huiyuangengdu" v-if="userInfo.end_viptime!=0">{{userInfo.end_viptime.split(" ")[0]}}到期</view>
					<block v-else>
						<view class="huiyuangengdu">会员可享更多权益</view>
					</block>
				</block>
				<block v-else>
					<view class="huiyuangengdu">会员可享更多权益</view>
				</block>
			</view>
			<view class="shengjihuiyuan1 roww center_center" v-if="userInfo&&userInfo.level>1">
				<image src="/static/wode_19.png" class="w-30 h-20 m-right-10"></image>
				<view class="shengjhuiyuan2"  >立即续费</view>
			</view>
			
			<view class="shengjihuiyuan roww center_center" v-else>
				<image src="/static/wode_19.png" class="w-30 h-20 m-right-10"></image>
				<view class="shengjhuiyuan1" >升级会员</view>
			</view>
		</view>
		<view class="myservice colonn">
			<view class="wodefuwu">我的服务</view>
			<view class="rowsa m-top-38">
				<view class="colonn center_center"
				@click.stop="toPage('/pages2/myorder/myorder')"
				>
					<image class="shoucangicon" src="/static/wode_26.png"></image>
					<view class="fs-25">订单</view>
				</view>
				
				
				<view class="colonn center_center"
				@click="toPage('../../pages1/my_collection_1/my_collection_1')"
				>
					<image class="shoucangicon"  src="/static/wode_23.png"></image>
					<view class="fs-25">收藏</view>
				</view>
				
				<navigator
				url="../../pages1/about_us/about_us"
				hover-class="none"
				>
				<view class="colonn center_center">
					<image class="shoucangicon"   src="/static/wode_29.png"></image>
					<view class="fs-25">联系</view>
				</view>
				</navigator>
				
				<navigator hover-class="none" url="../../pages2/setting/setting">
				<view class="colonn center_center">
					<image class="shoucangicon"  src="/static/wode_32.png"></image>
					<view class="fs-25">设置</view>
				</view>
				</navigator>
			</view>
		</view>
		
		<null></null>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				menuButton:{},
				
				userInfo: null,
				pagetopScroll:0,
				
				BASE_IMG:""
			}
		},
		onLoad() {
			this.BASE_IMG=this.$paths.BASE_IMG;
			this.getWindowInfo();
		},
		onShow() {
			var userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				this.userInfo = userInfo;
			}
			this.getUserInfo();
		},
		onShareAppMessage () {
		        return {
		            title: "齐鲁云剧场",
		            imageUrl:"/static/lianxi_15.png",
		            path: '/pages/index_1/index_1'
		        }
		    },
		onPageScroll(res) {
			this.pagetopScroll=res.scrollTop;
		},
		methods: {
			
			
			
			// 抖音登录
			toLoginToutiao(){
				tt.login({
				  force: true,
				  success(res) {
				    console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
				  },
				  fail(res) {
				    console.log(`login 调用失败`);
				  },
				});
			},
			// 购买VIP
			tobuyvip(){
				if(!getApp().isLogin()){
					return false;
				}
				
			
							uni.navigateTo({
								url:"/pages1/buy_vip_1/buy_vip_1"
							})
						
				
				
			},
			//获取设备信息
			getWindowInfo(){
				
				try {
					
				   // #ifdef  MP-WEIXIN
					const info = wx.getSystemInfoSync();
					var menuButton=wx.getMenuButtonBoundingClientRect();
				   // #endif
				  // #ifdef  MP-TOUTIAO
				  const info = tt.getSystemInfoSync();
				  var menuButton=tt.getMenuButtonBoundingClientRect();
				  // #endif
				  this.info=info;
				  this.menuButton=menuButton;
				} catch (e) {
				}
			},
			
			toPage(pageurl){
					if(!this.userInfo){
						this.$tools.showToast("请先登录");
						setTimeout(res=>{
							uni.navigateTo({
								url:"/pages2/login/login"
							})
						},1000)
						return false;
					}
					uni.navigateTo({
						url:pageurl,
						fail: (res) => {
							console.log("失败0",res);
						}
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
							var adUrl=uni.getStorageSync("adUrl");
							if(!adUrl){
								this.getGuanggaoUrl();
							}
							
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取广告地址
			getGuanggaoUrl(){
				if(this.userInfo){
					var data={
						member_level:this.userInfo.level,
					}
				}else{
					var data={
						member_level:1,
					}
				}
				this.$axios
					.axios('POST', 
					this.$paths.get_adv_video, 
					data)
					.then(res => {
						if (res.code == 10000) {
							console.log("广告地址",res);
							this.$tools.downloadVideo(res.result.url);
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
@import url("me_1.css");
</style>
