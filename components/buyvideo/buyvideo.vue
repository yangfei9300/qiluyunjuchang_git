<template>
	<view>
		<view class="huuibeijing colonn center_center">
			<view class="colonn background1  w-600 " style="border-radius: 10px;">
				<view class="roww pore center_center p-top-20 p-bottom-20 border_bottom">
					<view>本内容需购买观看</view>
					<image src="../../static/giuanbis.png" 
					class="w-35 h-35 poab"
					style="right:10rpx;top:10rpx;"
					 @click="cancle(0)"
					></image>
				</view>
				
					<view class="colonn center_center p-all-20">
						<view class="roww yinyingss pore w-500 p-all-20 m-bottom-20"
						>
							<view class="colonn ">
								<view class="roww">
									<!-- src="/static/huiicon.png"  -->
									<image 
									src="/static/hongicon.png"
									class="w-45 h-45 m-top-5 m-right-10"
									></image>
									<!-- style="border-radius: 50%;border:1px solid #c0c0c0;" -->
									<view class="colonn">
										<view class="roww bottom">
											<view class="colors font_size7_r fs-30">购买此内容</view>
											<view class="fs-25">（{{money}}元）</view>
										</view>
										<view class="roww fs-25 m-top-10">
											<view style="color:#c0c0c0;">购买后即可欣赏</view>
											<view class="color2_r">此内容</view>
										</view>
									</view>
								</view>
								<view
								class="fs-25 lh-40 w-500 m-top-20"
								>注意:消费券可通过齐鲁云剧场或齐鲁艺票通公众号领取，一旦支付成功，概不接受退款！</view>
							</view>
						</view>
					</view>
				<view class="beindd m-left-50"
				 @click="cancle(0)"
				 v-if="platform=='ios'" >暂不接受IOS支付</view>
				<view class="beindd m-left-50" v-else
				 @click="toPay(2)"
				>确认支付</view>
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
		props:{
			money:{
				type:String,
				default: ''
			}
		},
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
			},
			toPay(index){
				this.$emit("toPay",{'index':index})
			},
		}
	}
</script>

<style>
.colors{
	color: rgba(255,142,45,1);
}
.yinyingss{
	/* -webkit-box-shadow:0 0 10rpx rgba(255,142,45,1);
	  -moz-box-shadow:0 0 10rpx rgba(255,142,45,1); */
}
.beindd{
	width: 400rpx;height:80rpx;background-color: #04C260;line-height: 60rpx;color: white;
	text-align: center;
	line-height: 80rpx;
	font-size: 25rpx;
	border-radius: 15rpx;
	margin-left: 100rpx;
	margin-top:10rpx;
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
