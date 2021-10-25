<template>
	<view class="content">
		<view class="title">
			如何领取百度网盘会员？
		</view>
		<view style="margin-top: 50rpx;">
			一、在小程序领取活动链接，复制并粘贴到浏览器，进入活动页面
		</view>
		<image style="width:600rpx;height: 1200rpx;margin-top: 10rpx;" src="/static/pan2.png"></image>
		<view style="margin-top: 50rpx;">
			二、点击【领取网盘会员】跳转百度网盘APP，完成领取
		</view>
		<image style="width: 440rpx;height: 220rpx;margin-top: 10rpx;" src="/static/pan1.jpg"></image>
	</view>
</template>

<script>
	export default {
		name: 'help',
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx 20rpx 150rpx 20rpx;
		color: #2f3542;
	}
	.title {
		color: #ff4757;
		font-weight: 700;
	}
</style>
