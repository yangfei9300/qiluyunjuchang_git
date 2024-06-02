<template>
	<view>
		<view class="huuibeijing colonn center_center">
			<view class="colonn background1  w-600 ">
				<!-- <view class="roww endend p-right-20 p-top-20">
					<image src="../../static/giuanbis.png" class="w-35 h-35"
					 @click="cancle(0)"
					></image>
				</view> -->
				<view class="roww pore center_center p-top-20 p-bottom-20 border_bottom">
					<view>会员开通</view>
					<image src="../../static/giuanbis.png" 
					class="w-35 h-35 poab"
					style="right:10rpx;top:10rpx;"
					 @click="cancle(0)"
					></image>
				</view>
				<scroll-view
				scroll-y
				style="height:280rpx;"
				>
					<view class="colonn center_center p-all-20">
						<view class="roww yinyingss pore w-500 p-all-20 m-bottom-20"
						v-for="(item,index) in 3"
						style="border:1px solid rgba(255,142,45,1);border-radius: 15rpx;"
						>
							<view class="colonn colors">
								<view class="color5_r font_size7_r fs-30">VIP会员（1年）</view>
								<view class="fs-25 font_size7_r">￥20.00</view>
							</view>
							<image src="../../static/checkon.png"
							class="w-40 h-40 poab" style="right: 0rpx; bottom: 0rpx;"
							></image>
						</view>
					</view>
				</scroll-view>
				<view
				class="fs-30 lh-40 w-500 m-left-50"
				>注意:优惠券可通过齐鲁云剧场或齐鲁艺票通公众号领取，一旦支付成功，概不接受退款！</view>
				<view class="beindd m-left-50"
				 @click="cancle(0)"
				 v-if="platform=='ios'" >暂不接受IOS支付</view>
				<view class="beindd m-left-50" v-else>确认支付</view>
				<view class="beindd1 m-left-50" 
				 @click="cancle(1)">放弃支付</view>
				<view class="h-50"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"buyvipalert",
		data() {
			return {
				platform:""
			};
		},
		created() {
			var platform=uni.getSystemInfoSync().platform
			this.platform=platform;
		},
		methods:{
			cancle(index){
				this.$emit("cancle",{'index':index})
			}
		}
	}
</script>

<style>
.colors{
	color: rgba(255,142,45,1);
}
.yinyingss{
	-webkit-box-shadow:0 0 10rpx rgba(255,142,45,1);
	  -moz-box-shadow:0 0 10rpx rgba(255,142,45,1);
}
.beindd{
	width: 400rpx;height:80rpx;background-color: #04C260;line-height: 60rpx;color: white;
	text-align: center;
	line-height: 80rpx;
	font-size: 25rpx;
	border-radius: 15rpx;
	margin-left: 100rpx;
	margin-top:50rpx;
}
.beindd1{
	width: 400rpx;
	height:80rpx;
	background-color: #ffffff;
	text-align: center;
	border:1px solid #c0c0c0;
	line-height: 80rpx;
	font-size: 25rpx;
	border-radius: 15rpx;
	margin-left: 100rpx;
	margin-top:20rpx;
}
</style>
