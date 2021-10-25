<template>
	<view class="content">
		<!-- 设置 -->
		<tui-collapse @click="()=>(settingNum = (settingNum==0?-1:0))" :current="settingNum">
			<template v-slot:title>
				<tui-list-cell>
					<tui-icon name="setup" size="32" unit="rpx"></tui-icon>
					<text style="margin-left: 8rpx;font-size: 32rpx;">设置</text>
				</tui-list-cell>
			</template>
			<template v-slot:content>
				<view class="tui-content">
					<view class="left" style="line-height: 56rpx;">
						会员搜索通道类型
					</view>
					<view class="right">
						<tui-tag :type="channelType.type" shape="circle" style="width: 100%;" 
							@click="setSettingSheet">{{channelType.text}}</tui-tag>
					</view>
				</view>
			</template>
		</tui-collapse>
		
		<!-- 推荐 -->
		<tui-collapse @click="()=>(miniNum = (miniNum==0?-1:0))" :current="miniNum">
			<template v-slot:title>
				<tui-list-cell>
					<tui-icon name="applets" size="32" unit="rpx"></tui-icon>
					<text style="margin-left: 8rpx;font-size: 32rpx;">推荐</text>
				</tui-list-cell>
			</template>
			<template v-slot:content>
				<view class="mini-content">
					<view class="cm-card">
						<card
							title="小R资源"
							content="免费分享各类学习教程和激活软件"
							image="/static/mini/xrzy.png"
							@onClick="toMini({appId:'wx97dd7f2dc94a22e8'})">
						</card>
					</view>
					<view class="cm-card">
						<card
							title="小R神券"
							content="新版本小R神券，更多会员活动等着你！"
							image="/static/mini/xrsq.png"
							@onClick="toMini({appId:'wx6037f976923fc097'})">
						</card>
					</view>
				</view>
			</template>
		</tui-collapse>
		
		<!--提示-->
		<tui-tips ref="toastSuccess" backgroundColor="#1dd1a1"></tui-tips>
		<tui-tips ref="toastError" backgroundColor="#ed3f14"></tui-tips>
		
		<tui-actionsheet  
			tips="请选择您需要的通道类型"
			:show="showActionSheet" 
			:item-list="itemList" 
			@click="itemClick" 
			@cancel="closeActionSheet">
		</tui-actionsheet>

	</view>
</template>

<script>
	import card from '@/components/card/card.vue'
	export default {
		name: 'setting',
		components: {
			card
		},
		data() {
			return {
				settingNum: 0,	// 展开设置
				miniNum: 0,	// 展开推荐
				showActionSheet: false,	// 显示通道类型选择框
				itemList:[{
					text: "慢（1倍速度）",
					color: "#5677fc",
					type: 'primary',
					channelNum: 1,
				},{
					text: "推荐（5倍速度）",
					color: "#19be6b",
					type: 'green',
					channelNum: 5,
				},{
					text: "快（10倍速度）",
					color: "#ed3f14",
					type: 'danger',
					channelNum: 10,
				},{
					text: "起飞（20倍速度）",
					color: "#000",
					type: 'black',
					channelNum: 20,
				}],	// 通道类型选项
				channelType: null,	// 通道类型
			}
		},
		created() {
			// 获取通道类型
			try {
			    const value = uni.getStorageSync('channelNum');
			    if(value) {
					this.itemList.forEach((item)=>{
						if(item.channelNum == value) {
							this.channelType = item
						}
					})
				} else {
					this.channelTypeInit()
				}
			} catch (e) {
			    // error
				console.log(e);
				this.channelTypeInit()
			}
		},
		methods: {
			// 初始化
			channelTypeInit() {
				this.channelType = {
					text: "推荐（5倍速度）",
					color: "#19be6b",
					type: 'green',
					channelNum: 5,
				}
			},
			// 设置选择框
			setSettingSheet() {
				this.showActionSheet = true
			},
			// 关闭选择框
			closeActionSheet() {
				this.showActionSheet = false
			},
			// 选择通道类型
			itemClick(e) {
				this.channelType = e
				try {
				    uni.setStorageSync('channelNum', e.channelNum);
					this.$refs.toastSuccess.showTips({
						msg: '切换成功！',
						duration: 2000,
					});
				} catch (e) {
				    // error
					this.$refs.toastError.showTips({
						msg: '切换失败！',
						duration: 2000,
					});
				}
				this.closeActionSheet()
			},
			// 跳转小程序
			toMini(e) {
				uni.navigateToMiniProgram({
					appId:e.appId
				})
			}
		}
	}
</script>

<style>
	.tui-content {
		display: flex;
		padding: 30rpx;
		background-color: #fafafa;
	}
	.tui-content .left {
		flex: 1;
	}
	.tui-content .right {
		flex: 1;
		display: flex;
		text-align: right;
	}
	.mini-content {
		padding: 30rpx;
		background-color: #fafafa;
	}
	.cm-card:nth-of-type(n+2) {
		margin-top: 20rpx;
	}
</style>
