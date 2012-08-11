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
		var base = this;
		base.$el = $(element);
		base.el = element;
		
		// Pull settings
		base.settings = $.extend({}, $.fn.supersized.defaults, options);
		
		// Add Supersized to element
		base.$el.append('<ul class="supersized"></ul>');
		base.$ss = base.$el.find('.supersized');
				
		// Variables
		base.currentSlide = base.settings.start_slide - 1;
		
		// Build Slideshow
		base._buildSlide = 0;
		base._slideSet = '';
		
		while(base._buildSlide <= base.settings.slides.length-1){
			base._slideSet += '<li class="slide-'+base._buildSlide+'"></li>';
			base._buildSlide++;
		}
		base.$ss.html(base._slideSet);
		
		
		/*// Load Slide
		imageLink = (api.getField('url')) ? "href='" + api.getField('url') + "'" : "";
		var img = $('<img src="'+api.getField('image')+'"/>');
			
			var slideCurrent= base.el+' li:eq('+vars.current_slide+')';
			img.appendTo(slideCurrent).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading activeslide');
			
			img.load(function(){
				base._origDim($(this));
				base.resizeNow();	// Resize background image
				base.launch();
				if( typeof theme != 'undefined' && typeof theme._init == "function" ) theme._init();	// Load Theme
			});
		*/
		
		
		
		// Place Navigation Links
		base._buildMarkers = 0,
		base._slideSet = '',
		base._markers = '',
		base._markerContent
		base._thumbMarkers = '',
		base._thumbImage;
		
		
		if(base._buildSlide == base.settings.start_slide - 1){
				
					/*// Slide links
					if (base.settings.slide_links)base._markers = base._markers+'<li class="slide-link-'+buildSlide+' current-slide"><a>'+base._markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.settings.thumb_links){
						base.settings.slides[base._buildSlide].thumb ? base._thumbImage = base.settings.slides[base._buildSlide].thumb : base._thumbImage = base.settings.slides[base._buildSlide].image;
						base._thumbMarkers = base._thumbMarkers+'<li class="thumb'+base._buildSlide+' current-thumb"><img src="'+base._thumbImage+'"/></li>';
					};
				}else{
					// Slide links
					if (base.settings.slide_links) base._markers = base._markers+'<li class="slide-link-'+buildSlide+'" ><a>'+base._markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.settings.thumb_links){
						base.settings.slides[base._buildSlide].thumb ? base._thumbImage = base.settings.slides[buildSlide].thumb : thumbImage = base.settings.slides[buildSlide].image;
						base._thumbMarkers = base._thumbMarkers+'<li class="thumb'+base._buildSlide+'"><img src="'+base._thumbImage+'"/></li>';
					};
				}
				base._buildSlide++;*/
		}
		
		
		
	};


	$.fn.supersized = function(options) {    	
		return this.each(function(){
			var supersized = new Supersized($(this), options);
			$(this).data("supersized", supersized);
		});
	};
	
	
	// Supersized Prototype
	// --------------------------------------------------
	Supersized.prototype = {
		
		// PUBLIC METHODS
		// ==============
		nameEl:function(){
			console.log(this.settings.slideshow);
		},
		
		
		
		// PRIVATE METHODS
		// ===============
		_resizeEvent:function(){
			console.log(this);
		}
		
		
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