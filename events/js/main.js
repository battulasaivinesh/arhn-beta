jQuery(document).ready(function(){

	var checkScrollSpeed = (function(settings){
	    settings = settings || {};

	    var lastPos, newPos, timer, delta, 
	        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

	    function clear() {
	      lastPos = null;
	      delta = 0;
	    }

	    clear();

	    return function(){
	      newPos = window.scrollY;
	      if ( lastPos != null ){ // && newPos < maxScroll 
	        delta = newPos -  lastPos;
	      }
	      lastPos = newPos;
	      clearTimeout(timer);
	      timer = setTimeout(clear, delay);
	      return delta;
	    };
	})();

	// listen to "scroll" event
	window.onscroll = function(){
	  console.log( checkScrollSpeed() );
	};



	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var scale_factor =windowWidth/975;
	var count =0;
	$('#container').scrollTop(50*windowWidth);

	$('#container').animate({
	   scrollTop: 50*windowWidth
	});
	offset = [0,0,0];
	offset2 = [0,0,0];
	offset3 = [0,0,0];

	$('.one').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#8d6a9f');
		$('.one').css('color',"#FFFFFF")
		$('.two').css('opacity',"0.1")
		$('.three').css('opacity',"0.1")
		$('.four').css('opacity',"0.1")
		$('.five').css('opacity',"0.1")
		$('.six').css('opacity',"0.1")
		$('.seven').css('opacity',"0.1")
		$('.two').css('color',"#FFFFFF")
		$('.three').css('color',"#FFFFFF")
		$('.four').css('color',"#FFFFFF")
		$('.five').css('color',"#FFFFFF")
		$('.six').css('color',"#FFFFFF")
		$('.seven').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.one').css('color',"#000000")
		$('.two').css('opacity',"1")
		$('.three').css('opacity',"1")
		$('.four').css('opacity',"1")
		$('.five').css('opacity',"1")
		$('.six').css('opacity',"1")
		$('.seven').css('opacity',"1")
		$('.two').css('color',"#000000")
		$('.three').css('color',"#000000")
		$('.four').css('color',"#000000")
		$('.five').css('color',"#000000")
		$('.six').css('color',"#000000")
		$('.seven').css('color',"#000000")
	});

	$('.two').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#6bbfaa');
		$('.two').css('color',"#FFFFFF")
		$('.one').css('opacity',"0.1")
		$('.three').css('opacity',"0.1")
		$('.four').css('opacity',"0.1")
		$('.five').css('opacity',"0.1")
		$('.six').css('opacity',"0.1")
		$('.seven').css('opacity',"0.1")
		$('.one').css('color',"#FFFFFF")
		$('.three').css('color',"#FFFFFF")
		$('.four').css('color',"#FFFFFF")
		$('.five').css('color',"#FFFFFF")
		$('.six').css('color',"#FFFFFF")
		$('.seven').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.two').css('color',"#000000")
		$('.one').css('opacity',"1")
		$('.three').css('opacity',"1")
		$('.four').css('opacity',"1")
		$('.five').css('opacity',"1")
		$('.six').css('opacity',"1")
		$('.seven').css('opacity',"1")
		$('.one').css('color',"#000000")
		$('.three').css('color',"#000000")
		$('.four').css('color',"#000000")
		$('.five').css('color',"#000000")
		$('.six').css('color',"#000000")
		$('.seven').css('color',"#000000")
	});

	$('.three').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#f1c40f');
		$('.three').css('color',"#FFFFFF")
		$('.one').css('opacity',"0.1")
		$('.two').css('opacity',"0.1")
		$('.four').css('opacity',"0.1")
		$('.five').css('opacity',"0.1")
		$('.six').css('opacity',"0.1")
		$('.seven').css('opacity',"0.1")
		$('.one').css('color',"#FFFFFF")
		$('.two').css('color',"#FFFFFF")
		$('.four').css('color',"#FFFFFF")
		$('.five').css('color',"#FFFFFF")
		$('.six').css('color',"#FFFFFF")
		$('.seven').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.three').css('color',"#000000")
		$('.one').css('opacity',"1")
		$('.two').css('opacity',"1")
		$('.four').css('opacity',"1")
		$('.five').css('opacity',"1")
		$('.six').css('opacity',"1")
		$('.seven').css('opacity',"1")
		$('.one').css('color',"#000000")
		$('.two').css('color',"#000000")
		$('.four').css('color',"#000000")
		$('.five').css('color',"#000000")
		$('.six').css('color',"#000000")
		$('.seven').css('color',"#000000")
	});

	$('.four').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#2ecc71');
		$('.four').css('color',"#FFFFFF")
		$('.one').css('opacity',"0.1")
		$('.three').css('opacity',"0.1")
		$('.two').css('opacity',"0.1")
		$('.five').css('opacity',"0.1")
		$('.six').css('opacity',"0.1")
		$('.seven').css('opacity',"0.1")
		$('.one').css('color',"#FFFFFF")
		$('.three').css('color',"#FFFFFF")
		$('.two').css('color',"#FFFFFF")
		$('.five').css('color',"#FFFFFF")
		$('.six').css('color',"#FFFFFF")
		$('.seven').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.four').css('color',"#000000")
		$('.one').css('opacity',"1")
		$('.three').css('opacity',"1")
		$('.two').css('opacity',"1")
		$('.five').css('opacity',"1")
		$('.six').css('opacity',"1")
		$('.seven').css('opacity',"1")
		$('.one').css('color',"#000000")
		$('.three').css('color',"#000000")
		$('.two').css('color',"#000000")
		$('.five').css('color',"#000000")
		$('.six').css('color',"#000000")
		$('.seven').css('color',"#000000")
	});


	$('.five').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#f5f3bb');
		$('.five').css('color',"#FFFFFF")
		$('.one').css('opacity',"0.1")
		$('.three').css('opacity',"0.1")
		$('.four').css('opacity',"0.1")
		$('.two').css('opacity',"0.1")
		$('.six').css('opacity',"0.1")
		$('.seven').css('opacity',"0.1")
		$('.one').css('color',"#FFFFFF")
		$('.three').css('color',"#FFFFFF")
		$('.four').css('color',"#FFFFFF")
		$('.two').css('color',"#FFFFFF")
		$('.six').css('color',"#FFFFFF")
		$('.seven').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.five').css('color',"#000000")
		$('.one').css('opacity',"1")
		$('.three').css('opacity',"1")
		$('.four').css('opacity',"1")
		$('.two').css('opacity',"1")
		$('.six').css('opacity',"1")
		$('.seven').css('opacity',"1")
		$('.one').css('color',"#000000")
		$('.three').css('color',"#000000")
		$('.four').css('color',"#000000")
		$('.two').css('color',"#000000")
		$('.six').css('color',"#000000")
		$('.seven').css('color',"#000000")
	});

	$('.six').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#8fb8de');
		$('.six').css('color',"#FFFFFF")
		$('.one').css('opacity',"0.1")
		$('.three').css('opacity',"0.1")
		$('.four').css('opacity',"0.1")
		$('.two').css('opacity',"0.1")
		$('.five').css('opacity',"0.1")
		$('.seven').css('opacity',"0.1")
		$('.one').css('color',"#FFFFFF")
		$('.three').css('color',"#FFFFFF")
		$('.four').css('color',"#FFFFFF")
		$('.two').css('color',"#FFFFFF")
		$('.five').css('color',"#FFFFFF")
		$('.seven').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.six').css('color',"#000000")
		$('.one').css('opacity',"1")
		$('.three').css('opacity',"1")
		$('.four').css('opacity',"1")
		$('.two').css('opacity',"1")
		$('.five').css('opacity',"1")
		$('.seven').css('opacity',"1")
		$('.one').css('color',"#000000")
		$('.three').css('color',"#000000")
		$('.four').css('color',"#000000")
		$('.two').css('color',"#000000")
		$('.five').css('color',"#000000")
		$('.seven').css('color',"#000000")
	});

	$('.seven').hover(function(){
		$('#main-logo').css("opacity","0");
		$('#main-title').css("opacity","0");
		$('#main-fb').css("opacity","0");
		$('#main-back').css("opacity","0");
		$('.bar').css('background-color','#FFFFFF');
		$('.bar').css('opacity','0.1');
		$('#container').css('background-color','#394032');
		$('.seven').css('color',"#FFFFFF")
		$('.one').css('opacity',"0.1")
		$('.three').css('opacity',"0.1")
		$('.four').css('opacity',"0.1")
		$('.two').css('opacity',"0.1")
		$('.five').css('opacity',"0.1")
		$('.six').css('opacity',"0.1")
		$('.one').css('color',"#FFFFFF")
		$('.three').css('color',"#FFFFFF")
		$('.four').css('color',"#FFFFFF")
		$('.two').css('color',"#FFFFFF")
		$('.five').css('color',"#FFFFFF")
		$('.six').css('color',"#FFFFFF")
	},function(){
		$('#main-logo').css("opacity","1");
		$('#main-title').css("opacity","1");
		$('#main-fb').css("opacity","1");
		$('#main-back').css("opacity","1");
		$('.bar').css('background-color','#000000');
		$('.bar').css('opacity','1');
		$('#container').css('background-color','#FFFFFF');
		$('.seven').css('color',"#000000")
		$('.one').css('opacity',"1")
		$('.three').css('opacity',"1")
		$('.four').css('opacity',"1")
		$('.two').css('opacity',"1")
		$('.five').css('opacity',"1")
		$('.six').css('opacity',"1")
		$('.one').css('color',"#000000")
		$('.three').css('color',"#000000")
		$('.four').css('color',"#000000")
		$('.two').css('color',"#000000")
		$('.five').css('color',"#000000")
		$('.six').css('color',"#000000")
	});



	$('#container').scroll(function() {
	
		var windowWidth = $(window).width();
		var scrollArea = 10*windowWidth;
		var scrollTop = $('#container').scrollTop();
	  	var scrollPercent = scrollTop/scrollArea ;
	  	var scrollWidth = -scrollPercent*window.innerWidth*3;
	  	var divWidth = $('#row11').width();

	  	console.log(scrollTop);
	  	console.log("window" + windowWidth)

	 // 	var row23Width = -2*divWidth+ scrollPercent*window.innerWidth*15;
		// $('#row23').css('left', row23Width + 'px');

		// var row22Width = -divWidth+scrollPercent*window.innerWidth*15;
		// $('#row22').css('left', row22Width + 'px');

		// var row21Width = scrollPercent*window.innerWidth*15;
		// $('#row21').css('left', row21Width + 'px');


		var n=3;

		for(var i=0;i<n;i++){
			var rowWidth = offset2[i]-divWidth*i+scrollPercent*window.innerWidth*15;
			$('#row2' + (i+1)).css('left', rowWidth + 'px');
		}
		
		divWidth2 = divWidth*2;


		for(var i=1;i<=n;i++){
			for(var j=0;j<=15;j++){
				if(scrollTop > divWidth2*(i+j*3)){
					offset2[i-1] = -(3+3*j)*divWidth;
				}else if(scrollTop < divWidth2*(i+3*j) && scrollTop >divWidth2*(i-1+3*j)){
					offset2[i-1] = -(3*j)*divWidth;
				}
			}
		}

		

		for(var i=0;i<n;i++){
			var rowWidth = offset[i]+divWidth*i-scrollPercent*window.innerWidth*3;
			$('#row1' + (i+1)).css('left', rowWidth + 'px');
		}

		divWidth2 = divWidth - 900;


		for(var i=1;i<=n;i++){
			for(var j=0;j<=15;j++){
				if(scrollTop > divWidth2*(i+j*3)){
					offset[i-1] = (3+3*j)*divWidth;
				}else if(scrollTop < divWidth2*(i+3*j) && scrollTop >divWidth2*(i-1+3*j)){
					offset[i-1] = (3*j)*divWidth;
				}
			}
		}

		for(var i=0;i<n;i++){
			var rowWidth = offset3[i]+divWidth*i-scrollPercent*window.innerWidth*0.2;
			$('#row3' + (i+1)).css('left', rowWidth + 'px');
		}

		// console.log(scrollTop);
		// console.log("extra" + divWidth);
		
		divWidth2 = divWidth;


		for(var i=1;i<=n;i++){
			for(var j=0;j<=15;j++){
				if(scrollTop > divWidth2*(i+j*3)){
					offset3[i-1] = (3+3*j)*divWidth;
				}else if(scrollTop < divWidth2*(i+3*j) && scrollTop >divWidth2*(i-1+3*j)){
					offset3[i-1] = (3*j)*divWidth;
				}
			}
		}


		

	});

	
});

$(document).scroll(function() {
  var span = $('span'),
    div = $('div'),
    spanHeight = span.outerHeight(),
    divHeight = div.height(),
    spanOffset = span.offset().top + spanHeight,
    divOffset = div.offset().top + divHeight;

  if (spanOffset >= divOffset) {
    span.addClass('bottom');
    var windowScroll = $(window).scrollTop() + $(window).height() - 50;
    if (spanOffset > windowScroll) {
      span.removeClass('bottom');
    }
  }
});