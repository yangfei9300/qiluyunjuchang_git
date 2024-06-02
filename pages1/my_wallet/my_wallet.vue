<template>
	<view>
		<view class="colonn">
			<view class="roww center_center" 
			style="padding:40rpx 20rpx 30rpx 20rpx;">
				<image :src="userInfo.member_avatar" class="headimgd"></image>
				<view class="fs-30 txtShowLength w-300">
					<block v-if="userInfo.member_nickname">
						{{userInfo.member_nickname}}
					</block>
					<block v-else>
						普通会员
					</block>
				</view>
				<view class="allline"></view>
			</view>
			<view class="roww" style="margin-left: 20rpx;">
				<view class="yuemoneybigview roww center_center">
					<view>当前余额：</view>
					<view class="color2_r">￥{{userInfo.available_predeposit}}</view>
				</view>
			</view>
		</view>
		<view class="border_bottom m-top-50">
			<v-tabs  v-model="current" activeColor="#FF8E2D"
			 lineColor="#FF8E2D"  
			 :scroll="false" 
			 :tabs="tabs" 
			 @change="changeTab"
			 :lineScale="lineScale"
			 ></v-tabs>
		</view>
		<view class="roww p-top-20 fs-30 p-bottom-20" 
		style="background-color: #f5f5f5;margin-top:30rpx;">
			<view class="allline roww center_center">
				<view>时间</view>
			</view>
			<view class="allline roww">
				<view class="allline center_center  roww center_center">
					金额
				</view>
				<view class="allline  roww center_center">
					备注
				</view>
			</view>
		</view>
		<view class="colonn center_center m-top-50 m-bottom-50">
			<image src="../../static/zanwushouru.png"
			style="width:400rpx;height:300rpx;"
			></image>
			<view class="fs-30" v-if="current==0">暂时没有收入哦</view>
			<view class="fs-30" v-else>暂时没有支出哦</view>
		</view>
		<view class="roww p-top-20 p-bottom-20 border_bottom"
		 v-for="(item,index) in 10"
		 >
			<view class="allline fs-30 roww center_center">
				<view>2020-08-08</view>
			</view>
			<view class="allline roww">
				<view class="allline fs-30 center_center color2_r zimuhuanhang  roww center_center">
					￥200
				</view>
				<view class="allline fs-30 roww center_center"
				v-if="current==0"
				>
					收入
				</view>
				<view class="allline fs-30 roww center_center"
				v-else
				>
					支出
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineScale:0.2,
				current: 0,
				tabs: [
				  '我的收入',
				  '我的支出',
				],
				
				userInfo:{},
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
				this.getPdrechargelist();
			}else{
				uni.showModal({
					title:"提示",
					content:"请先登录",
					success: (res) => {
						if(res.confirm){
								uni.reLaunch({
									url:"../../pages2/login/login"
								})
						}
					}
				})
			}
		},
		methods: {
			changeTab(index) {
			  console.log('当前选中的项：' + index)
			  this.current=index;
			  if(index==1){
				  this.getPdcashlistMemberFund();
			  }else{
				  this.getPdrechargelist();
			  }
			},
			// 获取我的收入
			getPdrechargelist(){
				var data={};
				this.$axios
					.axiosDate('POST', this.$paths.pdrechargelist, data)
					.then(res => {
						if(res.code==10000){
							console.log("我的收入结果",res);
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
					});
			},
			//获取我的提现记录
			getPdcashlistMemberFund(){
				var data={};
				this.$axios
					.axiosDate('POST', this.$paths.pdcashlistMemberFund, data)
					.then(res => {
						if(res.code==10000){
							console.log("我的体现结果",res);
						}else{
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {
					});
			},
		}
	}
</script>

<style>
@import url("my_wallet.css");
</style>
