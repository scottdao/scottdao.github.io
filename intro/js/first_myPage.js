(function(){
	
	$('.intro_nav ul li').eq(0).addClass('singalNav');
	
	$('.intro_active').css('display','none').eq(0).css('display','block');
	
	$('.underline').eq(0).addClass('underline_active');
	
	var project = data.project;
	
	var tit = data_title.title;
	document.title = '刘道云个人简历|'+tit[0]+'----';
	 function dong(){
        var title = document.title;
        var charArr = title.split('');
        charArr.push(charArr.shift());
        var newTitle = charArr.join('');
        document.title = newTitle;
    }
    setInterval(dong,500);
	console.log(tit);
	$('.intro_nav>ul>li').click(function(){
		
		//完成导航高亮
	   $(this).addClass('singalNav').siblings().removeClass('singalNav');
	   
	   //完成信息对应的路由----显示与消失；
	   var index = $(this).index();
	   
	  	$('.intro_active').css('display','none').eq(index).css('display','block');
	  	
	  	$('.underline').removeClass('underline_active');

	    $(this).find('.underline').addClass('underline_active');
	  	
	  	//点击在项目经验这块时，出现滚动事件；
	  	if(index==4){
	  		
	  		window.onscroll = function(){
					
				var distance = document.documentElement.scrollTop || document.body.scrollTop;
//				console.log(distance);
				$('.intro_job_nav').empty();
				if(distance>=200){
					
					$('.intro_job_nav').fadeIn(1000);
					
					if(distance<540){
						
						$('<span>项目名称：</span><span>'+project[0].name+'</span>').appendTo($('.intro_job_nav'));
							
					}
					else if(distance>=540&&distance<900){
						
						$('<span>项目名称：</span><span>'+project[1].name+'</span>').appendTo($('.intro_job_nav'));
						
					}
					else if(distance>=900&&distance<1280){
						
						$('<span>项目名称：</span><span>'+project[2].name+'</span>').appendTo($('.intro_job_nav'));
						
					}
					else if(distance>=1280&&distance<1620){
						
						$('<span>项目名称：</span><span>'+project[3].name+'</span>').appendTo($('.intro_job_nav'));
						
					}
					else if(distance>=1620&&distance<1980){
						
						$('<span>项目名称：</span><span>'+project[4].name+'</span>').appendTo($('.intro_job_nav'));
						
					}
					else{
						
						$('.intro_job_nav').fadeOut(1000);
						
					}
					
				}else{
					
					$('.intro_job_nav').fadeOut(1000);
					
				}
				
				
			}
	  		
	  	}
	  	else{
	  		
	  		window.onscroll = function(){
	  			
	  			return false;
	  			
	  		}
	  		
	  	}
	  	
	  	//通过点击改变title的名字；
	  	document.title = '刘道云个人简历|'+tit[index]+'----';
	  	//让标题动起来；
	  		
	})
	
	// $('.intro_nav>ul>li').mouseenter(function(){
		
		// var index = $(this).index();
		
		// $('.underline').css('display','none').eq(index).css('display','block');
		
	// })
	
	
	//点击进入完善简历部分
	$('.preview_alter').click(function(){
		
		var $this  = $(this).parent().parent();
		
		$this.stop(true).fadeOut(1000).prev().fadeOut(1000);
	
	})
	
	

	var eduction ='学习时间:2013/09 - 2017/07,专业:电子信息工程,学校:龙岩学院,学历:本科(统招)';
	
	var eduction_arr = eduction.split(',');
	
	
	//用函数封装创建元素；
	function docum(ele){
		
		return document.createElement(ele);
		
	}
	function appen(parent,ele){
		
		return parent.appendChild(ele);
		
	}
	function selec(sele){
		
		return document.querySelector(sele)
		
	}
	
	 var con = 0;
	 var ul = docum('ul');
	 appen(selec('.intro_education'),ul); 
     function addEdu(){
	  	var li = docum('li')
	    appen(ul,li);
	    li.innerText=eduction_arr[con];
	    
	  	con++;
	  	
	  	if(con==eduction_arr.length){
	  			con=0;	
	  			clearInterval(timer);
	  	}
	  }
	 var timer =  setInterval(function(){addEdu()},3000)
	
	//通过本地服务器发送ajax请求json数据
//	$.ajax({
//		type:"get",
//		url:"http://127.0.0.1:8020/intro/js/data.json",
//		async:true,
//		dataType:'json',
//		success:function(data){
//			console.log(data);
//		}
//	});
	//通过nodejs获取数据；发送ajax请求获取数据；
//	$.ajax({
//		type:"get",
//		url:"http://127.0.0.1",
//		dataType:'json',
//		success:function(data){
//			console.log(data);
//		}
//	});

	//工程项目项目经验动态生成；
    
//  console.log(project);
    
	for(var i = 0;i<project.length;i++){
		
		$('<li><span>'+project[i].time+'</span><span>'+project[i].name+'</span>'
		   +'<div class="project_content"><div class="software"><span>软件环境：</span>'
           +'<span>'+project[i].software+'</span></div><div class="hardware"><span>硬件环境：</span>'
           +'<span>'+project[i].hardware+'</span></div><div class="tool"><span>开发工具：</span><span>'+project[i].tool+'</span>'
           +'</div><div class="description"><span>责任描述：</span><span>'+project[i].member+'</span>'
           +'<p>'+project[i].describe+'</p></div><div class="brief"><span>项目简介：</span><ul>'
           +'</ul></div></div></li>').appendTo($('.intro_project>ul'));     
		
		
		for(var j = 0;j<project[i].brief.length;j++){
			
			$('<li>'+project[i].brief[j]+'</li>').appendTo($('.brief>ul').eq(i));
			
		}
		
	}
	
	//点击js所需要技术，出现的效果；
	$('.preview_look').click(function(){
		
		var $this  = $(this).parent().parent();
		
		$this.stop(true).fadeOut(1000);
		
		$('.intro_technique').fadeIn(1000);
		
	})
	$('.intro_technique_head>span').click(function(){
		
		$('.dust').fadeOut(1000);
		
		$(this).parent().parent().fadeOut(1000);
		
	})
	var infoTime = new Date().toLocaleString().split(' ')[0].replace(/\//g,'-');
	console.log(infoTime);
	$('.info_time').append(infoTime);
})();
