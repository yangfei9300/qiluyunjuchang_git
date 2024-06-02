<template>
	<view>
		<view class="colonn">
			<view class="h-40"></view>
			<view class="roww  bottom m-left-25">
				
				<view class="diermingview colonn rowsbl  center_center pore"
				@click.stop="toInfo(userList[1])" v-if="userList.length>1">
					<view class="h-60"></view>
					<image  lazy-load  src="/static/paihangbang/rank2.png" class="jhiuanguamn"></image>
					<image mode="aspectFill"  lazy-load  class="headimg" :src="userList[1].params.memberAvatar"></image>
					<view class="fs-30 m-top-5 w-150 txtShowLength align-center" style="text-align: center;" >{{userList[1].playerName}}</view>
					    <view class="fs-35 fw-b m-top-5 m-bottom-5">{{userList[1].votes}}
						<text class="fs-25 fw-b m-left-5" style="color: coral;">票</text></view>
					<view class="fs-25  ">编号{{userList[1].id}}</view>
					<view class="h-30"></view>
				</view>
				
				<view v-else class="w-233"></view>
				<view class="diermingview1 colonn rowsbl  center_center pore"
						@click.stop="toInfo(userList[0])" v-if="userList.length>0">
					    <view class="h-60"></view>
				<image  mode="aspectFill"  src="/static/paihangbang/rank1.png" class="jhiuanguamn"></image>
					    <image class="headimg1" :src="userList[0].params.memberAvatar"></image>
					    <view class="fs-30  w-150 txtShowLength align-center" style="text-align: center;" >{{userList[0].playerName}}</view>
					    <view class="fs-35 fw-b m-top-5 m-bottom-5">{{userList[0].votes}}
						<text class="fs-25 fw-b m-left-5" style="color: coral;">票</text></view>
					    <view class="fs-25  ">编号{{userList[0].id}}</view>
					    <view class="h-30"></view>
				</view>
				
				<view v-else class="w-233"></view>
				<view class="diermingview colonn rowsbl  center_center pore"
				@click.stop="toInfo(userList[2])" v-if="userList.length>2">
					<view class="h-60"></view>
					<image src="/static/paihangbang/rank3.png" class="jhiuanguamn"></image>
					<image  mode="aspectFill" class="headimg" :src="userList[2].params.memberAvatar"></image>
					<view class="fs-30 m-top-5  w-150 txtShowLength align-center" style="text-align: center;" >{{userList[2].playerName}}</view>
					    <view class="fs-35 fw-b m-top-5 m-bottom-5">{{userList[2].votes}}
						<text class="fs-25 fw-b m-left-5" style="color: coral;">票</text>
						</view>
					<view class="fs-25  ">编号{{userList[2].id}}</view>
					<view class="h-30"></view>
				</view>
				
				<view v-else class="w-233"></view>
			</view>
			
			
			<view class="roww w-700 m-left-25 background1 fs-30 " v-if="userList.length>3" style="padding:20rpx 0rpx;">
				<view class="w-150 text_align1_r">排名</view>
				<view class="w-150 text_align1_r">编号</view>
				<view class="allline text_align1_r">姓名</view>
				<view class="w-150 text_align1_r">人气值</view>
			</view>
			
			
			<view class="roww w-700 m-left-25 background1 center_center fs-30 " style="padding:20rpx 0rpx;"
			v-for="(item,index) in userList"
			v-if="userList.length>3&&index>=3"
			@click.stop="toInfo(item)"
			> 
				<view class="w-150 text_align1_r">
					<block v-if="index<=9">
						<image  lazy-load  :src="'/static/paihangbang/icon-'+(index+1)+'@2x.png'" class="w-70 h-70"></image>
					</block>
					<block v-else> 
						<view  class="w-70 h-70 align-center fw-b" >{{index+1}}</view>
					</block>
				</view>
				<view class="w-150 text_align1_r">{{item.id}}</view>
				<view class="allline text_align1_r">{{item.playerName}}</view>
				<view class="w-150 text_align1_r">{{item.votes}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"toupiao_paihangbang",
		props: {
			'activityid':{
				type: String,
				value: '',
			},
		},
		data() {
			return {
				userList:[],
				imgUrl:""
			};
		},
		created() {
			console.log("this.$paths.BASE_IMG1",this.$paths.BASE_IMG1)
			this.imgUrl=this.$paths.BASE_IMG1;
			console.log("第一次渲染")
			this.getAllByActicity();
		},
		activated(){
			console.log("再次渲染")
			this.getAllByActicity();
		},
		methods:{
			toInfo(item){
				uni.navigateTo({
					url:"/pages3/peopleInfo/peopleInfo?id="+item.id
				})
			},
			getAllByActicity(){
				var data = {
					activityId:this.activityid
				}
				this.$axios
					.axios('POST', this.$paths.orderlistPlayer, data)
					.then(res => {
						if (res.code == 200) {
							console.log("彩赛选手",res)
							var userList=res.data;
							for(var a=0;a<userList.length;a++){
								userList[a].image=userList[a].image.split(",");
							}
							this.userList=userList
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			}
		}
		
	}
</script>

<style>
	.jhiuanguamn{
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		top: 8rpx;
		z-index: 11;
	}
.diermingview{
	width: 233rpx;
	height: 350rpx;
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.diermingview1{
	width: 233rpx;
	height:400rpx;
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.headimg{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background: #f5f5f5;
	z-index: 10;
}
.headimg1{
	width: 150rpx;
	height: 150rpx;
	border-radius: 50%;
	background: #f5f5f5;
	z-index: 10;
}
</style>