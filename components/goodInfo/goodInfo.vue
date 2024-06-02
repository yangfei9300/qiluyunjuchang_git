<template>
	<view>
		<view class="huuibeijing" style="z-index: 1000;height: 100vh;">
			<view class="colonn  goodlistview ">
				<view class="roww rowsb p-top-20 p-bottom-20">
					<view class="yincang1">关闭</view>
					<view class="fs-30">商品详情</view>
					<view class="guanbi" style="color: blue;"
					@click.stop="clickAlert"
					>关闭</view>
				</view>
				<scroll-view class="w-750  hududs " scroll-y style="background-color: #f5f5f5;height: 870rpx;">
					<swiper class="swimg" indicator-dots style="width: 750rpx;height: 400rpx">
						<swiper-item class="swimg" style="width: 750rpx;height: 400rpx" v-for="(item,index) in 5">
							<image class="swimg"></image>
						</swiper-item>
					</swiper>


					<view class="colonn m-all-10 p-all-20 background1" style="border-radius: 15rpx;">
						<view class="roww duiqi">
							<view class="roww mon_c1 duiqi">
								<view class="fs-25">￥</view>
								<view class="fs-35 font_size2_r" style="margin:0rpx 5rpx;">34.9</view>
								<view class="fs-25">起</view>
							</view>
							<view class="w-15"></view>
							<view class="huadiao fs-25 color3_r" style="color: #999999;">￥39.9</view>
							<view class="allline"></view>
							<view class=" fs-25" style="color: #999999;">已售5676</view>
						</view>
						<view class="h-25"></view>
						<view class="font_size7_r fs-30">
							新鲜水果胡萝卜脆甜迷你手指胡萝卜生吃水果零食新鲜水果胡萝卜脆甜
						</view>
						<view class="h-20"></view>
						<image src="" class="w-700" style="background-color: red;height: 700rpx"></image>
						<view class="h-20"></view>
					</view>


				</scroll-view>
				<view class="roww dibumenu rowsa">
					<view class="roww rowsa w-230">
						<view class="colonn center_center">
							<image class="shopiocn"></image>
							<view class="fs-20 m-top-5">进店</view>
						</view>
						<view class="colonn center_center">
							<image class="shopiocn"></image>
							<view class="fs-20 m-top-5">进店</view>
						</view>
						<view class="colonn center_center">
							<image class="shopiocn"></image>
							<view class="fs-20 m-top-5">进店</view>
						</view>
					</view>
					<view class="w-20"></view>
					<view class="roww center_center">
						<view class="addchat">加入购物车</view>
						<view class="addMy">立即购买</view>
					</view>
					<view class="w-25"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodList",
		data() {
			return {

			};
		},
		methods:{
			clickAlert(){
				this.$emit("clickAlert",{})
			},
		}
	}
</script>

<style>
	@import url(goodInfo.css);
</style>
