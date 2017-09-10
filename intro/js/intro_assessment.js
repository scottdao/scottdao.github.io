(function(){
	
	var $width = $('.intro_assessment').width()+13.5;
	console.log($width);
//	console.log($('.intro_assessment>ul>li').height());
	var now = 0;
	$('.circles>li').eq(0).addClass('cur');
	$('.circles>li').click(function(){
		
		$(this).addClass('cur').siblings().removeClass('cur');
		var index = $(this).index();

		//进行动画处理；点击当前的图片进行向左移动
		if(index>now){
			//上一次图片消失
			$('.intro_assessment>ul>li').eq(now).stop(true).animate({'left':-$width});
			
			//下一张图片出现						    
			now=index;
			$('.intro_assessment>ul>li').css('left',$width).eq(now).stop(true).animate({'left':0});
		}
		else if(index<now){
			
		 $('.intro_assessment>ul>li').eq(now).stop(true).animate({'left':$width});
		 
			//前面一张动画消失；
		now = index;
		$('.intro_assessment>ul>li').css('left',-$width).eq(now).stop(true).animate({'left':0});
			
		}
		
		
	})
	
	//点击右键按钮；产生火车轮播图；
	function rightBtn(){
		
		$('.intro_assessment>ul>li').eq(now).stop(true).animate({'left':-$width});
		now++;
		$('.intro_assessment>ul>li').css('left',$width).eq(now).stop(true).animate({'left':0});
		$('.circles>li').removeClass('cur').eq(now).addClass('cur');
		if(now>$('.intro_assessment>ul>li').length-1){
			now = 0;
			$('.circles>li').removeClass('cur').eq(now).addClass('cur');
			$('.intro_assessment>ul>li').eq(now).stop(true).animate({'left':0});
		}
	}
	$('.rightBtn').click(rightBtn);
	
	var timer = setInterval(rightBtn,3000);
	
	$('.intro_assessment').mouseenter(function(){
		clearInterval(timer);
	}).mouseleave(function(){
		
		timer = setInterval(rightBtn,3000);
		
	})
	
	//左键功能；
	$('.leftBtn').click(function(){
		
		$('.intro_assessment>ul>li').eq(now).stop(true).animate({'left':$width});
		$('.circles>li').removeClass('cur').eq(now).addClass('cur');
		now--;
		if(now<0){
			
			now = $('.intro_assessment>ul>li').length-1;
			
		}
		$('.intro_assessment>ul>li').css('left',-$width).eq(now).stop(true).animate({'left':0});
		
			
	})
	
})();
