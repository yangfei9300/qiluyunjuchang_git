<template>
	<view>
		<view class="poab width" style="top: 0rpx;left: 0rpx;position: fixed;">
			<v-tabs
			v-model="current" 
			activeColor="#000000" 
			lineColor="#FFB43D"  
			:scroll="false" 
			:tabs="tabs" 
			:lineScale="0.3"
			@change="changeTab"></v-tabs>
		</view>
		<view class="h-70">
			
		</view>
		
		<view class="colonn">
				<view class="shoucangvuew border_bottom m-top-20 roww center_center"
				v-for="(item,index) in orderList"
				>
					<image class="goodimg" :src="item.goods_image_url" mode="aspectFill"></image>
					<view class="colonn rowsbl allline" style="height: 177rpx;">
						<view class="roww">
							<view class="goodname txtShowLength1">{{item.goods_name}}</view>
							<view class="allline"></view>
							<view class="daoizhifutxt">{{item.order_state_text}}</view>
						</view>
						<view class="colonn rowsb">
							<view class="shoucangriqi ">{{item.add_time}}</view>
							<view class="roww duiqi m-top-10" style="color: #999999;">
								<view class="fs-25">合计：￥</view>
								<view class="fs-35 font_size7_r">{{item.goods_price}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="orderList.length<=0">
					<null></null>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [
				  '全部',
				  '待支付',
				  '已完成',
				],
				lineScale:0,
				orderList:[],
				orderList_all:[]
			}
		},
		onLoad() {
			this.getOrderList();
		},
		methods: {
			changeTab(index) {
			  console.log('当前选中的项：' + index)
			  this.current=index;
			  // this.getOrderList();
			  this.getOrderNow();
			},
			getOrderList(){
				var userInfo=uni.getStorageSync("userInfo");
				if(!userInfo){
					this.$tools.showToast("请先登录");
					return false;
				} 
				var data = {
					page:"1",//		是	int	页码，默认1
					per_page:"10000",//		是	int	每页数量，默认10
					order_key:"",//		否	string	订单号或者视频名称
				};
				this.$axios
					.axiosDate('POST', this.$paths.order_listMember, data)
					.then(res => {
						if (res.code == 10000) {
							console.log("订单详情",res);
							
							var orderList_all=res.result.order_list;
							for(var a=0;a<orderList_all.length;a++){
								orderList_all[a].add_time=this.$tools.timestampToTime(orderList_all[a].add_time*1000)
							}
							
							this.orderList_all=orderList_all
							this.orderList=orderList_all
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			getOrderNow(){
				var orderList_all=this.orderList_all;
				if(this.current==0){
					this.orderList=orderList_all;
				}else if(this.current==1){
					var orderList=[];
					for(var a=0;a<orderList_all.length;a++){
						if(orderList_all[a].order_state_text=='待付款'){
							orderList.push(orderList_all[a]);
						}
					}
					this.orderList=orderList;
				}else if(this.current==2){
					var orderList=[];
					for(var a=0;a<orderList_all.length;a++){
						if(orderList_all[a].order_state_text=='已支付'){
							orderList.push(orderList_all[a]);
						}
					}
					this.orderList=orderList;
				}
			},
		}
	}
</script>

<style>
@import url("myorder.css");
</style>
