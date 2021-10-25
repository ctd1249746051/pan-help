'use strict';

const db = uniCloud.database();
const dbCmd = db.command
const collection = db.collection('activity');

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let activityId = event.activityId
	
	let response = null
	let url = `https://pan.baidu.com/component/view/${activityId}`
	
	await uniCloud.httpclient.request(url, {
		method: 'GET',
		dataType: 'text',
		timeout: 10000,
	}).then((res1)=>{
		let isEnd = null
		let title = null
		if(res1.data.match(/会员狂欢季/g) != null) {
			title = res1.data.match(/<title>.*?<\/title>/g)[0].replace('<title>','').replace('</title>','')
			isEnd = false
			response = {
				url: url,
				title: title,
				isNew: false,
			}
		}
		
		if(isEnd == null)
			return
		
		collection.where({
		  activityId: activityId
		}).get().then((res2)=>{
			let item = res2.data[0]
		
			if(item == undefined) {
				collection.add({
					activityId: activityId,
					isEnd: isEnd,
					updateTime: new Date().getTime(),
					url: url,
					isShow: true,
					title: title
				})
			}
		})
	})
	
	//返回数据给客户端
	return response
};
