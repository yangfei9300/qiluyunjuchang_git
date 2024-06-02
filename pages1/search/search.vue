<template>
	<view>
		<view class="roww rowsa p-left-20 p-right-20 center_center">
			<view class="roww center_center allline" style="background-color:#d0cfce;border-radius: 10rpx;">
				<image src="../../static/sousuo.png"
				class="w-45 h-45 m-all-10"
				></image>
				<input placeholder="请输入手机号"
				 placeholder-class="color6_r fs-30 "
				 class="fs-30 m-all-10"
				 />
			</view>
			<view class="w-20"></view>
			<view class="searchbt">搜索专辑</view>
			<view class="w-20"></view>
			<view class="searchbt">搜索内容</view>
		</view>
		<view class=" fs-30" style="padding:20rpx  20rpx 0rpx 20rpx;color: #c0c0c0;">
			<text>为您找到</text>
			<text style="color: #007AFF;">33个</text>
			<text>关于“民族”的内容</text>
		</view>
		<view class="colonn" style="padding:20rpx 0rpx;">
			<view class="roww border_bottom"
			v-for="(item,index) in 3" 
			@click.stop="tolayinfo"
			style="margin-bottom:25rpx;width: 750rpx;padding:20rpx 20rpx;"
			>	
				<view class="pore">
					<image class="newimage" src="https://res.oss.zhuyin.club/res/0/87/picture/0/202108/11/20210811112215-2938.png"
					mode="aspectFill"
					></image>
					<image src="../../static/p10.png"
					class="w-60 h-30 fufeiss poab"
					></image>
				</view>
				
				<view class="colonn rowsbl">
					<view class="dyncname w-505 txtShowLength1">文旅博览会倒计时，演绎集团全力以赴筹备进展问旅博览会倒计时演绎集团全力以赴筹备进展问旅博览会倒计时</view>
					<view class="fs-30 w-505 txtShowLength yincang1" style="color: #8A8A8A;"></view>
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
				tolayinfo(){
					uni.navigateTo({
						url:"/pages1/sport_video_1/sport_video_1"
					})}
		}
	}
</script>

<style>
@import url("search.css");
</style>
