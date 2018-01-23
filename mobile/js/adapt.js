		setHTMLFontSize();
		window.onresize = setHTMLFontSize;
		function setHTMLFontSize(){
			var ww = parseFloat(document.documentElement.clientWidth);
			if(ww > 750){
				ww = 750;
			}
			var fontsize = ww / (750 / 100);
			document.documentElement.style.fontSize = fontsize + "px";
		}
        