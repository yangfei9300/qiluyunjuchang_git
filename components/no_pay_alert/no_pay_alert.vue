<template>
	<view>
		<view class="colonn huuibeijing center_center">
			<view class=" centerview  colonn">
				<view class="roww rowsb border_bottom p-bottom-30">
					<image src="../../static/guanbib.png"
					class="w-40 h-40 yincang1"
					></image>
					<view>本内容需购买观看</view>
					<image src="../../static/guanbib.png"
					class="w-40 h-40" @click.stop="closealert" 
					></image>
				</view>
				<view class="roww center_center m-top-50 m-bottom-50">
					<view class="fs-30 w-550">由于相关规范，本项目不支持苹果手机支付，请您欣赏其他内容。谢谢您的关注</view>
				</view>
				<view class="roww center_center">
					<button type="primary" style="width:500rpx" size="mini" @click.stop="closealert" >关闭界面</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"no_pay_alert",
		data() {
			return {
				
			};
		},
		methods:{
			closealert (index) {
			   this.$emit('closealert', {'index':index})
			},
		}
	}
</script>

<style>
.centerview{
	width: 700rpx;
	background-color: white;
	margin-top:100rpx;
	padding:40rpx 20rpx;
	border_bottom:1px solid #f5f5f5;
	border-radius: 15rpx;
}
</style>
