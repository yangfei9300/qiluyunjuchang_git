<template>
	<view>
		<view class="colonn">
			<view class="topview"></view>
			<view class="colonn background1 goodlist">
				<view class="roww center_center border_bottom p-top-20 p-bottom-20"
				v-for="(item,index) in 15"
				>
					<image class="selicon"></image>
					<image class="goodimg"></image>
					<view class="w-17"></view>
					<view class="colonn  rowsb h-172">
						<view class="goodname txtShowLength">
							女装专柜代购2021秋装新款国内
							真丝衬衣女长袖桑蚕丝女装专柜代购2021秋装新款国内
							真丝衬衣女长袖桑蚕丝
						</view>
						<view class="roww duiqi w-400">
							<view class="roww duiqi">
								<view class="fs-22">￥</view>
								<view class="font_size7_r fs-30">35.00</view>
							</view>
							<view class="allline"></view>
							<view class="jiajianview roww">
								<view class="jiajian">-</view>
								<view class="allline shuliangs">15</view>
								<view class="jiajian">+</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="h-190"></view>
			<view class="bottomview roww center_center">
				<view class="w-28"></view>
				<image class="quanxuan"></image>
				<view class="fs-30">全选</view>
				<view class="w-75"></view>
				<view class="hejiss">合计:50.00</view>
				<view class="allline"></view>
				<view class="shanchua">删除</view>
				<view class="w-28"></view>
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
@import url(mychat.css);
</style>
