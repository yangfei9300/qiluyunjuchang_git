<template>
	<view>
		<view class="colonn">
			<view class="roww liveview center_center">
				<view class="fs-30">直播</view>
				<view class="allline"></view>
				<image src="/static/youjiantou2.png"
				class="w-30 h-30"
				></image>
			</view>
			<view class="colonn liveitem" style=""
			v-for="(item,index) in 5"
			@click.stop="toLiveinfo"
			>
				<view class="pore">
					<image  class="liveimg" src="/static/longteng.png" mode="aspectFill"></image>
					<view class="poab roww center_center"
					style="width:700rpx;height:400rpx;top: 0rpx;left: 0;"
					>
						<image src="/static/bofanga.png"
							   class=" playicon"
						></image>
					</view>
					
				</view>
				<view class="liveitel fs-30 lh-90 txtShowLength">中央民族乐团中央民族乐团中央民族乐团中央民族乐团中央民族乐团中央民族乐团中央民族乐团中央民族乐团</view>
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
			toLiveinfo(){
				uni.navigateTo({
					url:"../../pages1/live_info/live_info"
				})
			}
		}
	}
</script>

<style>
@import url("live.css");
</style>
