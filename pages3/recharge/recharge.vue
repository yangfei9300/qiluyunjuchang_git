<template>
	<view>
		<view class="m-top-40 colonn p-all-20">
			<view class="huanhang p-left-20 p-top-20">
				<view class="colonn center_center nosel m-right-30 m-bottom-25 "
				v-for="(item,index) in taocanList"
				:class="{
					'selbokuang':selindex==index
				}"
				@click.stop="taocanClick(index)"
				>
					<view class="roww duiqi ">
						<view class="fw-b fs-45">{{item.coinsNum}}</view>
						<view class="fs-27 m-left-10" style="color: #999999;">金币</view>
					</view>
					<view class="roww bottom m-top-15 duiqi"
					style="color: #999999;"
					> 
						<view class="fs-25" >￥</view>
						<view class="fs-35">{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="roww center_center">
			<view class="baominganniu" @click.stop="toWxYuOrder">充值</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selindex:0,
				taocanList:[],
				selPackage:{},
			}
		},
		onLoad() {
			this.getTaocan();
		},
		methods: {
			toWxpay(data){
				wx.requestPayment({
				  timeStamp:data.timeStamp,
				  nonceStr: data.nonceStr,
				  package:data.package,
				  signType: data.signType,
				  paySign:data.paySign,
				  success: (res)=> {
					console.log(res)
					if(res.errMsg.indexOf("ok")){
						this.$tools.showToast("支付成功");
						setTimeout(res=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				  },
				  fail (res) { 
				  },
				  complete:(res)=> {
				  	console.log("微信支付结果",res)
				  }
				})  
			},
			// 微信预下单
			toWxYuOrder(){
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
					"packageId":this.taocanList[this.selindex].id,
					'openid':uni.getStorageSync("openid"),
					'payType':'1',
					'money':this.taocanList[this.selindex].price,
					memberId:userInfo.member_id
				}
				this.$axios
					.axios('POST', this.$paths.wxpaywxpay, data)
					.then(res => {
						if (res.code == 200) {
							console.log("支付信息",res)
							this.toWxpay(res.data);
						} else {
							this.$tools.showToast(res.msg);
						}
					})  
					.catch(err => {});
			},
			// 获取套餐列表
			getTaocan(){
				var data={
				}
				this.$axios
					.axios('POST', this.$paths.paymeallist, data)
					.then(res => {
						if (res.code == 200) {
							this.taocanList=res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})  
					.catch(err => {});
			},
			// 套餐选择
			taocanClick(index){
				this.selindex=index;
				
			},
		}
	}
</script>
<style>
@import url(recharge.css);
</style>
