<template>
    <view class="in-player-panel">
        <view class="in-player" :id="playerId"></view>
    </view>
</template>

<script>
    // aliplayer h5 格式播放器的 js 地址
    const jsPath = 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-h5-min.js'
    // aliplayer h5 格式播放器的 css 地址
    const cssPath = 'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css'
	
    // 视频的长宽比例，采用 width / height 得到，基本按照 16:9 获取
    const ratio = 1.2

    export default {
        name: "aliPlayer",
        props: {
			source:String,
            // 父容器传入的播放器宽度
            width: Number,
            // 父容器传入的播放器高度
            height: Number
        },
        data () {
            return {
				mySource:this.source,
                // 默认宽度
                defaultWidth: 718,
                // 默认高度
                defaultHeight: 225,
                // 每个播放器都具有单独的 id
                playerId: 'inPlayer' + Math.random() * 100000000000000000,
                // 播放器实例
                inPlayer: null
            }
        },
        watch:{
			source:{
				handler(newVal,oldVal){
				    this.mySource = newVal
					this.changePlayAuth()
				}
			},
        },
        computed: {
            // 计算后得到的真实宽度
            realWidth () {
                // 如果从外部传入了高度，则按照外部高度乘以宽高比，获取真实宽度，否则按照默认高度计算
                return `${(this.height || this.defaultHeight) * ratio}px`
            },
            // 计算后得到真实高度
            realHeight () {
                // 如果从外部传入了宽度，则按照外部宽度乘以宽高比，获取真实高度，否则按照默认宽度计算
                return `${(this.width || this.defaultWidth) / ratio}px`
            }
        },
		created() {
			console.log('this.source',this.source)
		},
        mounted () {
            // 在 mounted() 中初始化播放器，是为了确保基本元素都已经加载
            this._initialize()
        },
        methods: {
            //暂停视频
            pause(){
                this.inPlayer.pause()
            },
            // 初始化
            _initialize () {
                // 判断播放器全局实例是否已存在，只有当播放器依赖的 JS 加载完成后，播放器的全局实例才存在
                if (!window.Aliplayer) {
                    // 尝试获取播放器的 JS 标签
                    let inPlayerScriptTag = document.getElementById('inPlayerScriptTag')

                    // 判断JS是否已存在
                    if (!inPlayerScriptTag) {
                        // 不存在则创建 JS 标签
                        inPlayerScriptTag = document.createElement('script')
                        inPlayerScriptTag.type = 'text/javascript'
                        // 指定 JS 的地址
                        inPlayerScriptTag.src = jsPath
                        // 指定 JS 的 ID
                        inPlayerScriptTag.id = 'inPlayerScriptTag'

                        // JS 不存在说明 CSS 也不存在，则创建 CSS 标签
                        let inPlayerLinkTag = document.createElement('link')
                        inPlayerLinkTag.type = 'text/css'
                        inPlayerLinkTag.rel = 'stylesheet'
                        // 指定 CSS 的地址
                        inPlayerLinkTag.href = cssPath
						
						// JS 不存在说明 CSS 也不存在，则创建 CSS 标签
						let inPlayerStyle = document.createElement('style')
						// 指定 CSS 的地址
						inPlayerStyle.innerHTML = ".prism-player{height: 225px!important;}.prism-big-play-btn{left: 40%!important;bottom: 35%!important;}"
						
						
                        // 获取页面的 <head> 标签
                        let head = document.getElementsByTagName('head')[0]
                        // 将 JS 和 CSS 插入到 DOM 中
                        head.appendChild(inPlayerScriptTag)
                        head.appendChild(inPlayerLinkTag)
                        head.appendChild(inPlayerStyle)
                    }

                    // JS 插入并加载完成
                    if (inPlayerScriptTag.loaded) {
                        // 初始化播放器
                        this._initPlayer()
                    } else {
                        // JS 没有加载完成，则监听 JS 的加载事件
                        inPlayerScriptTag.addEventListener('load', () => {
                            // JS 确认加载完成后，初始化播放器
                            this._initPlayer()
                        })
                    }
                } else {
                    // 全局实例存在则直接初始化播放器
                    this._initPlayer()
                }
            },
            // 初始化播放器
            _initPlayer () {
                let that = this
                // 确保 DOM 元素都已经渲染完毕
				
                this.$nextTick(() => {
                    // 判断播放器实例是否存在
                    if (!that.inPlayer) {
                        // 接收从后端获取的鉴权地址，后端实现不赘述
                        // this.playAuth = res.data

                        // 初始化播放器
                        that.inPlayer = window.Aliplayer({
							source:that.mySource,
                            // 播放器 ID
                            id: that.playerId,
                            // 使用 H5 格式
                            useH5Prism: true,
                            // 不是直播
                            isLive: false,
                            // 不自动播放
                            autoplay: true
                        });
                    } else {
                        // 存在播放器实例则先销毁组件
                        that.inPlayer.dispose()
                        // 将播放器实例重置
                        that.inPlayer = null
                        // 清空播放器 DOM 内容
                        document.getElementById(that.playerId).innerHTML = ''

                        // 再次初始化
                        that._initPlayer()
                    }
                })
            },
            // 更新播放地址
            changePlayAuth () {
                // 重新初始化
                this._initPlayer()
            }
        },
    }
</script>

<style>
	.in-player{
		width: 750rpx;
		height:400rpx;
	}
</style>