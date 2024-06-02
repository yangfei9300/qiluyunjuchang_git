<template>
	<view>
		<view class="colonn center_center" >
			<view class="h-20"></view>
			<view class="colonn border_bottom dizhiview"
			v-for="(item,index) in 10"
			>
				<view class="roww duiqi">
					<view class="username">张小仙子</view>
					<view class="usephone">18340070555</view>
				</view>
				<view class="addreeinfo">
					山东省 济南市 槐荫区 前城杰座23楼前城商务中心
				</view>
				<view class="h-30"></view>
				<view class="roww center_center duiqi">
					<image class="selicon"></image>
					<view class="w-20"></view>
					<view class="morendihzi">设置默认地址</view>
					<view class="allline"></view>
					<view class="bianjie1">编辑</view>
					<view class="bianjie1">删除</view>
				</view>
			</view>
		</view>
		<view class="h-250"></view>
		<view class="addbtn">新增地址</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url(myAddressList.css);
</style>
