<template>
	<view>
		<swiper style="width:750rpx;height: 100vh;" autoplay>
			<swiper-item style="width:750rpx;height: 100vh;"
			v-for="(item,index) in adList"
			@click.stop="selectedBanner(item,index)"
			>
				<image :src="item.adv_code" mode="aspectFill"
				style="width:750rpx;height: 100vh;"
				></image>
			</swiper-item>
		</swiper>
		
		
		<view class="daojishiview roww center_center"
		@click.stop="toTIaoguo"
		>
			<view class="taiguotxt">跳过</view>
			<view>({{miao}})</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				miao:5,
				daojishiObj:null,
				adList:[]
			}
		},
		onLoad() {
			this.getAd();
			this.startTimeout() 
		},
		onHide(){
			console.log("页面银行")
		},
		onUnload() {
			console.log("页面卸载")
			clearTimeout(this.daojishiObj);
		},
		methods: {
			
			//轮播图切换
			selectedBanner(item, index) {
				console.log(item)
				this.ad_to_page(item.adv_type,item.adv_typedate);
			},
			// 广告跳转界面
			ad_to_page(type,id){
				if(!type){
					return false;
				}
				console.log("it嗷嗷护士",type,id)
				var url="";
				if(type=="goods"){
					url="/pages1/sport_video_1/sport_video_1?id="+id
				}else if(type=="store"){
					url="/pages1/live_info_1/live_info_1?id="+id
				}else if(type=="article"){
					url="/pages1/my_article/my_article?id="+id
				}else if(type=="activity"){
					// 专题界面未定
					url="/pages2/special_info/special_info?id="+id
				}else if(type=="url"){
					// 专题界面
					url="/pages3/webView/webView?id="+id
				}
				uni.navigateTo({
					url:url
				}) 
				
			},
			// 跳过
			toTIaoguo(){
				clearTimeout(this.daojishiObj);
				uni.reLaunch({
					url:"/pages/index_1/index_1"
				})
			},
			// 获取哦广告
			getAd(){
				var data = {
				}
				this.$axios
					.axios('POST', this.$paths.open_screen, data)
					.then(res => {
						if (res.code == 10000) {
							console.log("广告",res);
							this.adList=res.result;
						} else {
							this.$tools.showToast(res.message);
							setTimeout(res=>{
								uni.reLaunch({
									url:"/pages/index_1/index_1"
								})
							},1000)
						}
					})
					.catch(err => {});
			},
			startTimeout(){
				this.daojishiObj=setTimeout(res=>{
					console.log("倒计时中")
					this.miao=this.miao-1;
					if(this.miao<=0){  
						this.toTIaoguo();
					}else{
						this.startTimeout()
					}
				},1000)
			}
		}
	}
</script>

<style>
	@import url("AD.css");
</style>
