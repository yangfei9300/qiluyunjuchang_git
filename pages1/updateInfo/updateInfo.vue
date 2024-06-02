<template>
	<view>
		<view class="colonn background1">
			<view class="roww center_center border_bottom" style="padding:20rpx 20rpx 30rpx 20rpx;"
			@click.stop="selimg"
			>
				<view class="fs-30 viewvpcolor">头像</view>
				<view class="allline"></view>
				<view class="colonn center_center">
					<image class="hradimg" :src="form_m.member_avatar"></image>
					<view class="fs-25 m-top-10 viewvpcolor">点击修改头像</view>
				</view>
			</view>
			<view class="colonn center_center border_bottom" style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="starttxt">*</view>
					<view class="fs-30  viewvpcolor">昵称</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center">
					<input placeholder="请输入您的昵称" class="fs-30" placeholder-class="fs-30" 
					v-model="form_m.member_nickname" 
					maxlength="15" />
					<view class="allline"></view>
					<view class="fs-25 viewvpcolor">
					<block v-if="form_m.member_nickname">
						{{ form_m.member_nickname.length }}
					</block>
					<block v-else>
						0
					</block>
					
					/15</view>
				</view>
			</view>
			<!-- <view class="colonn center_center border_bottom" style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">姓名</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center">
					<input placeholder="请输入您的姓名" class="fs-30" placeholder-class="fs-30" v-model="form_m.member_nickname" maxlength="5" />
					<view class="allline"></view>
					<view class="fs-25 viewvpcolor">{{ nickname.length }}/5</view>
				</view>
			</view> -->
			<view class="colonn center_center border_bottom" style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="starttxt ">*</view>
					<view class="fs-30  viewvpcolor">性别</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center">
					<view class="roww  center_center m-right-35"
					@click.stop="sexClick(0)"
					>
						<image src="../../static/huiicon.png"
						 :src="form_m.member_sex==0?sexselicn[1]:sexselicn[0]"
						 class="w-40 h-40 m-right-15"></image>
						<view>保密</view>
					</view>
					<view class="roww  center_center m-right-35"
					@click.stop="sexClick(1)">
						<image 
						  :src="form_m.member_sex==1?sexselicn[1]:sexselicn[0]"
						 class="w-40 h-40 m-right-15"></image>
						<view>男</view>
					</view>
					<view class="roww center_center"
					@click.stop="sexClick(2)">
						<image 
						 :src="form_m.member_sex==2?sexselicn[1]:sexselicn[0]"
						 class="w-40 h-40 m-right-15"></image>
						<view>女</view>
					</view>
					<view class="allline"></view>
				</view>
			</view>
			<!-- <view class="colonn center_center border_bottom" style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="starttxt">*</view>
					<view class="fs-30  viewvpcolor">手机号</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center">
					<input placeholder="请输入您的手机号" class="fs-30" placeholder-class="fs-30" v-model="nickname" maxlength="11" />
					<view class="allline"></view>
					<view class="getbtn pore">
						<button open-type="getPhoneNumber" @getphonenumber="getphonenumber" style="width: 120rpx;height: 50rpx;position: absolute;top: 0rpx;opacity: 0;"></button>
						<view>获取</view>
					</view>
				</view>
			</view> -->
			
			<!-- <view class="colonn center_center border_bottom" 
			style="padding:20rpx 20rpx 10rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">个人介绍</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center"
				>
					<textarea placeholder="有故事的你更吸引大家的亲睐哦!" 
					class="fs-30 textuserinfo w-710" 
					placeholder-class="fs-30" 
					v-model="nickname"  />
				
				</view>
			</view> -->
			
			
			<!-- <view class="colonn center_center border_bottom" style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">邮箱</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center">
					<input placeholder="请输入您的电子邮箱" class="fs-30" placeholder-class="fs-30" v-model="nickname" maxlength="5" />
					<view class="allline"></view>
					<view class="fs-25 viewvpcolor">{{ nickname.length }}/5</view>
				</view>
			</view> -->
			<view class="colonn center_center border_bottom" 
			style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">生日</view>
					<view class="allline"></view>
				</view>
				<picker mode="date"
				@change="birthChange"
				>
					<view class="roww w-710 m-top-20 center_center">
						<view class="fs-30 viewvpcolor" v-if="form_m.member_birthday==null">请选择出生日期</view>
						<view class="fs-30 viewvpcolor" style="color:#000000;" v-else>{{form_m.member_birthday}}</view>
						<view class="allline"></view>
					</view>
				</picker>
			</view>
			<view class="colonn center_center border_bottom"
			style="padding:20rpx 20rpx 30rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">学历</view>
					<view class="allline"></view>
				</view>
				<picker :range="classlist"
				range-key="rc_name"
				@change="educationChange"
				>
					<view class="roww w-710 m-top-20 center_center">
						<view class="fs-30 viewvpcolor" 
						v-if="educationIndex>=0"
						style="color: #000000;"
						>{{classlist[educationIndex].rc_name}}</view>
						<view class="fs-30 viewvpcolor" 
						v-else>请选择学历</view>
						<view class="allline"></view>
					</view>
				</picker>
			</view>
			<view class="colonn center_center border_bottom"
			style="padding:20rpx 20rpx 30rpx 20rpx;"
			@click="addressShow = true"
			>
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">地区</view>
					<view class="allline"></view>
				</view>
				
				<view class="roww w-710 m-top-20 center_center">
					<view class="fs-30 viewvpcolor"  
					v-if="address==''">请选择地区</view>
					<view class="fs-30 viewvpcolor" style="color: #000000;"
					v-else>{{address}}</view>
					<view class="allline"></view>
					<pickerAddress
					@defaultfhow="defaultfhow"
					 :detaultAddress="detaultAddress"
					 v-model="addressShow" @confirm="addresspick" />
				</view>
				
			</view>
			<view class="colonn center_center border_bottom"
			style="padding:20rpx 20rpx 10rpx 20rpx;">
				<view class="roww center_center w-710">
					<view class="fs-30  viewvpcolor">默认通讯地址</view>
					<view class="allline"></view>
				</view>
				<view class="roww w-710 m-top-20 center_center"
				>
					<textarea placeholder="请输入您的默认通讯地址!" 
					class="fs-30 textuserinfo w-710" 
					placeholder-class="fs-30" 
					v-model="form_m.member_areainfo"  />
				</view>
			</view>
		</view>
		<view class="roww center_center" style="background-color: #f5f5f5;">
			<view class="tijaobtns" @click.stop="toSubmit">提交</view>
		</view>
	</view>
