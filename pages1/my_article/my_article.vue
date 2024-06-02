<template>
	<view>
		<view class="p-all-35 colonn">
			<view class="fs-40 fw-b ">{{article_info.article_title}}</view>
			<view class="roww center_center " style="padding:25rpx 0rpx;">
				<!-- <image src="../../static/jheadimd.jpg" class="userimg"></image> -->
				<view class="roww">
					<view class="fs-25 color3_r">发布时间：</view>
					<view class="fs-25 color3_r">{{article_info.article_time}}</view>
				</view>
				<view class="allline"></view>
				<!-- <view class="collectionbtn"
				v-if="collectionStatus==0"
				@click.stop="collection_artile"
				>+收藏</view> -->
				<!-- <view class="collectionbtn"
				v-else
				@click.stop="collection_artile"
				>已收藏</view> -->
				<!-- <view class="collectionbtn pore">
					<view>分享</view>
					<button  class="poab sharebtn" open-type="share"></button>
				</view> -->
			</view>
			<view class="colonn">
				<rich-text :nodes="article_info.article_content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				'info':'详情请咨询：40000-99566',
				options:{},
				article_info:{},
				
				collectionStatus:0,
			}
		},
		onLoad(options) {
			this.options=options;
			this.getInfo();
		},
		onShareAppMessage () {
		        return {
		            title: this.article_info.article_title,
		            imageUrl:this.article_info.article_pic,
		            path: '/pages1/my_article/my_article?id='+this.options.id
		        }
		},   
		onShareTimeline: function () {
		   return {
		            title: this.article_info.article_title,
		            imageUrl:this.article_info.article_pic,
		            path: '/pages1/my_article/my_article?id='+this.options.id
		   }
		 },
		methods: {
			// 获取收藏状态
			getCollection(){
				var data = {
					fav_type:"goods",
					'goods_id':this.options.id
				}
				this.$axios
					.axiosDate('POST', this.$paths.check_state, data)
					.then(res => {
						if (res.code == 10000) {
							this.collectionStatus=res.result;
							this.collectionStatus.article_content=this.$tools.formatRichText(res.result.article_content);
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			
			//收藏文章
			collection_artile(){
				var data = {
					article_id:this.options.id
				}
				//  Heart / qiluyunjuchang
				this.$axios
					.axiosDate('POST', this.$paths.article_show, data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("操作成功");
							this.getCollection();
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取工会详情
			getInfo(){
				var data = {
					article_id:this.options.id
				}
				this.$axios
					.axios('POST', this.$paths.article_show, data)
					.then(res => {
						if (res.code == 10000) {
							this.article_info=res.result;
							 this.article_info.article_time=this.$tools.timestampToTime(res.result.article_time*1000)
							 
							 this.article_info.article_content =  this.article_info.article_content.replace(/\<img/gi, '<img style="width:100%" ')
							uni.setNavigationBarTitle({
								title:this.article_info.article_title
							})
						} else {
							this.$tools.showToast(res.message);
							setTimeout(res=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
@import url("my_article.css");
</style>
