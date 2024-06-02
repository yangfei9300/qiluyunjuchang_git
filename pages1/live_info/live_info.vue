<template>
	<view>
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
				width:menuButton.left+'px',
				height:(menuButton.height)+'px',
				top:(menuButton.top)+'px',
			}"
			>
				<view class="w-20"></view>
				<navigator open-type="navigateBack"
				delta="1"
				>
					<image src="../../static/zuojiantou.png"
					@click.stop="backpage"
					:style="{
						width:(menuButton.height)/2+'px',
						height:(menuButton.height)/2+'px',
					}"
					></image>
				</navigator>
				
				<view style="width:20rpx;"></view>
				<view class="roww center_center infoview"
				style="padding:5rpx 0rpx;"
				:style="{
					'max-width':(menuButton.left-50)+'px',
				}"
				>
				<view class="w-10"></view>
					<image src="/static/wuju.jpg" mode="aspectFill" class="dramaIcon"></image>
					<view class="colonn allline"
					>
						<view class="fs-20 color6_r txtShowLength">中央民族乐团</view>
						<view class="popularity m-top-5">0.5w人气值</view>
					</view>
					<view class="w-20"></view>
				</view>
				<view class="allline"></view>
			</view>
		</view>
		<!-- 视频 -->
		<video :src="videourl"
		:style="{
			top:(menuButton.height+menuButton.top+8)+'px',
		}"
		style="width:750rpx;height:450rpx;position: fixed;" autoplay
		></video>
		<!-- 聊天内容 -->
		<view style="width:750rpx;padding-left:20rpx;"
		:style="{
			height:chatviewhieght+'px',
			'margin-top':chatview_top+'px'
		}"
		>
			<scroll-view
			scroll-y
			:style="{
				height:chatviewhieght+'px',
			}"
			>
				<view class="colonn">
					
					<view class=" roww "
					style="max-width: 500rpx;"
						v-for="(item,index) in 3"
					>
						<view  class="  chatitem "
					style="max-width: 500rpx;"
						>
							<image src="../../static/jheadimd.jpg" class="headimgs"></image>
							<text style="line-height:40rpx;">会飞的猪:刚才的打击乐器应该有全程伴奏的应该，刚刚没有，只有枪声</text>
						</view>
						<view class="allline"></view>
					</view>
					
					<view class="roww w-500" v-for="(item,index) in 3">
						<view  class="fs-30  chatitem"
						>
							<view class="roww center_center ">
								<image  src="/static/jheadimd.jpg" class="headimgs "
								style="margin:0rpx 10rpx 0rpx 0rpx;position: initial;"
								></image>
								<view >会飞的猪</view>
								<view class="allline"></view>
							</view>
							<image class="chatimg" mode="aspectFill" src="/static/longteng.png" @click.stop="showimg"></image>
						</view>
					</view>
					
					<view class="roww w-500" v-for="(item,index) in 3">
					<view  class="fs-30  chatitem"
					>
						<view class="roww center_center">
							<image  src="/static/jheadimd.jpg" class="headimgs"
							style="margin:0rpx 10rpx 0rpx 0rpx;position: initial;"
							></image>
							<text >会飞的猪:</text>
							<view class="allline"></view>
						</view>
						<view class="roww center_center mp3bigvie">
							<view style="width:15rpx;"></view>
							<image src="/static/shhehngyins.png"
							class="w-40 h-40 m-right-10"
							></image>
							<view class="fs-25">2.3''</view>
							<view class="allline"></view>
						</view>
					</view>
					</view>
					
					<view class="roww w-500" v-for="(item,index) in 3">
						<view  class="fs-30  chatitem roww"
						style="background-color: #B3827E;border-radius: 100rpx;padding:5rpx 10rpx;"
						>
							<view class="roww center_center">
								<image src="../../static/jheadimd.jpg" class="headimgs"
								style="margin:0rpx 10rpx 0rpx 0rpx;position: initial;"
								></image>
								<text style="color: #FF8E2D;">会飞的猪</text>
								<view class="m-left-10 m-right-10">打赏了</view>
								<image class="liveimg" src="https://w.zhuyin.club/images/tip/crown.png" mode="widthFix"></image>
								<view class="fs-20">x1</view>
							</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
		
		<!-- 底部菜单 -->
		<view class="roww rowsb bottom" 
		style="position: fixed;bottom: 30rpx;width: 750rpx;">
		<view style="width:20rpx;"></view>
			<view class="roww center_center rowsa w-600" 
			>
				<image class="keymue m-right-15"
				 @click.stop="txt_mp3Clicl"
				 src="../../static/jiapna.png"></image>
				<view class="roww inputbigvie center_center"
				@click.stop="focusInput" v-if="txt_mp3==1"
				style="flex: 1;"
				>
					<view style="width:30rpx;"></view>
					<input placeholder="请输入内容"
					disabled
					 placeholder-class="color6_r text_align1_r fs-30 allline"
					 class="color6_r fs-30 allline text_align1_r" :adjust-position="false"
					 />
					<view style="width:30rpx;"></view>
				</view>
				<view class="roww inputbigvie1 center_center"
				@click.stop="focusInput"
				 style="flex: 1;"
				 v-if="txt_mp3==2"
				>
					<view>按住录音</view>
				</view>
				<!-- <view class="senda" v-if="commtxt.length>0">发送</view>	 -->
				<image class="keymue m-left-15 animated zoomIn" v-if="imgbtn" src="../../static/wupian.png"></image>
				<image class="keymue m-left-15 "
				
				src="../../static/jiahoaa.png" 
				@click.stop="imgbtnClick"></image>
				
				<!-- :class="{
					'addimgbtn':imgbtn,
					'animationsa':animationsaIs
				}" -->
				
			</view>
			<view style="width:50rpx;"></view>
			<view class="colonn">
				<image src="../../static/biaoqian.png"
				class="w-70 h-70 rightimg"
				 @click.stop="liveinfoalertlick"
				></image>
				<image src="../../static/jiwuha.png"
				class="w-70 h-70 rightimg m-top-30"
				@click.stop="giftIsClick"
				></image>
			</view>
			<view style="width:20rpx;"></view>
		</view>
		
		<view class="roww background1 width center_center"
		style="padding:20rpx; 20rpx;position: fixed;"
		:style="{
			'bottom':keyheight+'px'
		}"
		v-if="commeinptFocus"
		>
		<view style="width:10rpx;"></view>
			<input placeholder="请输入内容" 
			class="allline fs-30"
			@blur="focusInputblur"
			cursor-spacing="10"
			:focus="commeinptFocus" v-model="commtxt"
			:adjust-position="false"
			placeholder-class="allline fs-30"
			/>
			<view style="width:25rpx;"></view>
			<view class="sendbtn">发送</view>
		</view>
		
		<!-- 直播介绍 -->
		<view class="colonn livebigvi animated "
		 :class="{
			 'fadeInUpBig':liveinfoalert,
		 }"
		 v-if="liveinfoalert">
			<view class="roww rowsb w-710 p-bottom-15">
				<image class="w-50 h-50 yincang1" src="../../static/guabibi.png"></image>
				<view style="color: white;">直播简介</view>
				<image class="w-50 h-50"
				 @click.stop="liveinfoalertlick"
				 src="../../static/guabibi.png"></image>
			</view>
			<scroll-view
			scroll-y
			style="height:360rpx;"
			>
			<view class="liveinfo">
				<rich-text :nodes="liveInfo"></rich-text>
			</view>
			</scroll-view>
		</view>
		
		<!-- 礼物对话框 -->
		<!-- -->
		<reward v-if="giftIs" @closealert="giftIsClick"
		@sendclick="sendclick"
		></reward>
		<!-- <view class="colonn liveliwubigview"
		v-if="giftIs"
		
		>
			<view class="roww">
				<view class="allline"></view>
				<image src="../../static/guanbib.png"
				class="w-40 h-40 m-all-10"
				@click.stop="giftIsClick"
				></image>
			</view>
			<scroll-view
			scroll-y
			style="width:710rpx;max-height:450rpx;margin:20rpx 20rpx 20rpx 26rpx;"
			>
				<view class="huanhang ">
					<view class="colonn giftviewbig center_center"
					v-for="(item,index) in 8"
					@click.stop="giftSelClick(index)"
					:style="{
						'border':giftSel==index?'2px dashed #FF8E2D':'2px dashed white'
					}"
					>
						<image class="giftimg1"></image>
						<view class="color3_r fs-20">100.00元</view>
					</view>
				</view>
			</scroll-view>
			<view class="roww" style="padding:20rpx 30rpx;">
				<view style="margin-right:25rpx;">数量</view>
				<view class="roww">
					<view @click.stop="giftCountClick(0)"
					class="text_align1_r w-45 h-45 m-left-15"
					style="background-color: #f5f5f5;"
					>-</view>
					<input v-model="giftcount"
					 class="fs-25 text_align1_r w-100"
					 placeholder-class="fs-25 text_align1_r w-100"
					 />
					<view  @click.stop="giftCountClick(1)"
					class="w-45 h-45 text_align1_r m-left-15"
					style="background-color: #f5f5f5;">+</view>
				</view>
				<view class="allline"></view>
				<view class="givebtn">赠送</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				menuButton:{},
				videourl:"https://res.oss.zhuyin.club/res/0/87/video/2/202108/11/2021081111359-5153.mp4",
				chatviewhieght:0,//聊天框高度
				chatview_top:0,//聊天框距离顶部的位置
				keyheight:0,//键盘高度
				commeinptFocus:false,//键盘高度
				txt_mp3:1,//1是文字，2是语音
				commtxt:'',//输入的文字
				imgbtn:false,
				animationsaIs:false,
				'liveInfo':'<h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3><h3 style="color:white;">这里是直播简介，可以编写直播介绍内容。</h3>',
				liveinfoalert:false,//直播简介对话框
				giftcount:1,//礼物个数
				giftSel:0,//选中的礼物的下标
				giftIs:false,//礼物弹窗是否显示
			}
		},
		onLoad(options) {
			this.options=options;
			if(options.scene){
				this.options.id=options.scene;
			}
			this.getWindowInfo();
			this.getKeyhieght();
		},
		methods: {
			// 显示图片
			showimg(){
				// 
				wx.previewImage({
				  urls: ['/static/longteng.png'] // 需要预览的图片http链接列表
				})
			},
			//礼物数量加减
			giftCountClick(type){
				console.log(type)
				var giftcount=this.giftcount;
				if(type==0&&giftcount>1){
					giftcount=giftcount-1;
				}else if(type==1){
					giftcount=giftcount+1;
				}
				console.log(giftcount)
				this.giftcount=giftcount;
			},
			//礼物弹窗显示隐藏
			giftIsClick(index){
				console.log("asd",index)
				this.giftIs=!this.giftIs;
			},
			//礼物的点击事件
			giftSelClick(index){
				this.giftSel=index;
			},
			// 赠送礼物
			sendclick(res){
				console.log("礼物详情",res);
			},
			// 直播简介展示
			liveinfoalertlick(){
				this.liveinfoalert=!this.liveinfoalert;
			},
			//语音切换
			txt_mp3Clicl(){
				// 语音文字切换
				this.txt_mp3=this.txt_mp3==1?2:1
			},
			// 加好点击
			imgbtnClick(){
				this.imgbtn=!this.imgbtn;
				if(this.imgbtn){
					setTimeout(res=>{
						this.animationsaIs=true;
					},500)
				}
			},
			backpage(){
				uni.navigateBack({
					delta:1
				})
			},
			// 失去焦点
			focusInputblur(){				this.commeinptFocus=false;			},
			// 聊天输入框获取焦点
			focusInput(){
				this.commeinptFocus=true;
				console.log("asd",this.commeinptFocus)
				this.$forceUpdate()
			},
			// 获取键盘高度
			getKeyhieght(){
				wx.onKeyboardHeightChange(res => {
				  this.keyheight=res.height
				})
			},
			
			//获取设备信息
			getWindowInfo(){
				try {
				  const info = wx.getSystemInfoSync();
				  var menuButton=wx.getMenuButtonBoundingClientRect();
				  this.info=info;
				  this.menuButton=menuButton;
				  //计算chat的高度
				  var weiheight = uni.upx2px(450+140+30);//除了聊天框  其他的高度
				  weiheight=weiheight+menuButton.height+menuButton.top+8;
				  this.chatviewhieght=info.windowHeight-weiheight-50;
				  // 最后30  是距离视频组件的距离
				  this.chatview_top=menuButton.height+menuButton.top+8+uni.upx2px(450)+30;
				} catch (e) {
				}
			},
		}
	}
</script>

<style>
@import url("live_info.css");
</style>
