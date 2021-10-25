<template>
	<view class="content">
		<!--主内容-->
		<image class="logo" src="/static/pan.png"></image>
		<view class="text-area">
			<button @click="showModal" style="background: linear-gradient(90deg,#ff5926,#f00e2c);color: #fff;border-radius: 24px;padding-left: 40px;padding-right: 40px;" shadow>领取网盘会员</button>
		</view>
		
		<!--提示-->
		<tui-tips ref="toast" backgroundColor="#1dd1a1"></tui-tips>
		
		<!--弹框-->
		<tui-modal :show="modal" custom>
			<view class="tui-modal-custom">
				<tui-button margin="20rpx auto" type="green" size="28" width="80%" height="80rpx" plain @click="getPanData">立即领取</tui-button>
				<tui-button margin="auto" type="blue" size="28" width="80%" height="80rpx" plain @click="updatePanData">搜索最新会员</tui-button>
				<tui-button margin="80rpx auto auto auto" height="72rpx" :size="28" type="primary" shape="circle" @click="closeModal">关闭</tui-button>
			</view>
		</tui-modal>
		
		<tui-modal :show="dataModal" custom>
			<view class="tui-modal-custom">
				<tui-tag style="margin: 10rpx;" type="danger" shape="circleRight">活动数量：{{panData.length}}</tui-tag>
				<scroll-view class="tui-modal-data" scroll-y="true" @scrolltolower="changeShowNum" v-if="panData.length>0">
					<view class="tui-modal-custom-text">
						<view class="tui-modal-item" v-for="item in panData.slice(0,showNum)">
							<view class="tui-modal-item-title">
								{{item.title}}
							</view>
							<view class="tui-modal-item-btn">
								<button @click="copyData(item.url)" style="background: linear-gradient(90deg,#ff5926,#f00e2c);color: #fff;font-size: 12px;width: fit-content;" shadow>复制</button>
							</view>
						</view>
					</view>
					<view v-if="showNumBtn" class="showMore" @click="changeShowNum">
						加载更多
					</view>
				</scroll-view>
				<tui-no-data v-else imgUrl="/static/nodata.png" :fixed="false">快去搜索最新会员吧~</tui-no-data>
				<tui-button height="72rpx" :size="28" type="primary" shape="circle" @click="()=>(dataModal=false)">关闭</tui-button>
			</view>
		</tui-modal>
		
		<tui-modal :show="newDataModal" custom>
			<view class="tui-modal-custom">
				<tui-tabs :tabs="tabs" :currentTab="currentTab" @change="changeShowData" width="200" padding="0" itemWidth="100%"></tui-tabs>
				<tui-tag style="margin: 10rpx;" type="danger" shape="circleRight">活动数量：{{tmpPanData.length}}</tui-tag>
				<scroll-view class="tui-modal-data" scroll-y="true" @scrolltolower="changeShowNum" v-if="tmpPanData.length>0">
					<view class="tui-modal-custom-text">
						<view class="tui-modal-item" v-for="item in tmpPanData.slice(0,showNum)">
							<view class="tui-modal-item-title">
								{{item.title}}
							</view>
							<view class="tui-modal-item-btn">
								<button @click="copyData(item.url)" style="background: linear-gradient(90deg,#ff5926,#f00e2c);color: #fff;font-size: 12px;width: fit-content;" shadow>复制</button>
							</view>
						</view>
					</view>
					<view v-if="showNumBtn" class="showMore" @click="changeShowNum">
						加载更多
					</view>
				</scroll-view>
				<tui-no-data v-else imgUrl="/static/nodata.png" style="margin-top: 20rpx;" :fixed="false">暂无数据</tui-no-data>
				<tui-button height="72rpx" :size="28" type="primary" shape="circle" @click="()=>(newDataModal=false)">关闭</tui-button>
			</view>
		</tui-modal>
		
		<tui-modal :show="newDataLoadingModal" custom backgroundColor="transparent">
			<view class="tui-modal-custom" :style="newDataLoadingModal?'display:inherit':'display:none'">
				<view style="margin-top: 30rpx;width: 50%;">
					<tui-tag type="black">会员总数：{{panData.length}}</tui-tag>
					<tui-tag type="danger">新会员数：{{newPanData.length}}</tui-tag>
					<tui-tag type="white">通道数量：{{channelNum}}</tui-tag>
				</view>
				<view class="" style="margin-top: 100rpx;">
					<tui-circular-progress
					:percentage="percentage" 
					diam="250" lineWidth="10" fontSize="30" progressColor="#54a0ff" fontColor="#fff" 
					:activeMode="activeMode"
					:percentText="percentage+'%'"
					></tui-circular-progress>
				</view>
				<view style="margin-top: 60rpx;">
					<tui-button height="72rpx" :size="28" type="primary" shape="circle" @click="()=>(newDataLoadingModal=false)">取消</tui-button>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		name: 'vip',
		data() {
			return {
				currentTab: 0,	// 切换‘全部会员’和‘最新会员’
				modal: false,	// 弹框
				dataModal: false,	// 弹框
				newDataModal: false,	// 弹框
				newDataLoadingModal: false,	// 弹框
				panData: [],	// 百度网盘会员活动
				newPanData: [],	// 最新百度网盘会员活动
				tmpPanData: [],	// 临时存放百度网盘会员活动
				showNum: 10,	// 展示数量
				showNumBtn: true,	// 是否展示‘加载更多’
				percentage: 0,	// 进度
				tmpActivityId: [],	// 临时存放活动id
				tmpPercentageActivityId: [],	// 用于计算进度
				totalSearchNum: 0,	// 活动搜索数量
				activeMode: 'forwards',	// 进度条动画
				tabs: [{
						name: "全部会员"
					}, {
						name: "最新会员"
				}],	// 选项
				channelNum: 5,	// 通道数量
			}
		},
		methods: {
			// 弹框
			showModal() {
				this.modal = true
			},
			// 弹框
			closeModal() {
				this.modal = false
			},
			// 获取百度网盘会员
			async getPanData() {
				let self = this
				self.closeModal()
				
				uni.showLoading({
					title:'加载中...'
				})
				await uniCloud.callFunction({
					name:"data",
					success(res) {
						// console.log(res)
						if(res.result.data != null) {
							self.panData = []
							self.showNum = 10
							self.panData.push(...res.result.data)
						}
						
						self.dataModal = true
						uni.hideLoading()
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '加载失败，请重试！'
						})
					}
				})
			},
			// 获取最新百度网盘会员
			async updatePanData() {
				let self = this
				
				self.closeModal()
				// 通道数量
				self.channelNum = 5
				try {
				    const value = uni.getStorageSync('channelNum');
				    if(value) {
						self.channelNum = value
					}
				} catch (e) {
				    // error
					console.log(e);
				}
				// 初始化
				self.newPanData = []
				self.percentage = 0
				self.newDataLoadingModal = true
				self.panData = []
				self.tmpActivityId = []
				self.tmpPanData = []
				self.tmpPercentageActivityId = []
				self.totalSearchNum = 0
				self.showNum = 10
				
				// 检查现有活动id
				let res = await uniCloud.callFunction({
					name:"data",
				})
				
				let data = res.result.data
				let threshold = 2200
				let range = 150
				let startId = threshold - range
				let endId = threshold + range
				let length = data.length
				if(length > 0) {
					startId = data[length-1].activityId - range > 0 ? data[length-1].activityId - range : 0
					endId = data[0].activityId + range
					data.forEach(item=>{
						self.tmpActivityId.push(item.activityId)
					})
				}
				
				// 计算需要搜索多少个活动
				self.totalSearchNum = endId - startId

				let num = self.totalSearchNum / self.channelNum
				
				for(let i=0; i<self.channelNum; i++) {
					self.updatePanDataReq(
						Math.ceil(startId+num*i),
						Math.ceil(startId+num*i),
						Math.ceil(endId-(num*(self.channelNum-i-1))))
				}
				
				
			},
			// 获取最新百度网盘会员
			async updatePanDataReq(activityId, startId, endId) {
				let self = this
			
				// 存放临时活动id
				if(self.tmpPercentageActivityId.indexOf(activityId)==-1) {
					self.tmpPercentageActivityId.push(activityId)
					// console.log(activityId, startId, endId)
				}
				
				if(activityId >= endId || self.newDataLoadingModal == false) {
					return null
				}
				
				// 搜索最新会员活动
				await uniCloud.callFunction({
					name:"pan",
					data:{
						activityId: activityId
					},
					success(res) {
						if(res.result != null) {
							self.panData.push(res.result)
							if(self.tmpActivityId.indexOf(activityId)==-1) {
								self.newPanData.push(res.result)
								// console.log(self.newPanData)
							}
						}
						let percentage = Math.round(self.tmpPercentageActivityId.length*100.0/self.totalSearchNum)
						self.percentage = percentage>self.percentage ? percentage:self.percentage
						if(self.percentage >= 100) {
							self.tmpPanData = self.panData
							self.$refs.toast.showTips({
								msg: '搜索完毕！',
								duration: 2000,
							});
							self.newDataLoadingModal = false
							self.newDataModal = true
						}
					},
					fail() {
						
					},
					complete() {
						// 继续搜索
						return self.updatePanDataReq(++activityId, startId, endId)
					}
				})
			},
			// 加载更多
			changeShowNum() {
				if(this.showNum <= this.panData.length) {
					this.showNum += this.showNum
				} else {
					this.showNumBtn = false
					uni.showToast({
						icon: 'none',
						title: '到底咯！'
					})
				}
			},
			// 设置剪切板
			copyData(data) {
				uni.setClipboardData({
					data: data,
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						})
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '复制失败，请重试！'
						})
					}
				})
			},
			// 切换‘最新会员’和‘全部会员’
			changeShowData(e) {
				this.currentTab = e.index
				this.showNum = 10
				if(e.index == 0) {
					this.tmpPanData = this.panData
				} else {
					this.tmpPanData = this.newPanData
				}
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 150rpx;
	}
	
	.logo {
		height: 1000rpx;
		width: 100%;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
</style>
