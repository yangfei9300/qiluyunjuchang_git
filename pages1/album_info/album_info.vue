<template>
	<view>
		<view class="colonn p-all-25" >
			<image class="topimg" src="/static/zhuanjiim.png"></image>
			<view class="album_content">
				为营造中国共产党建党100周年良好氛围，集中展示演艺产品的优秀成果，推动我省演艺产业高质量发展，山东演艺集团拟于2021年9月在第二届中国国际文化旅游博览会同期举办"优秀舞台剧目展演”"，本专题为山东剧场院线采购的优秀剧目展播。
			</view>
			<view class="huanhang rowsb"
			style="margin-top:25rpx;"
			>
				<view class="colonn center_center m-bottom-25"
				v-for="(item,index) in 10"
				@click.stop="tosportinfo"
				>
					<image class="album_img" src="/static/modegshidai.png"
					mode="aspectFill"
					></image>
					<view class="color6_r fs-30 w-340 p-top-10 txtShowLength text_align1_r">摩登时代</view>
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
			tosportinfo(){
				uni.navigateTo({
					url:"../sport_video_1/sport_video_1"
				})
			}
		}
	}
</script>

<style>
@import url("Album .css");
</style>
