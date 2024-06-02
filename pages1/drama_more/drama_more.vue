<template>
	<view>
		<view class="colonn p-all-30">
			<view class="huanhang rowsbl " style="margin:0rpx 0rpx 25rpx 0rpx;">
				<view class="videolista rowsa colonn" v-for="(item, index) in list_home" >
					<block v-if="options.type == 1">
						<image class="videoimg" mode="aspectFill" 
						@click.stop="toVideoInfoPage(item.goods_id)"
						:src="item.goods_img_480"></image>
						<view class="videomanss txtShowLength"
						@click.stop="toVideoInfoPage(item.goods_id)"
						>{{ item.goods_name }}</view>
							<view class="h-8"></view>
						<view class="nianyuerr m-top-5 m-bottom-5"
						@click.stop="toVideoInfoPage(item.goods_id)"
						>{{ item.goods_addtime }}</view>
							<view class="h-8"></view>
						<view class="roww center_center m-top-0 m-bottom-0"
						@click.stop="toVideoInfoPage(item.goods_id)"
						>
							<view class="cibofangs roww center_center m-left-28" style="padding:0rpx 10rpx;">
								<image src="/static/videoinfo/kanju2_24.png" class="w-15 m-right-10 h-20"></image>
								<view>{{ item.goods_click }}次播放</view>
							</view>
							<view class="allline"></view>
						</view>
						<view class="h-13"></view>
					</block>
					<block v-if="options.type == 2">
						<image class="videoimg" mode="aspectFill" :src="item.adv_code"
							@click.stop="selectedBanner(item,index)"
						></image>
						<view class="videomanss txtShowLength"
							@click.stop="selectedBanner(item,index)"
						>{{ item.adv_title }}</view>
							<view class="h-8"></view> 
						<view class="nianyuerr m-top-5 m-bottom-5"
							@click.stop="selectedBanner(item,index)"
						>{{ item.goods_addtime }}</view>
							<view class="h-8"></view>
						<view class="roww center_center m-top-0 m-bottom-0"
							@click.stop="selectedBanner(item,index)"
						>
							<view class="cibofangs roww center_center m-left-28" style="padding:0rpx 10rpx;">
								<image src="/static/videoinfo/kanju2_24.png" class="w-15 m-right-10 h-20"></image>
								<view>{{item.goods_click }}次播放</view>
							</view>
							<view class="allline"></view>
						</view>
						<view class="h-13"></view>
					</block>
				</view>
			</view>

			<!-- <view class="huanhang rowsb"
			style="margin-top:25rpx;"
			>
				<view class="colonn center_center m-bottom-25"
				v-for="(item,index) in list_home"
				@click.stop="toVideoInfoPage(item.goods_id)"
				>	
					<block v-if="options.type==1">
						<image class="album_img br-10" 
						:src="item.goods_img_480"
						mode="aspectFill"
						@click.stop="toVideoInfoPage(item.goods_id)"
						></image>
						<view class=" w-340 fs-30 p-top-10 txtShowLength "
						style="text-align: left;"
						@click.stop="toVideoInfoPage(item.goods_id)"
						>{{item.goods_name}}</view>
					</block>
					<block v-else>
						<image class="album_img br-10"
						:src="item.adv_code"
						mode="aspectFill"
						@click.stop="selectedBanner(item,index)"
						></image>
						<view class=" w-340 fs-30 p-top-10 txtShowLength "
						style="text-align: left;"
						@click.stop="selectedBanner(item,index)"
						>{{item.adv_title}}</view>
					</block>
				</view>
			</view> -->

			<block v-if="list_home.length <= 0"><null></null></block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			options: {},
			list_home: [],
		};
	},
	onLoad(options) {
		if(options.scene){
			options.type=options.scene;
		}
		this.options = options;
		
		if (options.type == 1) {
			uni.setNavigationBarTitle({
				title: '热剧精选'
			});
			this.getCommendList();
		} else {
			uni.setNavigationBarTitle({
				title: '为你推荐'
			});
			this.getBanner();
		}
	},
	
	onShareAppMessage () {
	        return {
	            title: this.options.type == 1?'热剧精选':'为你推荐',
	            imageUrl:"/static/lianxi_15.png",
	            path: '/pages/index_1/index_1?type='+this.options.type
	        }
	},
	onShareTimeline: function () {
	   return {
	     title: this.options.type == 1?'热剧精选':'为你推荐',
	     imageUrl:"/static/lianxi_15.png",
	     path: '/pages/index_1/index_1?type='+this.options.type
	   }
	 },
	
	methods: {
		
		// 热剧精选  Index/getCommendList
		getCommendList(){
			var data = {
			}
			this.$axios
				.axios('POST', this.$paths.getCommendList, data)
				.then(res => {
					if (res.code == 10000) {
						var goods_commend=res.result.goods_commend;
						this.list_home=goods_commend;
					} else {
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {});
		},
		
		// 为您推荐
		getBanner(){
			var data = {
			}
			this.$axios
				.axios('POST', this.$paths.getIndexAdList, data)
				.then(res => {
					if (res.code == 10000) {
						this.list_home=res.result.promotion_ads;
					} else {
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {});
		},
		
		tosportinfo_1() {},
		//轮播图切换
		selectedBanner(item, index) {
			console.log(item);
			this.ad_to_page(item.adv_type, item.adv_typedate);
		},
		// 广告跳转界面
		ad_to_page(type, id) {
			console.log('asd', type, id);
			if (!type) {
				return false;
			}
			console.log('it嗷嗷护士', type, id);
			var url = '';
			if (type == 'goods') {
				url = '/pages1/sport_video_1/sport_video_1?id=' + id;
			} else if (type == 'store') {
				url = '/pages1/live_info_1/live_info_1?id=' + id;
			} else if (type == 'article') {
				url = '/pages1/my_article/my_article?id=' + id;
			} else if (type == 'activity') {
				// 专题界面未定
			}
			uni.navigateTo({
				url: url
			});
		},
		// 前往视频详情
		toVideoInfoPage(id) {
			uni.navigateTo({
				url: '/pages1/sport_video_1/sport_video_1?id=' + id
			});
			//
		},
		tosportinfo() {
			uni.navigateTo({
				url: '../sport_video_1/sport_video_1'
			});
		}
	}
};
</script>

<style>
@import url('drama_more.css');
</style>
