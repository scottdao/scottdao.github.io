$ul = $("#carousel ul");
		//得到li
		$lis = $("#carousel ul li");
		//得到小圆点
		$circleslis = $("#carousel ol li");

		//克隆第一张li，追加到ul里
     	$lis.eq(0).clone().appendTo($ul);

			// console.log(n);
		//信号量
		var idx = 0;

		//自动轮播
		var timer = setInterval(rightBtnHandler,2000);

		//鼠标进入停止定时器
		$("#carousel").mouseenter(function(){
			clearInterval(timer);
		});

		//鼠标离开的时候，打开定时器
		$("#carousel").mouseleave(function(){
			timer = setInterval(rightBtnHandler,2000);
		});


		//右边按钮
		$("#rightBtn").click(rightBtnHandler);
		//右边按钮的事件处理程序，用来加定时器
		function rightBtnHandler(){
			//防止流氓
			if($ul.is(":animated")){
				return;
			}
			//先拉动后检测
			idx++;

			//改变小圆点的cur，由于idx可能瞬间为6，所以设置一个临时的小i，让这个小i是0~5：
			var i = idx > $lis.length - 1 ? 0 : idx;
			$circleslis.eq(i).addClass("cur").siblings().removeClass("cur");
			
			$ul.animate({"left":-980 * idx},600,function(){
				if(idx > $lis.length - 1){
					idx = 0;
					$ul.css("left",0);
				}
			});
		}

		//左边按钮
		$("#leftBtn").click(function(){
			//防止流氓
			if($ul.is(":animated")){
				return;
			}

			idx--;
			//先瞬移，然后拉动
			if(idx < 0){
				idx = $lis.length - 1;
				//立刻瞬移
				$ul.css("left",-980 * $lis.length);
			}

			$ul.animate({"left":-980 * idx},600);

		});


		//小圆点被点击的时候，做的事情
		$circleslis.click(function(){
			//点击第几个小圆点，信号量就应该是几
			idx = $(this).index();

			//拉动
			$ul.animate({"left":-980 * idx} , 600);

			//小圆点的cur进行交换
			$(this).addClass("cur").siblings().removeClass("cur");
		});