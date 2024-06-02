<template>
	<view>
		<view class="colonn" style="padding:20rpx 10rpx;">
			<view class="roww"
			v-for="(item,index) in 3" style="margin-bottom:25rpx;"
			@click.stop="toArticleInfo"
			>
				<image class="newimage" mode="aspectFill" src="https://res.oss.zhuyin.club/res/0/87/picture/0/202109/15/2021091516141-0394.png"></image>
				<view class="colonn rowsbl">
					<view class="dyncname w-430 txtShowLength1">文旅博览会倒计时，演绎集团全力以赴筹备进展问旅博览会倒计时演绎集团全力以赴筹备进展问旅博览会倒计时</view>
					<view class="fs-30 w-430 txtShowLength" style="color: #8A8A8A;">【直播预告】第二节装货文化问旅博览会倒计时问旅博览会倒计时</view>
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
			
		}
	}
</script>

<style>
@import url("theatre_dynamics_more.css");

</style>
