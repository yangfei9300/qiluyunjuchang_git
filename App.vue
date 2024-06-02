<script>
	export default {
		onLoad() {},
		onLaunch(res) {

			// #ifdef  MP-WEIXIN
			wx.cloud.init({
				traceUser: true,
				env: "zhonhgshiyangfan-9f3ohqi3f038ada"
			})

			var openid = uni.getStorageSync("openid");
			if (!openid) {
				wx.login({
					success: (res) => {
						if (res.code) {
							//wx.login获取code。
							setTimeout(res1 => {
								this.getOpenid(res.code);
							}, 200)
						} else {
							console.log('获取用户登录态失败！' + res.errMsg)
						}
					}
				})
			}
			// #endif




			setTimeout(res => {
				this.toshnegji();
			}, 1000)
		},
		onShow() {
			var token = uni.getStorageSync("token");
			if (token) {
				this.getUserInfo();
			}
		},
		onHide() {},
		methods: {
			toshnegji() {
				if (wx.canIUse('getUpdateManager')) {
					const updateManager = wx.getUpdateManager()
					updateManager.onCheckForUpdate(function(res) {
						console.log('onCheckForUpdate====', res)
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							console.log('res.hasUpdate====');
							updateManager.onUpdateReady(function() {
								wx.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										console.log('success====', res)
										// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
										if (res.confirm) {
											// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								// 新的版本下载失败
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							})
						}
					})
				}
			},
			getOpenid(code) {
				var data = {
					wxcode: code
				};
				this.$axios
					.axios('GET', this.$paths.memberwxcode, data)
					.then(res => {

						console.error("获取openid结果", res, this.$paths.memberwxcode)
						if (res.code == 200) {
							console.log("获取openid", res)
							uni.setStorageSync("openid", res.data)
						} else {
							this.showToast(res.message);
						}
					})
					.catch(err => {
						console.error("获取openid报错", err)

					});

				// wx.cloud.callFunction({
				// 	    // name: 'login',    // 需调用的云函数名,注意名称要相同
				// 		 name: 'login',    // 需调用的云函数名,注意名称要相同
				// 	    // 传给云函数的参数 也就是上边的event对象
				// 	    data: {       
				// 	    },
				// 	    // 成功回调
				// 	    success: res => {
				// 	      console.log("云函数用户",res);
				// 		  uni.setStorageSync("openid",res.result.openid);  
				// 		  // uni.setStorageSync("openid",res.result.openid+"98");
				// 	    },
				// 	    fail: err => {  
				// 	      console.error('[云函数] [login] 调用失败', err)
				// 	    }
				// 	})

			},
			showToast(txt) {
				uni.showToast({
					title: txt,
					'icon': 'none'
				})
			},
			isLogin() {
				var token = uni.getStorageSync("token");
				if (token) {
					return true
				} else {
					uni.showModal({
						title: '提示',
						content: '请先登录',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages2/login/login"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			getUserInfo() {
				var data = {};
				this.$axios
					.axiosDate('POST', this.$paths.indexMember, data)
					.then(res => {
						if (res.code == 10000) {
							uni.setStorageSync("userInfo", res.result.member_info)
						} else {
							this.showToast(res.message);
						}
					})
					.catch(err => {});
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("/style/style.css");
	@import url("/style/style_rpx.css");
	@import "/style/ty_style_scss.scss";
	@import url("/style/animate.css");
</style>