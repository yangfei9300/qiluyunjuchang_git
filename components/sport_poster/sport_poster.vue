<template>
	<view>
		<view class="huuibeijing colonn center_center">
			<image style="width: 680rpx;height: 760rpx;"
			:src="endimg" mode="widthFix"
			></image>
			<view class="roww m-top-30">
				<view class="calcel" @click.stop="change(1)">取消</view>
				<view class="truebtn12"  @click.stop="saveImg(2)">保存到相册</view>
			</view>
		</view>
		<scroll-view style="position: fixed;top: -5000;"
		scroll-x
		scroll-y
		>
			<canvas
			style="width:1360px;height:1520px;background-color: #007AFF;"
			canvas-id="cavas"
			></canvas>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"sport_poster1",
		data() {
			return {
				widthCan:1360,
				heightCan:1520,
				
				'topimg':'/static/haibaotop.png',
				endimg:"",//海报结果
			};
		},
		created() {
			this.createcanvas();
		},
		methods:{
			change (index) {
			   this.$emit('posterIsClick', {'index':index})
			},
			createcanvas(){
				uni.showLoading({
					title:"海报生成中"
				});
				//创建canvs
				var canvas = uni.createCanvasContext("cavas",this);
				canvas.setFillStyle('white')
				canvas.fillRect(0, 0, this.widthCan, this.heightCan);
				this.addLongclick(canvas, this);
			},
			//画 长安识别二维码进入
			addLongclick(ctx,that){
				ctx.setFontSize(56);
				ctx.setFillStyle('#919597');
				ctx.fillText('长按识别二维码，进入', 59,1295);
				this.addQiluyunjuchang(ctx,that);
			},
			
			// 画齐鲁云剧场
			addQiluyunjuchang(ctx,that){
				ctx.setFontSize(56);
				ctx.setFillStyle('#FF8E2D');
				ctx.fillText('齐鲁云剧场', 59,1380);
				this.addUserNickname(ctx,that);
			},
			//画用户的昵称
			addUserNickname(ctx,that){
				ctx.setFontSize(56);
				ctx.setFillStyle('#000000');
				ctx.fillText('做个聪明的笨蛋', 350,889);
				this.addTraditionalName(ctx,that);
			},
			//画戏曲的名字
			addTraditionalName (ctx,that){
				ctx.setFontSize(56);
				ctx.setFillStyle('#000000');
				ctx.fillText('魔术《超级英雄》宣传片', 350,1012);
				this.addOperaInfo(ctx,that);
			},
			// 画戏曲简介
			addOperaInfo(ctx,that){
				ctx.setFontSize(56);
				ctx.setFillStyle('#000000');
				ctx.fillText('魔术《超级英雄》精彩宣传片，欢迎过来观看哦', 53,1150);
				this.addTopImg(ctx,that);
			},
			// 画顶部图片
			addTopImg(ctx, that) {
				console.log("addImg");
				ctx.drawImage(this.topimg, 0, 0, this.widthCan, 765)
				this.addWxImg(ctx, that);
			},  
			// 画小程序码
			addWxImg(ctx, that) {
				console.log("addImg");
				ctx.drawImage(this.topimg, 1063, 1235, 240, 240)
				this.addWxHeadimg(ctx, that);
			},  
			// 画头像
			addWxHeadimg(ctx, that) {
				console.log("addImg");
				ctx.save();
				//绘制头像
				ctx.beginPath(); //开始绘制
				//先画个圆，前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
				ctx.arc(260/2  + 53, 260/2  + 790, 130, 0, Math.PI * 2, false);
				ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。
				// 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
				ctx.drawImage(this.topimg, 53, 790, 260, 260);
				ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图问下文即状态 还可以继续绘制
				this.endcanvas(ctx, that);
			},  
			endcanvas(ctx, that){
				ctx.draw();
				setTimeout(res=>{
					that._newImg(that);
				},1000)
			},
			_newImg(that) {
				console.log("_newImg")
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: this.widthCan,
					height: this.heightCan,
					destWidth:  this.widthCan,  
					destHeight: this.heightCan,
					fileType: 'png',
					canvasId: 'cavas',
					success: (res) => {
						this.endimg=res.tempFilePath
						console.log('this.endimg',this.endimg)
						this.$forceUpdate()
						// this.saveImg(res.tempFilePath)
					},
					fail: res => { 
						uni.hideLoading();
					},
					complete:res=>{
						uni.hideLoading();
					}
				}, that)
			},
			saveImg(event){
				console.log("saveImg")
				let that = this
				uni.saveImageToPhotosAlbum({
					filePath:this.endimg,
					success:(oneone)=> {
						this.$tools.showToast("保存成功");
						this.$emit('posterIsClick', {'index':2})
					},
				})
				}
		}
	}
</script>

<style>
.calcel{
	width: 325rpx;
	height: 80rpx;
	background-color:  #FF51A9;
	text-align: center;
	line-height: 80rpx;
	color: white;
	font-size: 30rpx;
	border-radius: 100rpx 0rpx 0rpx 100rpx;
}
.truebtn12{
	width: 325rpx;
	height: 80rpx;
	background-color: #F92F71;
	text-align: center;
	line-height: 80rpx;
	color: white;
	font-size: 30rpx;
	border-radius: 0rpx 100rpx 100rpx 0rpx;
}
</style>
