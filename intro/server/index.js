
//加载express依赖
var express = require('express');

//加载一次数据依赖；
var data = require('../js/data.js');

//实例化express；
var http = express();

//添加路由服务
http.get('/',function(resquest,response){
	
	response.header('Access-Control-Allow-Origin','*');
	
	response.send(data);
	
})

//添加一个监听；
http.listen(80,'127.0.0.1',function(){
	
	console.log('运行中');
	
});
