<template>
	<view class="card">
		<view class="card-left">
			<image class="mini-logo" :src="image"></image>
		</view>
		<view class="card-middle">
			<view class="head">{{title}}</view>
			<view class="body">{{content}}</view>
		</view>
		<view class="card-right">
			<button class="btn" @click="onClick">{{btnText}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'card',
		props: {
			image: {
				type: String
			},
			title: {
				type: String
			},
			content: {
				type: String
			},
			btnText: {
				type: String,
				default: '点击探索'
			}
		},
		methods: {
			onClick(e) {
				this.$emit('onClick', e)
			}
		}
	}
</script>

<style>
	.card {
		display: flex;
		background-color: #FFFFFF;
		height: 180rpx;
		border-radius: 12rpx;
		padding: 4rpx 10rpx;
		position: relative;
	}
	.card-left {
		flex: 1;
	}
	.card-middle {
		flex: 3;
		padding: 20rpx 0 20rpx 20rpx;
	}
	.card-right {
		flex: 2;
		padding: 4rpx;
		align-items: center;
		display: flex;
	}
	.card-middle .head {
	}
	.card-middle .body {
		margin-top: 6rpx;
		color: #747d8c;
		font-size: small;
	}
	.card .mini-logo {
		width: 120rpx;
		height: 120rpx;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.card-right .btn {
		color: #fff;
		background: linear-gradient(to right, #ff6b81, #ff4757);
		border: 0;
		font-size: smaller;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
	}
</style>
