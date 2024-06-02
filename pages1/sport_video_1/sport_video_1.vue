<template>
	<view>
		<!-- <video autoplay :src="now_video.videourl" 
		
		
		 
		@ended="ended_video"
		:poster="videoInfo.goods_info.goods_image"
		id="myVideo1"  
		@error="videoerror"
		:custom-cache="true"
		:controls="true"
		:show-fullscreen-btn="now_video.type==2"
		:show-play-btn="now_video.type==2"
		:show-bottom-progress="now_video.type==2"
		:show-center-play-btn="now_video.type==2"
		></video> --> 
		<view class="pore">
			<!-- v-show="now_video.type==1" -->
			<view class="pore topview">
				
				<view class="colonn pore">
					<video
					v-if="now_video.type==1"
					:style="{
					 	'top':now_video.type==1?'0px':'10000px'
					 }"
					 :show-loading="true"
					  style="top: 0rpx;left: 0rpx;" 
					 class="topview poab"
					 :src="now_video.videourl"
					@ended="ended_video"
					codec="software" 
					:poster="videoInfo.goods_info.goods_image"
					id="myVideo1"  
					@error="videoerror"
					@loadedmetadata="loadedmetadata"
					:play-strategy="play_strategy1"
					:controls="false"
					:enable-progress-gesture="false"
					:http-cache="true"
					:show-fullscreen-btn="now_video.type==2"
					:show-play-btn="now_video.type==2"
					:show-bottom-progress="now_video.type==2"
					:show-center-play-btn="now_video.type==2"
					></video>
					
					<!-- 	:poster="videoInfo.goods_info.goods_image" -->
					
						
						<video  class="topview poab"
						 v-show="now_video.type==2"
						:style="{
							 'top':now_video.type==2?'0px':'10000px'
						 }" 
						  style="top: 0rpx;left: 0rpx;"
						 :src="videourl_now" 
						play-strategy="2"
						@ended="ended_video"
						codec="software" 
						:poster="videoInfo.goods_info.goods_image"
						id="myVideo2" 
						@error="videoerror"
						 :show-loading="true"
						:controls="true"
						:show-fullscreen-btn="now_video.type==2"
						:show-play-btn="now_video.type==2"
						:show-bottom-progress="now_video.type==2"
						:show-center-play-btn="now_video.type==2"
						></video>
						
					
				</view>
				
				
				
				
				
			</view>
			
			  
			  
			<!-- <view class="w-750 h-500">
				<bk-video :isAutoPlay="true"
				  :videoUrl ='now_video.videourl' 
				/>
			</view> -->
			
			
			
			<!-- <video autoplay class="topview" src="https://res.oss.zhuyin.club/res/0/87/video/2/202009/16/202009161586-3026.mp4"
			@ended="ended_video"
			codec="software"
			id="myVideo" 
			></video> -->
			<!-- https://res.oss.zhuyin.club/res/0/87/video/2/202107/02/20210702143517-1685.mp4 
			https://res.oss.zhuyin.club/res/0/87/video/2/202009/15/20200915154221-9160.mp4
			-->
			
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
		
		<view class="roww " style="width:690rpx;margin:30rpx;">
			<view class="newUi">{{videoInfo.goods_info.goods_name}}</view>
			<view class="allline"></view>
			<view class="roww" @click.stop="chupinfangIsClick">
				<view class="fs-25" style="color: #999999;"
				>更多介绍</view>
				<!-- jiantousahnhg.png -->
				<image src="/static/xjt.png" v-if="!chupinfangIs" class="w-30 h-35"></image>
				<image src="/static/sjt.png"  v-if="chupinfangIs"  class="w-30 h-35"></image>
			</view>   
		</view>	
		<view class="roww rowsa dianzan w-690 m-left-20 m-top-53" 
		style="color: #999999;">
			<view class="colonn center_center"
			@click.stop="memberthumbsupindex"
			>
				<image src="/static/videoinfo/kanju_07.png" 
				v-if="thumbs_up_status==1"
				class="w-50 h-50 "></image>
				<image src="/static/videoinfo/kanju2_07.png"
				v-else
				class="w-50 h-50 "></image>
				<view class="m-top-10">点赞</view>
			</view>
			<view class="colonn center_center"
			@click.stop="toThumbsUp"
			>
				<image src="/static/videoinfo/kanju2_09.png"
				  v-if="collection_status==1"
				 class="w-50 h-50 "></image>
				 <image src="/static/videoinfo/kanju_09.png"
				   v-else
				  class="w-50 h-50 "></image>
				<view class="m-top-10">收藏</view>
			</view>
			<view class="colonn center_center pore">
				<image src="/static/videoinfo/kanju_11.png" class="w-50 h-50 "></image>
				<view class="m-top-10">分享</view>
				<button
				open-type="share"
				class="poab btnshare"
				></button>
			</view>
			<view class="colonn center_center"
			@click.stop="goods_wxposter"
			>
				<image src="/static/videoinfo/kanju_13.png" class="w-50 h-50 "></image>
				<view class="m-top-10">生成海报</view>
			</view>
		</view>
		<!-- <view class="colonn w-690 m-left-30 m-top-49"
		v-if="chupinfangIs"
		>
		 	<view class="fs-32 font_size7_r">出品方</view>
			<view class="fs-28 m-top-15 lh-40" style="color: #999999;">
				{{videoInfo.store_info.store_name}}
			</view>
		</view> -->
		
		<view class="colonn w-690 m-left-30 m-top-49"
		
		>
		 	<view class="fs-32 font_size7_r">简介</view>
			<view class="fs-28 m-top-15 lh-40" style="color: #999999;">
				<rich-text v-if="chupinfangIs" :nodes="videoInfo.goods_info.mobile_body"></rich-text>
				<rich-text v-else :nodes="videoInfo.goods_info.mobile_body_str" class="txtShowLength1">
					
				</rich-text>
			</view>
		</view>
		
		<view class="h-50"></view>
		<view style="background-color: #f5f5f5" class="w-750 h-15"></view>
		<view class="colonn">
			<view class="roww m-left-36 m-top-42" >
				<view class="colonn center_center m-right-20"
				v-if="menuType==0"
				>
					<view class="xuanhoss">评论</view>
					<view class="pingluline "></view>
				</view>
				<view class="colonn center_center m-right-20"
				v-else
				@click.stop="menuTypeClick(0)"
				>
					<view class="xuanhoss" style="color: #999999;">评论</view>
					<view class="pingluline yincang1"></view>
				</view>
				
				<view class="w-30"></view>
				<view class="colonn center_center"
				v-if="menuType==1"
				>
					<view class="xuanhoss"
					>更多内容</view>
					<view class="pingluline "></view>
				</view>
				<view class="colonn center_center"
				v-else
				
				@click.stop="menuTypeClick(1)"
				>
					<view class="xuanhoss"  style="color: #999999;"
					>更多内容</view>
					<view class="pingluline yincang1"></view>
				</view>
				
			</view>
			
			<view class="colonn  m-left-36 m-top-42"
			v-if="menuType==0"
			v-for="(item,index) in commendList_1" 
			>
				<view class="roww "
				>
					<image class="headimgleft"
						   :src="item.geval_frommemberavatar"></image>
					<view class="colonn">
						<view class="roww center_center">
							<view class="usernamess">{{item.geval_frommembername}}</view>
							<view class="roww leveview center_center"
							v-if="item.geval_frommembernameleve>1"
							>
								<image 
								class="w-40 h-35 pore"
								src="/static/wode_12.png"
								style="top: -3rpx;left:-10rpx;"
								></image>
								<view class="fs-25 lh-30">v{{item.geval_frommembernameleve}}</view>
								<view class="w-20"></view>
							</view>
							<view class="roww leveview center_center"
							style="background: linear-gradient(90deg, #E9E9E9 0%, #C6C6C6 99%);"
							v-else
							>
								<image 
								class="w-40 h-35 pore"
								src="/static/wode_11.png"
								style="top: -3rpx;left:-10rpx;"
								></image>
								<view class="fs-25 lh-30">v{{item.geval_frommembernameleve}}</view>
								<view class="w-20"></view>
							</view>
							
							
							<view class="allline"></view>
						</view>
						<view class="pingjianeirong">
							{{item.geval_content}}
						</view>
						<view class="roww m-top-10 m-left-15">
							<view class="riqitxt">{{item.geval_addtime}}</view>
							<view class="riqitxt font_size7_r m-left-10"
							@click.stop="replyClick(item,index)"
							>回复</view>
						</view>
						
						<!-- v-if="item.commList"
						v-for="(item1,index1) in  item.commList" -->
						
						<block v-if="item.commList">
							
						
						<view class="roww  m-top-25"
						 
						 v-for="(item1,index1) in  item.commList"
						 >
							<image class="w-50 h-50 "
							 :src="item1.geval_frommemberavatar"
							style="background-color: #3A67D8;border-radius: 50%;"></image>
							<view class="colonn">
								<view class="roww center_center h-50 "
								
								>
									<view class="usernamess">{{item1.geval_frommembername}}</view>
									
									<view class="roww leveview center_center"
									v-if="item1.geval_frommembernameleve>1"
									>
										<image 
										class="w-40 h-35 pore"
										src="/static/wode_12.png"
										style="top: -3rpx;left:-10rpx;"
										></image>
										<view class="fs-25 lh-30">v{{item1.geval_frommembernameleve}}</view>
										<view class="w-20"></view>
									</view>
									<view class="roww leveview center_center"
									style="background: linear-gradient(90deg, #E9E9E9 0%, #C6C6C6 99%);"
									v-else
									>
										<image 
										class="w-40 h-35 pore"
										src="/static/wode_11.png"
										style="top: -3rpx;left:-10rpx;"
										></image>
										<view class="fs-25 lh-30">v{{item1.geval_frommembernameleve}}</view>
										<view class="w-20"></view>
									</view>
									
									
									
									<view class="allline"></view>
								</view>
								<view class="pingjianeirong">
									{{item1.geval_content}}
								</view>
								<view class="roww m-top-10 m-left-15">
									<view class="riqitxt">{{item1.geval_addtime}}</view>
								</view>
							</view>
						</view>
						</block>
						<!-- <view class="" v-if="item.commList">
							对的
						</view> -->
						<view class="roww  m-top-25" v-else-if="item.geval_child_list!=null">
							<image class="w-50 h-50 "
							 :src="item.geval_child_list.geval_frommemberavatar"
							style="background-color: #f5f5f5;border-radius: 50%;"></image>
							<view class="colonn">
								<view class="roww center_center h-50 "
								
								>
									<view class="usernamess">{{item.geval_child_list.geval_frommembername}}</view>
									<view class="roww leveview center_center"
									v-if="item.geval_frommembernameleve>1"
									>
										<image 
										class="w-40 h-35 pore"
										src="/static/wode_12.png"
										style="top: -3rpx;left:-10rpx;"
										></image>
										<view class="fs-25 lh-30">v{{item.geval_child_list.geval_frommembernameleve}}</view>
										<view class="w-20"></view>
									</view>
									<view class="roww leveview center_center"
									style="background: linear-gradient(90deg, #E9E9E9 0%, #C6C6C6 99%);"
									v-else
									>
										<image 
										class="w-40 h-35 pore"
										src="/static/wode_11.png"
										style="top: -3rpx;left:-10rpx;"
										></image>
										<view class="fs-25 lh-30">v{{item.geval_child_list.geval_frommembernameleve}}</view>
										<view class="w-20"></view>
									</view>
									<view class="allline"></view>
								</view>
								<view class="pingjianeirong">
									{{item.geval_child_list.geval_content}}
								</view>
								<view class="roww m-top-10 m-left-15">
									<view class="riqitxt">{{item.geval_child_list.geval_addtime}}</view>
								</view>
								<view class="roww zhankaitxt center_center"
								@click.stop="getCommListErji(item,index)"
								>
									<view>----展开{{item.geval_child}}条回复</view>
									<image src="/static/xiajiantou.png"
									class="w-30 h-30"
									></image>
									<view class="allline"></view>
								</view>
								
							</view>
						</view>
						
						
					</view>
					<view class="allline"></view>
				</view>
				
			</view>
			<view
			 class="roww center_center"
			 v-if="commendList_1.length<=0&&menuType==0">
				<null></null>
			</view>
			
			<view  class="huanhang rowsbl "
			v-if="menuType==1"
			style="margin:20rpx 25rpx 0rpx 25rpx;margin-top:30rpx;"
			>
				<view class="videolista rowsa colonn"
				v-for="(item,index) in videoInfo.goodscourses_group"
				style="margin-bottom:15rpx;"
				 @click.stop="videoInfoClick(item,index)"
				>
					<image class="videoimg"
					mode="aspectFill"
					:src="videoInfo.goods_info.goods_image"
					></image>
					<view class="videomanss txtShowLength">{{item.goodscourses_name}}</view>
					<view class="nianyuerr m-top-5 m-bottom-5">{{videoInfo.goods_info.goods_addtime}}</view>
					<view class="roww center_center  m-bottom-11">
						
						<view class="cibofangs roww center_center m-left-28">
						<image src="/static/videoinfo/kanju2_24.png" class="w-15 m-right-10 h-20"></image>
						<view>{{videoInfo.goods_info.goods_click}}次播放</view>
						</view>
						<view class="allline"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="height: 100rpx;"></view>
		<!-- 评价内容 -->
		
		
		<view class="roww background1 width center_center"
		style="padding:20rpx; 20rpx;position: fixed;"
		:style="{
			'bottom':keyheight+'px'
		}"
		v-if="menuType==0"
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
		
		
		
		<view class="center_center colonn huuibeijing"
		v-if="hiabaoIs"
		>
			
			<image
			 class="w-500 h-500" mode="widthFix"
			 :src="haibaoUrl"></image>
			 <view class="roww m-top-30">
			 	<view class="calcel" @click.stop="hiabaoIsClick(1)">取消</view>
			 	<view class="truebtn12"  @click.stop="hiabaoIsClick(2)">保存到相册</view>
			 </view>
		</view>
		<buyvideo v-if="buyvideoalert" 
		@cancle="cancleClick" 
		@toPay="toPay"
		:money="videoInfo.goods_info.goods_price"
		></buyvideo>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videourl_now:"",
				// videourl:"https://sdyygh.oss-cn-beijing.aliyuncs.com/home/appadv/alioss_2022042515521212114.mov",
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
					index:0,//视频下标 默认第一个 广告播放完的视频下标
				},
				ad_time:10,//倒计时
				outInval:null,//倒计时  
				
				videoContext:null,//
				videoContext1:null,
				
				chupinfangIs:false,
				hiabaoIs:false,//海报是否显示
				haibaoUrl:"",
				reply_info:null,//需要回复的评论详情
				reply_index:-1,
				
				play_strategy1:1,//
				advideoloading:false,//广告是否加载完成
			}
		},
		onLoad(options) {
			this.options=options;
			if(options.scene){
				this.options.id=options.scene;
			}
			
			// 获取键盘高度
			this.getKeyhieght();
			// 获取视频详情
			this.getVideoInfo();
			//获取评价
			this.getCommList();
		},
		onShow() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
				this.getIsCollection();
				// 获取点赞状态
				this.get_memberthumbsupindex();
			}
		},
		onReachBottom() {
			if(this.menuType==0){
				this.getCommList();
			}else if(this.menuType==1){
				
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo1')
			this.videoContext1 = uni.createVideoContext('myVideo2')
		},
		onUnload() {
			clearInterval(this.outInval)
		},
		onShareAppMessage () {
		        return {
		            title: this.videoInfo.goods_info.goods_name,
		            imageUrl:this.videoInfo.goods_info.goods_image,
		            path: '/pages1/sport_video_1/sport_video_1?id='+this.options.id
		 
		        }
		 
		    },
			
			onShareTimeline: function () {
			     return {
			  title: this.videoInfo.goods_info.goods_name,
			  imageUrl:this.videoInfo.goods_info.goods_image,
			  path: '/pages1/sport_video_1/sport_video_1?id='+this.options.id
			     }
			 },
		methods: {
			loadedmetadata(res){
				// 加载广告解雇
				console.log("广告架子啊结果",res);
				this.advideoloading=true;
			},
			videoerror(res){
				console.log("视频播放",res)
			},
			// 支付
			toPay(){
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
					quantity:"1",//	1	是	int	数量
					buyer_msg:"栏目视频支付",//		否	string	买家留言
					rcb_pay:"",//		否	int	使用充值卡支付0是/1否
					pd_pay:'',//		否	int	使用预存款支付0是/1否
				}
				this.$axios
					.axiosDate('POST', this.$paths.buy_step2, data)
					.then(res => {
						
						uni.hideLoading()
						if (res.code == 10000) {
							console.log("支付信息",res);
							this.getPayData(res.result.order_sn);
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 获取支付参数
			getPayData(pay_sn){  
				var data={
					pay_sn:pay_sn,
					'openid':uni.getStorageSync("openid")
				}
				this.$axios
					.axiosDate('POST', this.$paths.video_payMembervrbuy, data)
					.then(res => {
						uni.hideLoading()
						if (res.code == 10000) {
							console.log("支付信息",res);
							this.toWxpay(res.result);
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			toWxpay(data){
				wx.requestPayment({
				  timeStamp:data.timeStamp,
				  nonceStr: data.nonceStr,
				  package:data.package,
				  signType: data.signType,
				  paySign:data.paySign,
				  success: (res)=> {
					this.buyvideoalert=false;
					this.videoInfo.goods_info.if_have_buy==1;
					 this.videobofang();
				  },
				  fail (res) { 
					  this.buyvideoalert=true;
					 
				  },
				  complete:(res)=> {
				  	console.log("微信支付结果",res)
				  }
				})
			},
			
			// 回复
			replyClick(item,index){
				this.reply_index=index;
				this.reply_info=item;
				this.commeinptFocus=true;
			},
			
			chupinfangIsClick(){
				this.chupinfangIs=!this.chupinfangIs;
			},
			hiabaoIsClick(index){
				if(index==1){
					this.hiabaoIs=false;
				}else{
					let imgSrc = this.haibaoUrl;  //要保存的图片url
						    console.log(imgSrc)
						    uni.showLoading({
						      title: '保存中...'
						    })
						    uni.downloadFile({    //下载文件资源到本地
						      url: imgSrc,
						      success:  (res)=> {
						        console.log(res);
						        //图片保存到本地
						        uni.saveImageToPhotosAlbum({
						          filePath: res.tempFilePath,
						          success:  (data)=> {
						            uni.hideLoading()
						            uni.showToast({
						              title: '保存成功',
						              icon: 'success',
						              duration: 2000
						            })
									this.hiabaoIs=false;
						          },
						          fail: function (err) {
						            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
						              console.log("当初用户拒绝，再次发起授权")
						              uni.showModal({
						                title: '提示',
						                content: '需要您授权保存相册',
						                showCancel: false,
						                success: modalSuccess => {
						                  uni.openSetting({
						                    success(settingdata) {
						                      console.log("settingdata", settingdata)
						                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
						                        uni.showModal({
						                          title: '提示',
						                          content: '获取权限成功,再次点击图片即可保存',
						                          showCancel: false,
						                        })
						                      } else {
						                        uni.showModal({
						                          title: '提示',
						                          content: '获取权限失败，将无法保存到相册哦~',
						                          showCancel: false,
						                        })
						                      }
						                    },
						                    fail(failData) {
						                      console.log("failData", failData)
						                    },
						                    complete(finishData) {
						                      console.log("finishData", finishData)
						                    }
						                  })
						                }
						              })
						            }
						          },
						          complete(res) {
						            console.log(res);
						            uni.hideLoading()
						          }
						        })
						      }  
						    })
					
				}
			},
			// 获取分像海报
			goods_wxposter(){
				uni.showLoading({
					title:"海报生成中"
				})
				
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
					page:"pages1/sport_video_1/sport_video_1",//	packages/album/pages/content	是	string	根路径
					scene:this.options.id,//	id=147286	是	string	参数
				}
				
				this.$axios
					.axiosDate('POST', this.$paths.goods_wxposter, data)
					.then(res => {
						uni.hideLoading()
						if (res.code == 10000) {
							console.log("海报",res);
							this.haibaoUrl=res.result.goods_poster
							this.hiabaoIs=true;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 集数点击
			videoInfoClick(item,index){
				clearInterval(this.outInval)
				if(this.videoInfo.goods_info.if_have_buy==1){
					console.error("支付过了");
					this.videourl_now=item.goodscourses_url;
					//付费的话直接播放  
					var now_video={
						index:index,
						type:2,
						videourl:item.goodscourses_url
					}
					this.now_video=now_video;
					this.videobofang();
				}
				else if(this.videoInfo.goods_info.if_have_buy==0&&this.videoInfo.goods_info.goods_original_price>0){
					this.buyvideoalert=true;
				}
				else {
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
				this.videoContext1.play();
				this.videoContext1.seek(0);
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
				console.log("a开始广告倒计时",this.ad_time)
				clearInterval(this.outInval);
				this.outInval=setInterval(res=>{
					if(this.ad_time<0){
						console.log("开始正式视频播放")
						clearInterval(this.outInval);
					}else{
						this.ad_time=this.ad_time-1;
						console.log("a开始广告倒计时",this.ad_time)
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
							// this.guanggaozhihouplay(res);
							this.ad_time=res.result.time
							// this.ad_time=5;
							this.ad_videos=res;
							// 视频广告设置
							var now_video=this.now_video;
							now_video.type=1;
							
							// var adUrl=uni.getStorageSync("adUrl")
							// if(adUrl){
							// 	now_video.videourl=adUrl;
							// }else{
							// 	now_video.videourl=res.result.url;
							// }
							now_video.videourl=res.result.url;
							
							now_video.index=index;
							this.now_video=now_video;
							this.startAd();//开启广告倒计时
							this.videoContext1.stop();
							
							setTimeout(res=>{
								this.videoContext.stop();
								this.videoContext.seek(0);
								this.videoContext.play();
							},1000)
							
							
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			// 广告之后播放
			guanggaozhihouplay(res){
				
				
				
				
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
				}else if(res.index==2){
					this.$tools.showToast("暂不接受IOS支付");
				}
				else
				{
					
					
					this.$tools.showToast("未支付不能看");
					this.now_video.videourl="";
					this.buyvideoalert=false;
					this.videoContext.stop();
					this.videoContext1.stop();
					// this.buyvideoalert=true;
				}
			},
			
			//获取二级评论
			getCommListErji(item,index){
				console.error("EEID",item,index)
				var data={
					goods_id:this.options.id,//	1	是	int	商品（视频）ID
					page:'1',//		否	int	当前页码，默认为1
					per_page:"1000",//		否	int	每页显示数量，默认为10
					geval_id:item.geval_id
				}
				this.$axios
					.axios('POST', this.$paths.goods_evaluatelist, data)
					.then(res => {
						console.error("asdasdsad",res.code == 10000,this.reply_index)
						if (res.code == 10000) {
							this.commendListEr=res.result.evaluate_list;
							var commendList_1=this.commendList_1;
							commendList_1[index].commList=this.commendListEr;
							this.commendList_1=commendList_1;
							console.error("评价列表",this.commendList_1);
						} else {
							this.$tools.showToast(res.message);
						}
						// this.reply_index=-1;
						// this.reply_info=null; 
					})
					.catch(err => {
						console.log("报错了",err)
					});
			},
			// 获取点赞状态
			get_memberthumbsupindex(){
				console.log('!this.userInfo',this.userInfo)
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
					.catch(err => {
						console.log("店在",err);
					});
			},
			// 添加点赞 memberthumbsupindex
			memberthumbsupindex(){
				if(!getApp().isLogin()){
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
				if(!getApp().isLogin()){
					return false;
				}
				console.log('this.thumbs_up_status',this.collection_status)
				if(this.collection_status==1){
					console.log("取消收藏")
					this.calcelCang();
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
			// 取消收藏
			calcelCang(){
				var data={
					goods_id:this.options.id,//	15	是	string	视频ID
					fav_type:"goods",//	goods	否	string	收藏类型，‘goods’商品或视频，‘store’直播间，默认”goods”
				}
				this.$axios
					.axiosDate('POST', this.$paths.favorites_del, data)
					.then(res => {
						if (res.code == 10000) {
							this.collection_status=0;
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
						if (res.code == 10000) {
							
							var newCOmmendList1=res.result.evaluate_list;
							this.page_evaluate=this.page_evaluate+1;
							var commendList_1=this.commendList_1;
							this.commendList_1=commendList_1.concat(newCOmmendList1);
							
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
				if(!getApp().isLogin()){
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
				if(this.reply_info){
					data.geval_id=this.reply_info.geval_id;
				}
				this.$axios
					.axiosDate('POST', this.$paths.add_evaluate, data)
					.then(res => {
						if (res.code == 10000) {
							this.$tools.showToast("评价成功");
							this.commtxt="";
							console.log(this.reply_index,this.reply_info)
							if(this.reply_info){
								
								
								this.getCommListErji(this.reply_info,this.reply_index);
							}else{
								
								this.page_evaluate=1;
								this.commendList_1=[];
								this.$forceUpdate()
								this.getCommList();
							}
							setTimeout(res=>{
								this.reply_info=null;
								this.reply_index=-1;
							},300)
							
							
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
						console.log("asdas",err)
					});
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
					goods_id:this.options.id,
				}
				this.$axios
					.axios('POST', this.$paths.goods_detail, data)
					.then(res => {
						console.log("视频想起个",res,res.code == 10000)
						if (res.code == 10000) {
							
							this.videoInfo=res.result;
							//解析富文本带图片问题
							this.videoInfo.goods_info.mobile_body=this.$tools.formatRichText(res.result.goods_info.mobile_body);
							
							this.videoInfo.goods_info.mobile_body_str=this.getText(this.videoInfo.goods_info.mobile_body);
							
							
							// if_have_buy==0是未支付
							if(this.videoInfo.goods_info.if_have_buy==0){
						
								this.buyvideoalert=true;
								// 付費的話  默认视频
								var now_video=this.now_video;
								now_video.type=2;
								now_video.videourl=this.videoInfo.goodscourses_group[0].goodscourses_url;
								now_video.index=0;
								this.now_video=now_video;
								
								uni.setNavigationBarTitle({
									title: this.videoInfo.goods_info.goods_name
								});
							}else{
								// 获取贴片广告
								this.get_adv_video(0);
							}
							this.videourl_now=this.videoInfo.goodscourses_group[0].goodscourses_url;
							uni.setNavigationBarTitle({
								title:this.videoInfo.goods_info.goods_name,
								complete:res=>{
								}
							})
							
							//获取推荐视频
							this.goods_list();
						} else {
							this.$tools.showToast(res.message);
						}
					})
					
					.catch(err => {
						console.log("包错报错",err);
					});
			},
			
			
			getText(str) {
				return str
				.replace(/<[^<>]+>/g, "")
				.replace(/&nbsp;/gi, "");
			},
			
			//-------------
			// 回复弹出弹窗
			commalertClick(item){
				this.commalert=!this.commalert;
				if(this.commalert){
					this.erCommendInfo=item;
					this.getCommListErji(item,this.reply_index);
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
				
				//判断时间
				if(this.ad_time<=0){
					this.videobofang();
				}else{
					if(!getApp().isLogin()){
						return false;
					}
					//去购买会员
					var userInfo=this.userInfo;
					if(userInfo.level>=2){
						this.videobofang();
					}else{
						console.log("去购买会员")
						uni.navigateTo({
							url:"../buy_vip_1/buy_vip_1"
						})
					}
					
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
@import url("sport_video_1.css");
</style>
