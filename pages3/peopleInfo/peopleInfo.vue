<template>
	<view
	:style="{
		background:activityConfig.voteBackgroundColor
	}"
	>
		<scroll-view scroll-y style="height: 100vh;">
			<view 
			:style="{
				background:activityConfig.voteBackgroundColor
			}"
			>
				<view class="h-30"></view>
				<view class="yonfghuvie colonn center_center">
					<view class="h-30"></view>
					<view class="roww w-644 p-all-15 center_center allline fs-25">
						<image src="/static/peiee.png" class="renicon"></image>
						<view>{{userInfo_activity.playerName}}</view>  
						<view  class="allline"></view>
						
						<block v-if="userInfo_activity.votes">
							<image src="/static/renqiqi.png" class="renicon"></image>
							<view>{{userInfo_activity.votes}}</view>
						</block>
						
						<block v-if="userInfo_activity.params&&userInfo_activity.params.orderNo">
							<view class="w-25"></view>
							<image src="/static/paihangbss.png" class="renicon"></image>
							<view>{{userInfo_activity.params.orderNo}}</view>
						</block>
					</view>
					<view class="w-644 p-all-15" v-if="userInfo_activity.params&&userInfo_activity.params.afterVote">
						<view class="fs-35">比后一名多<text class="fw-b">{{userInfo_activity.params.afterVote}}</text>人气</view>
					</view>
					<view class="w-644 p-all-15" v-if="userInfo_activity.params&&userInfo_activity.params.frontVote">
						<view class="fs-35">比前一名少<text class="fw-b">{{userInfo_activity.params.frontVote}}</text>人气</view>
					</view>
					<view class="h-30"></view>
					<view class="roww center_center"><view class="baominganniu"
					  :style="jianbianBtnColor"
					 @click.stop="votePlayer">为Ta助力</view></view>
					<view class="h-30"></view>
					<video autoplay v-if="userInfo_activity.playerVideo"
					class="w-644 br-15 m-top-20 m-bottom-20 h-350" :poster="userInfo_activity.playerVideo+'?spm=qipa250&x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast'"
					:src="userInfo_activity.playerVideo"></video>
					<view class="colonn center_center">  
						
						<image class="peopleimg"  lazy-load  @click.stop="showimg(index)" 
						v-for="(item,index) in userInfo_activity.image" 
						mode="widthFix" 
						:src="item+'?x-oss-process=style/tp_zishiyong'"></image>
						<view class="h-15"></view>  
					</view>
					<view class="h-70"></view>
					<view class="roww center_center"><view class="baominganniu"
					 :style="jianbianBtnColor"
					 
					 @click.stop="votePlayer">为Ta助力</view></view>
					<view class="h-70"></view>
				</view>
				<view class="pemenuivo colonn">
					<image src="https://shandongtibohui.zsyflive.com/profile/qlyjc/icon16.png" class="youxaijiaos1"  @click.stop="totoupiao"></image>
					<image src="https://shandongtibohui.zsyflive.com/profile/qlyjc/icon17.png" class="youxaijiaos" v-if="userInfo_activity.posterImage"  @click.stop="erweimaClicl"></image>
					<view class="w-140 h-140 roww center_center m-right-10"
					 @click.stop="liwuShowClick"
					>
						<view class="colonn center_center w-105 h-105" style="box-shadow: 0 0 20rpx 4rpx rgba(153, 153, 153, 0.5);border-radius: 50%;background-color: rgba(255, 255, 255, 0.5);">
							<image src="/static/liwumenu.png" class="w-50 h-50 " style="opacity: 0.8;"     ></image>
							<view style="color: #FE7F47;font-size: 17rpx;">赠送礼物</view>
						</view>
					</view>
				</view>
			
				  
				<view class="colonn huuibeijing center_center " v-if="erweima"
				@click.stop="erweimaClicl"
				>
					<view class="w-600 pore"
						@click.stop="aaaa"
					>
						<image :src="userInfo_activity.posterImage" 
						class="w-600" mode="widthFix"></image>
						<view class="erweimass roww center_center poab" style="top: 5rpx;right: 10rpx;">
							<image @click.stop="erweimaClicl"
							src="/static/yuyinguanb.png" class="w-40 h-40 "></image>
						</view>
						
					</view>
					
					<view class="roww center_center"
					><view class="baominganniu1" 
					@click.stop="downLoadImg(userInfo_activity.posterImage)">点击下载</view></view>
				</view>
				
				<!-- 送礼物 -->
				<view class="huuibeijing bottom" catchtouchmove="preventTouchMove" v-if="liwuShow"
				
				>
					<view style="width: 750rpx;position: absolute;bottom: 0rpx;" class="colonn center_center"
					@click.stop="aaaa"
					>
						<image src="/static/guabibi.png" @click.stop="liwuShowClick" class="w-70 h-70 m-bottom-25"></image>
						<view class="background1 colonn" >
							<view class="roww center_center fs-30 fw-b w-710 p-top-20 " style="color: #FE7F47;">
								<view class="w-20"></view>
								<view style="color: black;">金币余额：<text>{{jinbiyue}}</text></view>
								<view class="allline"></view>
								<view @click.stop="tojilu(1)">充值记录</view>
								<view @click.stop="tojilu(2)" style="margin-left:15rpx;">赠送记录</view>
							</view>
							<swiper class="swierimv background1" >
								<swiper-item class="swierimv" v-for="(item,index) in giftList">
									<view class="h-30"></view>
									<view class="huanhang " >
										<view class="colonn m-bottom-20 center_center w-187" v-for="(item1,index1) in item"
										@click.stop="selGiftClick(item1)"
										>   
											<image :src="item1.image+'?x-oss-process=style/tpgift'" class="liwuiocon"></image>
											<view class="fs-28 w-150 text_align1_r m-top-10 m-bottom-10 txtShowLength">{{item1.giftName}}</view>
											<view class="fs-25">{{item1.price}}金币</view>
										</view>
									</view>   
									<view class="h-30"></view>
								</swiper-item>
							</swiper>   
							<view class="roww center_center p-all-25 fs-30">
								<view v-if="selGift.id" class="txtShowLength w-450">赠送
								<text style="color: #FE7F47;font-weight: bold">{{selGift.giftName}}</text>
								增加
								<text style="color: #FE7F47;font-weight: bold">{{selGift.votes}}</text>
								助力值</view>
								<view v-else>请选择</view>
								<view class="allline"></view>
								<view class="zengsongsa" @click.stop="toDashang">赠送</view>
								<view class="w-30"></view>
								<view class="zengsongsa" @click.stop="toPageRange">充值</view>
							</view>
						</view>
					</view>
				</view>
				<view class="h-25"></view>
			</view> 
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo_activity:{},
			options:{},
			liwuShow:false,//礼物对话框是否显示
			giftList:[],//礼物列表
			selGift:{},//选中的礼物
			imgUrl:"",
			erweima:false,
			jinbiyue:0,
			activityConfig:{},
			jianbianBtnColor:"",
			
			
			haibao:"",
			renzhapin:''
		};
	},
	onLoad(options) {
		this.imgUrl=this.$paths.BASE_IMG1;
		if(options.scene){
			options.id=options.scene;
		}
		this.options=options;
		this.getPeopleInfo();
		this.getgiftList();
		this.configActivity()
	},
	onShow() {
		this.getJinbiYue();
	},
	onShareAppMessage () {
	        return {
	            title: "为"+this.userInfo_activity.playerName+"投票吧",
	            imageUrl:this.userInfo_activity.image[0],
	            path: '/pages3/peopleInfo/peopleInfo?id='+this.options.id
	        }
	},
	methods: {
		
		
		// 活动配置表
		configActivity(){
			var  data={};
			data.activityId=this.userInfo_activity.activityId;
			this.$axios
				.axios('POST', this.$paths.configActivity, data)
				.then(res => {
					if (res.code == 200) {
						if(res.data.length>0){
							this.activityConfig=res.data[0];
						this.jianbianBtnColor='background:linear-gradient(-90deg, '+this.activityConfig.listBackgroundCkeckedShort+' 0%, '+this.activityConfig.listBackgroundCkeckedDeep+' 100%)'; }
					} else {
						// this.$tools.showToast(res.msg);
					}
				})
				.catch(err => {});
		},
		
		//获取金币余额
		getJinbiYue(){
			var userInfo=uni.getStorageSync("userInfo");
			if(!userInfo){
				// this.$tools.showToast("请先登录");
				// setTimeout(res=>{  
				// 	uni.reLaunch({
				// 		url:"/pages2/login/login"
				// 	})
				// },1000)
				return false;
			}
			var data={
				memberId:userInfo.member_id
			}
			this.$axios
				.axios('POST', this.$paths.balancepay, data)
				.then(res => {
					if (res.code == 200) {
						this.jinbiyue=res.data.coinsBalance;
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch(err => {});
		},
		// 前往记录界面
		tojilu(index){
			uni.navigateTo({
				url:"/pages3/payorderlog/payorderlog?type="+index
			})
		},
		// 前往充值界面
		toPageRange(){
			console.log("”手机型号",uni.getSystemInfoSync().platform )
			if(uni.getSystemInfoSync().platform == 'ios'){
				this.$tools.showToast("苹果暂时不支持充值");
				return false;
			} 
			uni.navigateTo({
				url:"/pages3/recharge/recharge"
			})
		},
		// 打赏
		toDashang(){
			var userInfo=uni.getStorageSync("userInfo");
			if(!userInfo){
				this.$tools.showToast("请先登录");
				setTimeout(res=>{  
					uni.reLaunch({
						url:"/pages2/login/login"
					})
				},1000)
				return false;
			}
			if(!this.selGift.id){
				this.$tools.showToast("请先选择礼物");
				return false;
			}
			
			var data={
				'activityId':this.userInfo_activity.activityId,
				voteType:"2",
				votes:this.selGift.votes,
				voteBy:userInfo.member_id,
				giftId:this.selGift.id,
				params:{
					ids:this.userInfo_activity.id
				}
			}
			this.$axios
				.axios('POST', this.$paths.votePlayer, data)
				.then(res => {
					if (res.code == 200) {
						this.liwuShow=false;
						this.$tools.showToast("赠送成功");
						setTimeout(res=>{
						this.getPeopleInfo();
						this.getJinbiYue();
						},1000)
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch(err => {});
		},
		// 选择礼物
		selGiftClick(item){
			this.selGift=item;
		},
		// 获取礼物列表
		getgiftList(){
			var data={
			}
			this.$axios
				.axios('POST', this.$paths.listgift, data)
				.then(res => {
					if (res.code == 200) {
						console.log("分组结果",res);
						this.giftList=this.$tools.fenzulist(res.data,8);
					} else {
						this.$tools.showToast(res.msg);
					}
				})  
				.catch(err => {});
		},
		// 关闭开启礼物弹出窗
		liwuShowClick(){
			this.liwuShow=!this.liwuShow;
		},
		// 下载海报
		downLoadImg(img){
			uni.showLoading({
				title:"下载中"
			})
			uni.downloadFile({
					url:  img,
					success: (data) => {
						if (data.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: data.tempFilePath,
								success:()=> {
									this.erweima=false;
									//提示保存成功
									uni.showToast({
										mask: true,
										title: '保存成功',
										duration: 3000,
									})
								},
								fail:(res)=>{
								  //失败关闭提示信息！！！
								  uni.showToast({
								  	icon: 'none',
								  	title: '下载失败',
								  	duration: 3000,
								  })
								  console.log("下载失败",res);
								},
								complete: function() {
								  //隐藏提示
								  uni.hideLoading();
								}
							})
						}
					},
					fail: (err) => {
						console.log(err,'err')
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
		},
		// 确认投票
		votePlayer(){
			var userInfo_activity=this.userInfo_activity;
			var userInfo=uni.getStorageSync("userInfo");
			if(!userInfo){
				this.$tools.showToast("请先登录");
				setTimeout(res=>{
					uni.reLaunch({  
						url:"/pages2/login/login"
					})
				},1000)
				return false;
			}
			var data={
				'activityId':userInfo_activity.activityId,
				voteType:"1",
				votes:"1",
				voteBy:userInfo.member_id,
				params:{
					ids:userInfo_activity.id
				}
			}
			this.$axios
				.axios('POST', this.$paths.votePlayer, data)
				.then(res => {
					if (res.code == 200) {
						this.$tools.showToast("投票成功");
						setTimeout(res=>{
							this.getPeopleInfo();
						},1000)
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch(err => {});
		},
		
		
		showimg(index){
			var imgs=this.userInfo_activity.image;
			for(var a=0;a<imgs.length;a++){
				imgs[a]=imgs[a]
			}
			console.log('imgs',imgs)
			uni.previewImage({
						urls: imgs,
						current:index,
					});
		},
		getPeopleInfo(){
			var data = {
				id:this.options.id
			}
			this.$axios
				.axios('POST', this.$paths.byidPlayer, data)
				.then(res => {
					if (res.code == 200) {
						console.log("彩赛选手",res)
						var userList=res.data;
						userList.image=userList.image.split(",");
						this.userInfo_activity=userList
						this.configActivity();
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch(err => {});
		},
		erweimaClicl(){
			this.erweima=!this.erweima;
		},
		totoupiao(){
			uni.reLaunch({
				url:"/pages3/sign_vote/sign_vote?id="+this.userInfo_activity.activityId
			})
		},
		preventTouchMove()
		 { },
		 aaaa(){},
	}
};
</script>

<style>
@import url(peopleInfo.css);
</style>
