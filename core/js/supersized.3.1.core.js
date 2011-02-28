/*
	Supersized - Fullscreen Background jQuery Plugin
	Version 3.1 Core
	www.buildinternet.com/project/supersized
	
	By Sam Dunn / One Mighty Roar (www.onemightyroar.com)
	Released under MIT License / GPL License
*/

(function($){

	//Add in Supersized elements
	$(document).ready(function() {
		$('body').prepend('<div id="supersized-loader"></div>').append('<div id="supersized"></div>');
	});
	
	//Resize image to fill background
	$.supersized = function( options ) {
		
		//Default settings
		var settings = {
      		start_slide				:	1,		//Start slide (0 is random) //Requires multiple background images
			vertical_center         :   1,		//Vertically center background
			horizontal_center       :   1,		//Horizontally center background
			min_width		        :   0,		//Min width allowed (in pixels)
			min_height		        :   0,		//Min height allowed (in pixels)
			fit_portrait         	:   0,		//Portrait images will not exceed browser height
			fit_landscape			:   0		//Landscape images will not exceed browser width
    	};
		
		var element = $('#supersized');		//Define element for Supersized
		
		//Combine options with default settings
		if (options) {
			var options = $.extend(settings, options);	//Pull from both defaults and supplied options
		}else{
			var options = $.extend(settings);			//Only pull from default settings		
		}	
		
		//Determine starting slide (random or defined)
		if (options.start_slide){
			var currentSlide = options.start_slide - 1;	//Default to defined start slide
		}else{
			var currentSlide = Math.floor(Math.random()*options.slides.length);	//Generate random slide number
		}
		
		$("<img/>").attr("src", options.slides[currentSlide].image).appendTo(element);		//Set current image
		
		element.hide();		//Hide image to be faded in
		
		//Display image once page has loaded
		$(window).load(function(){
		
			$('#supersized-loader').hide();		//Hide loading animation
			element.fadeIn('fast');				//Fade in background
			
			resizenow();
			
		});
		
		//Adjust image when browser is resized
		$(window).resize(function(){
    		resizenow();
		});
	
		//Adjust image size
		function resizenow() {
			return element.each(function() {
		  	
		  		var t = $('img', element);
		  		
		  		//Resize each image seperately
		  		$(t).each(function(){
		  			
					var ratio = ($(this).height()/$(this).width()).toFixed(2);	//Define image ratio
					
					//Gather browser size
					var browserwidth = $(window).width();
					var browserheight = $(window).height();
					var offset;
					
					//Resize image to proper ratio
					if ((browserheight > options.min_height) || (browserwidth > options.min_width)){	//If window larger than minimum width/height
						
						if ((browserheight/browserwidth) > ratio){
							
							if ( options.fit_landscape && ratio <= 1){	//If landscapes are set to fit
						    	$(this).width(browserwidth);
						    	$(this).height(browserwidth * ratio);
							}else{										//Otherwise handle normally
								$(this).height(browserheight);
							    $(this).width(browserheight / ratio);
							}
						
						} else {
						
							if ( options.fit_portrait && ratio > 1){	//If portraits are set to fit
								$(this).height(browserheight);
							    $(this).width(browserheight / ratio);
							}else{										//Otherwise handle normally
								$(this).width(browserwidth);
						    	$(this).height(browserwidth * ratio);
							}
						
						}	//End dynamic resizing
						
					}	//End minimum size check
					
					//Horizontally Center
					if (options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}
					
					//Vertically Center
					if (options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}
					
				});
				
				return false;
				
			});
		};
		
	}; //End Supersized

	
})(jQuery);