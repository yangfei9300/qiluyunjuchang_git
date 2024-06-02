<template>
	<view >   
		<view class="colonn"
		
		:style="{
			'background-color':activityConfig.voteBackgroundColor
		}"
		>
			
			<!-- <image src="https://play.zsyflive.com/sv/26f36625-182edfd9430/26f36625-182edfd9430.mp4?spm=qipa250&x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast"></image> -->
			
			<view class="topview roww center_left33"
			:style="{
				'background-image':'url('+activityInfo.coverImage+')',
					'background-size':'100% 100%'
			}"
			>
				<block v-if="activityInfo.classification==1">
					<live-player class="w-700 h-500 m-top-40 br-20" 
					autoplay  
					@statechange="statechange"
					@netstatus="netstatus"
					@error="error" 
					:src="activityInfo.bannerVideo">
					<image v-if="loading" src="../../static/p10.png" class="w-700 h-500"></image>
					</live-player>
				</block>
				<block v-if="activityInfo.classification==2">
					<video :title="activityInfo.title" 
					:poster="activityInfo.bannerVideo+'?spm=qipa250&x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast'"
					:src="activityInfo.bannerVideo" 
					autoplay   
					class="w-700 h-500 m-top-40 br-20" autoplay
					></video>   
				</block>
				<block v-if="activityInfo.classification==3">
					<swiper autoplay class="w-700 h-500 m-top-40" >
						<swiper-item class="w-700 h-500" v-for="(item,index) in activityInfo.bannerImage">
							<image class="w-700 h-500 br-20" 
							@click.stop="showimgss(activityInfo.bannerImage,index)"
							lazy-load :src="item" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</block>
			</view>  
			
			<view class=" p-left-0 p-right-0 p-top-20 p-bottom-0" v-if="activityInfo.notice&&activityInfo.notice!=''" >
				<uni-notice-bar show-icon scrollable
				 :speed="speed"
				 :backgroundColor="activityConfig.scrollBackgroundColor"
				 :color="activityConfig.scrollFontColor"
				 :text="activityInfo.notice" />
				 <!-- backgroundColor="red" -->
				 
			</view>
			<view class="toupianview colonn m-top-25  m-bottom-35 m-left-30">
				<view class="h-37"></view>
				<view class="roww rowsa center_center">
					<view class="huodongguize"
					 :style="{
					 	'background-color':activityConfig.ruleButtonColor
					 }"
					 @click.stop="moreMenuCLick(1)">活动规则</view>
					<view class="hongxian"></view>
					<view class="huodongguize"
					 :style="{
					 	'background-color':activityConfig.ruleButtonColor
					 }"
					 @click.stop="moreMenuCLick(2)">投票排行榜</view>
				</view>   
				<view class="roww center_center m-top-15 m-bottom-35">
					<image src="/static/shjian.png" class="dingshi"></image>
					
					<countdown-timer ref="countdown" :time="time" @finish="onFinish" autoStart>
					<template v-slot="{day, hour, minute, second, remain, time}">
					<view class="roww center_center fs-25">
						<view>本次活动于</view>
						<view class="tianview">{{day}}</view>
						<view>天</view>
						<view class="tianview">{{hour}}</view>
						<view>时</view>
						<view class="tianview">{{minute}}</view>
						<view>分</view>
						<view class="tianview">{{second}}</view>
						<view>秒后
						<block v-if="activityStatus==1">开始</block>
						<block v-else>结束</block>
						</view>
					</view>
					</template>
					
					
					</countdown-timer>
					
					
					
					
					
				</view>
			</view>
			
			<view class="roww">
				<view class="colonn w-187 center_center"
				@click.stop="menuType(1)"
				>
					<view class="xuanshoutongdaonosel"
					:style="{
						'color':type==1?activityConfig.playerChannelChecked:activityConfig.playerChannelUnchecked
					}"  
					>选手通道</view>
					<view class="xuanshoutongdaosel"
					:style="{
						'background-color':type==1?activityConfig.playerChannelChecked:''
					}"  
					> </view>    
				</view>
				<view class="colonn w-187 center_center"
				@click.stop="menuType(2)">
					<view class="xuanshoutongdaonosel"
					:style="{
						'color':type==2?activityConfig.playerChannelChecked:activityConfig.playerChannelUnchecked
					}"  
					>展演介绍</view>
					<view class="xuanshoutongdaosel"
					:style="{
						'background-color':type==2?activityConfig.playerChannelChecked:''
					}"
					> </view>    
				</view>
				<view class="colonn w-187 center_center"
				@click.stop="menuType(3)">
					<view class="xuanshoutongdaonosel"
					:style="{
						'color':type==3?activityConfig.playerChannelChecked:activityConfig.playerChannelUnchecked
					}" 
					>人气奖励</view>
					<view class="xuanshoutongdaosel"
					:style="{
						'background-color':type==3?activityConfig.playerChannelChecked:''
					}"
					> </view>    
				</view>
				<view class="colonn w-187 center_center"
				@click.stop="menuType(4)">
					<view class="xuanshoutongdaonosel"
					:style="{
						'color':type==4?activityConfig.playerChannelChecked:activityConfig.playerChannelUnchecked
					}"  
					>
					<block v-if="userSignInfo">
						更换照片
					</block>
					<block v-else>
						参与报名
					</block>
					</view>
					<view class="xuanshoutongdaosel"
					:style="{
						'background-color':type==4?activityConfig.playerChannelChecked:''
					}"
					> </view>    
				</view>
			</view>
			<block v-if="type==1">
				<view class="colonn">
					<view class="roww rowsa m-top-35 m-bottom-15">
						<view
						@click.stop="peopleTypeCLick(1)"
							:class="{
								'cansailiebiao':peopleType==1,
								'cansailiebiao1':peopleType==2
							}"
							:style="peopleType==1?jianbianBtnColor:'background:'+activityConfig.listBackgroundUnchecked"
						>参赛列表</view>
						<view 
						@click.stop="peopleTypeCLick(2)"
							:class="{
								'cansailiebiao':peopleType==2,
								'cansailiebiao1':peopleType==1
							}"		:style="peopleType==2?jianbianBtnColor:'background:'+activityConfig.listBackgroundUnchecked"
					
						>人气排行</view>
					</view>
					<block v-if="isshowPeoples">
						<toupiao
						 :jianbianBtnColor="jianbianBtnColor"
						 :searchBoxBackground="activityConfig.searchBoxBackground"
						 :searchButtonBackground="activityConfig.searchButtonBackground"
						 v-if="peopleType==1&&activityInfo.id" :activityid="activityInfo.id"></toupiao>  
						<toupiao_paihangbang v-if="peopleType==2&&activityInfo.id"  :activityid="activityInfo.id"></toupiao_paihangbang>
										
					</block>
					
				</view>
			</block>  
			<block v-if="type==2">
				<image 
				@click.stop="showimg(activityInfo.activityRule)"
				:src="activityInfo.activityRule" class="w-710" style="margin:20rpx;" mode="widthFix"></image>
			</block>
			<block v-if="type==3">
			  	<image 
				@click.stop="showimg(activityInfo.awardDescription)"
				:src="activityInfo.awardDescription" class="w-710" style="margin:20rpx;" 
				mode="widthFix"></image>
			</block>  
			<block v-if="type==4">
			  	<toupiao_baoming 
				  :jianbianBtnColor="jianbianBtnColor"
				 v-if="type==4&&activityInfo.id"  :activityid="activityInfo.id"></toupiao_baoming>
			</block>
			<view class="h-40"></view>
		</view>
		
		<view class="huuibeijing bottom" catchtouchmove="preventTouchMove" v-if="liwuShow">
			<view style="width: 750rpx;position: absolute;bottom: 0rpx;" class="colonn center_center">
				<image src="/static/guabibi.png" @click.stop="liwuShowClick" class="w-70 h-70 m-bottom-25"></image>
				<view class="background1" >
					<swiper class="swierimv background1" >
						<swiper-item class="swierimv" v-for="(item,index) in 3">
							<view class="h-30"></view>
							<view class="huanhang " >
								<view class="colonn m-bottom-20 center_center w-187" v-for="(item,index ) in 8">
									<image src="https://shandongtibohui.zsyflive.com/profile/qlyjc/gift1.png" class="liwuiocon"></image>
									<view class="fs-30 w-150 text_align1_r txtShowLength">嘉年华</view>
									<view class="fs-25">￥20</view>
								</view>
							</view>   
							<view class="h-30"></view>
						</swiper-item>
					</swiper>
					<view class="roww center_center p-all-25 fs-30">
						<view>请选择</view>
						<view class="allline"></view>
						<view class="zengsongsa">赠送</view>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>
