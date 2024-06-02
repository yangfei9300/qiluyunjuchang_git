//封装请求文件
export default{
	axios(method,url,data){
		// uni.showLoading({
		// 	'title':'加载中'
		// })
		var token=uni.getStorageSync("token");
		var header={
			'Content-Type':'application/json;charset=utf-8'
		}
		if(token){
			header['X-DS-KEY']=token;
		}
		return new Promise((resolve,reject)=>{
			uni.request({
				url: url,
				method:method,
				data:data,
				header:header,
				success:(res)=>{
						resolve(res.data)
				},
				fail:(err)=>{
					reject(err)
				},
				complete() {
					wx.hideLoading()
				}
			})
		})
	},
	axiosDate(method,url,data){
		
		return new Promise((resolve,reject)=>{
			
			var token=uni.getStorageSync("token");
			console.log("虎丘token",token,url,data);
			if(!token){
				let pages = getCurrentPages();
				var pageUrl="pages2/login/login";
				if(pages.length>0&&pages[pages.length - 1].route!=pageUrl){
					uni.showToast({
						title:"请先登录",
						icon:'none'
					})
					  
					
					// uni.showModal({
					// 	title: '提示',
					// 	content: '请先登录',
					// 	success:  (res)=> {
					// 		if (res.confirm) {
					// 					uni.reLaunch({
					// 						url:"/pages2/login/login"
					// 					})
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
					
					
					
					
					resolve({
						'message':"未登录",
						"code":"10001"
					})
				}
			}
			
		
			uni.request({
				url: url,
				method:method,
				data:data,
				header:{
					'Content-Type':'application/json;charset=utf-8',
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'X-DS-KEY':uni.getStorageSync("token")
				},
				success:(res)=>{
					console.log("判断token",res);
					if(res.data.code=='11001'){
						uni.removeStorageSync("token")
						uni.removeStorageSync("userInfo")
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						// setTimeout(res=>{
						// 	uni.reLaunch({
						// 		url:"/pages2/login/login"
						// 	})
						// },1000)
						
					}else{
						resolve(res.data)
					}
				},
				fail:(err)=>{
					reject(err)
				},
				complete() {
					wx.hideLoading()
				}
			})
		})
	},
	
	
	axiosUpload(url,data,imgurl){
			
		return new Promise((resolve,reject)=>{
			var token=uni.getStorageSync("token");
			console.log("上传图片胡群殴token",token);
			if(!token){
				let pages = getCurrentPages();
				var pageUrl="pages2/login/login";
				if(pages.length>0&&pages[pages.length - 1].route!=pageUrl){
					uni.reLaunch({
						url:"/pages2/login/login.vue"
					})
					resolve({
						'message':"未登录",
						"code":"10001"
					})
					return false;
				}
				console.log("土坯单地址123123")
			}
			uni.uploadFile({
						url: url, //仅为示例，非真实的接口地址
						filePath: imgurl,
						name: 'memberavatar',
						header:{
							'X-DS-KEY':uni.getStorageSync("token")
						},
						formData: data,
						success: (uploadFileRes) => {
							var res=JSON.parse(uploadFileRes.data)
							resolve(res)
						}
					});
			
		})
	},
	
	axiosUpload1(url,data,imgurl){
			
		return new Promise((resolve,reject)=>{
			
			uni.uploadFile({
						url: url, //仅为示例，非真实的接口地址
						filePath: imgurl,
						name: 'file',
						header:{
						},
						formData: data,
						success: (uploadFileRes) => {
							var res=JSON.parse(uploadFileRes.data)
							resolve(res)
						}
					});
			
		})
	},
	
}
  