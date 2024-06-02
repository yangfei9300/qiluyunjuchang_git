<template>
	<view>
		<view class="roww p-all-25 center_center border_bottom" v-for="(item,index) in loglist" 
		v-if="options.type==1">
			<view class="colonn">
				<view class="fs-30">订单编号:{{item.id}}</view>
				<view class="fs-30 m-top-15 color2_r">金额:{{item.money}}</view>
			</view>
			<view class="allline">
			</view>
			<view v-if="item.orderStatus==0" class="fw-b fs-30" style="color: #FFA247;">未支付</view>
			<view v-if="item.orderStatus==1" class="fw-b fs-30" style="color: #FFA247;">支付成功</view>
			<view v-if="item.orderStatus==2" class="fw-b fs-30" style="color: #FFA247;">支付失败</view>
		</view>
		<view class="roww p-all-25 center_center border_bottom" v-for="(item,index) in loglist"
		v-if="options.type==2">
			<image class="giteicon m-right-20"
			:src="item.params.image"
			></image>
			<view class="colonn fs-30 h-100 rowsbl">
				<view class="w-450 txtShowLength">{{item.params.giftName}}</view>
				<view>{{item.createTime}}</view>
			</view>
			<view class="allline"></view>
			<view class="fs-30 fw-b" style="color: #FFA247;">{{item.money}}金币</view>
		</view>
		
		<view v-if="loglist.length<=0" class="roww center_center">
			<noList></noList>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loglist:[],
				options:{}
			}
		},
		onLoad(options) {
			this.options=options;
			if(options.type==1){
				uni.setNavigationBarTitle({
					title:"充值记录"
				})
				this.getpayorderlog();
			}else{
				uni.setNavigationBarTitle({
					title:"赠送记录"
				})
				this.getSonghistory();
			}
		},
		methods: {
			// 赠送记录
			getSonghistory(){
				var userInfo=uni.getStorageSync("userInfo");
				if(!userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
					},1000)
					return false;
				}
				var data = {
					'memberId':userInfo.member_id,
					openid:uni.getStorageSync("openid")
				}
				this.$axios
					.axios('POST', this.$paths.giftlog, data)
					.then(res => {
						if (res.code == 200) {
							this.loglist=res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			//充值记录
			getpayorderlog(){
				var userInfo=uni.getStorageSync("userInfo");
				if(!userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
					},1000)
					return false;
				}
				var data = {
					'memberId':userInfo.member_id,
					openid:uni.getStorageSync("openid")
				}
				this.$axios
					.axios('POST', this.$paths.paypaylog, data)
					.then(res => {
						if (res.code == 200) {
							this.loglist=res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
@import url(payorderlog.css);
</style>
