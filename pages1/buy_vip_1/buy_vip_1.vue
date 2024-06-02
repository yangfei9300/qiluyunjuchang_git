
<template>
	<view>
		<view class="topview pore">
			<view
			v-if="pagetopScroll>10"
			style="background-color: #FFB43D;height:24px;width:750rpx;position: fixed;top: 0rpx;z-index:1003;">
			</view>
			
			<view class="logo roww center_center" style="position: absolute;" 
			@click.stop="backpage"
			:style="{
				top:(menuButton.top)+'px',
				left:(info.windowWidth-menuButton.right)+'px',
				height:(menuButton.height)+'px',
				width:(menuButton.height)+'px',
			}">
				<image src="/static/zuojiandd.png" class="w-20 h-30"></image>
			</view>
<!-- style="padding:0rpx 20rpx 30rpx 20rpx;" -->
			<view class="roww center_center poab" 
			:style="{
				top:(menuButton.top+menuButton.height+32)+'px',
				left:(info.windowWidth-menuButton.right)+'px',
			}"
			>
				<block v-if="userInfo">
					<image :src="userInfo.member_avatar" class="headimgd"></image>
					<view class="colonn">
						<view class="fs-30 txtShowLength w-300">
							<block v-if="userInfo.member_nickname">
								{{userInfo.member_nickname}}
							</block>
							<block v-else>
								普通会员
							</block>
						</view>
						<view class="roww m-top-20">
							<view class="vipicoc roww endend" v-if="userInfo.level==1">
								<image src="/static/wode_11.png" class="w-40 h-34"
									style="position: relative;left:-10rpx;"></image>
								<view class="allline"></view>
								<view class="vipf">v{{userInfo.level}}</view>
								<view class="w-10"></view>
							</view>
							<view class="vipicoc roww endend"
								style="background: linear-gradient(90deg, #FDF0D0 0%, #FFB566 99%);" v-else>
								<image src="/static/wode_12.png" class="w-40 h-34"
									style="position: relative;left:-10rpx;"></image>
								<view class="allline"></view>
								<view class="vipf vipf1">v{{userInfo.level}}</view>
								<view class="w-10"></view>
							</view>
							<view class="daoqitime" v-if="userInfo.end_viptime!=0">{{userInfo.end_viptime}}到期，购买后有效期将顺延</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- :style="{
			top:(menuButton.top+menuButton.height+32+70)+'px',
			left:(info.windowWidth-menuButton.right)+'px',
		}" -->
		<!-- margin-top:-180rpx;" --> 
		<view style="margin-top:-300rpx;">
		<view class="roww center_center " 
		style="padding:50rpx 20rpx 30rpx 20rpx;"
		
		>
			<image class="w-52 h-35" src="/static/ktVIP_03.png"></image>
			<view class="viptxt m-left-15">VIP会员</view>
			<view class="allline "></view>
		</view>
		<view class="colonn " 
		>
			<view class="viptaoanview roww center_center "
			style="margin-bottom:15rpx;"
			v-for="(item,index) in 1"
			>
				<view class="roww rowsa center_center w-690 ">
					<view class="w-50"></view>
					<view class="viphuiyuan1">VIP会员(1年)</view>
					<view class="allline"></view>
					<view class="roww font_size7_r duiqi">
						<view style="color: #A56111;">￥</view>
						<view class="liushiyuan">{{taotanInfo.price}}</view>
					</view>
					
						<view class="w-50"></view>
				</view>
			</view>
		</view>
		</view>
		
		
		<!-- @click.stop="toCoupins" -->
		<view class="roww center_center m-left-30 w-690 m-top-30 m-bottom-50"
		
		>
			<image class="w-30 h-30" src="/static/ktVIP_11.png"></image>
			<view class="shiyongquansa m-left-15">使用消费券（返现）</view>
			<view class="allline"></view>
			<view class="sanhangquan">0张可用</view>
			<image src="/static/youjiantou2.png" class="w-25 h-25 m-left-15"></image>
		</view>
		
		<view class="liishifu roww center_center"
		@click.stop="buy_step2Click"
		>
			<view class="lijishids"
			
			>立即支付</view>
		</view>
		<view class="h-50"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				menuButton: {},
				userInfo: null,
				
				'pagetopScroll':0,
				taotanInfo:{}
			}
		},
		onLoad() {
			this.getWindowInfo();
			
		},
		onShow() {
			var userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				this.userInfo = userInfo;
				this.getUserInfo();
			}
			this.getTaocan();
		},
		onPageScroll(res) {
			this.pagetopScroll=res.scrollTop;
		},
		methods: {
			getTaocan(){
				// https://qlyjc.zsyflive.com/api/Index/get_member_price
				// 
				var data = {
					
				};
				this.$axios
					.axios('POST', this.$paths.get_member_price, data)
					.then(res => {
						if (res.code == 10000) {
							this.taotanInfo=res.result;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// to_zhifu(pay_sn,pay_amount){
			// 	var data = {
			// 		pay_sn:pay_sn,
			// 		'pay_amount':pay_amount
			// 	};
			// 	this.$axios
			// 		.axiosDate('POST', this.$paths.payMembervrbuy, data)
			// 		.then(res => {
			// 			if (res.code == 10000) {
			// 				console.log("支付节开始",res);
			// 			} else {
			// 				this.$tools.showToast(res.message);
			// 			}
			// 		})
			// 		.catch(err => {});
			// },
			toWxpay(data){
				wx.requestPayment({
				  timeStamp:data.timeStamp,
				  nonceStr: data.nonceStr,
				  package:data.package,
				  signType: data.signType,
				  paySign:data.paySign,
				  success: (res)=> {
					this.$tools.showToast("支付成功");
					setTimeout(res=>{
						this.getUserInfo();
					},1000)
				  },
				  fail (res) { 
					 
				  },
				  complete:(res)=> {
				  	console.log("微信支付结果",res)
				  }
				})  
			},
			// 购买VIP下单
			buy_step2Click(){
				console.log(uni.getSystemInfoSync().platform )
				if(uni.getSystemInfoSync().platform == 'ios'){
					this.$tools.showToast("苹果暂时不支持购买会员");
					return false;
				}
				
				var data = {
					goods_num:"1",
					'openid':uni.getStorageSync("openid"),
					'goods_price':this.taotanInfo.price
				};
				this.$axios
					.axiosDate('POST', this.$paths.buy_vipMember, data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("下单成功");
							// this.to_zhifu(res.result.order_sn,res.result.order_amount);
							this.toWxpay(res.result);
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			backpage(){
				uni.navigateBack({
					delta: 1
				});
			},
			// 去优惠券界面
			toCoupins(){
				uni.navigateTo({
					url:"/pages2/consumer/consumer"
				})
			},
			//获取设备信息
			getWindowInfo() {
				try {
					const info = wx.getSystemInfoSync();
					var menuButton = wx.getMenuButtonBoundingClientRect();
					this.info = info;
					this.menuButton = menuButton;
				} catch (e) {}
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
	@import url("buy_vip_1.css")
</style>
