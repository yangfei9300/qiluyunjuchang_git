<template>
	<view>
		<v-tabs  v-model="current" bgColor="#ffffff" activeColor="#F83D47" lineColor="#F83D47"  :scroll="false" :tabs="tabs" @change="changeTab"></v-tabs>
		<view class="colonn">
			<view class="h-30"></view>
			<view class="orderviewitem colonn" v-for="(item,index) in 15">
				<view class="h-10"></view>
				<view class="roww fs-25">
					<view>订单编号:5646546465464656</view>
					<view class="allline"></view>
					<view class="color2_r">待付款</view>
				</view>
				<view class="h-20"></view>
				<view class="roww border_bottom p-bottom-15" >
					<image class="goodimg"></image>
					<view class="colonn rowsb">
						<view class="goodname txtShowLength">冬天加厚门殿子冬季保暖挡冬天加厚门殿子冬季冬天加厚门殿子冬季保暖挡冬天加厚门殿子冬季</view>
						<view class="font_size7_r fs-30 color2_r">￥56.00</view>
					</view>
				</view>
				<view class="h-15"></view>
				<view class="roww endend">
					<view class="fs-30">合计:￥200.00</view>
				</view>
				<view class="h-15"></view>
				<view class="roww endend">
					<view class="fs-30 quxiaodingdan">取消订单</view>
					<view class="w-15"></view>
					<view class="fs-30 quxiaodingdan1">去付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [
				  '全部',
				  '待付款',
				  '待发货',
				  '待收货',
				  '已完成',
				],
			}
		},
		methods: {
			changeTab(index) {
			  console.log('当前选中的项：' + index)
			},
		}
	}
</script>

<style>
@import url(MyOrder.css);
</style>
