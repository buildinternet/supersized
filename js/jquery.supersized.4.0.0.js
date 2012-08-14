/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version 4.0
	
	@author: 	Sam Dunn
	@company: One Mighty Roar
	@blog:		Build Internet
	@website:	buildinternet.com/project/supersized
	
	@license: MIT License / GPL License
	
-------------------------------------------------- */

(function($){

	function Supersized(element, options) {
	
		// Define Element
		window.base = this;
		base.$el = $(element);
		base.el = element;
		
		// Pull settings
		base.settings = $.extend({}, $.fn.supersized.defaults, options);
		
		// Add Supersized to element
		base.$el.addClass('supersized');
				
		// General Variables
		this.currentSlide = base.settings.start_slide - 1;
		
		
		// Build Slideshow
		// --------------------------------------------------
		this._slideSet = '',
		this._slideStack = [];
		// Temp slide meta
		var slideMeta = {
			isLoaded: false,
			origHeight: 0,
			origWidth:	0,
			ratio:	1,
		};
		
		$.each(base.settings.slides, function(i){
 			base._slideStack.push(slideMeta); // Push placeholder to array
			base._slideSet += '<li class="slide-'+ i +'"></li>';
		});
		
		base.$el.html(base._slideSet); // Add HTML for list items
				
		
		// Events
		
		// Adjust on Resize
		$(window).on('resize', function(){
			base.resizeImages();
		});
		
				
		// Load Initial Slides
		// --------------------------------------------------
		base.loadSlide(0);
		base.loadSlide(1);
		base.loadSlide(2);
		
		
	};



	
	
/* -------------------- Supersized Prototype -------------------- */
	
	Supersized.prototype = {
		
		// PUBLIC METHODS
		// --------------------------------------------------
		
		// LOAD NEW SLIDE
		loadSlide:function(slide){
			
			var targetSlide = base.$el.find('li').eq(slide).addClass('ss-loading');
			var slideToLoad = 	$('<img/>').attr('src', this.settings.slides[slide].image);
			
			slideToLoad.one('load', function(){
			
				targetSlide.html(slideToLoad.hide()).removeClass('ss-loading');
				
				// Add to slide stack
				base._slideStack[slide].origHeight = slideToLoad.height();
				base._slideStack[slide].origWidth = slideToLoad.width();
				base._slideStack[slide].ratio = (slideToLoad.height() / slideToLoad.width()).toFixed(2);
				base._slideStack[slide].isLoaded = true;
				
				base.resizeImages();
				
				slideToLoad.fadeIn();
				
			}).each(function() { // When load isn't fired (cache/compatibility)
				if(this.complete) $(this).trigger('load');
			}); 
			
		},
		
		// RESIZE SLIDES
		resizeImages:function(targetSlide){
			
			// Gather slideshow size
			this.ssWidth = base.$el.width(),
			this.ssHeight = base.$el.height(),
			this.focusResize,
			this.ratio,
			this.offset;
			
			$('img', base.$el).each(function(){
				if (base._slideStack[$(this).index()].isLoaded){ // make sure image loaded
					base.ratio = base._slideStack[$(this).index()].ratio; // image ratio
					console.log(base.ratio);
					base.focusResize = $(this); // image to be resized
					
					/* ---------- Determine Resize ---------- */
					if (base.settings.fit_always){	// Fit always is enabled
						if ((base.ssHeight/base.ssWidth) > base.ratio){
							base._resizeWidth();
						} else {
							base._resizeHeight();
						}
					} else if (base.settings.fit_height_only){	// Fit height only is enabled
					 		base._resizeHeight();
					} else {	// Normal Resize
						if ((base.ssHeight <= base.settings.min_height) && (base.ssWidth <= base.settings.min_width)){	// If window smaller than minimum width and height
						
							if ((base.ssHeight/base.ssWidth) > base.ratio){
								base.settings.fit_landscape && base.ratio < 1 ? base._resizeWidth(true) : base._resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.settings.fit_portrait && base.ratio >= 1 ? base._resizeHeight(true) : base._resizeWidth(true);		// If portraits are set to fit
							}
						
						} else if (base.ssWidth <= base.settings.min_width){		// If window only smaller than minimum width
						
							if ((base.ssHeight/base.ssWidth) > base.ratio){
								base.settings.fit_landscape && base.ratio < 1 ? base._resizeWidth(true) : base._resizeHeight();	// If landscapes are set to fit
							} else {
								base.settings.fit_portrait && base.ratio >= 1 ? base._resizeHeight() : base._resizeWidth(true);		// If portraits are set to fit
							}
							
						} else if (base.ssHeight <= base.settings.min_height){	// If window only smaller than minimum height
						
							if ((base.ssHeight/base.ssWidth) > base.ratio){
								base.settings.fit_landscape && base.ratio < 1 ? base._resizeWidth() : base._resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.settings.fit_portrait && base.ratio >= 1 ? base._resizeHeight(true) : base._resizeWidth();		// If portraits are set to fit
							}
						
						} else {	// If larger than minimums
							
							if ((base.ssHeight/base.ssWidth) > base.ratio){
								base.settings.fit_landscape && base.ratio < 1 ? base._resizeWidth() : base._resizeHeight();	// If landscapes are set to fit
							} else {
								base.settings.fit_portrait && base.ratio >= 1 ? base._resizeHeight() : base._resizeWidth();		// If portraits are set to fit
							}
							
						}
					}
					/* ---------- End Resize ---------- */
					
					// Horizontally Center
					if (base.settings.horizontal_center) base.focusResize.css('left', (base.ssWidth - base.focusResize.width())/2);
					
					// Vertically Center
					if (base.settings.vertical_center) base.focusResize.css('top', (base.ssHeight - base.focusResize.height())/2);
					
					// Basic image drag and right click protection
					if (base.settings.image_protect){	
					  $('img', base.el).bind("contextmenu mousedown",function(){
					  	return false;
					  });
					}
								
				}
			});
			
		},
		
		
		// PRIVATE METHODS
		// --------------------------------------------------
		
		_resizeWidth:function(min){
		 
			if (min){	// If min height needs to be considered
				if(this.focusResize.width() < this.ssWidth || this.focusResize.width() < this.settings.min_width ){
			  	if (this.focusResize.width() * this.ratio >= this.settings.min_height){
			  		this.focusResize.width(this.settings.min_width);
			    		this.focusResize.height(this.focusResize.width() * this.ratio);
			    	}else{
			    		base._resizeHeight();
			    	}
			    }
			}else{
			  if (this.settings.min_height >= this.ssHeight && !this.settings.fit_landscape){	// If min height needs to be considered
			  	if (this.ssWidth * this.ratio >= this.settings.min_height || (this.ssWidth * this.ratio >= this.settings.min_height && this.ratio <= 1)){	// If resizing would push below min height or image is a landscape
			  		this.focusResize.width(this.ssWidth);
			  		this.focusResize.height(this.ssWidth * this.ratio);
			  	} else if (this.ratio > 1){		// Else the image is portrait
			  		this.focusResize.height(this.settings.min_height);
			  		this.focusResize.width(this.focusResize.height() / this.ratio);
			  	} else if (this.focusResize.width() < this.ssWidth) {
			  		this.focusResize.width(this.ssWidth);
			    	this.focusResize.height(this.focusResize.width() * this.ratio);
			  	}
			  }else{	// Otherwise, resize as normal
			  	this.focusResize.width(this.ssWidth);
			  	this.focusResize.height(this.ssWidth * this.ratio);
			  }
			}
			
		},
		
		_resizeHeight:function(min){
			if (min){	// If minimum height needs to be considered
				if(this.focusResize.height() < this.ssHeight){
			  	if (this.focusResize.height() / this.ratio >= this.settings.min_width){
			  		this.focusResize.height(this.settings.min_height);
			  		this.focusResize.width(this.focusResize.height() / this.ratio);
			  	}else{
			  		base._resizeWidth(true);
			  	}
			  }
			}else{	// Otherwise, resized as normal
			  if (this.settings.min_width >= this.ssWidth){	// If minimum width needs to be considered
			  	if (this.ssHeight / ratio >= this.settings.min_width || this.ratio > 1){	// If resizing would push below minimum width or image is a portrait
			  		this.focusResize.height(this.ssHeight);
			  		this.focusResize.width(this.ssHeight / this.ratio);
			  	} else if (this.ratio <= 1){		// Else the image is landscape
			  		this.focusResize.width(this.settings.min_width);
			    		this.focusResize.height(this.focusResize.width() * this.ratio);
			  	}
			  }else{	// Otherwise, resize as normal
			  	this.focusResize.height(this.ssHeight);
			  	this.focusResize.width(this.ssHeight / this.ratio);
			  }
			}
		}
		
	};
	
/* -------------------- End Supersized Prototype -------------------- */

	
	$.fn.supersized = function(options) {    	
		return this.each(function(){
			var supersized = new Supersized($(this), options);
			$(this).data("supersized", supersized);
		});
	};
	
	
	// Default Options
	// --------------------------------------------------
	$.fn.supersized.defaults = {
	
		// Functionality
		slideshow         :   1,			// Slideshow on/off
		autoplay					:		1,			// Slideshow starts playing automatically
		start_slide       :   1,			// Start slide (0 is random)
		stop_loop					:		0,			// Stops slideshow on last slide
		random						: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval    :   5000,		// Length between transitions
		transition        :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed	:		750,		// Speed of transition
		new_window				:		1,			// Image links open in new window/tab
		pause_hover       :   0,			// Pause slideshow on hover
		keyboard_nav      :   1,			// Keyboard navigation on/off
		performance				:		1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed //  (Only works for Firefox/IE, not Webkit)
		image_protect			:		1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position
		fit_always				:		0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_landscape			:   0,			// Landscape images will not exceed browser width
		fit_portrait      :   1,			// Portrait images will not exceed browser height
		fit_height_only		:		0,			// Images will not exceed browser height		   
		min_width		      :   0,			// Min width allowed (in pixels)
		min_height		    :   0,			// Min height allowed (in pixels)
		horizontal_center :   1,			// Horizontally center background
		vertical_center   :   1,			// Vertically center background
												   
		// Components							
		slide_links				:	1,			// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	1,			// Individual thumb links for each slide
		thumbnail_navigation    :   0			// Thumbnail navigation
		
	};
	
	$.fn.supersized.settings = {};


})(jQuery);