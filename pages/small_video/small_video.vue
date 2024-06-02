<template>
	<view>
		<block v-if="list.length>0" >
		<image @click.stop="tolayinfo(item)"
		:src="item.activity_banner_mobile_url"
		 v-for="(item,index) in list" 
		 v-if="item.activity_state==1"
		 mode="aspectFill"
		 class="imgass"></image>
		</block>
		 <view class="roww center_center" v-else> 
			 <null></null>
		 </view>
		 
		 
		 <loadvideo></loadvideo>
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1,
			}
		},
		onLoad() {
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		onShareAppMessage () {
		        return {
		            title: "齐鲁云剧场",
		            imageUrl:"/static/lianxi_15.png",
		            path: '/pages/index_1/index_1'
		        }
		    },
		methods: {
			// 获取专区列表
			getList(){
				var data = {
					page:this.page,//	1	否	int	当前页码，默认为1
					per_page:"10",//	3	否	int	每页显示数量，默认为10
				}
				this.$axios
					.axios('POST', this.$paths.indexActivity, data)
					.then(res => {
						if (res.code == 10000) {
							this.list=this.list.concat(res.result.activity_list);
							this.page=this.page+1;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			tolayinfo(item){
				uni.setStorageSync("activityInfo",item)
				if(item.activity_show==1){
					uni.navigateTo({
						url:"/pages2/special/special?id="+item.activity_id
					})
				}else{
					uni.navigateTo({
						url:"/pages2/special_info/special_info?id="+item.activity_id
					})
				}
			}
		}
	}
</script>

<style>
@import url("small_video.css");

</style>
