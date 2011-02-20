/*
	Supersized - Fullscreen Slideshow jQuery Plugin
	Version 3.1 Core
	www.buildinternet.com/project/supersized
	
	By Sam Dunn / One Mighty Roar (www.onemightyroar.com)
*/

(function($){

	//Add in Supersized elements
	$(document).ready(function() {
		$('body').wrapInner('<div id="page-wrapper" />').prepend('<div id="loading"></div>').append('<div id="supersized"></div>');
	});
	
	//Resize image to fill background
	$.supersized = function( options ) {
		
		var element = $('#supersized');		//Define element for Supersized
		
		//Default Settings
		var settings = {
      		vertical_center		:	  0,	//Vertically center background
      		start_slide			:	  1,	//Start slide (Requires multiple background images)
      		random_slide		:	  0,	//Load random background image
      		slides				:	  [ 	//Slides are overwritten from options
      								  		{image : '' } 
      								  ]		
    	};
		
		//Combine options with default settings
		if (options) {
			var options = $.extend(settings, options);	//Pull from both defaults and supplied options
		}else{
			var options = $.extend(settings);			//Only pull from default settings		
		}	
		
		//Determine starting decide (random or defined)
		if (options.random_slide){
			var current_slide = Math.floor(Math.random()*options.slides.length);	//Generate random slide number
		}else{
			var current_slide = options.start_slide - 1;	//Default to defined start slide
		}
		
		$("<img/>").attr("src", options.slides[current_slide].image).appendTo(element);		//Set current image
		
		element.hide();		//Hide image to be faded in
		
		//Display image once page has loaded
		$(window).load(function(){
		
			$('#loading').hide();		//Hide loading animation
			element.fadeIn('fast');		//Fade in background
			
			resizenow(element, options);
			
		});
		
		//Adjust image when browser is resized
		$(window).resize(function(){
		
    		resizenow(element, options);
    		
		});
		
	};
	
	//Adjust image size
	function resizenow(element, options) {
	  	return element.each(function() {
	  	
	  		var t = $('img', element);
			var ratio = (t.height()/t.width()).toFixed(2);	//Define image ratio
			
			//Gather browser size
			var browserwidth = $(window).width();
			var browserheight = $(window).height();
			var offset;

			//Resize image to proper ratio
			if ((browserheight/browserwidth) > ratio){
			    t.height(browserheight);
			    t.width(browserheight / ratio);
			} else {
			    t.width(browserwidth);
			    t.height(browserwidth * ratio);
			}
			
			//Vertically Center
			if (options.vertical_center == 1){
				t.css('left', (browserwidth - t.width())/2);
				t.css('top', (browserheight - t.height())/2);
			}
			
			return false;
		});
	};

	
})(jQuery);