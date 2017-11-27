
function http(url,options){
	
	options = options || {};
	
	options.method = options.method || 'get';
	
	var data = options.data || {};
	
	var str = '';
	
	var dataType = options.dataType || 'text';
	
	for(var i in data){
		
		str+=i+'='+data[i]+'&'
	}
	
	if(/get/i.test(options.method)){
		
		url+='?'+str
		
	}else{
		
		options.method = 'post';
		
		options.headers= {
			'content-type': 'application/x-www-form-urlencoded'
		};
		options.body = str;
		
	}
	
	options = options || {};
	
	return fetch(url,options).then(res=>{
		
		return  typeof res[dataType] == 'function' ? res[dataType]() : res.text()
		
	})
	
}

export default http;
