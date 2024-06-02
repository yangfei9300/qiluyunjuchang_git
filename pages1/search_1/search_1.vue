<template>
	<view>
		<view class="colonn m-all-30">
			<view class="w-750  ">
				<view class="sousuoview  roww center_center">
					<image src="/static/sousuo/sousuo_03.png" class="w-30 m-right-15 h-30"></image>
					<input placeholder="请输入关键词" 
					placeholder-class="fs-30"
					v-model="searchTxt"
					 class="fs-30 allline  m-right-20" />
					<view class="sousuotxt" @click.stop="sousuoJumu" >搜索</view>
				</view>
			</view>
			
			
			<block  v-if="isshowKey">
				<view class="roww m-top-45 m-bottom-25">
					<view class="lishisousuotxt">历史搜索</view>
					<view class="allline"></view>
					<view class="roww center_center "
					@click.stop="clearHistory"
					>
						<image src="/static/sousuo/sousuo_11.png" class="w-27 m-right-15 h-27"></image>
						<view class="fs-30">清除</view>
					</view>
				</view>
				<view class="huanhang">
					<view class="sousuolishitxt" 
					v-for="(item,index) in searchHistory"
					v-if="index<showall"
					@click.stop="clickGuess(item)"
					>
						{{item}}
					</view>
					
					<view class="xialadakaiview roww center_center"
					@click.stop="showallClick"
					v-if="searchHistory.length>0"
					>
						<image src="/static/sousuo/kanju_03.png" 
						class="w-25 h-15"
						v-if="showall==4"
						></image>
						<image src="/static/sousuo/kanju2_03.png"
						class="w-25 h-15"
						v-if="showall!=4"
						></image>
					</view>
				</view>
				
				<view class="roww m-top-45 m-bottom-25">
					<view class="lishisousuotxt">猜你想搜</view>
					<view class="allline"></view>
					<view class="roww center_center ">
						<image src="/static/sousuo/sousuo_15.png" class="w-27 m-right-15 h-27"></image>
						<view 
						@click.stop="getGuess"
						class="fs-30">换一换</view>
					</view>
				</view>
				<view class="huanhang">
					<view class="cainixinagsou txtShowLength"
					v-for="(item,index) in guessList" v-if="index<10"
					@click.stop="clickGuess(item.goods_name)"
					>
						{{item.goods_name}}
					</view>
				</view>
			</block>
		</view>
		
		<!-- 展示搜索剧目的列表 -->
		<view class="huanhang  p-top-10" 
		style="padding:0rpx 0rpx;">
			<view class="colonn center_center pore w-228 p-bottom-15 m-left-10 m-right-10 m-bottom-20  background1"
				v-for="(item,index) in goodList" 
				@click.stop="toVideoInfo(item)" 
				style="border-radius: 15rpx;">
				<image class="w-228 h-250 background1_r "
					style="background-color: #f5f5f5;border-top-left-radius: 15rpx;border-top-right-radius: 15rpx;"
					:src="item.goods_image" mode="aspectFill"></image>
				<view class="txtShowLength w-228 fs-28 p-top-15 ">{{item.goods_name}}</view>
				<view class="txtShowLength w-228 fs-28 p-top-5 " 
				style="color: #c9c9c9;"> 
					<block v-if="item.goods_advword">{{item.goods_advword}}</block>
				 <block v-else><view class="yincang1">1</view> </block>
				 </view>
				<image src="../../static/p10.png" 
				class="w-60 h-30 fufeiss poab" 
				v-if="item.goods_price>0"></image>
			</view>
			<block v-if="goodList.length<=0&&!isshowKey">
				<view class="roww allline center_center">
					<null></null>
				</view>
			</block>
		</view>
		<view class="colonn">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshowKey:true,//是否隐藏历史搜索
				searchHistory:[],//搜索历史列表
				searchTxt:"",
				options:{},
				showall:4,
				guessList:[],//猜你喜欢列表
				page:1,
				goodList:[],//搜索结果
			}
		},
		onLoad(options) {
			this.options=options;
			this.gethistpory();
			this.getGuess();
		},
		methods: {
			searchHistoryClick(item){
				this.searchTxt=item;
				
			},
			clearHistory(){
				var searchHistory=uni.getStorageSync("searchHistory");
				if(!searchHistory||searchHistory==""){
					searchHistory=[];
				}else{
					uni.setStorageSync("searchHistory",[]);
					
				}
				this.searchHistory=[];
			},
			clickGuess(txt){
				this.searchTxt=txt;
				this.sousuoJumu();
			},
			// 前往视频详情
			toVideoInfo(item){
				uni.navigateTo({
					url:"/pages1/sport_video_1/sport_video_1?id="+item.goods_id
				})
			},
			// 猜你喜欢关键字点击
			guessClick(item){
				var goodList=[];
				goodList.push(item);
				this.goodList=goodList;
			},
			// 搜索剧目
			sousuoJumu(){
				
				var searchTxt=this.searchTxt;
				if(searchTxt==""){
					this.$tools.showToast("请输入搜索内容");
					return false;
				}
				
				var data = {
					keyword:this.searchTxt,//	测试	是	string	关键词
					page:this.page,//		1	是	int	当前页码
					per_page:"15",//		2	是	int	每页显示条数
					type:"goods",//		goods	否	string	搜索类型，goods剧目，store直播间（未开放），activity专题（未开放）
					key	:"goods_click",//	4	否	string	排序键值，搜索类型为goods时使用，1、goods_salenum（销量），2、goods_click（点击量），3、goods_price（价格），4、goods_thumbsup(点赞量)
					order:"2",//		2	否	int	有排序键值时使用，1正序，2倒序
				}
				var userInfo=uni.getStorageSync("userInfo");
				if(userInfo){
					data.member_id=userInfo.member_id;
				}
				this.$axios
					.axios('POST', this.$paths.searchIndex, data)
					.then(res => {
						if (res.code == 10000) {
							this.goodList=res.result.list;
							this.addsearchHistory(searchTxt);
							this.isshowKey=false;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取猜你所想
			getGuess(){
				var data = {
					member_id:""
				}
				var userInfo=uni.getStorageSync("userInfo");
				if(userInfo){
					data.member_id=userInfo.member_id;
				}
				this.$axios
					.axios('POST', this.$paths.getGuessLike, data)
					.then(res => {
						if (res.code == 10000) {
							this.guessList=res.result.goods_list;
							
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 收起搜索历史
			showallClick(){
				if(this.showall!=4){
					this.showall=4;
				}else{
					this.showall=10000;
				}
				this.$forceUpdate()
				console.log("asdasd",this.showall)
			},
			
			// 获取历史
			gethistpory(){
				var searchHistory=uni.getStorageSync("searchHistory");
				if(!searchHistory||searchHistory==""){
					searchHistory=[];
				}
				this.searchHistory=searchHistory;
			},
			//本地搜索
			addsearchHistory(txt){
				var searchHistory=uni.getStorageSync("searchHistory");
				if(!searchHistory||searchHistory==""){
					searchHistory=[];
				}
				var ishave=false;
				for(var a=0;a<searchHistory.length;a++){
					if(txt==searchHistory[a]){
						ishave=true;
					}
				}
				if(!ishave){
					console.log("asd")
					searchHistory.push(txt);
				}
				console.log("放入缓存",searchHistory)
				uni.setStorageSync("searchHistory",searchHistory);
				this.gethistpory();
			},
		}
	}
</script>

<style>
	@import url("search_1.css");

</style>
