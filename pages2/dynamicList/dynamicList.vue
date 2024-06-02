<template>
	<view>
		<view class="polymerization_view1 colonn background1"
		style="margin:25rpx 25rpx;"
		>
			<view class="colonn" >
				<view class="roww rowsb p-bottom-20 border_bottom"
				v-for="(item,index) in article_list" 
				style="margin-bottom:25rpx;"
				@click.stop="toArticleInfo(item)"
				>
					<image class="newimage" mode="aspectFill" 
					:src="item.article_pic"></image>
					<view class="colonn rowsb">
						<view class="dyncname  txtShowLength1">{{item.article_title}}</view>
						<view class="fs-25 w-480 txtShowLength fs-25" style="color: #8A8A8A;">
							<view>{{item.article_time}}</view>
						</view>
					</view> 
				</view>
			</view>
			<block v-if="article_list.length<=0">
				<null></null>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_list:[],
				page:1,
			}
		},
		onReachBottom() {
			this.getArticleList();
		},
		onLoad() {
			this.getArticleList();
		},
		onShareAppMessage () {
		        return {
		            title: "新闻动态",
		            imageUrl:"/static/lianxi_15.png",
		            path: '/pages2/dynamicList/dynamicList'
		        }
		},   
		onShareTimeline: function () {
		   return {
		            title: "新闻动态",
		            imageUrl:"/static/lianxi_15.png",
		            path: '/pages2/dynamicList/dynamicList'
		   }
		 },
		methods: {
			// 前往文章详情
			toArticleInfo(item){
				uni.navigateTo({
					url:"../../pages1/my_article/my_article?id="+item.article_id
				})
			},
			// 获取新闻动态 article_list
			getArticleList(){
				var data = {
					page:this.page,//		否	int	当前页码，默认为1
					per_page:"10",//		否	int	每页显示数量，默认为10
				}
				this.$axios
					.axios('POST', this.$paths.article_list, data)
					.then(res => {
						if (res.code == 10000) {
							this.page=this.page+1;
							var article_list=res.result.article_list;
							for(var a=0;a<article_list.length;a++){
								article_list[a].article_time=this.$tools.timestampToTime(article_list[a].article_time*1000)
							}
							this.article_list=this.article_list.concat(article_list);
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
@import url("dynamicList.css");
</style>
