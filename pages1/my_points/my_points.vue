<template>
	<view>
		<view class="colonn">
			<view class="roww center_center" 
			style="padding:40rpx 20rpx 30rpx 20rpx;">
				<image src="../../static/jheadimd.jpg" class="headimgd"></image>
				<view class="fs-30 txtShowLength w-300">做个聪明的笨蛋</view>
				<view class="allline"></view>
			</view>
			<view class="roww" style="margin-left: 20rpx;">
				<view class="yuemoneybigview roww center_center">
					<view>当前积分：</view>
					<view class="color2_r">1</view>
				</view>
			</view>
		</view>
		<view class="border_bottom m-top-50">
			<v-tabs  v-model="current" activeColor="#FF8E2D"
			 lineColor="#FF8E2D"  
			 :scroll="false" 
			 :tabs="tabs" 
			 @change="changeTab"
			 :lineScale="lineScale"
			 ></v-tabs>
		</view>
		<view class="roww p-top-20 fs-30 p-bottom-20" 
		style="background-color: #f5f5f5;margin-top:30rpx;">
			<view class="allline roww center_center">
				<view>时间</view>
			</view>
			<view class="allline roww">
				<view class="allline center_center  roww center_center">
					数量
				</view>
				<view class="allline  roww center_center">
					备注
				</view>
			</view>
		</view>
		<view class="colonn center_center m-top-50 m-bottom-50">
			<image src="../../static/zanwushouru.png"
			style="width:400rpx;height:300rpx;"
			></image>
			<view class="fs-30" >暂时没有积分记录哦</view>
		</view>
		<view class="roww p-top-20 p-bottom-20 border_bottom"
		 v-for="(item,index) in 10"
		 >
			<view class="allline fs-30 roww center_center">
				<view>2020-08-08</view>
			</view>
			<view class="allline roww">
				<view class="allline fs-30 center_center color2_r zimuhuanhang  roww center_center">
					20
				</view>
				<view class="allline fs-30 roww center_center"
				v-if="current==0"
				>
					收入
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineScale:0.2,
				current: 0,
				tabs: [
				  '积分明细',
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
@import url("my_points.css");
</style>
