<template>
	<view >
		<view class="topallview "
		style="z-index:1000"
		:style="{
			width:info.safeArea.width+'px',
			height:(menuButton.height+menuButton.top+8)+'px',
			top:'0px'
		}"
		>
			<view class="capsulevioew roww center_center"
			:style="{
				width:menuButton.width+'px',
				height:(menuButton.height)+'px',
				top:(menuButton.top)+'px',
				left:(info.windowWidth-menuButton.right)+'px',
			}"
			@click.stop="toSearch "
			>
				<image src="../../static/sousuo.png"
				:style="{
					width:(menuButton.height)/1.5+'px',
					height:(menuButton.height)/1.5+'px',
				}"
				></image>
				<view class="searchtxt">搜索</view>
				<view style="width:30rpx;"></view>
			</view>
		</view>
		<view class="tipstxt roww zindex_1000" 
		style="z-index:1000"
		v-if="tipsIs==1"
		:style="{
			top:(menuButton.height+menuButton.top+8)+'px',
		}"
		>
			<view>点击右上角【···】，添加到小程序，添加不迷路哦</view>
			<view class="allline"></view>
			<image @click.stop="tipClick" src="../../static/guanbi.png" class="w-35 h-35"></image>
		</view>
		
		<view 
		class="zindex_1"
		style="z-index:1"
		:style="{
			'margin-top': tipsIs==1?((menuButton.height+menuButton.top+30)+'px'):(menuButton.height+menuButton.top+10)+'px',
		}"
		>
			<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
		</view>
		
		
		
		
		<view class="colonn" style="padding:0rpx 30rpx;">
		<view class="roww typebigview">
			<scroll-view scroll-x
			style="width:690rpx;"
			>
				<view class="roww">
					<view class="colonn typeviewwaitem center_center"
					v-for="(item,index) in 10"
					@click.stop="toPlaywatch"
					>
						<image class="typeicon" src="https://res.oss.zhuyin.club/res/0/87/picture/0/202012/08/20201208162713-8735.png"></image>
						<view class="typetxts txtShowLength">
						戏曲</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="swper1" style="margin-top:25rpx;">
			<swiper-item class="swper1"
			v-for="(item,index) in bannerList.floor_ads"
			@click.stop="ad_to_page(item.adv_type,item.adv_typedate)"
			>
				<!-- <navigator
				url="../../pages1/album_info/album_info"
				hover-class="none"
				> -->
					<image  :src="item.adv_code" class="swper1"></image>
				<!-- </navigator> -->
				
			</swiper-item>
		</swiper>
		
		<view class="polymerization_view colonn">
			<view class="roww center_center p-all-15">
				<view class="leftlinevie"></view>
				<view class="fs-30 lefttxttile">
					热剧精选
				</view>
				<view class="allline"></view>
				<navigator
				url="../../pages1/drama_more/drama_more"
				hover-class="none"
				>
					<view class="fs-30 m-right-15">查看全部</view>
				</navigator>
				<image src="../../static/youjiantou2.png"
				class="w-35 h-35"
				></image>
			</view>
			
			<scroll-view
			scroll-x
			style="width:635rpx;margin-top:25rpx;margin-left:15rpx;"
			>
				<view class="roww">
					<view class="colonn m-right-15" 
					v-for="(item,index) in 10"
					@click.stop="port_infoClick"
					>
						<image src="/static/qifeigusi.jpg" class="drama_image w-180 h-220" ></image>
						<view class="drama_names w-180 txtShowLength">山东大邦字山东大邦字</view>
						<view class="jinrus">进入</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
		
		
		
		<view class="polymerization_view colonn">
			<view class="roww center_center p-all-15">
				<view class="leftlinevie"></view>
				
				<view class="fs-30 lefttxttile">
					暂定
				</view>
				<view class="allline"></view>
				<navigator
				url="/pages1/new_play_trailer/new_play_trailer"
				hover-class="none"
				>
				<view class="roww">
					<view class="fs-30 m-right-15">查看全部</view>
					<image src="/static/youjiantou2.png"
					class="w-30 h-30"
					></image>
				</view>
				</navigator>
				
			</view>
			
			<scroll-view
			scroll-x
			style="width:635rpx;margin-top:25rpx;margin-left:15rpx;"
			>
				<view class="roww">
					<view class="colonn m-right-15" 
					v-for="(item,index) in bannerList.promotion_ads"
					@click.stop="ad_to_page(item.adv_type,item.adv_typedate)"
					>
						<image :src="item.adv_code" mode="aspectFill" class="drama_image w-180 h-220" ></image>
						<view class="drama_names w-180 txtShowLength">{{item.adv_title}}</view>
						<view class="jinrus">进入</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="polymerization_view1 colonn background1"
		style="margin:25rpx 0rpx;"
		>
			<view class="roww center_center p-all-15"
			style="padding-right: 0rpx;"
			>
				<view class="leftlinevie"></view>
				<view class="fs-30 lefttxttile">
					剧院动态
				</view>
				<view class="allline"></view>
				<navigator
				url="../../pages2/dynamicList/dynamicList"
				hover-class="none"
				>
					<view class="fs-30 m-right-15">全部动态</view>
				</navigator>
				<image src="../../static/youjiantou2.png"
				class="w-30 h-30"
				></image>
			</view>
			<view class="colonn" style="padding:20rpx 10rpx;">
				<view class="roww"
				v-for="(item,index) in article_list" 
				style="margin-bottom:25rpx;"
				@click.stop="toArticleInfo(item)"
				>
					<image class="newimage" mode="aspectFill" 
					:src="item.article_pic"></image>
					<view class="colonn rowsa">
						<view class="dyncname w-430 txtShowLength1">{{item.article_title}}</view>
						<view class="fs-30 w-430 txtShowLength" style="color: #8A8A8A;">
							<rich-text :nodes="item.description"></rich-text>
						</view>
					</view> 
				</view>
			</view>
		</view>
		</view>
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
				info:{},
				menuButton:{},
				tipsIs:1,//1是显示  2是不显示
				
				 imgList: [{
				                    url: 'https://res.oss.zhuyin.club/res/0/87/picture/0/202202/22/20220222153259-7231.jpg',
				                    id: 1
				                },{
				                    url: 'https://res.oss.zhuyin.club/res/0/87/picture/0/202202/25/2022022516133-9663.jpg',
				                    id: 2
				                },{
				                    url: 'https://res.oss.zhuyin.club/res/0/87/picture/0/202202/28/2022022814716-1817.jpg',
				                    id: 3
				                },{
				                    url: 'https://res.oss.zhuyin.club/res/0/87/picture/0/202203/01/20220301135346-8612.jpg',
				                    id: 4
				                },],
								
				// 文章列表 .article_list
				article_list:[],
				bannerList:[],//banner图				
			}
		},
		onLoad() {
			this.getWindowInfo();
			this.getArticleList();
			this.getBanner();
			var tipsIs=uni.getStorageSync("tipstxt");
			if(tipsIs){
				this.tipsIs=2;
			}
		},
		methods: {
			// 前往搜索界面
			toSearch(){
				uni.navigateTo({
					url:"../../pages1/search/search"
				})
			},
			// 前往文章详情
			toArticleInfo(item){
				uni.navigateTo({
					url:"../../pages1/my_article/my_article?id="+item.ac_id
				})
			},
			// 前往看戏详情
			port_infoClick(){
				uni.navigateTo({
					url:"../../pages1//pages1/sport_video_1/sport_video_1"
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
					page:"1",//		否	int	当前页码，默认为1
					per_page:"5",//		否	int	每页显示数量，默认为10
				}
				this.$axios
					.axios('POST', this.$paths.article_list, data)
					.then(res => {
						if (res.code == 10000) {
							this.article_list=res.result.article_list;
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
	@import url("index.css");
</style>
