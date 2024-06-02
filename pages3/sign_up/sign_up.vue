<template>
	<view>
		<view class="colonn">
			<view class="topview"></view>
			<view class="biaodanview colonn">
				<view class="roww w-618 p-bottom-30  m-bottom-30 center_center border_bottom">
					<view class="xingming">姓名</view>
					<input placeholder="请输入姓名" placeholder-class="fs-25" class="fs-25 allline" />
				</view>			
				<view class="roww w-618 p-bottom-30 m-bottom-30 center_center border_bottom">
					<view class="xingming">身份证号</view>
					<input placeholder="请输入身份证号" placeholder-class="fs-25" class="fs-25 allline" />
				</view>
				<view class="roww w-618 p-bottom-30 m-bottom-30 center_center border_bottom">
					<view class="xingming">地区</view>
					<input placeholder="请输入地区" placeholder-class="fs-25" class="fs-25 allline" />
					<image src="/static/gengduo.png" class="w-11 h-20"></image>
				</view>
				<view class="roww w-618 p-bottom-30 m-bottom-30 center_center border_bottom">
					<view class="xingming">电话</view>
					<input placeholder="请输入联系方式" placeholder-class="fs-25" class="fs-25 allline" />
				</view>
				<view class="colonn w-618 p-bottom-30 m-bottom-30  border_bottom">
					<view class="xingming">个人简介</view>
					<textarea
					class="w-618 h-200 m-top-25 fs-25 lh-40" 
					placeholder-class="fs-25"
					placeholder="请输入个人简介"
					></textarea>
				</view>
				<view class="colonn w-618 m-top-15 p-bottom-30   ">
					<view class="xingming">上传图片</view>
					<view class="shangcahuntupia m-top-33 m-bottom-24">
						参赛对象照片统一使用横屏拍摄（宽高比16:9），人物
						居中，图片大小不超过800kb，图片格式jpg。
					</view>
					<view class="huanhang">
						<image class="shangchauntupian" src="/static/1659509067233.png"></image>
					</view>
				</view>
			</view>
			<view class="roww center_center">
				<view class="baominganniu">提交报名</view>
			</view>
			<view class="h-40"></view>
			
		</view>
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
@import url(sign_up.css);
</style>
