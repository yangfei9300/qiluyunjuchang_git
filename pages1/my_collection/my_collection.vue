<template>
	<view>
		
		<view class="colonn">
			<view class="roww center_center" 
			style="padding:40rpx 20rpx 0rpx 20rpx;">
				<image src="../../static/jheadimd.jpg" class="headimgd"></image>
				<view class="fs-30 txtShowLength w-300">做个聪明的笨蛋</view>
				<view class="allline"></view>
			</view>
		</view>
		
		<view class="border_bottom m-top-20">
			<v-tabs  v-model="current" activeColor="#FF8E2D"
			 lineColor="#FF8E2D"  
			 :scroll="false" 
			 :tabs="tabs" 
			 @change="changeTab"
			 :lineScale="lineScale"
			 ></v-tabs>
		</view>
		
		<view class="colonn">
			<view class="roww center_center p-all-20 border_bottom">
				<view class="colonn rowsbl  m-right-20">
					<view class="fs-30 w-500 txtShowLength">
						名称:【齐鲁云剧场】|山东新春民族音乐会！（回放）
					</view>
					<view class="fs-25 w-500 m-top-20 m-bottom-20">标签:吕剧回家过年吕剧回家过年吕剧回家过年吕剧回家过年吕剧回家过年吕剧回家过年</view>
					<view class="fs-25 color3_r">收藏时间:2020-08-08</view>
				</view>
				<view class="allline"></view>
				<view class="cancel_btn">取消收藏</view>
			</view>
			<view class="roww center_center p-all-20 border_bottom">
				<image class="drama_img m-right-20"></image>
				<view class="colonn rowsbl h-150 m-right-20">
					<view class="fs-30 w-300 txtShowLength1">
						名称:【齐鲁云剧场】|山东新春民族音乐会！（回放）
					</view>
					<view class="fs-25 color3_r">收藏时间:2020-08-08</view>
				</view>
				<view class="cancel_btn">取消收藏</view>
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
				  '收藏专辑',
				  '收藏内容',
				],
				
				page:1,
				my_collection:[],
			}
		},
		onLoad() {
			this.get_collection();
		},
		onReachBottom() {
			this.page=this.page+1;
			this.get_collection();
		},
		methods: {
			changeTab(index) {
			  console.log('当前选中的项：' + index)
			},
			//获取我的收藏
			get_collection(){
				var data = {
					page:"1",//		否	int	当前页数，默认第一页
					per_page:"10",//		否	int	每页显示数量，默认10条
					fav_type:"goods",//	goods	否	string	收藏类型，‘goods’商品或视频，‘store’直播间，默认”goods”
				}
				this.$axios
					.axiosDate('POST', this.$paths.favorites_list, data)
					.then(res => {
						if (res.code == 10000) {
							var my_collection=this.my_collection;
							my_collection=my_collection.concat(res.result);
							this.my_collection=my_collection;
							this.paeg=this.paeg+1;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
		}
	}
</script>

<style>
@import url("my_collection.css");
</style>
