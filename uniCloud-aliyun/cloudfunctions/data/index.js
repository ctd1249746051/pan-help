'use strict';

const db = uniCloud.database();
const dbCmd = db.command
const collection = db.collection('activity');

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	//返回数据给客户端
	return await collection.orderBy('activityId','desc').get()
};
