<template>
	<view>
		<image :src="activityInfo.activity_banner_mobile_url"
		 mode="aspectFill"
		 class="topimg"></image>
		<view class="roww center_center m-top-39  m-bottom-30" v-if="activityInfo&&activityInfo.activity_desc!=''">
			<image src="/static/zhaunti/youjian.png" class="w-85 h-15"></image>
			<view class="huodongjianjie">活动简介</view>
			<image src="/static/zhaunti/zuojian.png" class="w-85 h-15"></image>
		</view>
		<view class="jianjieview" v-if="activityInfo&&activityInfo.activity_desc!=''">
			{{activityInfo.activity_desc}}
		</view>
		<view class="roww center_center m-top-39  m-bottom-30"  v-if="list.length>0">
			<image src="/static/zhaunti/youjian.png" class="w-85 h-15"></image>
			<view class="huodongjianjie">相关剧目</view>
			<image src="/static/zhaunti/zuojian.png" class="w-85 h-15"></image>
		</view>
		<view class="huanhang rowsbl p-left-30 p-right-30" v-if="list.length>0">
			<view class="colonn  jumuitem rowsbl center_center"
			v-for="(item,index) in list"
			@click.stop="toVideoInfo(item)"  
			>	
				<view class="pore">
					<image mode="aspectFill" class="sapceinfosimg" :src="item.goods_image_url"></image>
					<image src="/static/p10.png" class="w-80 h-45 poab"
					style="top:20rpx;left:20rpx;" v-if="item.goods_price>0"
					></image>
				</view>
				<view class="roww">
					<view class="minzugejus txtShowLength">{{item.item_name}}</view>
				</view>
				<view class="aa h-15"></view>
			</view>
		</view>
		
		<view class="roww center_center m-top-39  m-bottom-30"
		 v-if="article_list.length>0"
		>
			<image src="/static/zhaunti/youjian.png" class="w-85 h-15"></image>
			<view class="huodongjianjie">活动动态</view>
			<image src="/static/zhaunti/zuojian.png" class="w-85 h-15"></image>
		</view>
		
		<view class="polymerization_view1 colonn center_center background1"
		style="margin:0rpx  30rpx 25rpx 30rpx;padding:0rpx 15rpx;" v-if="article_list.length>0"
		>
			<view class="colonn " >
				<view class="roww p-bottom-20 p-top-20 border_bottom rowsb " 
				v-for="(item,index) in article_list" 
				@click.stop="toArticleInfo(item)"
				>
					<image class="newimage" mode="aspectFill" 
					:src="item.article_pic"></image>
					<view class="colonn rowsb">
						<view class="dyncname  txtShowLength1">{{item.article_title}}</view>
						<view class="fs-25 w-350 txtShowLength" style="color: #8A8A8A;fs-22">
							<view>{{item.article_time}}</view>
						</view>
					</view> 
				</view>
			</view>
		</view>
		<view class="h-40"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1,
				activityInfo:{},
				options:{},
				article_list:[],
			}
		},
		onLoad(options) {
			console.log("阿斯顿",options)
			if(options.scene){ 
				options.id=options.scene;
			}
			this.activityInfo=uni.getStorageSync("activityInfo")
			this.options=options;
			this.getList_info();
			
			this.getlist();
		},
		onReachBottom() {
			this.getlist();
		},
		onShareAppMessage () {
		        return {
		            title: this.activityInfo.activity_title,
		            imageUrl:this.activityInfo.activity_banner_mobile_url,
		            path: '/pages2/special_info/special_info?id='+this.activityInfo.activity_id
		        }
		},
		 onShareTimeline: function () { 
		      return {
		      title: this.activityInfo.activity_title,
		      imageUrl:this.activityInfo.activity_banner_mobile_url,
		       path: '/pages2/special_info/special_info?id='+this.activityInfo.activity_id
		      }
		  },
		methods: {
			// 前往文章详情
			toArticleInfo(item){
				uni.navigateTo({
					url:"/pages1/my_article/my_article?id="+item.article_id
				})
			},
			getList_info(){
				var data = {
					page:this.page,//	1	否	int	当前页码，默认为1
					per_page:"100",//	3	否	int	每页显示数量，默认为10
				}
				this.$axios
					.axios('POST', this.$paths.indexActivity, data)
					.then(res => {
						if (res.code == 10000) {
							var list_1=(res.result.activity_list);
							for(var a=0;a<list_1.length;a++){
								if(list_1[a].activity_id==this.options.id){
									this.activityInfo=list_1[a];
									break;
								}
							}
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			
			toVideoInfo(item){
				if(item.activity_type==1){
					uni.navigateTo({
						url:"/pages1/sport_video_1/sport_video_1?id="+item.item_id
					})
				}else if(item.activity_type==2){
					uni.navigateTo({
						url:"/pages1/live_info_1/live_info_1?id="+item.item_id
					})
				}
				
			},
			getlist(){
				var data = {
					page:this.page,//	1	否	int	当前页码，默认为1
					per_page:"10",//	3	否	int	每页显示数量，默认为10
					store_id:this.options.store_id?this.options.store_id:'',//否	int机构/院团ID，默认显示全部
					activity_id	:this.options.id,//1	是	int	活动专题ID
				}
				this.$axios
					.axios('POST', this.$paths.detailActivity, data)
					.then(res => {
						if (res.code == 10000) {
							this.list=this.list.concat(res.result.activitydetail_list);
							this.page=this.page+1;
							var article_list=res.result.article_list
							for(var a=0;a<article_list.length;a++){
								article_list[a].article_time=this.$tools.timestampToTime(article_list[a].article_time*1000);
							}
							this.article_list=article_list;
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
@import url("special_info.css");
</style>
