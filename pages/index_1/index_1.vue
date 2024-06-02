<template>
	<view>
		
		<view class="topview colonn">
			
			
			<view 
			v-if="pagetopScroll>10"
			style="background: linear-gradient(238deg, #FFB43D 0%, #FEDC4D 100%);height:34px;width:750rpx;position: fixed;top: 0rpx;z-index:1003;"
			>
			</view>
			
			
			<!-- <view class="logo roww center_center"
			style="position: absolute;"
			:style="{
				top:(menuButton.top)+'px',
				left:(info.windowWidth-menuButton.right)+'px',
				height:(menuButton.height)+'px',
				width:(menuButton.height)+'px',
			}"
			>
				<image src="../../static/shouye/shouye_03.png"
				class="w-37 h-50"
				></image>
			</view>
			<view class="sousuoview roww center_center"
			@click.stop="toSearch"
			:style="{
				top:(menuButton.top)+'px',
				left:(info.windowWidth-menuButton.right+menuButton.height+7+5)+'px',
				height:(menuButton.height)+'px',
				width:(info.screenWidth-2*(info.windowWidth-menuButton.right)-menuButton.width-menuButton.height-15-10)+'px',
			}"
			>
				<view class="w-30"></view>
				<image src="../../static/shouye/shouye_06.png" class="w-27 h-27"></image>
				<view class="sousuotxt m-left-10">请输入关键字</view>
				<view class="allline"></view>
			</view> -->
			
			
			
			<view class="roww pore width">
				<view class="w-30"></view>
				<view class="logo roww center_center"
				:style="{
					'margin-top':(menuButton.top)+'px',
					height:(menuButton.height)+'px',
					width:(menuButton.height)+'px',
				}"
				>
					<image src="../../static/shouye/shouye_03.png"
					class="w-37 h-50" lazy-load
					></image>
				</view>
				
				<view class="w-25"></view>
				<view class="sousuoview  roww center_center allline"
				@click.stop="toSearch"
				:style="{
					'margin-top':(menuButton.top)+'px',
					left:(info.windowWidth-menuButton.right+menuButton.height+7+5)+'px',
					height:(menuButton.height)+'px',
				}"
				style="width:400rpx;"
				>
					<view class="w-30"></view>
					<image lazy-load src="../../static/shouye/shouye_06.png" class="w-27 h-27"></image>
					<view class="sousuotxt m-left-10">请输入关键字</view>
					<view class="allline"></view>
				</view> 
				<view class="w-25"></view>
				
				
				
				<view 
				:style="{
					'margin-top':(menuButton.top)+'px',
					height:(menuButton.height)+'px',
					width:(menuButton.width)+'px',
				}" 
				>
				</view>
				<view
				:style="{
					'margin-top':(menuButton.top)+'px',
					height:(menuButton.height)+'px',
					width:(info.safeArea.width-menuButton.right)+'px',
				}" 
				></view>
			</view>
			
			
			<!-- <view class="swperig"
			:style="{
				top:(menuButton.top+menuButton.height+15)+'px',
				left:(info.windowWidth-menuButton.right)+'px',
				width:(info.windowWidth-(info.windowWidth-menuButton.right)*2)+'px'
				}"
			>
				<swiper class="swperig1"autoplay
				@change="swiperChange"
				:style="{
				width:(info.windowWidth-(info.windowWidth-menuButton.right)*2)+'px'
				}"
				>
					<swiper-item
					 :style="{
				width:(info.windowWidth-(info.windowWidth-menuButton.right)*2)+'px'
					 }"
					 class="swperig1" v-for="(item,index) in imgList"
					@click.stop="selectedBanner(item)"
					>
						<image mode="aspectFill"
						 :style="{
				width:(info.windowWidth-(info.windowWidth-menuButton.right)*2)+'px'
						 }"
						 class="swperig1" :src="item.url"></image>
					</swiper-item>
				</swiper>
				<view class="roww center_center pore" style="top: -30rpx;" >
					<block v-for="(item,index) in imgList">
						<block v-if="swiperindex==index">
							<view class="selline"></view>
						</block>
						<block v-else>  
							<view class="nosel" ></view>
						</block>
					</block>
				</view>
			</view> -->
			
			
			
			<view class="swperig m-left-30" style="width: 690rpx;" v-if="imgList.length>0"
			:style="{
				top:(menuButton.top+menuButton.height+15)+'px',
				}"
			>
				<swiper class="swperig1"autoplay
				@change="swiperChange"
				style="width: 690rpx;"
				>
					<swiper-item
					style="width: 690rpx;"
					 class="swperig1" v-for="(item,index) in imgList"
					@click.stop="selectedBanner(item)"
					>
						<image mode="aspectFill"
						style="width: 690rpx;" lazy-load
						 class="swperig1" :src="item.url"></image>
					</swiper-item>
				</swiper>
				<view class="roww center_center pore" style="top: -30rpx;" >
					<block v-for="(item,index) in imgList">
						<block v-if="swiperindex==index">
							<view class="selline"></view>
						</block>
						<block v-else>
							<view class="nosel" ></view>
						</block>
					</block>
				</view>
			</view>
			
		</view>
		
		
		<block v-if="info.platform=='ios'">
			<view class="h-30"></view>
		</block>
		
		<block v-if="info.platform=='android'">
			<view class="h-15"></view>
		</block>
		
		<view class="roww rowsa  rowsa  m-left-25 m-right-25" v-if="typeList.length>0">
			<!-- <scroll-view scroll-x style="width: 700rpx;"> -->
			<swiper class="h-121 w-700" autoplay>
				<swiper-item  class="h-121 w-700" v-for="(item,index) in typeList">
					<view class="roww">
						<block v-for="(item1,index1) in item" >
							<view class="colonn center_center w-140" 
							@click.stop="toTypePage(item1,index,index1)"
							>
								<image lazy-load :src="item1.gc_image" class="typeicon" ></image>
								<view class="jumuzhanss">{{item1.gc_name}}</view>
							</view>
						</block>
					</view>
				</swiper-item>
			</swiper>
				
			<!-- </scroll-view> -->
			
			
		</view>
		
		<view class="h-30"></view>
		
		
		<view class="banner2">
			<swiper class="banner2_1" autoplay>
				<swiper-item class="banner2_1" v-for="(item,index) in bannerList.floor_ads"
					@click.stop="selectedBanner(item)"
				>
					<image lazy-load :src="item.adv_code" class="banner2_1"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="roww topviewju m-top-34" style="padding:20rpx 33rpx;">
			<view class="rejujingxuans">热剧精选</view>
			<view class="allline"></view>
					<view class="quanbus roww rowsb center_center"
					@click.stop="toAll(goods_commend,1)"
					>
						<view class="w-10"></view>
						<view class="fs-25" style="color: #333333;">全部</view>
						<image src="../../static/shouye/shouye_27.png"
						class="w-10 h-20" lazy-load
						></image>
						<view class="w-10"></view>
					</view>
		</view>
		<scroll-view
		class="w-690 m-left-30 "
		scroll-x
		>
			<view class="roww">
				<view class="colonn m-right-24 pore" 
				v-for="(item ,index) in goods_commend"
				@click.stop="toVideoInfoPage(item.goods_id)"
				>
				
					<view class="pore">
						<image lazy-load class="juimg" mode="aspectFill"  :src="item.goods_img_480"></image>
						<image lazy-load src="/static/p10.png" class="w-60 h-30 poab"
						style="top:15rpx;left:15rpx;" v-if="item.goods_price>0"
						></image>
					</view>
					<view class="ju_name txtShowLength1 m-top-5">{{item.goods_name}}</view>
					<!-- <image src="/static/p10.png" class="w-60 h-30 poab" 
					v-if="item.goods_price>0"
					style="top:15rpx;left:15rpx;"></image> -->
				</view>
			</view>
		</scroll-view>
		
		
		<!--  -->
		
		
		<view class="roww topviewju m-top-34" style="padding:20rpx 33rpx;">
			<view class="rejujingxuans">为您推荐</view>
			<view class="allline"></view>
					<view class="quanbus roww rowsb center_center"
				@click.stop="toAll(bannerList.promotion_ads,2)"
					>
						<view class="w-10"></view>
						<view class="fs-25" style="color: #333333;">全部</view>
						<image src="../../static/shouye/shouye_27.png"
						class="w-10 h-20"
						></image>
						<view class="w-10"></view>
					</view>
		</view>
		
		
		<scroll-view
		class="w-690 m-left-30 "
		scroll-x
		>
			<view class="roww">
				<view class="colonn m-right-24" v-for="(item ,index) in bannerList.promotion_ads"
				@click.stop="selectedBanner(item,index)"
				>	
					<view class="pore">
						<image lazy-load class="juimg" mode="aspectFill" :src="item.adv_code"></image>
						<image src="/static/p10.png" class="w-60 h-30 poab"
						style="top:15rpx;left:15rpx;" v-if="item.goods_price>0"
						></image>
					</view>
					
					<view class="ju_name txtShowLength1 m-top-5">{{item.adv_title}}</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- <view class="roww  m-top-34" style="padding:20rpx 33rpx 0rpx 33rpx;"> -->
			
		<!-- 	<view class="roww topviewju  m-top-34" style="padding:20rpx 33rpx 0rpx 33rpx;">
			<view class="rejujingxuans">新闻动态</view>
			<view class="allline"></view>
			<navigator
			url="../../pages2/dynamicList/dynamicList"
			hover-class="none"
			>
			<view class="quanbus roww rowsb center_center">
				<view class="w-10"></view>
				<view class="fs-25" style="color: #333333;">全部</view>
				<image src="../../static/shouye/shouye_27.png"
				
				class="w-10 h-20"
				></image>
				<view class="w-10"></view>
			</view>
			</navigator>
		</view> -->
		
		<view class="roww topviewju m-top-34" style="padding:20rpx 33rpx 20rpx 33rpx;">
			<view class="rejujingxuans">新闻动态</view>
			<view class="allline"></view>
			<navigator
			url="../../pages2/dynamicList/dynamicList"
			hover-class="none"
			>
					<view class="quanbus roww rowsb center_center"
					>
						<view class="w-10"></view>
						<view class="fs-25" style="color: #333333;">全部</view>
						<image src="../../static/shouye/shouye_27.png"
						class="w-10 h-20"
						></image>
						<view class="w-10"></view>
					</view>
						</navigator>
		</view>
		
		
		<view class="polymerization_view1 colonn background1"
		style="margin:0rpx  30rpx 25rpx 30rpx;"
		>
			<view class="colonn" >
				<view class="roww p-bottom-20 border_bottom rowsb"
				v-for="(item,index) in article_list" 
				style="margin-bottom:25rpx;"
				@click.stop="toArticleInfo(item)"
				>
					<image class="newimage" lazy-load mode="aspectFill" 
					:src="item.article_pic"></image>
					<view class="colonn rowsb">
						<view class="dyncname w-480 txtShowLength1">{{item.article_title}}</view>
						<view class="fs-25 w-480 txtShowLength" style="color: #8A8A8A;fs-22">
							<view>{{item.article_time}}</view>
						</view>
					</view> 
				</view>
			</view>
		</view>
		<loadvideo></loadvideo>
	</view>
