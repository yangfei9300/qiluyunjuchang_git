<template>
	<view>
		<view style="padding:20rpx;">
			<rich-text :nodes="xieyi.document_content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xieyi:{}
			}
		},
		onLoad(opetions) {
			if(opetions.type==1){
				uni.setNavigationBarTitle({
					title:"用户协议"
				})
				this.getAgreement();
			}
			
		},
		methods: {
			getAgreement(){
				var data = {
				}
				this.$axios
					.axios('POST', this.$paths.agreement, data)
					.then(res => {
						if (res.code == 10000) {
							this.xieyi=res.result;
						} else {
							this.$tools.showToast(res.message);
						}
					})
					.catch(err => {});
			},
		}
	}
</script>

<style>
@import url("agreement.css");
</style>
