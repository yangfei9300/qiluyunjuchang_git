<template>
	<view>
		<view class="roww p-all-30">
			<view class="sousuoview center_center roww p-left-25">
				<image src="/static/shouye/shouye_06.png" class="w-35 h-35"></image>
				<input class="fs-30 m-left-25 allline" 
				placeholder-class="fs-30 allline" 
				placeholder="请输入内容"
				 v-model="sousuoTxt"
				 @confirm="sousuoTo"
				 />
				
				<image src="/static/cuowu.png" class="w-50 h-50"
				v-if="sousuoTxt!=''"
				@click="sousuoTxtClick"
				></image> 
				<view class="fs-30 m-left-5 m-right-25" style="color: #999999;"
				@click.stop="sousuoTo"
				>搜索</view>
			</view>
		</view>
		<view class="colonn">
			<block v-for="(item,index) in livelist"> 
			
			<view class="roww p-all-32 border_bottom"
			v-if="index==0"
			>
				<image class="leftimg m-right-25"
				:src="item.live_banner"  mode="aspectFill"
				
				></image>
				<view class="colonn rowsb">
					<view class="colonn">
						<view class="titlename txtShowLength">{{item.live_name}}</view>
						<view class="jianjiess m-top-15 txtShowLength1">
							{{item.live_description}}
						</view>
						<view class="fs-30 m-top-15" style="color:#999999;">{{item.live_apply_play_time}}</view>
					</view>
					<view class="roww ">
						<view class="lijibofang"
						@click.stop="toLiveInfo(item)"
						>立即播放</view>
					</view>
				</view>
			</view>
			<view class="colonn"
			v-if="index>=1"
			>
				<view class="roww p-all-32 border_bottom">
					<image  mode="aspectFill" :src="item.live_banner" class="leftbgimg m-right-27"></image>
					<view class="colonn rowsbl">
						<view class="fs-29 w-400 txtShowLength">{{item.live_name}}</view>
						<view class="jianjieview txtShowLength" v-if="item.live_description">简介：{{item.live_description}}</view>
						<view class="lijibofang2"
						@click.stop="toLiveInfo(item)"
						>立即播放</view>
					</view>
				</view>
			</view>
			
			</block>
			<block v-if="livelist.length<=0">
				<view class="roww w-750 center_center">
					<null></null>
				</view>
			</block>
		</view>  
	</view>
</template>
   
<script>
	export default {
		data() {
			return {
				sousuoTxt:"",
				livelist:[],
			}
		},
		methods: {
			toLiveInfo(item){
					if(item.live_apply_state==2){
						this.$tools.showToast("回放暂未开发");
					} else if(item.live_apply_state==0){
						this.$tools.showToast("直播未开始");
					}  else{
						uni.navigateTo({
							url:"/pages1/live_info_1/live_info_1?id="+item.live_apply_id
						})
					}
			},
			sousuoTxtClick(){
				this.sousuoTxt="";
			},
			sousuoTo(){
				if(this.sousuoTxt==""){
					this.$tools.showToast("请输入搜索内容");
					return false;
				}
				// var data = {
				// 	'live_state':'1',
				// 	'keyword':this.sousuoTxt,
				// }
				
				var data = {
					page:"1",//	1	是	int	页码
					pagesize:"100000",//	10	是	int	每页条数
					type:"0",//
					'keyword':this.sousuoTxt,
				}
				
				this.$axios
					.axios('POST', this.$paths.get_live_listMemberLive, data)
					.then(res => {
						if (res.code == 10000) {
							this.livelist=res.result;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
@import url("live_search.css");
</style>
