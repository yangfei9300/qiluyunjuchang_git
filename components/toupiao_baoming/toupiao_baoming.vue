<template>
	<view>
		<view class="colonn">
			<view class="biaodanview colonn">
				<view class="roww w-618 p-bottom-30  m-bottom-30 center_center border_bottom">
					<view class="xingming">姓名</view>
					<input v-model="form.playerName" :disabled="form.id"  placeholder="请输入姓名" placeholder-class="fs-25" class="fs-25 allline" />
				</view>		
				<view class="roww w-618 p-bottom-30  m-bottom-30 center_center border_bottom">
						<view class="xingming">机构信息</view>
						<input v-model="form.school" :disabled="form.id" placeholder="请输入机构名称" placeholder-class="fs-25" class="fs-25 allline" />
				</view>	
				<view class="roww w-618 p-bottom-30 m-bottom-30 center_center border_bottom">
					<view class="xingming">身份证号</view>
					<input v-model="form.idNumber" :disabled="form.id" placeholder="请输入身份证号" placeholder-class="fs-25" class="fs-25 allline" />
				</view>
				<view class="roww w-618 p-bottom-30 m-bottom-30 center_center border_bottom">
					<view class="xingming">地区</view>
					<input  v-model="form.region" placeholder="请输入地区" placeholder-class="fs-25" class="fs-25 allline" />
					<image src="/static/gengduo.png" :disabled="form.id"  class="w-11 h-20"></image>
				</view>
				<view class="roww w-618 p-bottom-30 m-bottom-30 center_center border_bottom">
					<view class="xingming">电话</view>
					<input v-model="form.phone" :disabled="form.id" placeholder="请输入联系方式" placeholder-class="fs-25" class="fs-25 allline" />
				</view>
				<view class="colonn w-618 p-bottom-30 m-bottom-30  border_bottom">
					<view class="xingming">个人简介</view>
					<textarea v-model="form.info"  :disabled="form.id"
					class="w-618 h-200 m-top-25 fs-25 lh-40" 
					placeholder-class="fs-25"
					placeholder="请输入个人简介"
					></textarea>
				</view>
				<view class="colonn w-618 m-top-15 p-bottom-30   ">
					<view class="xingming">上传图片</view>
					<view class="shangcahuntupia m-top-33 m-bottom-24">
						参赛对象照片第一张使用横屏拍摄（宽高比16:9），人物
						居中，图片大小不超过800kb，图片格式jpg,第二张图竖屏拍摄宽550，高750
					</view>
					<view class="huanhang">
						<view class="shangchauntupian pore" v-for="(item,index) in imgList">
							<image class="w-173 h-98"
							 mode="aspectFill"
							 :src="item" ></image>
							 <image src="/static/cuowuwu.png"
							  @click.stop="delimg(index)"
							  class="w-50 h-50 guanbibtn" 
							  
							  ></image>
						</view>
						
						 
						 <image class="shangchauntupian"
						  @click="selImg" 
						  src="/static/1659509067233.png" v-if="imgList.length<3"></image>
						  
					</view>
				</view>
			</view>
			<view class="roww center_center">
				<view class="baominganniu"
				 :style="jianbianBtnColor"
				 @click.stop="toSubmit">提交报名</view>
			</view>
			<view class="h-40"></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"toupiao_baoming",
		props: {
			'activityid':{
				type: String,
				value: '',
			},
			'jianbianBtnColor':{
				type: String,
				value: '',
			},
			
		},
		data() {
			return {
				form:{
					activityId	:"",
					idNumber:"",
					image:"",
					info:"",
					memberId:"",
					phone:"",
					playerGroup:"",//组别
					playerName:"",
					posterImage:"",//海报图
					region:"",//地区
					school:"",
					
				},
				imgList:[],
				BASE_IMG1:"",
				userInfo:null,
			};
		},
		created() {
			this.BASE_IMG1=this.$paths.BASE_IMG1;
			this.getBaomingInfgo();
		},
		methods:{
			delimg(index){
				var imgList=this.imgList;
				var list=[];
				for(var a=0;a<imgList.length;a++){
					if(a!=index){
						list.push(imgList[a]);
					}
				}
				this.imgList=list;
			},
			// 查询当前展会是否有报名信息
			getBaomingInfgo(){
				var userInfo=uni.getStorageSync("userInfo")
				if(!userInfo){
					return false;
				}
				var  data={};
				data.memberId=userInfo.member_id;
				data.activityId=this.activityid;
				this.$axios
					.axios('POST', this.$paths.infoPlayer, data)
					.then(res => {
						if (res.code == 200) {
							if(res.data.length>0){
								this.imgList=res.data[0].image.split(",");
								this.form=res.data[0];
							}
						} else {
							// this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			
			// 选择图片
			selImg(type){
				uni.chooseImage({ 
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:  (res)=> {
						if(res.tempFilePaths.length>0){
							this.uploadimg(type,res.tempFilePaths[0]);
						}
					}
				});  
			},         
			// 上传图片
			uploadimg(type,img){
				this.$axios  
					.axiosUpload1(this.$paths.commonuploadoss,{}, img)
					.then(res => {
						if (res.code == 200) {
							this.imgList.push(res.url);
							console.log('this.imgList',this.imgList,res)
							
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 是否提交表单
			isSubmit(){
				console.log("信息",this.form)
				var userInfo=uni.getStorageSync("userInfo")
				if(!userInfo){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						uni.reLaunch({
							url:"/pages2/login/login"
						})
					},1000)
					return false;
				}else{
					this.userInfo=userInfo;
				}
				if(this.form.playerName==""){
					this.$tools.showToast("请填写姓名");
					return false;
				}
				if(this.form.school==""){
					this.$tools.showToast("请填写机构信息");
					return false;
				}
				if(this.form.idNumber==""){
					this.$tools.showToast("请填写身份证号");
					return false;
				}
				if(this.form.region==""){
					this.$tools.showToast("请填写地区名称");
					return false;
				}
				if(this.form.phone==""){
					this.$tools.showToast("请填写联系电话");
					return false;
				}
				if(this.form.info==""){
					this.$tools.showToast("请填写详细简介");
					return false;
				}
				if(this.imgList.length<=0){					
					this.$tools.showToast("请上传图片");
					return false;
				}
				if(this.imgList.length<2){					
					this.$tools.showToast("请上传至少两张图片");
					return false;
				}
				var imgList=this.imgList;
				this.form.image=imgList.join(",");
				this.form.activityId=this.activityid;
				return true;
			},
			// 提交报名信息
			toSubmit(){
				if(!this.isSubmit()){
					return false;
				}
				var  data=this.form;
				data.memberId=this.userInfo.member_id;
				var url=this.$paths.enrollPlayer;
				
				if(data.id){
					url=this.$paths.updatePlayer;
					data.applyBy=data.memberId+'';
					data.playerId=data.id;
				}  
				this.$axios
					.axios('POST', url, data)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast(res.msg);
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
		}
	}
</script>

<style>
	.guanbibtn{
		position: absolute;top: -25rpx;right: -25rpx;background-color: white;border-radius: 50%;
	}
page{
	background-color: #FFDFC3;
}
.topview{
	width: 750rpx;
	height: 500rpx;
	background: linear-gradient(0deg, #FF9663 0%, #9B0C00 100%);
	border-radius: 12rpx;
}
.baominganniu{
	width: 690rpx;
	height: 75rpx;
	border-radius: 38rpx;
	text-align: center;
	line-height: 75rpx;
	color: #FFEDCD;
}
.biaodanview{
	width: 690rpx;
	background: #FFFFFF;
	border-radius: 12rpx;
	margin:30rpx;
	padding:70rpx 42rpx  30rpx 42rpx;
}
.xingming{
	width: 110rpx;
	font-size: 25rpx;
	line-height: 25rpx;
}
.shangcahuntupia{
	width: 608rpx;
	font-size: 25rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #B5B5B5;
	line-height: 43rpx;
}
.shangchauntupian{
	width: 173rpx;
	height: 98rpx;
	background: #E8E8E8;
	border-radius: 2rpx;
	margin-right: 25rpx;
}
</style>