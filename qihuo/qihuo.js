(function(){
	//导航栏的样式；
	$('.nav>ul>li').eq(0).addClass('active');
	$('.nav>ul>li').mouseenter(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});
	//脚部开始；
	$('.foo_jy_o>li').eq(0).addClass('foo_act');
	$('.foo_jy_o>li').mouseenter(function() {
		$(this).addClass('foo_act').siblings().removeClass('foo_act');
	});
	//banner图开始
	//获取图片数据；
	$.get('http://cct296.com/nick/api/get_banner/',function(pic_data){
        var json_pic = $.parseJSON(pic_data);
        // console.log(json_pic);
        var con = 0
        $('.lunbo img').each(function() {
        	// console.log($(this));
        	$(this).attr('src',json_pic.result[con]);
        	con++;
        	if(con>4){
        	 con=0;
        	}
        	
        });
	});
	//点击轮播开始；
	var i = 0;
	var lis = $('.lunbo li');
	function right_lunbo(){
		//每点击一次，使当前的图片消失，下一张图片出现
		lis.eq(i).stop(true).fadeOut(1000);
		i++;
		if(i>4){
         i=0;
		}
		lis.eq(i).stop(true).fadeIn(1000);
	}
	$('.f_right').click(right_lunbo);
	$('.f_left').click(function(){
	  lis.eq(i).stop(true).fadeOut(1000);
	  i--;
	  if(i<0){
	  	i=4
	  }
	  lis.eq(i).stop(true).fadeIn(1000);
	});
    var timer = setInterval(function(){
    	 right_lunbo();
    },5000);
    $('.lunbo').on('mouseleave',function(){
    	clearInterval(timer);
    	timer = setInterval(function(){
    		right_lunbo();
    	},5000);
    });
    $('.lunbo').on('mouseenter',function(){
    	clearInterval(timer);
    });
	//显示当前日期；
	//获取数据；
	
	$.get('http://cct296.com/nick/api/exp/',function(data){
		var js_data = $.parseJSON(data);
		// console.log(js_data);
	    var now_date = new Date(js_data['time']*1000).toLocaleString();
		var data_str = now_date.split(' ')[0].split('/');
		// console.log(data_str);
		$('.riqi>h2>span').html(data_str[1]);
		$('.rqd').html(data_str[2]);
		console.log(js_data.result);
		for(var j in js_data.result){
			var zhi = js_data.result[j]['new']-js_data.result[j]['old'];
		 $('<tr><td class="nanhua">'+js_data.result[j]['title']+'指数</td>'+
		 	'<td>'+js_data.result[j]['new']+'</td><td>'+zhi+'</td></tr>').appendTo($('.zsd>table'));
		}
	})
})();