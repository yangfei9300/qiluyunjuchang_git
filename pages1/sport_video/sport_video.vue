<template>
	<view>
		<view class="pore">
			<video autoplay class="topview" :src="videourl"
			@ended="ended_video"
			id="myVideo" 
			></video>
			<cover-view class="fs-30 viewrihttimebigview roww center_center"
			v-if="now_video.type==1"
			>
				<cover-view class="color6_r" v-if="ad_time>0">{{ad_time}}</cover-view>
				<cover-view class="color6_r w-1 h-20"
				  v-if="ad_time>0"
				 style="background-color: #ffffff;margin:0rpx 15rpx;">
				</cover-view>
				<cover-view class="" style="color:#CA9D08;" @click.stop="tobuyvip"
				>跳过</cover-view>
			</cover-view>
		</view>
		<view class="roww rowsa p-top-20 p-bottom-20" >
			<view class=" center_center roww"
			@click.stop="toThumbsUp"
			>
			<image class="w-40 h-40 m-right-10"
			 v-if="collection_status==1"
			src="../../static/shoucanghong.png"
			></image>
				<image class="w-40 h-40 m-right-10"
				v-else
				src="../../static/shoucangvideo.png"
				></image>
				
				<view class="fs-25 lh-40" >收藏</view>
			</view>
			<view class=" center_center roww"
			@click.stop="memberthumbsupindex"
			>
			<!--  @click.stop="giftIsCl1ick" -->
				<image class="w-40 h-40 m-right-10"
				src="/static/dianzanhong.png" v-if="thumbs_up_status==1"
				></image>
				<image class="w-40 h-40 m-right-10"
				src="/static/dianzanhui.png" v-else
				></image>
				<view class="fs-25 lh-40" >点赞</view>
			</view>
			<view class=" center_center roww pore">
				<image class="w-40 h-40 m-right-10"
				src="../../static/share.png"
				></image>
				<view class="fs-25 lh-40" >分享</view>
				<button 
				open-type="share"
				class="poab btnshare"
				></button>
			</view>
			<view class=" center_center roww"
			@click.stop="posterIsClick1"
			>
				<image class="w-40 h-40 m-right-10"
				src="../../static/export.png"
				></image>
				<view class="fs-25 lh-40" >生成海报</view>
			</view>
		</view>
		<view class="roww p-all-20">
			<view class="w-500 fs-30 center_center" style="line-height: 50rpx;">
				<text class="paymentbtn" v-if="videoInfo.goods_info.goods_price>0">付费</text>
				{{videoInfo.goods_info.goods_name}}
			</view>
			<view class="allline"></view>
			<view class="roww center_center" style="height: 40rpx;">
				<image src="../../static/shuangjiantouxia.png"
					class="w-25 h-25 m-right-10"
				></image>
				<view class="fs-25" 
				v-if="videoInfo.store_info.store_name&&videoInfo.store_info.store_name!=''" 
				@click.stop="moreContextClick"
			
				>更多介绍</view>
			</view>
		</view>
		<view class="roww center_center">
			<view class="payview"  v-if="videoInfo.goods_info.goods_price>0"
			@click.stop="closealert"
			>当前内容为付费内容，支付后即可收听</view>
		</view>
		
		
		<view class="p-all-20 fs-30" style="padding-top:0rpx;">
			演出单位：{{videoInfo.store_info.store_name}}
		</view>
		
		<view class="colonn">
			<view class="roww p-all-20 border_bottom fs-30"
			v-for="(item,index) in videoInfo.goodscourses_group"
			>
				<view>{{item.goodscourses_name}}</view>
				<view class="allline"></view>
				<view @click.stop="videoInfoClick(item,index)">播放</view>
			</view>
		</view>
		
		<view class="p-all-20 fs-30" v-if="moreContext" style="padding-top:0rpx;">
			<rich-text :nodes="videoInfo.goods_info.mobile_body"></rich-text>
		</view>
		<view
		style="width:750rpx;height:15rpx;background-color: #f5f5f5;"
		class="m-bottom-30 m-top-20"
		></view>
		
		<view class="colonn">
			<view class="roww rowsa">
				<view class="colonn center_center m-bottom-15"
				v-if="menuType==0"
				>
					<view style="color: #E63737 ;" class="roww duiqi">
						<view class="fs-35">更多内容</view>
						<view class="fs-25">（{{erVideoList.length}}）</view>
					</view>
					<view class="bottoline m-top-15"></view>
				</view>
				<view class="colonn center_center m-bottom-15"
				v-if="menuType!=0"
				@click.stop="menuTypeClick(0)"
				>
					<view style="color: #000000 ;" class="roww duiqi">
						<view class="fs-35">更多内容</view>
						<view class="fs-25">（{{erVideoList.length}}）</view>
					</view>
					<view class="bottoline1 m-top-15"></view>
				</view>
				<view class="colonn center_center m-bottom-15"
				v-if="menuType==1"
				>
					<view style="color: #E63737 ;" class="roww duiqi">
						<view class="fs-35">评论</view>
					</view>
					<view class="bottoline m-top-15"></view>
				</view>
				<view class="colonn center_center m-bottom-15"
				v-if="menuType!=1"
				@click.stop="menuTypeClick(1)"
				>
					<view style="color: #000000 ;" class="roww duiqi">
						<view class="fs-35">评论</view>
					</view>
					<view class="bottoline1 m-top-15"></view>
				</view>
			</view>
			<view class="roww p-all-20 border_bottom"
			v-for="(item,index) in erVideoList" v-if="menuType==0"
			@click.stop="toVideoInfo(item)"
			>
				<image 
				:src="item.goods_image_url"
				 mode="aspectFill"
				 class="sportimg m-right-20"></image>
				<view class="colonn rowsbl">
					<view class="txtShowLength1 w-400 fs-30">{{item.goods_name}}</view>
					<view class="color3_r fs-25">{{item.store_name}}</view>
					<view class="roww center_center"> 
					<image src="../../static/bg-play.png"
					class="w-30 h-30 m-right-10"
					></image>
						<view class="fs-25 color3_r">{{item.goods_click}}次播放</view>
						<view class="allline"></view>
					</view>
				</view>
			</view>
			<view class="colonn"
			v-if="menuType==1"
			>
				<view class="roww p-all-20 border_bottom"
				v-for="(item,index) in commendList_1" 
				>
					<image class="headimgs m-right-15"
					:src="item.geval_frommemberavatar"
					></image>
					<view class="colonn">
						<view class="usernames w-500 txtShowLength">{{item.geval_frommembername}}</view>
						<view class="commenttxt w-600"
						style="word-break:break-all;"
						>{{item.geval_content}}</view>
						<view class="roww center_center m-top-20 w-600">
							<view class="fs-25 m-right-15">{{item.geval_addtime}}</view>
							<view class="allline"></view>
							 <view class="backtxt"  @click.stop="commalertClick(item)">({{item.geval_child}})回复</view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="height:100px;"></view>
		</view>
		
		
		<!--评价弹窗 -->
		
		
		
		<!-- 海报组件 -->
		<sport_poster v-if="posterIs" @posterIsClick="posterIsClick"></sport_poster>
		<!-- 不知福参数 -->
		<no_pay_alert  v-if="tipsIosAlert" @closealert="closealert"></no_pay_alert>
		<buyvideo v-if="buyvideoalert" @cancle="cancleClick" :money="videoInfo.goods_info.goods_price"></buyvideo>
		<!-- 礼物组件 -->
		<reward v-if="giftIs" 
		@closealert="giftIsClick"
		@sendclick="sendclick"
		></reward>
		
		
		<!-- 评价内容 -->
		<view class="roww background1 width center_center"
		style="padding:20rpx; 20rpx;position: fixed;"
		:style="{
			'bottom':keyheight+'px'
		}"
		v-if="menuType==1"
		>
		<view style="width:10rpx;"></view>
		<view class="allline"
		 style="background-color: #f5f5f5;border-radius: 100rpx;padding:10rpx 20rpx;"
		>	<view style="width:30rpx;"></view>
			<input placeholder="请输入内容"
			class="allline fs-30"
			@blur="focusInputblur"
			cursor-spacing="10"
			:focus="commeinptFocus" v-model="commtxt"
			:adjust-position="false"
			placeholder-class=" fs-30"
			/>
			<view style="width:30rpx;"></view>
		</view>
			<view style="width:25rpx;"></view>
			<view class="sendbtn" @click.stop="toComment">发送</view>
		</view>
		
		<!-- 回复弹窗 -->
		<view class="huuibeijing " v-if="commalert"
		@click.stop="commalertClick"
		>
			<view class="background1 colonn center_center" style="position: fixed;bottom: 0rpx;"
			@click.stop="aaaaaa"
			>
				<view class="roww border_bottom rowsb center_center w-750"
				style="padding:0rpx 20rpx;"
				>
					<image src="../../static/guanbi_hui.png" class="w-40 h-40 yincang1"></image>
					<view class=" p-all-20  text_align1_r"> {{erCommendInfo.geval_frommembername}}的回复</view>
					<image src="../../static/guanbi_hui.png" class="w-40 h-40"
					@click.stop="commalertClick"
					></image>
				</view>
				<view class="roww allline w-710 center_center m-top-20">
					<image class="headimgs m-right-10" :src="erCommendInfo.geval_frommemberavatar"></image>
					<view class="landlord">楼主</view>
					<view class="m-left-20 m-right-20 font_size7_r fs-30">{{erCommendInfo.geval_frommembername}}</view>
					<view class="allline"></view>
					<!-- <image src="../../static/dianzanankuai.png" class="w-35 h-35 m-right-15"></image>
					<view class="fs-25 lh-35 "> 20</view> -->
				</view>
				<view class="w-710 colonn">
					<view class="commenttxt w-710 m-top-20"
					
					style="word-break:break-all;"
					>{{erCommendInfo.geval_content}}</view>
					<view class="fs-25 m-right-15 m-top-20">{{erCommendInfo.geval_addtime}}</view>
				</view>
				<view class=" w-750 h-20"></view>
				<view class="background2 w-750 h-20"></view>
				<view class="roww w-750 p-all-20 fs-30 p-bottom-0">
					<view>{{commendListEr.length}}条回复</view>
					<view class="allline"></view>
				</view>
				<scroll-view
				scroll-y
				style="max-height:400rpx"
				>
				<view class="roww p-all-20 w-750 border_bottom"
				v-for="(item,index) in commendListEr" 
				>
					<image class="headimgs m-right-15"
					:src="item.geval_frommemberavatar"
					></image>
					<view class="colonn">
						<view class="usernames w-500 txtShowLength">{{item.geval_frommembername}}</view>
						<view class="commenttxt w-600"
						style="word-break:break-all;"
						>{{item.geval_content}}</view>
						<view class="roww center_center m-top-20 w-600">
							<view class="allline"></view>
							<view class="fs-25 m-right-15">{{item.geval_addtime}}</view>
						</view>
					</view>
				</view>
				</scroll-view>
				<view ></view>
				<!-- :style="{
					'bottom':keyheight+'px'
				}" -->
				<view class="roww background1 width center_center"
				style="padding:20rpx; 20rpx;"
				v-if="menuType==1"
				>
				<!--
				 position: fixed;
				 :style="{
					'bottom':keyheight+'px'
				}" -->
				<view style="width:10rpx;"></view>
				<view class="allline"
				 style="background-color: #f5f5f5;border-radius: 100rpx;padding:10rpx 20rpx;"
				>	<view style="width:30rpx;"></view>
				
				<!-- @blur="focusInputblur" -->
				<!-- :focus="commeinptFocus"  -->
					<input placeholder="请输入内容"
					class="allline fs-30"
					cursor-spacing="10"
					v-model="commtxt"
					placeholder-class=" fs-30"
					/>
					<view style="width:30rpx;"></view>
				</view>
					<view style="width:25rpx;"></view>
					<view class="sendbtn" @click.stop="toComment">发送</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// videourl:"https://res.oss.zhuyin.club/res/0/87/video/2/202108/11/2021081111359-5153.mp4",
				videourl:"https://sdyygh.oss-cn-beijing.aliyuncs.com/home/appadv/alioss_2022042515521212114.mov",
				posterIs:false,//海报弹窗是否显示
				tipsIosAlert:false,
				giftIs:false,//打赏弹窗是否出来
				menuType:0,//是更多内容还是评价
				keyheight:0,//键盘高度
				commeinptFocus:false,
				commtxt:"",//评价内容
				commalert:false,
				options:{},
				moreContext:false,//是否显示更多简介
				videoInfo:{},//视频详情
				page_recommend:1,//推荐页数
				page_evaluate:1,//评价页数
				commendList_1:[],//评价列表
				userInfo:null,//用户信息
				collection_status:0,//收藏状态
				thumbs_up_status:0,//点赞状态
				buyvideoalert:false,//购买视频对话框
				commendListEr:[],//二级评论列表
				erCommendInfo:null,//二级评论楼主详情
				erVideoList:[],//二级视频列表
				commendListShow:false,
				ad_videos:{},//视频
				now_video:{
					'type':'1',//1是广告2是正式视频
					'videourl':'',//戏曲视频地址
					index:0,//视频下标  默认第一个   广告播放完的视频下标
				},
				ad_time:10,//倒计时
				outInval:null,//倒计时
				
				videoContext:null,//
				chupinfangIs:false,//是否显示出品方
			}
		},
		onLoad(options) {
			this.options=options;
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
				this.getIsCollection();
				// 获取点赞状态
				this.get_memberthumbsupindex();
			}
			//是否收藏
			
			// 获取键盘高度
			this.getKeyhieght();
			// 获取视频详情
			this.getVideoInfo();
		
			
		},
		onReachBottom() {
			if(this.menuType==0){
				console.log("加载推荐内容");
			}else if(this.menuType==1){
				this.getCommList();
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onUnload() {
			clearInterval(this.outInval)
		},
		methods: {
			chupinfangIs(){
				this.chupinfangIs=!this.chupinfangIs;
			},
			// 集数点击
			videoInfoClick(item,index){
				clearInterval(this.outInval)
				if(this.videoInfo.goods_info.goods_price>0){
					console.error("判断是否支付");
					//付费的话直接播放
					var now_video={
						index:index,
						type:2,
						videourl:item.goodscourses_url
					}
					this.now_video=now_video;
					this.videobofang();
				}else{
					//免费
					this.get_adv_video(index);
				}
				
			},
			// 视频播放
			videobofang(){
				clearInterval(this.outInval);
				var now_video=this.now_video;
				now_video.type=2;//修改成视频播放
				now_video.videourl=this.videoInfo.goodscourses_group[now_video.index].goodscourses_url;
				this.now_video=now_video;
				
				//开始播放
				this.videoContext.stop();
				this.videoContext.play();
				this.videoContext.seek(0);
			},
			// 广告视频播放完成
			ended_video(res){
				console.log("播放完成",res);
				var now_video=this.now_video;
				if(now_video.type==1){//如果播放是广告
					this.videobofang();
				}else{
					console.log("正常视频，自己点击去播放去");
				}
			},
			//广告倒计时
			startAd(){
				clearInterval(this.outInval);
				this.outInval=setInterval(res=>{
					if(this.ad_time<0){
						console.log("开始正式视频播放")
						clearInterval(this.outInval);
						// this.videobofang();
					}else{
						this.ad_time=this.ad_time-1;
					}
				},1000)
			},
			// 跳转到视频详情
			toVideoInfo(item){
				uni.redirectTo({
					url:"/pages1/sport_video_1/sport_video_1?id="+item.goods_id
				})
			},
			// 获取贴片广告  
			get_adv_video(index){
				if(this.userInfo){
					var data={
						member_level:this.userInfo.level,
					}
				}else{
					var data={
						member_level:1,
					}
				}
				this.$axios
					.axios('POST', 
					this.$paths.get_adv_video, 
					data)
					.then(res => {
						if (res.code == 10000) {
							this.ad_time=res.result.time
							// this.ad_time=5;
							this.ad_videos=res;
							var now_video=this.now_video;
							now_video.type=1;
							now_video.videourl=res.result.url;
							now_video.index=index;
							this.now_video=now_video;
							this.startAd();
							this.videoContext.stop();
							this.videoContext.seek(0);
							this.videoContext.play();
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 推荐视频视频列表
			goods_list(){
				var data={
					gc_id:this.videoInfo.store_info.store_id,
				}
				this.$axios
					.axios('POST', this.$paths.goods_list, data)
					.then(res => {
						if (res.code == 10000) {
							this.erVideoList=res.result.goods_list
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 购买视频点击事件
			cancleClick(res){
				console.log(res.index)
				if(res.index==2){
					this.$tools.showToast("支付成功");
					this.buyvideoalert=false;
				}else{
					this.$tools.showToast("未支付只能观看前20分钟");
					this.buyvideoalert=false;
				}
			},
			
			
			//获取二级评论
			getCommListErji(item){
				var data={
					goods_id:this.options.id,//	1	是	int	商品（视频）ID
					page:'1',//		否	int	当前页码，默认为1
					per_page:"1000",//		否	int	每页显示数量，默认为10
					geval_id:item.geval_id
				}
				this.$axios
					.axios('POST', this.$paths.goods_evaluatelist, data)
					.then(res => {
						if (res.code == 10000) {
							this.commendListEr=res.result.evaluate_list;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取点赞状态
			get_memberthumbsupindex(){
				if(!this.userInfo){
					return false;
				}
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
				}
				console.log("获取点赞状态",this.$paths.check_statememberthumbsup);
				this.$axios
					.axiosDate('POST', this.$paths.check_statememberthumbsup, data)
					.then(res => {
						if (res.code == 10000) {
							this.thumbs_up_status=res.result
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 添加点赞 memberthumbsupindex
			memberthumbsupindex(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					return false;
				}
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
				}
				this.$axios
					.axiosDate('POST', this.$paths.memberthumbsupindex, data)
					.then(res => {
						if (res.code == 10000) {
							this.get_memberthumbsupindex();
							this.thumbs_up_status=res.result;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 视频收藏
			toThumbsUp(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					return false;
				}
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
					fav_type:"goods",//	goods	否	string	收藏类型，‘goods’商品或视频，‘store’直播间，默认”goods”
				}
				this.$axios
					.axiosDate('POST', this.$paths.favorites_add, data)
					.then(res => {
						if (res.code == 10000) {
							this.collection_status=res.result
							this.getIsCollection();
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			//获取是否收藏
			getIsCollection(){
				if(!this.userInfo){
					return false;
				}
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
					fav_type:"goods",//	goods	否	string	收藏类型，‘goods’商品或视频，‘store’直播间，默认”goods”
				}
				this.$axios
					.axiosDate('POST', this.$paths.check_state, data)
					.then(res => {
						if (res.code == 10000) {
							this.collection_status=res.result
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			
			// 获取评价列表
			getCommList(){
				this.commendListShow=!this.commendListShow;
				var data={
					goods_id:this.options.id,//	1	是	int	商品（视频）ID
					page:this.page_evaluate,//		否	int	当前页码，默认为1
					per_page:"10",//		否	int	每页显示数量，默认为10
				}
				this.$axios
					.axios('POST', this.$paths.goods_evaluatelist, data)
					.then(res => {
						console.log("评价列表姐夫哦",res,res.code == 10000)
						if (res.code == 10000) {
							var newCOmmendList1=res.result.evaluate_list;
							console.log("asdasd--newCOmmendList1",newCOmmendList1);
							this.page_evaluate=this.page_evaluate+1;
							console.log("asdasd--newCOmmendList1",this.page_evaluate);
							
							
							var commendList_1=this.commendList_1;
							console.log("asdasd-11-newCOmmendList1111",commendList_1);
							
							
							
							this.commendList_1=commendList_1.concat(newCOmmendList1);
							console.log("commendList_1",this.commendList_1)
							this.$forceUpdate();
						} else {
							this.$tools.showToast(res.message);
						}
						this.commendListShow=true;
					})
					.catch(err => {});
			},
			// 去评价
			toComment(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					return false;
				}
				if(this.commtxt==''){
					this.$tools.showToast("请输入评价内容");
					return false;
				};
				var data={
					goods_id:this.options.id,//	1	是	int	商品(视频)ID
					geval_content:this.commtxt,//			是	string	评论内容
					geval_isanonymous:"0",//		0	是	int	是否匿名发布，0不是，1匿名发布
				}
				if(this.erCommendInfo){
					data.geval_id=this.erCommendInfo.geval_id;
				}
				this.$axios
					.axiosDate('POST', this.$paths.add_evaluate, data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("评价成功");
							this.commtxt="";
							if(this.erCommendInfo){
								this.getCommListErji(this.erCommendInfo);
							}else{
								this.page_evaluate=1;
								this.commendList=[];
								this.getCommList();
							}
							
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			//是否显示更多简介
			moreContextClick(){
				this.moreContext=!this.moreContext;
				console.log(this.moreContext)
				this.$forceUpdate()
			},
			// 获取视频详情
			getVideoInfo(){
				var data = {
					goods_id:this.options.id
				}
				this.$axios
					.axios('POST', this.$paths.goods_detail, data)
					.then(res => {
						console.log("视频想起个",res,res.code == 10000)
						if (res.code == 10000) {
							this.videoInfo=res.result;
							this.videoInfo.goods_info.mobile_body=this.$tools.formatRichText(res.result.goods_info.mobile_body);
							if(this.videoInfo.goods_info.goods_price>0){
								this.buyvideoalert=true;
								// 付費的話  默认视频
								var now_video=this.now_video;
								now_video.type=2;
								now_video.videourl=this.videoInf.goodscourses_group[0].goodscourses_url;
								now_video.index=0;
								this.now_video=now_video;
							}else{
								// 获取贴片广告
								this.get_adv_video(0);
							}
							//获取推荐视频
							this.goods_list();
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			//-------------
			// 回复弹出弹窗
			commalertClick(item){
				this.commalert=!this.commalert;
				if(this.commalert){
					this.erCommendInfo=item;
					this.getCommListErji(item);
				}else{
					this.erCommendInfo=null;
				}
			},
			// 失去焦点
			focusInputblur(){
				this.commeinptFocus=false;
			},
			// 聊天输入框获取焦点
			focusInput(){
				this.commeinptFocus=true;
				console.log("asd",this.commeinptFocus)
				this.$forceUpdate()
			},
			// 获取键盘高度
			getKeyhieght(){
				wx.onKeyboardHeightChange(res => {
					console.log("键盘高度",res)
				  this.keyheight=res.height
				})
			},
			menuTypeClick(index){
				this.menuType=index;
				if(index==1){
					this.getCommList();
					this.$forceUpdate()
				}
			},
			tobuyvip(){
				if(!this.userInfo){
					this.$tools.showToast("请先登录");
					
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
					},1000)
					
					return false;
				}
				//判断时间
				if(this.ad_time<=0){
					this.videobofang();
				}else{
					//去购买会员
					console.log("去购买会员")
					// uni.navigateTo({
					// 	url:"../buy_vip/buy_vip"
					// })
				}
				
			},
			
			
			// 关闭海报界面
			posterIsClick(index){
				console.log("index",index)
				this.posterIs=false;
			},
			posterIsClick1(){
				this.posterIs=true;
			},
			// 支付界面
			closealert(){
				var res = wx.getSystemInfoSync()
				console.log(res)
				if(res.system.indexOf("iOS")>=0){
						this.tipsIosAlert=!this.tipsIosAlert;
				}else{
					this.$tools.showToast("支付成功");
				}
			},
			//礼物弹窗显示隐藏
			giftIsClick(index){
				console.log("asd",index)
				this.giftIs=!this.giftIs;
			},
			// 赠送礼物
			sendclick(res){
				console.log("礼物详情",res);
			},
			aaaaaa(){},
		}
	}
</script>

<style>
@import url("sport_video.css");
</style>
