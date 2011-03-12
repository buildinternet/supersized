/*
	Supersized - Fullscreen Background jQuery Plugin
	Version 3.1.2 Core
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
			fit_landscape			:   0,		//Landscape images will not exceed browser width
			image_protect			:	1		//Disables image dragging and right click with Javascript
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
					thisSlide = $(this);
					
					//Gather browser size
					var browserwidth = $(window).width();
					var browserheight = $(window).height();
					var offset;
					
					
					/**Resize image to proper ratio**/
					
					if ((browserheight <= options.min_height) && (browserwidth <= options.min_width)){	//If window smaller than minimum width and height
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth(true) : resizeHeight(true);	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight(true) : resizeWidth(true);		//If portraits are set to fit
						}
					
					} else if (browserwidth <= options.min_width){		//If window only smaller than minimum width
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth(true) : resizeHeight();	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight() : resizeWidth(true);		//If portraits are set to fit
						}
						
					} else if (browserheight <= options.min_height){	//If window only smaller than minimum height
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth() : resizeHeight(true);	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight(true) : resizeWidth();		//If portraits are set to fit
						}
					
					} else {	//If larger than minimums
					
						if ((browserheight/browserwidth) > ratio){
							options.fit_landscape && ratio <= 1 ? resizeWidth() : resizeHeight();	//If landscapes are set to fit
						} else {
							options.fit_portrait && ratio > 1 ? resizeHeight() : resizeWidth();		//If portraits are set to fit
						}
						
					}
					
					/**End Image Resize**/
					
					
					/**Resize Functions**/
					
					function resizeWidth(minimum){
						if (minimum){	//If minimum height needs to be considered
							if(thisSlide.width() < browserwidth || thisSlide.width() < options.min_width ){
								if (thisSlide.width() * ratio >= options.min_height){
									thisSlide.width(options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
						    	}else{
						    		resizeHeight();
						    	}
						    }
						}else{
							if (options.min_height >= browserheight && !options.fit_landscape){	//If minimum height needs to be considered
								if (browserwidth * ratio >= options.min_height || (browserwidth * ratio >= options.min_height && ratio <= 1)){	//If resizing would push below minimum height or image is a landscape
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								} else if (ratio > 1){		//Else the image is portrait
									thisSlide.height(options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								} else if (thisSlide.width() < browserwidth) {
									thisSlide.width(browserwidth);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	//Otherwise, resize as normal
								thisSlide.width(browserwidth);
								thisSlide.height(browserwidth * ratio);
							}
						}
					};
					
					function resizeHeight(minimum){
						if (minimum){	//If minimum height needs to be considered
							if(thisSlide.height() < browserheight){
								if (thisSlide.height() / ratio >= options.min_width){
									thisSlide.height(options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								}else{
									resizeWidth(true);
								}
							}
						}else{	//Otherwise, resized as normal
							if (options.min_width >= browserwidth){	//If minimum width needs to be considered
								if (browserheight / ratio >= options.min_width || ratio > 1){	//If resizing would push below minimum width or image is a portrait
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								} else if (ratio <= 1){		//Else the image is landscape
									thisSlide.width(options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	//Otherwise, resize as normal
								thisSlide.height(browserheight);
								thisSlide.width(browserheight / ratio);
							}
						}
					};
					
					/**End Resize Functions**/
					
					
					//Horizontally Center
					if (options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}
					
					//Vertically Center
					if (options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}
					
				});
				
				//Basic image drag and right click protection
				if (options.image_protect){
					
					$('img', element).bind("contextmenu",function(){
						return false;
					});
					$('img', element).bind("mousedown",function(){
						return false;
					});
				
				}
				
				return false;
				
			});
		};
		
	}; //End Supersized

	
})(jQuery);