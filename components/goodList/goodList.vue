<template>
	<view>
		<view class="huuibeijing" style="z-index: 1000;">
			<view class="colonn background1 goodlistview">
				
				<view class="roww rowsb p-top-20 p-bottom-20">
					<view class="yincang1">关闭</view>
					<view class="fs-30">商品列表</view>
					<view class="guanbi" @click.stop="clickAlert">关闭</view>
				</view>
				
				<scroll-view class="w-750 " scroll-y
				style="max-height: 650rpx;"   
				>
					<view class="roww p-all-20 border_bottom"
					v-for="(item,index) in 20"
					>
						<image class="goodicon"></image>
						<view class="colonn rowsb">
							<view class="fs-30 w-400 font_size7_r txtShowLength">商品名称商品名称商品名称商品名称商品名称</view>
							<view class="roww duiqi w-550">
								<view class="color2_r">￥25.00</view>
								<view class="w-25"></view>
								<view class="fs-20 huadiao color3_r">￥20.00</view>
								<view class="allline"></view>
								<view class="quqianggouBtn"
								@click.stop="showGoodInfo(item)"
								>去抢购</view>
							</view>
						</view>
					</view>
				</scroll-view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goodList",
		data() {
			return {
				
			};
		},
		methods:{
			clickAlert(){
				this.$emit("clickAlert",{})
			},
			showGoodInfo(goodInfo){
				this.$emit("showGoodInfo",goodInfo)
			}
		}
	}
</script>

<style>
@import url(goodList.css);
</style>