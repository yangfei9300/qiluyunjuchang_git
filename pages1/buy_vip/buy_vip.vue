<template>
	<view>
		<image src="https://res.oss.zhuyin.club/res/0/87/picture/0/202107/07/2021070714556-1228.png"
		mode="widthFix" class="w-750"
		></image>
		<view style="background-color:#B748FD;height:20rpx;width:750rpx;margin-top:-20rpx;z-index:1000;"></view>
		<view class="roww  width"
		 style="background-color:#B748FD;padding:30rpx 0rpx;opacity: 0;">
			<button type="primary" plain  style="background-color: #ffffff;">我要买会员</button>
			<button type="primary" @click="payClickClick">我有消费券</button>
		</view>
		<view class="roww viewbottom width"
		 style="background-color:#B748FD;padding:30rpx 0rpx;">
			<button type="primary" plain @click="payClickClick" style="background-color: #ffffff;">我要买会员</button>
			<button type="primary" @click="payClickClick">我有消费券</button>
		</view>
		<buyvipalert v-if="payClick" @cancle="cancle"></buyvipalert>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform:"",
				payClick:false,
			}
		},
		
		onLoad() {
			
		},
		methods: {
			payClickClick(){
				this.payClick=!this.payClick;
			},
			cancle(index){
				console.log("阿斯顿",index);
				this.payClick=false;
			},
		}
	}
</script>

<style>
@import url("buy_vip.css");
</style>
