<template>
	<view>
		<view
			class="topview colonn background1"
			:style="{
				height: menuButton.height + menuButton.top + 7 + 'px'
			}"
		>
			<!-- <view class="logo roww center_center"
			style="position: absolute;"
			:style="{
				top:(menuButton.top)+'px',
				left:(info.windowWidth-menuButton.right)+'px',
				height:(menuButton.height)+'px',
				width:(menuButton.height)+'px',
			}"
			>
				<image src="/static/lianxi_03.png"
				class="w-20 h-30"
				></image>
			</view> -->

			<view
				class="sousuoview roww center_center"
				@click.stop="toSearch"
				:style="{
					top: menuButton.top + 'px',
					left: info.windowWidth - menuButton.right + 7 + 'px',
					height: menuButton.height + 'px',
					width: info.screenWidth - 2 * (info.windowWidth - menuButton.right) - menuButton.width - menuButton.height - 15 + menuButton.height + 'px'
				}"
			>
				<view class="w-30"></view>
				<image src="../../static/shouye/shouye_06.png" class="w-35 h-35"></image>
				<view class="sousuotxt m-left-15">请输入关键字</view>
				<view class="allline"></view>
			</view>
		</view>

		<view
			class=""
			style="position: fixed;z-index: 999;"
			:style="{
				top: menuButton.height + menuButton.top + 7 + 'px'
			}"
		>
			<view class="border_bottom background1  topmenuview">
				<v-tabs
					elId="top"
					v-model="current"
					activeColor="#000000"
					lineColor="#FED68F"
					bold
					lineHeight="8rpx"
					:tabs="typeList"
					height="70rpx"
					field="gc_name"
					scroll
					@change="changeTab"
				></v-tabs>
			</view>
		</view>

		<view
			class="background1 width"
			:style="{
				'margin-top': menuButton.height + menuButton.top + 7 + 'px'
			}"
		>
			<view class="yincang1 background1">
				<view class="border_bottom background1  topmenuview">
					<v-tabs
						elId="top"
						v-model="current"
						activeColor="#000000"
						lineColor="#1AB6F1"
						bold
						lineHeight="5rpx"
						:tabs="typeList"
						height="70rpx"
						field="gc_name"
						scroll
						@change="changeTab"
					></v-tabs>
				</view>
			</view>

			<view style="background-color: #f5f5f5;height:20rpx;"></view>
			<view class="huanhang  p-top-10 " style="padding:20rpx 20rpx 0rpx 20rpx;background-color: #f5f5f5;">
				<view
					class="colonn center_center pore w-214 p-bottom-15 m-left-10 m-right-10 m-bottom-20  background1"
					v-for="(item, index) in videoList"
					@click.stop="tolayinfo(item)"
					style="border-radius: 15rpx;"
				>
					<image
						class="w-214 h-281 background1_r "
						style="background-color: #f5f5f5;border-top-left-radius: 15rpx;border-top-right-radius: 15rpx;"
						:src="item.goods_image_url"
						mode="aspectFill"
					></image>
					<view class="txtShowLength w-205 fs-28 p-top-15 ">{{ item.goods_name }}</view>
					<view class="txtShowLength w-205 fs-26 p-top-5 " style="color: #999999;"   
					v-if="item.goods_addtime">{{ item.goods_addtime.split(" ")[0] }}</view>
					<view class="txtShowLength w-218 fs-32 p-top-5 " style="color: #999999;opacity: 0;" v-else>11</view>
					<image src="../../static/p10.png" class="w-60 h-30 fufeiss poab" v-if="item.goods_price > 0"></image>
				</view>

				<block v-if="videoList.length <= 0">
					<view class="roww allline center_center"><null></null></view>
				</block>
			</view>
		</view>
		<loadvideo></loadvideo>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			typeList: [],
			page: 1,
			videoList: [],

			videotypeindex: -1, //默认分类id
			info: {},
			menuButton: {}
		};
	},
	onLoad() {
		this.getWindowInfo();
		this.getTypes();
	},
	onReachBottom() {
		this.getVideoList();
	},
	onHide() {
		uni.removeStorageSync('videotypeindex');
		this.videotypeindex = -1;
	},
	onShow() {
		var videotypeindex = uni.getStorageSync('videotypeindex');
		if (videotypeindex) {
			this.videotypeindex = videotypeindex;
			if (this.videotypeindex >= 0 && this.typeList.length > 0 && this.current != this.videotypeindex) {
				this.page = 1;
				this.videoList = [];
				this.current = videotypeindex;
				console.log('下标的', this.current);
				this.getVideoList();
			}
			//判断如果有分类的话
		}
	},
	onShareAppMessage() {
		return {
			title: '齐鲁云剧场',
			imageUrl: '/static/lianxi_15.png',
			path: '/pages/index_1/index_1'
		};
	},
	methods: {
		toSearch() {
			uni.navigateTo({
				url: '/pages1/search_1/search_1',
				fail() {
					console.log('失败');
				}
			});
		},
		//获取设备信息
		getWindowInfo() {
			try {
				const info = wx.getSystemInfoSync();
				var menuButton = wx.getMenuButtonBoundingClientRect();
				this.info = info;
				this.menuButton = menuButton;
			} catch (e) {}
		},
		// 默认选中分类
		defaultType() {
			// var typeList=this.typeList;
			// var videotypeid=this.videotypeid;
			// for(var a=0;a<videotypeid.length;a++){
			// }
		},
		//
		changeTab(index) {
			console.log('当前选中的项：' + index);
			this.current = index;
			this.page = 1;
			this.videoList = [];
			this.getVideoList();
		},
		tolayinfo(item) {
			uni.navigateTo({
				url: '/pages1/sport_video_1/sport_video_1?id=' + item.goods_id,
				fail: res => {
					console.log('失败', res);
				}
			});
		},
		// 获取分类列表
		getTypes() {
			var data = {};
			this.$axios
				.axios('POST', this.$paths.getGoodsClassList, data)
				.then(res => {
					if (res.code == 10000) {
						var typeList = res.result.goodsclass_list;
						var list = [];
						list.push({
							id: 0,
							gc_name: '全部',
							commis_rate: 0
						});
						for (var a = 0; a < typeList.length; a++) {
							list.push(typeList[a]);
						}
						this.typeList = list;
						if (this.videotypeindex >= 0) {
							this.current = this.videotypeindex;
						}
						this.getVideoList();
					} else {
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {});
		},
		// 获取视频列表
		getVideoList() {
			var data = {
				gc_id: '', //		否	string	分类ID
				keyword: '', //		否	string	视频名称关键词
				price_from: '0', //			否	string	价格搜索的开始价格
				price_to: '10000', //			否	string	价格搜索的结束价格
				sort_key: 'goods_salenum', //			否	string	排序键 goods_salenum销量 goods_click浏览量 goods_price价格
				sort_order: '1', //			否	int	排序值 1升序 2降序
				page: this.page, //			是	int	页码
				per_page: '10' //			是	int	每页显示数量
			};
			if (this.current == 0) {
				data.gc_id = '';
			} else {
				data.gc_id = this.typeList[this.current].gc_id;
			}
			console.log('参数', data, this.typeList, this.current);
			this.$axios
				.axios('POST', this.$paths.goods_list, data)
				.then(res => {
					if (res.code == 10000) {
						this.page = this.page + 1;
						var videoList = this.videoList;
						this.videoList = videoList.concat(res.result.goods_list);
					} else {
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style>
@import url('watch_play.css');
</style>
