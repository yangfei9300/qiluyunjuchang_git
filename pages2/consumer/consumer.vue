<template>
	<view>
		<view class="colonn">
			<view class="itemview roww center_center" v-for="(item,index) in 10">
				<view class="leftbgimg center_center color6_r colonn m-right-15">
					<view class="roww duiqi">
						<view class="fs-20">￥</view>
						<view class="fs-35 font_size7_r">20</view>
					</view>
					<view class="fs-22">满50元可用</view>
				</view>
				<view class="colonn rowsal h-102">
					<view class="youihuqanname txtShowLength">山懂省有钱哈UI按时打算阿斯顿啊</view>
					<view class="youxiaoqistime">有效期至2021.08.23</view>
				</view>
				<view class="allline"></view>
				<view class="colonn center_center h-102">
					<view class="jijifens">10积分</view>
					<view class="lijizhisyong m-top-19">立即使用</view>
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
@import url("consumer.css");
</style>
