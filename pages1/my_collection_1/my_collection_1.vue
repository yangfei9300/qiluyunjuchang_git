<template>
	<view>
		<view class="colonn">
			<view class="shoucangvuew border_bottom m-top-20 roww center_center"
			v-for="(item,index) in collectionList"
			v-if="item.is"
			@click.stop="toInfo(item)"
			>
				<image class="goodimg" mode="aspectFill" :src="item.goods_image"></image>
				<view class="colonn rowsbl allline" style="height: 177rpx;">
					<view class="goodname txtShowLength1">{{item.goods_name}}</view>
					<view class="roww center_center rowsb">
						<view class="shoucangriqi ">{{(item.fav_time)}}</view>
						
						
						<block v-if="info.platform=='ios'">
							<view class="quxiaoshoucang roww center_center"
							style="border: 1px solid #DDDDDD;"
							@click.stop="cancelCollection(item,index)"
							>
								<view>取消收藏</view>
							</view>
						</block>
						
						<block v-else>
							<view class="quxiaoshoucang roww center_center"
							@click.stop="cancelCollection(item,index)"
							style="border: 3rpx solid #DDDDDD;"
							>
								<view>取消收藏</view>
							</view>
						</block>
						
						
						
						
					</view>
				</view>
			</view>
			
			<block v-if="isNull">
				<null></null>
			</block>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				collectionList:[],
				isNull:false,
				info:{},
				menuButton:{}
			}
		},
		onLoad(){
			this.getWindowInfo();
			this.getCollection();
		},
		methods: {
			//获取设备信息
			getWindowInfo(){
				try {
				  const info = wx.getSystemInfoSync();
				  var menuButton=wx.getMenuButtonBoundingClientRect();
				  this.info=info;
				  this.menuButton=menuButton;
				} catch (e) {
				}
			},
			toInfo(item){
				uni.navigateTo({
					url:"/pages1/sport_video_1/sport_video_1?id="+item.fav_id
				})
			},
			isNullIng(){
				var isNull=true;
				var collectionList=this.collectionList;
				for(var a=0;a<collectionList.length;a++){
					if(collectionList[a].is){
						isNull=false;
					}
				}
				this.isNull=isNull;
			},
			// 取消收藏
			cancelCollection(item,index){
				var data = {
					goods_id:item.fav_id,
					"fav_type":item.fav_type,
				};
				if(data.fav_type=="store"){
					data.goods_id=item.store_id;
				}
				this.$axios
					.axiosDate('POST', this.$paths.favorites_del, data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("取消收藏成功");
							var collectionList=this.collectionList;
							collectionList[index].is=false;
							this.collectionList=collectionList;
							this.isNullIng();
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取收藏
			getCollection(){
					var data = {
						page:this.page,//	1	否	int	当前页数，默认第一页
						per_page:"15",//		10	否	int	每页显示数量，默认10条
						fav_type:"goods",//		goods	否	string	收藏类型，‘goods’商品或视频，‘store’直播间，默认”goods”
					};
					this.$axios
						.axiosDate('POST', this.$paths.favorites_list, data)
						.then(res => {
							if (res.code == 10000) {
								this.page=this.page+1;
								
								var list=res.result.favorites_list;
								for(var a=0;a<list.length;a++){
									console.log('list[a].fav_time',list[a].fav_time)
									var timen=this.$tools.getDateDiff(parseInt(list[a].fav_time));
									console.log(timen)
									list[a].fav_time=timen;
									list[a].is=true;
								}
								var collectionList=this.collectionList;
								collectionList=collectionList.concat(list);
								this.collectionList=collectionList;
								this.isNullIng();
							} else {
								this.$tools.showToast(res.message);
							}
						})
						.catch(err => {});
			}
		}
	}
</script>

<style>
@import url("my_collection_1.css");
</style>