<script>
	
	export default {
	    components: {
	    },
		data() {
			return {
				videoUrl:"https://play.zsyflive.com/sv/568bb907-182c8a45801/568bb907-182c8a45801.mp4",
				liwuShow:false,
				speed:50,
				type:1,
				peopleType:1,//人展示类型1参赛列表2排行榜
				guize:"",
				options:{},
				activityInfo:{},
				BASE_IMG1:"",
				loading:true,//直播是否在加载中
				// 倒计时
				time: 0,
				userSignInfo:null,
				activityStatus:3,//1未开始2进行中3是已结束
				activityConfig:{},//活动配置
				
				jianbianBtnColor:"",//渐变按钮背景颜色
				
				isshowPeoples:true,//是否显示排行榜以及会员列表
			}
		},
		onLoad(options) {
			this.BASE_IMG1=this.$paths.BASE_IMG1;
			if(options.scene){
				options.id=options.scene;
			}
			this.options=options;
			this.getActivityInfo();
			this.configActivity();
		},
		onShow(){
			this.getBaomingInfgo();
			this.isshowPeoples=!this.isshowPeoples;
			setTimeout(res=>{
				this.isshowPeoples=!this.isshowPeoples;
			},100)
			
		},
		//父组件页面
		onReachBottom() {
			if(this.type==1&&this.peopleType==1){
				console.log("学员报名触底函数")
				uni.$emit('onReachBottom');
			}else{
				console.log("排行榜触底")
				uni.$emit('onReachBottom');
			}
		        
		},
		onShareAppMessage () {
		        return {
		            title: this.activityInfo.title,
		            imageUrl:this.activityInfo.shareImg,
		            path: '/pages3/sign_vote/sign_vote?id='+this.options.id
		        }
		},
		methods: {
			
			// 活动配置表 
			configActivity(){
				var  data={};
				data.activityId=this.options.id;
				this.$axios
					.axios('POST', this.$paths.configActivity, data)
					.then(res => {
						if (res.code == 200) {
							if(res.data.length>0){
								this.activityConfig=res.data[0];
								this.jianbianBtnColor='background:linear-gradient(-90deg, '+this.activityConfig.listBackgroundCkeckedShort+' 0%, '+this.activityConfig.listBackgroundCkeckedDeep+' 100%)';  
							}
						} else {
							// this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			
			
			statechange(res){
				console.log("statechangestatechange",res.detail.code == 2004,res)
				if (res.detail.code == 2004) {
									var that = this;
									that.loading = false;
								}
			
			},
			
			// 显示多张图片
			showimgss(img,index){
				uni.previewImage({
							urls: img,
							current:index,
							longPressActions: {
								
							}
						});
			},
			// 显示图片
			showimg(img){
				uni.previewImage({
							urls: [img],
							current:0,
							longPressActions: {
								
							}
						});
			},
			// 获取报名信息
			getBaomingInfgo(){
				var userInfo=uni.getStorageSync("userInfo")
				if(!userInfo){
					return false;
				}
				var  data={};
				data.memberId=userInfo.member_id;
				data.activityId=this.options.id;
				this.$axios
					.axios('POST', this.$paths.infoPlayer, data)
					.then(res => {
						if (res.code == 200) {
							if(res.data.length>0){
								this.userSignInfo=res.data[0];
							}
						} else {
							// this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 倒计时开始
			onFinish(type) {
				
				// this.activityInfo.startTime=this.activityInfo.startTime.replaceAll("-","/");
				// this.activityInfo.endTime=this.activityInfo.endTime.replaceAll("-","/");
				console.log("asdasd",this.activityInfo.startTime,this.activityInfo.endTime)
				
				var startTime=new Date(this.activityInfo.startTime).getTime()/1000;
				var endTime=new Date(this.activityInfo.endTime).getTime()/1000;
				var nowtime=new Date().getTime()/1000+4;
				console.log('nowtime>=startTime&&nowtime<endTime',nowtime,startTime,endTime)
				if(nowtime>endTime){
					if(!type){
						uni.showToast({
							icon: 'none',
							title: '活动结束'
						})
					}
					console.log("1111111")
					this.activityStatus=3;
				}else if(startTime<nowtime&&nowtime<endTime){
					if(!type){
						uni.showToast({
							icon: 'none',
							title: '活动开始'
						})
					}
					this.time=parseInt((endTime-nowtime)*1000);
					this.activityStatus=2;
					console.log("22222")
				}else if(nowtime<startTime){
					this.time=parseInt( (startTime-nowtime)*1000);
					console.log("33333",this.time)
				}
				this.panduanStatus();
			},
			fillWithZero(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},   
			// 倒计时结束
			
			// 获取活动详情
			getActivityInfo(){
				var data = {
					id:this.options.id
				}
				this.$axios
					.axios('POST', this.$paths.listActivity, data)
					.then(res => {
						if (res.code == 200) {
							if(res.data.length>0){
								this.activityInfo=res.data[0];
								uni.setNavigationBarTitle({
									title:this.activityInfo.title
								})
								this.onFinish("info");
								
								if(this.activityInfo.classification==3){
									this.activityInfo.bannerImage=this.activityInfo.bannerImage.split(",");
								}
							}else{
								this.$tools.showToast("无此活动");
								setTimeout(res=>{
									uni.reLaunch({
										url:"/pages/index_1/index_1"
									})
								},1000)
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 判断活动状态
			panduanStatus(){
				var startTime=new Date(this.activityInfo.startTime).getTime();				var endTime=new Date(this.activityInfo.endTime).getTime();				var nowtime=new Date().getTime();
				if(nowtime<startTime){
					this.activityStatus=1;
				}else if(nowtime>=startTime&&nowtime<endTime){
					this.activityStatus=2;
				}else{
					this.activityStatus=3;
				}
				console.log("当前时间状态",this.activityStatus)
			},
			
			
			
			liwuShowClick(){
				this.liwuShow=!this.liwuShow;
			},
			moreMenuCLick(type){
				if(type==1){
					this.type=2;
				}else{
					this.type=1;
					this.peopleType=2
				}
			},
			menuType(index){
				this.type=index;
			},
			peopleTypeCLick(index){
				this.peopleType=index;
			},
			 preventTouchMove() 
			  { },
		}
	}
</script>

<style>
@import url(vote.css);
</style>
