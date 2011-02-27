/*
 * jQuery UI Effects Slide 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */

(function(a,b){a.effects.slide=function(c){return this.queue(function(){var f=a(this),e=["position","top","bottom","left","right"];var j=a.effects.setMode(f,c.options.mode||"show");var i=c.options.direction||"left";a.effects.save(f,e);f.show();a.effects.createWrapper(f).css({overflow:"hidden"});var g=(i=="up"||i=="down")?"top":"left";var d=(i=="up"||i=="left")?"pos":"neg";var k=c.options.distance||(g=="top"?f.outerHeight({margin:true}):f.outerWidth({margin:true}));if(j=="show"){f.css(g,d=="pos"?(isNaN(k)?"-"+k:-k):k)}var h={};h[g]=(j=="show"?(d=="pos"?"+=":"-="):(d=="pos"?"-=":"+="))+k;f.animate(h,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){if(j=="hide"){f.hide()}a.effects.restore(f,e);a.effects.removeWrapper(f);if(c.callback){c.callback.apply(this,arguments)}f.dequeue()}})})}})(jQuery);