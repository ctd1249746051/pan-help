<template>
	<view class="content">
		<help v-if="current == 0"></help>
		<vip v-if="current == 1"></vip>
		<setting v-if="current == 2"></setting>
		
		<tui-tabbar 
			:current="current"  backdropFilter 
			:backgroundColor="backgroundColor" 
			:tabBar="tabBar" color="#576574" selectedColor="#5677fc"  zIndex="999"
			@click="tabbarSwitch"></tui-tabbar>
	</view>
</template>

<script>
	import vip from '@/components/vip/vip.vue'
	import setting from '@/components/setting/setting.vue'
	import help from '@/components/help/help.vue'
	
	export default {
		components: {
			vip,
			setting,
			help
		},
		data() {
			return {
				title: '小R盘助手',
				tabBar: null,
				backgroundColor: '#fafafa',
				current: 1,
				my: 1,
			}
		},
		created() {
			this.tabBarInit()
		},
		methods: {
			tabBarInit() {
				let self = this
				try {
				    const value = uni.getStorageSync('my');
				    if(value===0) {
						self.my = value
					}
				} catch (e) {
				    // error
					console.log(e);
				}
				self.tabBar = [
					{
						pagePath: '/pages/tabbar/index/index',
						text: '帮助',
						iconPath: '/static/tabbar/help.png',
						selectedIconPath: '/static/tabbar/help_active.png'
					},
					{
						pagePath: '/pages/tabbar/index/index',
						text: '会员',
						iconPath: '/static/tabbar/quanyi.png',
						selectedIconPath: '/static/tabbar/quanyi_active.png',
						hump: true
					},
					{
						pagePath: '/pages/tabbar/my/my',
						text: '我的',
						iconPath: '/static/tabbar/setting.png',
						selectedIconPath: '/static/tabbar/setting_active.png',
						isDot: true,
						num: self.my
					}
				]
			},
			tabbarSwitch(e) {
				let self = this
				self.current = e.index
				if(self.current == 2) {
					uni.setStorage({
					    key: 'my',
					    data: 0,
					    success: function () {
					        // console.log('success');
							self.tabBarInit()
					    }
					});
				}
			}
		}
	}
</script>

<style>
	.help {
		margin: 20rpx;
	}
	
	.help .text {
		color: #576574;
		text-decoration: underline;
		margin-left: 5rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.tui-modal-custom {}
	
	.tui-modal-data {
		max-height: 700rpx;
		overflow-y: scroll;
	}
	
	.showMore {
		text-align: center;
		margin: 20rpx;
		color: #8395a7;
	}
	
	.tui-modal-item {
		display: flex;
		height: 100rpx;
		margin: 10rpx;
	}
	
	.tui-modal-item-title {
		flex: 2;
	}
	
	.tui-modal-item-btn {
		flex: 1;
	}
	
	.tui-tabbar.data-v-56a4145f::before {
		border-top: 1px solid #dfe4ea !important
	}
</style>
