<template>
	<u-popup :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto"
	 :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" z-index="999">
	 <view class="u-picker-header" @touchmove.stop.prevent="stop" catchtouchmove="stop">
	 	<view class="u-btn-picker u-btn-picker--tips" hover-class="u-opacity"
	 	 :hover-stay-time="150" @tap="getResult('cancel')">取消</view>
	 	<view class="u-btn-picker u-btn-picker--primary" hover-class="u-opacity"
	 	 :hover-stay-time="150" @touchmove.stop="" @tap.stop="getResult('confirm')">确定</view>
	 </view>
	 <view class="u-picker-body">
		<picker-view :value="pickVal" @change="bindChange" class="u-picker-view">
			<picker-view-column>
				<view class="u-column-item" v-for="(item,index) in districtsObj.provinces" :key="index">
					<view class="u-line-1">
						{{item.AreaName}}
					</view>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="u-column-item" v-for="(item,index) in districtsObj.cities" :key="index">
					<view class="u-line-1">
						{{item.AreaName}}
					</view>
				</view>
			</picker-view-column>
			<picker-view-column>
				<view class="u-column-item" v-for="(item,index) in districtsObj.areas" :key="index">
					<view class="u-line-1">
						{{item.AreaName}}
					</view>
				</view>
			</picker-view-column>
		</picker-view>
		</view>
	</u-popup>
</template>

<script>
	import uPopup from './u-popup'
	export default {
		props: {
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			detaultAddress:{
				type:Array,
				default:[-1,-1,-1]
			}
		},
		data() {
			return {
				pickVal:[0, 0, 0],
				districtsObj: {
					provinces: [],
					cities: [],
					areas: [],
				},
				province: 0,
				city: 0,
				area: 0,
				
				allList:[],//所有的地区
			}
		},
		watch: {
			// 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
			province(val) {
				// this.loadCities(this.districtsObj.provinces[this.province].AreaId);
				this.loadCities(val);
			},
			city(val) {
				this.loadAreas(this.districtsObj.cities[this.city].AreaId);
			}
		},
		mounted() {
			this.loadDistrict()
		},
		methods: {
			close() {
				this.$emit('input', false);
			},
			async loadDistrict() {
				this.loadProvinces()
			},
			//处理回显函数
			address_show(){
				
				var detaultAddress=this.detaultAddress;
				var allList=this.allList;
				
				console.log("默认僧试试",detaultAddress)
				
				for(var a=0;a<allList.length;a++){
					if(detaultAddress[0]==allList[a].area_id){
						for(var b=0;b<allList[a].child.length;b++){
							if(detaultAddress[1]==allList[a].child[b].area_id){
								for(var c=0;c<allList[a].child[b].child.length;c++){
									if(detaultAddress[2]==allList[a].child[b].child[c].area_id){
										console.log("省",allList[a].area_name)
										console.log("市",allList[a].child[b].area_name)
										console.log("区",allList[a].child[b].child[c].area_name)
										var obg=allList[a].area_name+""+allList[a].child[b].area_name+allList[a].child[b].child[c].area_name;
										console.log("回显将诶过个",obg)
										// uni.$emit('defaultfhow',{
										// 	'info':obg
										// })
										uni.$emit('defaultfhow',{'obg':obg});
										break;
									}
								}
							}
						}
					}
				}
				console.log("省",)
			},
			loadProvinces() { // 加载省份
				uni.request({
					url:'https://www.sdyygh.cn/api/Area/area_app',
					method: 'get',
					data:{
					},
					success: async (res) => {
						let {data} = res.data
						
						var  list=[];
						var getlist=res.data.result.area_list;
						console.log("所有的地区",getlist)
						this.allList=getlist;
						for(var a=0;a<getlist.length;a++){
							var obg={
								AreaId: getlist[a].area_id,
								AreaName: getlist[a].area_name,
								CreateDate: "",
								Layer: 1,
								ParentId: "0",
								QuickQuery: "",
								SimpleSpelling: ""
							}
							list.push(obg);
						}
						console.log(list)
						this.districtsObj.provinces = list
						this.address_show();
						this.loadCities(0)
					},
					fail:async(res) => {
					}
				})
			},
			loadCities(index) {
				console.log('nowlist1-1-1-1',this.allList[index].child)
				var nowlist=this.allList[index].child;
				var list=[]
						for(var a=0;a<nowlist.length;a++){
							var obg={
								AreaId: nowlist[a].area_id,
								AreaName: nowlist[a].area_name,
								CreateDate: "",
								Layer: 1,
								ParentId: "0",
								QuickQuery: "",
								SimpleSpelling: ""
							}
							list.push(obg);
						}
				this.districtsObj.cities = list
				this.loadAreas(0);
				
			},
			loadAreas(AreaId) {
				var pickVal=this.pickVal;
				var nowlist=this.allList[pickVal[0]].child[pickVal[1]].child;
				var list=[]
				for(var a=0;a<nowlist.length;a++){
							var obg={
								AreaId: nowlist[a].area_id,
								AreaName: nowlist[a].area_name,
								CreateDate: "",
								Layer: 1,
								ParentId: "0",
								QuickQuery: "",
								SimpleSpelling: ""
							}
							list.push(obg);
				}
				this.districtsObj.areas = list
				
				
			},
			bindChange(event) {
				this.pickVal = event.detail.value;
				let i = 0;
				this.province = this.pickVal[i++];
				this.city = this.pickVal[i++];
				this.area = this.pickVal[i++];
			},
			getResult(event = null) {
				let result = {
					province: this.districtsObj.provinces[this.province],
					city: this.districtsObj.cities[this.city],
					area: this.districtsObj.areas[this.area],
				}
				if (event) this.$emit(event, result);
				this.close();
			}
		},
		components:{
			uPopup
		}
	}
</script>
<style lang="scss" scoped>
	.u-datetime-picker {
		position: relative;
		z-index: 999;
	}

	.u-picker-view {
		height: 100%;
		box-sizing: border-box;
	}

	.u-picker-header {
		width: 100%;
		height: 90rpx;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-size: 32rpx;
		background: #ddd;
		position: relative;
	}

	.u-picker-header::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.u-picker-body {
		width: 100%;
		height: 500rpx;
		overflow: hidden;
		background-color: #fff;
	}

	.u-column-item {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		padding: 0 8rpx;
	}

	.u-text {
		font-size: 24rpx;
		padding-left: 8rpx;
	}

	.u-btn-picker {
		padding: 16rpx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
	}

	.u-opacity {
		opacity: 0.5;
	}
	
	.u-btn-picker--primary {
	}
	
	.u-btn-picker--tips {
	}
</style>

