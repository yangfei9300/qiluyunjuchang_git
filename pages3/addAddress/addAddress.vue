<template>
	<view>
		<view class="colonn"
		style="padding:0rpx 20rpx;"
		>
			<view class="roww border_bottom p-all-30 duiqi">
				<view class="shouhuortitle">收货人：</view>
				<view>
					<input placeholder="请输入姓名"
					 placeholder-class="font_size4_r"
					 class="font_size4_r"
					 />
				</view>
			</view>
			<view class="roww border_bottom p-all-30 duiqi">
				<view class="shouhuortitle">手机号：</view>
				<view>
					<input placeholder="请输入手机号"
					 placeholder-class="font_size4_r"
					 class="font_size4_r"
					 />
				</view>
			</view>
			<view class="roww border_bottom p-all-30 duiqi">
				<view class="shouhuortitle">省市区：</view>
				<view>
					<picker mode="region">
						<view class="font_size4_r">
							请输入省市区
						</view>
					</picker>
				</view>
			</view>
			<view class="roww border_bottom p-all-30 duiqi">
				<view class="shouhuortitle">详细地址：</view>
				<view>
					<input placeholder="请输入详细地址"
					 placeholder-class="font_size4_r"
					 class="font_size4_r"
					 />
				</view>
			</view>
			<view class="roww border_bottom p-all-30 duiqi">
				<view class="shouhuortitle">默认地址：</view>
				<view class="allline"></view>
				<view>
					<switch checked="true" color="#F83D47" style="transform:scale(0.6)"></switch>
				</view>
			</view>
		</view>
		
		<view class="addbtn">保存</view>
		
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
@import url(addAddress.css);
</style>
