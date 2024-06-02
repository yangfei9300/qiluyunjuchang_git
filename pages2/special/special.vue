<template>
	<view>
		<view class="huanhang" style="padding:0rpx 30rpx;"
		v-if="list.length>0"
		>
			<view class="colonn p-left-30 center_center p-top-30 p-right-30 w-230" 
			v-for="(item,index) in list"
			@click.stop="toInfo(item)"
			>
				<image :src="item.store_logo" class="imagesimg"></image>
				<view class="txtShowLength fs-30 m-top-20 w-210 align-center"
				style="text-align: center;"
				>{{item.store_name}}</view>
			</view>
		</view>
		<view class="roww center_center" v-else>
					 <null></null>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad(options) {
			this.options=options;
			this.getlist();
		},
		methods: {
			getlist(){
				var data = {
					activity_id:this.options.id
				}
				this.$axios
					.axios('POST', this.$paths.apply_storeActivity, data)
					.then(res => {
						if (res.code == 10000) {
							this.list=this.list.concat(res.result);
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
			toInfo(item){
				uni.navigateTo({
					url:"/pages2/special_info/special_info?store_id="+item.store_id+"&id="+this.options.id
				})
			}
		}
	}
</script>

<style>
@import url("special.css");
</style>
