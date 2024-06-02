<template>
	<view>
		<!-- 打赏 -->
		
		<view class="colonn liveliwubigview animated fadeInUpBig"
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
					v-for="(item,index) in giftList"
					@click.stop="giftSelClick(index)"
					:style="{
						'border':giftSel==index?'2px dashed #FF8E2D':'2px dashed white'
					}"
					>
						<image class="giftimg1" :src="item.image"></image>
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
				<view class="givebtn" @click.stop="sendclick">赠送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"reward",
		data() {
			return {
				giftcount:1,//礼物个数
				giftSel:0,//选中的礼物的下标
				giftIs:false,//礼物弹窗是否显示
				giftList:[
					{
					'image':'https://w.zhuyin.club/images/tip/crown.png',
					},
					{
					'image':'https://w.zhuyin.club/images/tip/Ingots.png',
					},
					{
					'image':'https://w.zhuyin.club/images/tip/chick.png',
					},
					{
					'image':'https://w.zhuyin.club/images/tip/orange.png',
					},
					{
					'image':'https://w.zhuyin.club/images/tip/noodles.png',
					},
				{
				'image':'https://w.zhuyin.club/images/tip/tang.png',
				},
				]
			};
		},
		methods:{
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
				this.giftIs=!this.giftIs;
				this.$emit('closealert', {'close':false})
			},
			//礼物的点击事件
			giftSelClick(index){
				this.giftSel=index;
			},
			sendclick(){
				this.$emit('sendclick', {'giftcount':this.giftcount,'giftSel':this.giftSel})
			},
		}
	}
</script>

<style>

	/* 直播刷礼物 */
	.liveliwubigview{
		width: 750rpx;
		background-color: white;
		position: fixed;
		bottom: 0rpx;
	}
	.giftimg1{
		width:100rpx;
		height: 100rpx;
		margin-bottom:15rpx;
	}
	.giftviewbig{
		width:177rpx;
		
		padding:20rpx 30rpx 20rpx 30rpx;
		text-align: center;
		/* margin-right:15rpx;
		margin-left: 15rpx;
		margin-bottom:20rpx; */
	}
	.givebtn{
		width:120rpx;
		height: 50rpx;
		background-color: #FF8E2D;
		color: white;
		text-align: center;
		line-height: 50rpx;
		border-radius: 100rpx;
	}
</style>
