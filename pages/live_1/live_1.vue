<template>
	<view style="">
		<view class="topallview "
		style="z-index:10000001"
		:style="{
			width:info.safeArea.width+'px',
			height:(menuButton.height+menuButton.top+8+6)+'px',
			top:'0px'
		}"
		>
		<!-- left:(info.windowWidth-menuButton.right)+'px', -->
			<view class="capsulevioew roww center_center"
			style="z-index: 1000000;left:30rpx;"
			:style="{
				width:menuButton.width+'px',
				height:(menuButton.height)+'px',  
				top:(menuButton.top)+'px',
			}"
			@click.stop="toSearch"
			>
				<image src="../../static/sousuo/sousuo_03.png"
				class="w-30 h-30 m-right-10"
				></image>
				<view class="searchtxt">搜索</view>
				<view style="width:30rpx;"></view>
			</view>
			<view class="roww center_center poab width"
			:style="{
				
				height:(menuButton.height)+'px',
				top:(menuButton.top)+'px',
			}"
			>
				<view>直播</view>
			</view>
		</view>
		<view class="h-15"></view>
		<view class="colonn pore p-all-30"
		:style="{
			top:(menuButton.height+menuButton.top+8)+'px'
		}"
		>
			<view 
			>
				<view class="roww center_center">
					<image class="icon123"  src="/static/live/zhibo_03.png"></image>
					<view class="wodezhuanzhu">我的关注</view>
					<view class="roww jige m-left-10">
						<view style="color: #EB1717;">{{livelistGuanzhu.length}}</view>
						<view style="color: #999999;" class="m-left-8">部剧目正在直播</view>
					</view>
					<view class="allline"></view>
				</view>
			</view>
			
			
			<scroll-view scroll-x
			style="width: 690rpx;"
			>
			<view class="roww m-top-48" v-if="livelistGuanzhu.length>0">
				<view class="colonn center_center m-right-30 "
				v-for="(item,index) in livelistGuanzhu"
				@click.stop="toLiveInfo(item)"
				>
					<view class="guanzhu_img_viw guanzhutoLiveInfoimg_viw roww center_center">
						<image class="liveimg" mode="aspectFill" :src="item.live_banner"></image>
					</view>
					<view class="zhibozhongview roww center_center"
					   v-if="item.live_apply_push_state==1"
					>
						<image src="/static/zhibo1_002.gif"
						class="w-20 h-20"
						></image>
						<view>直播中</view>
					</view>
					<view class="zhibozhongview roww center_center"
					v-else style="opacity: 0;"
					>
						<image src="/static/zhibo1_002.gif"
						class="w-20 h-20"
						></image>
						<view></view>
					</view>
					<view class="jumingss txtShowLength">{{item.live_name}}</view>
				</view>
				
				<view class="w-20"></view>
			</view>
			</scroll-view>
			
			
			
				<view class="roww center_center m-top-52">
					<view class="roww center_center"
					@click.stop="typeClick(1)"
					>
						<image class="icon123" src="/static/live/zhibo1_09.png"
						:src="type==1?'/static/live/zhibo1_09.png':'/static/live/zhibo_13.png'"
						></image>
						<view v-if="type==1" class="wodezhuanzhu"
						>正在直播</view>
						<view v-else class="huifangzhibo"
						>正在直播</view>
					</view>
					<view class="shuxians"></view>
					<view class="roww center_center"
					@click.stop="typeClick(2)">
						<image class="icon123" 
						:src="type==2?'/static/live/zb_07.png':'/static/live/zhibo1_07.png'"
						></image>
						<view v-if="type==2" class="wodezhuanzhu"
						>回放直播</view>
						<view v-else class="huifangzhibo"
						>回放直播</view>
					</view>
					<view class="allline"></view>
				</view>
			<view class="huanhang rowsb">
				<view class="colonn m-top-30" 
				v-for="(item,index) in livelist"
				@click.stop="toLiveInfo(item)"
					
				
				>
					<view class="zhiboimgview pore "
					:class="{
						'borde1':index%2==0,
						'borde2':index%2!=0
					}"
					>
						<image :src="item.live_banner" 
						 :class="{
						 	'borde1':index%2==0,
						 	'borde2':index%2!=0
						 }"
						 mode="aspectFill" 
						style="width: 341rpx;height:189rpx;top: 0px;left:0px;z-index: 1000;" 
						class="poab" ></image>
						
						
						<view class="bofanview roww center_center"  
						 style="z-index: 1300;">
							<image src="/static/live/bofang.png" 
							style="z-index: 13001;"
							 class="w-26 h-26"></image>
						</view>
						
						
						<view class="roww center_center poab" style="bottom:10rpx;"
						v-if="item.live_apply_push_state==0&&item.live_apply_state==1"
						>
							<view class="duoshaoren">{{item.live_apply_play_time[0][1]}}.{{item.live_apply_play_time[0][2]}} {{item.live_apply_play_time[1][0]}}:{{item.live_apply_play_time[1][1]}}开播</view>
							<view class="allline"></view>
						</view>
						<view class="roww center_center poab" style="bottom:10rpx;"
						v-if="item.live_apply_push_state==2"
						>
							<view class="duoshaoren">{{item.live_max_member}}人看过</view>
							<view class="allline"></view>
						</view>
						<view class="zhibodongtu roww center_center" 
						v-if="item.live_apply_push_state==1&&item.live_apply_state==1">
							<image src="/static/live/zhibo1_001.gif" 
							class="zhiboicon"></image>
						</view>
					</view>   
					<view class="colonn ">
						<view class="jumings m-top-16 m-bottom-11 txtShowLength">{{item.live_name}}</view>
						<view class="wenjigeren  txtShowLength">{{item.live_description}}</view>
					</view>
				</view>
				<block v-if="livelist.length<=0">
					<view class="roww w-750 center_center">
						<null></null>
					</view>
				</block>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				menuButton:{},
				type:1,
				page:1,
				livelist:[],//直播列表
				favoritesList:[],//收藏列表
				livelistGuanzhu:[],
			}
		},
		onLoad() {
			this.getWindowInfo();
			this.getLivelist('1');
		},
		onShow() {
			this.getLivelistGuanzhu();
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				
				this.getfavorites_list();
			}
		},
		onShareAppMessage () {
		        return {
		            title: "齐鲁云剧场",
		            imageUrl:"/static/lianxi_15.png",
		            path: '/pages/live_1/live_1'
		        }
		    },
		methods: {
			
			getLivelistGuanzhu(){
				var data = {
					page:"1",//	1	是	int	页码
					pagesize:"100000",//	10	是	int	每页条数
					type:"0",//
				}
				this.$axios
					.axios('POST', this.$paths.get_live_listMemberLive, data)
					.then(res => {
						
						if (res.code == 10000) {
							
							this.livelistGuanzhu=res.result;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			
			// 获取收藏直播  
			getfavorites_list(){
				var data = {
					page:"1",//	1	否	int	当前页数，默认第一页
					per_page:"1000",//	10	否	int	每页显示数量，默认10条
					fav_type:"store",//	goods	否	string	收藏类型，‘goods’商品或视频，‘store’直播间，默认”goods”
				}
				this.$axios
					.axios('POST', this.$paths.favorites_list, data)
					.then(res => {
						if (res.code == 10000) {
							console.log("收藏直播列表",res)
							this.favoritesList=res.result.favorites_list;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			toSearch() {
				console.log("搜索")
				uni.navigateTo({
					url:"/pages2/live_search/live_search",
					complete: (res) => {
						console.log("试试",res)
					}
				})
			},
			typeClick(index){
				this.type=index;
				if(index==1){
					this.getLivelist(index);
				}else{
					this.get_live_list();
				}
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
			// 获取回放列表
			get_live_list(){
				var data = {
					page:"1",//	1	是	int	页码
					pagesize:"100000",//	10	是	int	每页条数
					type:"1",//
				}
				this.$axios
					.axios('POST', this.$paths.get_live_listMemberLive, data)
					.then(res => {
						if (res.code == 10000) {  
							var livelist=res.result;
							for(var a=0;a<livelist.length;a++){
								livelist[a].live_apply_play_time=livelist[a].live_apply_play_time.split(" ");
								livelist[a].live_apply_play_time[0]=livelist[a].live_apply_play_time[0].split("-")
								livelist[a].live_apply_play_time[1]=livelist[a].live_apply_play_time[1].split(":")
							}
							
							this.livelist=livelist;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			//获取直播列表 
			getLivelist(statte){
				var data = {  
					page:"1",//	1	是	int	页码
					pagesize:"100000",//	10	是	int	每页条数
					type:"0",//
				}
				this.$axios
					.axios('POST', this.$paths.get_live_listMemberLive, data)
					.then(res => {
						if (res.code == 10000) {
							var livelist=res.result;
							for(var a=0;a<livelist.length;a++){
								livelist[a].live_apply_play_time=livelist[a].live_apply_play_time.split(" ");
								livelist[a].live_apply_play_time[0]=livelist[a].live_apply_play_time[0].split("-")
								livelist[a].live_apply_play_time[1]=livelist[a].live_apply_play_time[1].split(":")
							}
							
							this.livelist=livelist;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			toLiveInfo(item){
				console.log("状态",item.live_apply_push_state,item.live_apply_state)
				if(item.live_apply_push_state==0&&item.live_apply_state==0){
					this.$tools.showToast("回放生成中");
				}else 
				if(item.live_apply_push_state==1&&item.live_apply_state==0){
					uni.navigateTo({
						url:"../../pages1/sport_video_1/sport_video_1?id="+item.live_apply_push
					})
				}else if(item.live_apply_push_state==1&&item.live_apply_state==1){
					uni.navigateTo({ 
						url:"/pages1/live_info_1/live_info_1?id="+item.live_apply_id
					})
				}else if(item.live_apply_push_state==0&&item.live_apply_state==1){
					this.$tools.showToast("直播暂未开始");
				}
			},
			
		}
	}
</script>

<style>
@import url("live_1.css");
</style>