</template>

 
<script>
 	
 	import carousel from '@/components/vear-carousel/vear-carousel'
 	
 	export default {
 		 components: {
 		            carousel
 		        },
 		data() {
 			return {
				swiperindex:0,
 				info:{},
 				menuButton:{},
 				tipsIs:1,//1是显示  2是不显示
 				
 				 imgList: [],
 								
 				// 文章列表 .article_list
 				article_list:[],
 				bannerList:[],//banner图	
				'pagetopScroll':0,
				typeList:[],//分类列表
				goods_commend:[],//热剧精选
				artilePage:1,
 			}
 		},
 		onLoad() {
 			this.getWindowInfo();
 			// this.getArticleList();
 			this.getBanner();
			this.getTypes();
			this.getCommendList();
 			var tipsIs=uni.getStorageSync("tipstxt");
 			if(tipsIs){
 				this.tipsIs=2;
 			}
 		},
		onPageScroll(res) {
			this.pagetopScroll=res.scrollTop;
		},
		onReachBottom() {
			this.getArticleList();
		},
		onShareAppMessage () {
		        return {
		            title: "齐鲁云剧场",
		            imageUrl:"/static/lianxi_15.png",
		            path: '/pages/index_1/index_1'
		        }
		},
		onShareTimeline: function () {
		   return {
		       title: "齐鲁云剧场",
		       imageUrl:"/static/lianxi_15.png",
		       path: '/pages/index_1/index_1'
		   }
		 },
 		methods: {
			swiperChange(res){
				this.swiperindex=res.detail.current;
			},
			toSearch(){
				uni.navigateTo({
					url:"/pages1/search_1/search_1?type=goods"
				})
			},
			// 前往分类界面
			toTypePage(item,index,index1){
				console.log("asd",item,index*5,(index*5)+index1+1)
				uni.setStorageSync("videotypeindex",(index*5)+index1+1)
				uni.switchTab({
					url:"/pages/watch_play/watch_play"
				})
			},
			toAll(list,type){
				console.log("类型",type)
				uni.setStorageSync("list_home",list)
				uni.navigateTo({
					url:"/pages1/drama_more/drama_more?type="+type
				})
			},
			// 前往视频详情
			toVideoInfoPage(id){
				uni.navigateTo({
					url:"/pages1/sport_video_1/sport_video_1?id="+id
				})
				//
			},
			// 前往看剧tabbar界面
			toPlaywatch(item){
				uni.switchTab({
					url:"../watch_play/watch_play?id="+item.goods_id
				})
			},
			// 热剧精选  Index/getCommendList
			getCommendList(){
				var data = {
				}
				this.$axios
					.axios('POST', this.$paths.getCommendList, data)
					.then(res => {
						if (res.code == 10000) {
							var goods_commend=res.result.goods_commend;
							this.goods_commend=goods_commend;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取分类
			getTypes(){
				var data = {
				}
				this.$axios
					.axios('POST', this.$paths.getGoodsClassList, data)
					.then(res => {
						if (res.code == 10000) {
							var typeList=res.result.goodsclass_list;
							var result=[]
							for(var i=0;i<typeList.length;i+=5){ 
							    result.push(typeList.slice(i,i+5));
							}
							this.typeList=result;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
 			
 			// 前往文章详情
 			toArticleInfo(item){
 				uni.navigateTo({
 					url:"../../pages1/my_article/my_article?id="+item.article_id
 				})
 			},
 			// 前往看戏详情  
 			port_infoClick(){
 				uni.navigateTo({
 					url:"../../pages1/sport_video_1/sport_video_1"
 				})
 			},
 			//前往看剧界面
 			toPlaywatch(){
 				uni.switchTab({
 					url:"../watch_play/watch_play"
 				})
 			},
 			//前往直播详情
 			toLiveInfo(){
 				uni.navigateTo({
 					url:"../../pages1/live_info/live_info"
 				})
 			},
 			//轮播图切换
 			selectedBanner(item, index) {
 				console.log(item)
 				this.ad_to_page(item.adv_type,item.adv_typedate);
 			},
 			// 广告跳转界面
 			ad_to_page(type,id){
 				if(!type){
 					return false;
 				}
 				console.log("it嗷嗷护士",type,id)
 				var url="";
 				if(type=="goods"){
 					url="/pages1/sport_video_1/sport_video_1?id="+id
 				}else if(type=="store"){
 					url="/pages1/live_info_1/live_info_1?id="+id
 				}else if(type=="article"){
 					url="/pages1/my_article/my_article?id="+id
 				}else if(type=="activity"){
 					// 专题界面未定
					url="/pages2/special_info/special_info?id="+id
 				}else if(type=="url"){
					// 专题界面
					url="/pages3/webView/webView?id="+id
				}
 				uni.navigateTo({
 					url:url
 				})
 			},
 			
 			// 加入我的小程序
 			tipClick(){
 				this.tipsIs=2;
 				uni.setStorageSync("tipstxt",2);
 			},
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
 			// 获取banner图
 			getBanner(){
 				var data = {
 				}
 				this.$axios
 					.axios('POST', this.$paths.getIndexAdList, data)
 					.then(res => {
 						if (res.code == 10000) {
 							this.bannerList=res.result;
 							var imgList=[];
 							for(var a=0;a<this.bannerList.banners.length;a++){
 								console.log("asdasdsad",this.bannerList.banners[a])
 								var obg={
 									'id':a,
 									'url':this.bannerList.banners[a].adv_code,
 									'adv_type':this.bannerList.banners[a].adv_type,
 									'adv_typedate':this.bannerList.banners[a].adv_typedate,
 									'adv_code':this.bannerList.banners[a].adv_code,
 								}
 								imgList.push(obg);
 							}
 							this.imgList=imgList;
 						} else {
 							this.$tools.showToast(res.message);
 						}
 					})
 					.catch(err => {});
 			},
 			// 获取新闻动态 article_list
 			getArticleList(){
 				var data = {
 					page:this.artilePage,//		否	int	当前页码，默认为1
 					per_page:"5",//		否	int	每页显示数量，默认为10
 				}
 				this.$axios
 					.axios('POST', this.$paths.article_list, data)
 					.then(res => {
 						if (res.code == 10000) {
 							var article_list=res.result.article_list;
							for(var a=0;a<article_list.length;a++){
								article_list[a].article_time=this.$tools.timestampToTime(article_list[a].article_time*1000)
							}
							var article_list_this=this.article_list;
							
							this.article_list=article_list_this.concat(article_list);
							this.artilePage=this.artilePage+1;
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
@import url("index_1.css");
</style>
