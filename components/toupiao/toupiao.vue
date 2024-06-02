<template>
	<view class="colonn">
		<view class="roww m-left-25 m-top-30">
			<view class="shurukuangwaiview  center_center roww"
			:style="{
				'background-color':searchBoxBackground
			}"
			>
				<view class="w-50"></view>
				<input  placeholder="请输入姓名或选手编号"
				placeholder-class="fs-30 "
				class="fs-30 allline" v-model="searchValue"
				/>
				<view class="w-50"></view>
				<view class="sousuoicovie roww center_center"
				:style="{
					'background-color':searchButtonBackground
				}"
				>
					<image  src="/static/sousuo.png" @click.stop="searchPlayerClick" class="w-50 h-50"></image>
				</view>
			</view>  
		</view>      
		<view class="huanhang p-all-30 rowsb m-top-25" style="padding-top:10rpx;">
			<view class="toupianpeople colonn  m-bottom-15" v-for="(item,index) in userList"
			@click.stop="toInfo(item)"
			>
				<image lazy-load  class="peopleimg" :src="item.image[0]+'?x-oss-process=style/tplist'" mode="aspectFill"></image>
				<view class="roww center_center m-top-20 m-bottom-35 p-left-16 p-right-16">
					<image class="selview" lazy-load src="/static/xuanzhong.png"
					 @click.stop="selIconClick(index)"
					 v-if="item.is"></image>
					<image class="selview1"  @click.stop="selIconClick(index)" v-else></image>
					<view class="ingcheng txtShowLength">{{item.playerName}}</view>
					<view class="allline"></view>
					<view class="piaosh">{{item.votes}}票</view>
				</view>
			</view>    
		</view>
		<view class="roww center_center" v-if="userList.length>0">
			<view class="baominganniu"
			 :style="jianbianBtnColor"
			 @click.stop="votePlayer">立即投票</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"toupiao",
		
		props: {
			'activityid':{
				type: String,
				value: '',
			},
			'searchBoxBackground':{
				type: String,
				value: '',
			},
			'searchButtonBackground':{
				type: String,
				value: '',
			},
			jianbianBtnColor:{
				type: String,
				value: '',
			}
			
		},
		data() {
			return {
				userList:[],
				imgUrl:"",
				searchValue:""
			};
		},
		created() {
			console.log("this.$paths.BASE_IMG1",this.$paths.BASE_IMG1)
			this.imgUrl=this.$paths.BASE_IMG1;
			this.getAllByActicity();
		},
		  mounted() {
			  
		        uni.$on('onReachBottom', (data) => {
		            console.log("触底函数")
		       });
		    },
		methods:{
			// 搜索选手
			searchPlayerClick(){
				// playerName
				// if(this.searchValue==""){
				// 	this.$tools.showToast("请输入搜索内容");
				// 	return false;
				// }
				
				var data = {
					searchValue:this.searchValue,
					activityId:this.activityid
				}
				this.$axios
					.axios('POST', this.$paths.searchPlayer, data)
					.then(res => {
						if (res.code == 200) {
							var userList=res.data;
							for(var a=0;a<userList.length;a++){
								userList[a].image=userList[a].image.split(",");
								userList[a].is=false;
							}
							this.userList=userList;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 确认投票
			votePlayer(){
				
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
				
				var userList=this.userList;
				var ids=[];
				for(var a=0;a<userList.length;a++){
					if(userList[a].is){
						ids.push(userList[a].id);
					}
				}
				if(ids.length<=0){
					this.$tools.showToast("请选择要投票的选手");
					return false;
				}
				var data={
					'activityId':this.activityid,
					voteType:"1",
					votes:"1",
					voteBy:userInfo.member_id,
					params:{
						ids:ids.join(",")
					}
				}
				this.$axios
					.axios('POST', this.$paths.votePlayer, data)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("投票成功");
							setTimeout(res=>{
								this.getAllByActicity();
							},1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 选中选手
			selIconClick(index){
				var userList=this.userList;
				userList[index].is=!userList[index].is;
				this.userList=userList;
			},
			// 前往用户详情
			toInfo(item){
				uni.navigateTo({
					url:"/pages3/peopleInfo/peopleInfo?id="+item.id
				})
			},
			// 获取活动选手
			getAllByActicity(){
				var data = {
					activityId:this.activityid
				}
				this.$axios
					.axios('POST', this.$paths.listPlayer, data)
					.then(res => {
						if (res.code == 200) {
							console.log("彩赛选手",res)
							var userList=res.data;
							for(var a=0;a<userList.length;a++){
								userList[a].image=userList[a].image.split(",");
								userList[a].is=false;
							}
							this.userList=userList;
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
.sousuoicovie{
	width: 100rpx;
	height: 100rpx;  
	background-color: #f58c1d;
	border-radius: 0rpx 100rpx 100rpx 0rpx;
}
.shurukuangwaiview{
	width:700rpx;
	border-radius: 100rpx;
	background-color: #FF9663;
	height: 100rpx;
}

.toupianpeople{
	width: 337rpx;
	height: 270rpx;
	background: #EBEBEB;
	border-radius: 6rpx;
}
.peopleimg{
	width: 337rpx;
	height: 190rpx;
	background: #FFE6D7;
	border-radius: 6rpx;
}
.selview{
	width: 33rpx;  
	height: 33rpx;
	background: #EFEFEF;
	border: 1rpx solid rgba(255,152,97,0.7400);
	border-radius: 3rpx;
	padding:5rpx;
}

.selview1{
	width: 33rpx;
	height: 33rpx;
	background: #EFEFEF;
	border: 1rpx solid #B5B5B5;
	border-radius: 3rpx;
}

.ingcheng{
	width: 149rpx;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 23rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	margin-left: 30rpx;
}
.piaosh{
	height: 30rpx;
	line-height: 30rpx;
	font-size: 23rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
}
   
.xuanshoutongdaosel{
	width: 47.5rpx;
	height: 6rpx;
	font-weight: bold;
}
.xuanshoutongdaonosel{
	margin-bottom: 15rpx;
	font-weight: bold;
	font-size: 30rpx;
}

.baominganniu{
	width: 690rpx;
	height: 75rpx;
	border-radius: 38rpx;
	text-align: center;
	line-height: 75rpx;
	color: #FFEDCD;
}
</style>