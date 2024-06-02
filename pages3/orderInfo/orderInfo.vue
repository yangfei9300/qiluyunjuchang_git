<template>
	<view>
		<view class="colonn">
			<view class="topview"></view>
			
			<view class="dizhiview roww center_center">
				<image class="dingweiivon"></image>
				<view class="w-20"></view>
				<view class="colonn allline">
					<view class="roww">
						<view class="xingm">杨飞</view>
						<view class="w-15"></view>
						<view class="fs-25">18340070905</view>
					</view>
					<view class="h-15"></view>
					<view class="xiangxiodiz w-500">
						山东省济南市历下区甸柳街道经十路14380号
						海尔时代大厦1706
					</view>
				</view>
				<image class="dingweiivon"></image>
				
			</view>
			
			<view class="colonn goodlist">
				<view class="roww p-all-20 border_bottom"
				v-for="(item,index) in 3"
				>
					<image class="goodicon"></image>
					<view class="colonn rowsb">
						<view class="fs-30 w-400 font_size7_r txtShowLength">商品名称商品名称商品名称商品名称商品名称</view>
						<view class="roww duiqi w-500">
							<view class="color2_r">￥25.00</view>
							<view class="w-25"></view>
							<view class="fs-20 huadiao color3_r">￥20.00</view>
							<view class="allline"></view>
						</view>
					</view>
				</view>
			</view>   
			
			<view class="dingdaninfoView colonn">
				<view class="p-top-30 p-bottom-30 p-left-20 p-right-20">订单信息</view>
				<view class="roww border_bottom p-top-30 p-bottom-30 p-left-20 p-right-20">
					<view class="ordernumtxt">订单编号</view>
					<view class="allline"></view>
					<view class="ordernum">XS12001224455112</view>
				</view>
				<view class="roww border_bottom p-top-30 p-bottom-30 p-left-20 p-right-20">
					<view class="ordernumtxt">下单时间</view>
					<view class="allline"></view>
					<view class="ordernum">2022-1-22 10:00:00</view>
				</view>
			</view>
			
			<view class="h-100"></view>
			
			<view class="bottomvie roww center_center w-750">
				<view class="w-30"></view>
				<view class="roww duiqi">
					<view class="fs-30">合计:</view>
					<view class="fs-35 font_size2_r color2_r">￥55.00</view>
				</view>
				<view class="allline"></view>
				<view class="quxiaoorder">取消订单</view>
				<view class="w-15"></view>
				<view class="qufukuan">去付款</view>
				<view class="w-30"></view>
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
@import url(orderInfo.css);
</style>