</template>

<script>
import pickerAddress from '@/components/liudx-pickerAddress/index.vue'
export default {
	components: {
		pickerAddress
	},
	data() {
		return {
			sexselicn:['../../static/huiicon.png','../../static/hongicon.png'],
			nickname: '',
			'educationList':['初中','高中','专科','本科'],
			educationIndex:-1,
			regionSel:'',
			sexIndex:0,//0
			addressShow: false,
			form: {
				province: '',
				city: '',
				area: '',
			},
			address: '请选择地区',
			
			
			form_m:{
				member_nickname:"",//		否	string	昵称
				member_qq:"",//		否	string	会员QQ
				member_ww:"",//		否	string	会员旺旺
				member_birthday:"",//	2022-04-19	否	date	生日
				member_provinceid:"",//	1	否	int	省份ID
				member_cityid:"",//	36	否	int	城市ID
				member_areaid:"",//	37	否	int	地区ID
				member_areainfo:"",//	北京 北京市 东城区	否	string	地区信息
				member_education_id:"",//	10	否	int	用户学历ID
				member_sex:"",//	0	是	int	用户性别，0保密，1男，2女
			},
			classlist:[],//分类列表 
			addressInfo:[],//选中 的图片地址
			detaultAddress:[-1,-1,-1],//默认地址
		};
	},
	onLoad() {
		this.getEducation();
		this.getUserInfo();
		uni.$on('defaultfhow',res=>{
			console.log("res",res)
			this.address=res.obg;
		})
	},
	methods: {
		
		// 回显回调事件
		defaultfhow(res){
			console.log("回显地区结果",res)
		},
		/* 修改头像 */
		selimg(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success:  (res)=> {
					if(res.tempFilePaths.length>0){
						console.log(res.tempFilePaths);
						// this.form_m.member_avatar=res.tempFilePaths[0];
						this.toUploadImg(res.tempFilePaths[0]);
					}else{
						this.$tools.showToast("请选择图片");
					}
				}
			});
		},
		// 去修改头像
		toUploadImg(imgurl){
			console.log("土坯单地址",imgurl)
			this.$axios
				.axiosUpload(this.$paths.edit_memberavatar,{},imgurl)
				.then(res => {
					console.log("上传IEuo",res)
					if(res.code==10000){
						this.$tools.showToast("修改成功");
						this.form_m.member_avatar=res.result;
						this.$forceUpdate()
						// setTimeout(res=>{
						// 	uni.navigateBack({
						// 		delta:1
						// 	})
						// },1000)
					}else{
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {
				});
		},
		// 去提交
		toSubmit(){
			if(!this.isSubmit()){
				return false;
			}
			var data=this.form_m;
			this.$axios
				.axiosDate('POST', this.$paths.edit_information, data)
				.then(res => {
					if(res.code==10000){
						this.$tools.showToast("修改成功");
						setTimeout(res=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {
				});
		},
		// 是否提交
		isSubmit(){
			if(this.form.member_nickname==""){
				this.$tools.showToast("请输入用户昵称");
				return false;
			}
			return true;
		},
		// 获取个人信息
		getUserInfo(){
			var userInfo=uni.getStorageSync("userInfo")
			console.log(userInfo)
			var form_m=this.form_m;
			// form_m.member_nickname=userInfo.member_nickname;
			console.log(form_m)
			this.form_m=userInfo
			var detaultAddress=this.detaultAddress;
			detaultAddress[0]=userInfo.member_provinceid;
			detaultAddress[1]=userInfo.member_cityid;
			detaultAddress[2]=userInfo.member_areaid;
			this.detaultAddress=detaultAddress;
		},
		// 生日
		birthChange(res){
			this.form_m.member_birthday=res.detail.value;
		},
		// 性别点击
		sexClick(index){
			this.sexIndex=index;
			this.form_m.member_sex=index;
		},
		//地址变动
		addresspick(obj) {
			console.log("",obj)
			this.addressInfo=obj;
			var form_m=this.form_m;
			form_m.member_areaid=obj.area.AreaId;
			form_m.member_cityid=obj.city.AreaId;
			form_m.member_provinceid=obj.province.AreaId;
			this.form_m=form_m;
			let arr = [ 'province', 'city', 'area'];
			let place = '';
			arr.map(key => {
				this.form[key] = obj[key].AreaId
				place += obj[key].AreaName
			})
			this.address = place
		},
		//获取学历
		getEducation(){
			var data={
				'rc_type':2
			}
			this.$axios
				.axiosDate('POST', this.$paths.get_classlist, data)
				.then(res => {
					if(res.code==10000){
						this.classlist=res.result.class_list;
						this.education_show();
					}else{
						this.$tools.showToast(res.message);
					}
				})
				.catch(err => {
				});
		},
		//获取手机号
		getphonenumber(res) {},
		// 学历变动
		educationChange(res){
			this.educationIndex=res.detail.value;
			this.form_m.member_education_id=this.classlist[this.educationIndex].rc_id;
		},
		//学历回显
		education_show(){
			var classlist=this.classlist;
			var userinfo=this.form_m;
			for(var a=0;a<classlist.length;a++){
				if(userinfo.member_education_id==classlist[a].rc_id){
					this.educationIndex=a;
					break;
				}
			}
		},
	}
};
</script>

<style>
@import url('updateInfo.css');
</style>
