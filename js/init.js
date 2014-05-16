$ = jQuery;
/* bxslider
http://bxslider.com/ */
(function(e){var t={};var n={mode:"horizontal",slideSelector:"",infiniteLoop:true,hideControlOnEnd:false,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:false,captions:false,ticker:false,tickerHover:false,adaptiveHeight:false,adaptiveHeightSpeed:500,video:false,useCSS:true,preloadImages:"visible",responsive:true,touchEnabled:true,swipeThreshold:50,oneToOneTouch:true,preventDefaultSwipeX:true,preventDefaultSwipeY:false,pager:true,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:true,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:false,startText:"Start",stopText:"Stop",autoControlsCombine:false,autoControlsSelector:null,auto:false,pause:4e3,autoStart:true,autoDirection:"next",autoHover:false,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};e.fn.bxSlider=function(r){if(this.length==0)return this;if(this.length>1){this.each(function(){e(this).bxSlider(r)});return this}var s={};var o=this;t.el=this;var u=e(window).width();var a=e(window).height();var f=function(){s.settings=e.extend({},n,r);s.settings.slideWidth=parseInt(s.settings.slideWidth);s.children=o.children(s.settings.slideSelector);if(s.children.length<s.settings.minSlides)s.settings.minSlides=s.children.length;if(s.children.length<s.settings.maxSlides)s.settings.maxSlides=s.children.length;if(s.settings.randomStart)s.settings.startSlide=Math.floor(Math.random()*s.children.length);s.active={index:s.settings.startSlide};s.carousel=s.settings.minSlides>1||s.settings.maxSlides>1;if(s.carousel)s.settings.preloadImages="all";s.minThreshold=s.settings.minSlides*s.settings.slideWidth+(s.settings.minSlides-1)*s.settings.slideMargin;s.maxThreshold=s.settings.maxSlides*s.settings.slideWidth+(s.settings.maxSlides-1)*s.settings.slideMargin;s.working=false;s.controls={};s.interval=null;s.animProp=s.settings.mode=="vertical"?"top":"left";s.usingCSS=s.settings.useCSS&&s.settings.mode!="fade"&&function(){var e=document.createElement("div");var t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t){if(e.style[t[n]]!==undefined){s.cssPrefix=t[n].replace("Perspective","").toLowerCase();s.animProp="-"+s.cssPrefix+"-transform";return true}}return false}();if(s.settings.mode=="vertical")s.settings.maxSlides=s.settings.minSlides;o.data("origStyle",o.attr("style"));o.children(s.settings.slideSelector).each(function(){e(this).data("origStyle",e(this).attr("style"))});l()};var l=function(){o.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>');s.viewport=o.parent();s.loader=e('<div class="bx-loading" />');s.viewport.prepend(s.loader);o.css({width:s.settings.mode=="horizontal"?s.children.length*100+215+"%":"auto",position:"relative"});if(s.usingCSS&&s.settings.easing){o.css("-"+s.cssPrefix+"-transition-timing-function",s.settings.easing)}else if(!s.settings.easing){s.settings.easing="swing"}var t=m();s.viewport.css({width:"100%",overflow:"hidden",position:"relative"});s.viewport.parent().css({maxWidth:d()});if(!s.settings.pager){s.viewport.parent().css({margin:"0 auto 0px"})}s.children.css({"float":s.settings.mode=="horizontal"?"left":"none",listStyle:"none",position:"relative"});s.children.css("width",v());if(s.settings.mode=="horizontal"&&s.settings.slideMargin>0)s.children.css("marginRight",s.settings.slideMargin);if(s.settings.mode=="vertical"&&s.settings.slideMargin>0)s.children.css("marginBottom",s.settings.slideMargin);if(s.settings.mode=="fade"){s.children.css({position:"absolute",zIndex:0,display:"none"});s.children.eq(s.settings.startSlide).css({zIndex:50,display:"block"})}s.controls.el=e('<div class="bx-controls" />');if(s.settings.captions)N();s.active.last=s.settings.startSlide==g()-1;if(s.settings.video)o.fitVids();var n=s.children.eq(s.settings.startSlide);if(s.settings.preloadImages=="all")n=s.children;if(!s.settings.ticker){if(s.settings.pager)S();if(s.settings.controls)x();if(s.settings.auto&&s.settings.autoControls)T();if(s.settings.controls||s.settings.autoControls||s.settings.pager)s.viewport.after(s.controls.el)}else{s.settings.pager=false}c(n,h)};var c=function(t,n){var r=t.find("img, iframe").length;if(r==0){n();return}var i=0;t.find("img, iframe").each(function(){e(this).one("load",function(){if(++i==r)n()}).each(function(){if(this.complete)e(this).load()})})};var h=function(){if(s.settings.infiniteLoop&&s.settings.mode!="fade"&&!s.settings.ticker){var t=s.settings.mode=="vertical"?s.settings.minSlides:s.settings.maxSlides;var n=s.children.slice(0,t).clone().addClass("bx-clone");var r=s.children.slice(-t).clone().addClass("bx-clone");o.append(n).prepend(r)}s.loader.remove();b();if(s.settings.mode=="vertical")s.settings.adaptiveHeight=true;s.viewport.height(p());o.redrawSlider();s.settings.onSliderLoad(s.active.index);s.initialized=true;if(s.settings.responsive)e(window).bind("resize",U);if(s.settings.auto&&s.settings.autoStart)H();if(s.settings.ticker)B();if(s.settings.pager)M(s.settings.startSlide);if(s.settings.controls)P();if(s.settings.touchEnabled&&!s.settings.ticker)F()};var p=function(){var t=0;var n=e();if(s.settings.mode!="vertical"&&!s.settings.adaptiveHeight){n=s.children}else{if(!s.carousel){n=s.children.eq(s.active.index)}else{var r=s.settings.moveSlides==1?s.active.index:s.active.index*y();n=s.children.eq(r);for(i=1;i<=s.settings.maxSlides-1;i++){if(r+i>=s.children.length){n=n.add(s.children.eq(i-1))}else{n=n.add(s.children.eq(r+i))}}}}if(s.settings.mode=="vertical"){n.each(function(n){t+=e(this).outerHeight()});if(s.settings.slideMargin>0){t+=s.settings.slideMargin*(s.settings.minSlides-1)}}else{t=Math.max.apply(Math,n.map(function(){return e(this).outerHeight(false)}).get())}return t};var d=function(){var e="100%";if(s.settings.slideWidth>0){if(s.settings.mode=="horizontal"){e=s.settings.maxSlides*s.settings.slideWidth+(s.settings.maxSlides-1)*s.settings.slideMargin}else{e=s.settings.slideWidth}}return e};var v=function(){var e=s.settings.slideWidth;var t=s.viewport.width();if(s.settings.slideWidth==0||s.settings.slideWidth>t&&!s.carousel||s.settings.mode=="vertical"){e=t}else if(s.settings.maxSlides>1&&s.settings.mode=="horizontal"){if(t>s.maxThreshold){}else if(t<s.minThreshold){e=(t-s.settings.slideMargin*(s.settings.minSlides-1))/s.settings.minSlides}}return e};var m=function(){var e=1;if(s.settings.mode=="horizontal"&&s.settings.slideWidth>0){if(s.viewport.width()<s.minThreshold){e=s.settings.minSlides}else if(s.viewport.width()>s.maxThreshold){e=s.settings.maxSlides}else{var t=s.children.first().width();e=Math.floor(s.viewport.width()/t)}}else if(s.settings.mode=="vertical"){e=s.settings.minSlides}return e};var g=function(){var e=0;if(s.settings.moveSlides>0){if(s.settings.infiniteLoop){e=s.children.length/y()}else{var t=0;var n=0;while(t<s.children.length){++e;t=n+m();n+=s.settings.moveSlides<=m()?s.settings.moveSlides:m()}}}else{e=Math.ceil(s.children.length/m())}return e};var y=function(){if(s.settings.moveSlides>0&&s.settings.moveSlides<=m()){return s.settings.moveSlides}return m()};var b=function(){if(s.children.length>s.settings.maxSlides&&s.active.last&&!s.settings.infiniteLoop){if(s.settings.mode=="horizontal"){var e=s.children.last();var t=e.position();w(-(t.left-(s.viewport.width()-e.width())),"reset",0)}else if(s.settings.mode=="vertical"){var n=s.children.length-s.settings.minSlides;var t=s.children.eq(n).position();w(-t.top,"reset",0)}}else{var t=s.children.eq(s.active.index*y()).position();if(s.active.index==g()-1)s.active.last=true;if(t!=undefined){if(s.settings.mode=="horizontal")w(-t.left,"reset",0);else if(s.settings.mode=="vertical")w(-t.top,"reset",0)}}};var w=function(e,t,n,r){if(s.usingCSS){var i=s.settings.mode=="vertical"?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)";o.css("-"+s.cssPrefix+"-transition-duration",n/1e3+"s");if(t=="slide"){o.css(s.animProp,i);o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");_()})}else if(t=="reset"){o.css(s.animProp,i)}else if(t=="ticker"){o.css("-"+s.cssPrefix+"-transition-timing-function","linear");o.css(s.animProp,i);o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");w(r["resetValue"],"reset",0);j()})}}else{var u={};u[s.animProp]=e;if(t=="slide"){o.animate(u,n,s.settings.easing,function(){_()})}else if(t=="reset"){o.css(s.animProp,e)}else if(t=="ticker"){o.animate(u,speed,"linear",function(){w(r["resetValue"],"reset",0);j()})}}};var E=function(){var t="";var n=g();for(var r=0;r<n;r++){var i="";if(s.settings.buildPager&&e.isFunction(s.settings.buildPager)){i=s.settings.buildPager(r);s.pagerEl.addClass("bx-custom-pager")}else{i=r+1;s.pagerEl.addClass("bx-default-pager")}t+='<div class="bx-pager-item"><a href="" data-slide-index="'+r+'" class="bx-pager-link">'+i+"</a></div>"}s.pagerEl.html(t)};var S=function(){if(!s.settings.pagerCustom){s.pagerEl=e('<div class="bx-pager" />');if(s.settings.pagerSelector){e(s.settings.pagerSelector).html(s.pagerEl)}else{s.controls.el.addClass("bx-has-pager").append(s.pagerEl)}E()}else{s.pagerEl=e(s.settings.pagerCustom)}s.pagerEl.delegate("a","click",O)};var x=function(){s.controls.next=e('<a class="bx-next" href="">'+s.settings.nextText+"</a>");s.controls.prev=e('<a class="bx-prev" href="">'+s.settings.prevText+"</a>");s.controls.next.bind("click",C);s.controls.prev.bind("click",k);if(s.settings.nextSelector){e(s.settings.nextSelector).append(s.controls.next)}if(s.settings.prevSelector){e(s.settings.prevSelector).append(s.controls.prev)}if(!s.settings.nextSelector&&!s.settings.prevSelector){s.controls.directionEl=e('<div class="bx-controls-direction" />');s.controls.directionEl.append(s.controls.prev).append(s.controls.next);s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl)}};var T=function(){s.controls.start=e('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+s.settings.startText+"</a></div>");s.controls.stop=e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+s.settings.stopText+"</a></div>");s.controls.autoEl=e('<div class="bx-controls-auto" />');s.controls.autoEl.delegate(".bx-start","click",L);s.controls.autoEl.delegate(".bx-stop","click",A);if(s.settings.autoControlsCombine){s.controls.autoEl.append(s.controls.start)}else{s.controls.autoEl.append(s.controls.start).append(s.controls.stop)}if(s.settings.autoControlsSelector){e(s.settings.autoControlsSelector).html(s.controls.autoEl)}else{s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl)}D(s.settings.autoStart?"stop":"start")};var N=function(){s.children.each(function(t){var n=e(this).find("img:first").attr("title");if(n!=undefined&&(""+n).length){e(this).append('<div class="bx-caption"><span>'+n+"</span></div>")}})};var C=function(e){if(s.settings.auto)o.stopAuto();o.goToNextSlide();e.preventDefault()};var k=function(e){if(s.settings.auto)o.stopAuto();o.goToPrevSlide();e.preventDefault()};var L=function(e){o.startAuto();e.preventDefault()};var A=function(e){o.stopAuto();e.preventDefault()};var O=function(t){if(s.settings.auto)o.stopAuto();var n=e(t.currentTarget);var r=parseInt(n.attr("data-slide-index"));if(r!=s.active.index)o.goToSlide(r);t.preventDefault()};var M=function(t){var n=s.children.length;if(s.settings.pagerType=="short"){if(s.settings.maxSlides>1){n=Math.ceil(s.children.length/s.settings.maxSlides)}s.pagerEl.html(t+1+s.settings.pagerShortSeparator+n);return}s.pagerEl.find("a").removeClass("active");s.pagerEl.each(function(n,r){e(r).find("a").eq(t).addClass("active")})};var _=function(){if(s.settings.infiniteLoop){var e="";if(s.active.index==0){e=s.children.eq(0).position()}else if(s.active.index==g()-1&&s.carousel){e=s.children.eq((g()-1)*y()).position()}else if(s.active.index==s.children.length-1){e=s.children.eq(s.children.length-1).position()}if(s.settings.mode=="horizontal"){w(-e.left,"reset",0);}else if(s.settings.mode=="vertical"){w(-e.top,"reset",0);}}s.working=false;s.settings.onSlideAfter(s.children.eq(s.active.index),s.oldIndex,s.active.index)};var D=function(e){if(s.settings.autoControlsCombine){s.controls.autoEl.html(s.controls[e])}else{s.controls.autoEl.find("a").removeClass("active");s.controls.autoEl.find("a:not(.bx-"+e+")").addClass("active")}};var P=function(){if(g()==1){s.controls.prev.addClass("disabled");s.controls.next.addClass("disabled")}else if(!s.settings.infiniteLoop&&s.settings.hideControlOnEnd){if(s.active.index==0){s.controls.prev.addClass("disabled");s.controls.next.removeClass("disabled")}else if(s.active.index==g()-1){s.controls.next.addClass("disabled");s.controls.prev.removeClass("disabled")}else{s.controls.prev.removeClass("disabled");s.controls.next.removeClass("disabled")}}};var H=function(){if(s.settings.autoDelay>0){var e=setTimeout(o.startAuto,s.settings.autoDelay)}else{o.startAuto()}if(s.settings.autoHover){o.hover(function(){if(s.interval){o.stopAuto(true);s.autoPaused=true}},function(){if(s.autoPaused){o.startAuto(true);s.autoPaused=null}})}};var B=function(){var t=0;if(s.settings.autoDirection=="next"){o.append(s.children.clone().addClass("bx-clone"))}else{o.prepend(s.children.clone().addClass("bx-clone"));var n=s.children.first().position();t=s.settings.mode=="horizontal"?-n.left:-n.top}w(t,"reset",0);s.settings.pager=false;s.settings.controls=false;s.settings.autoControls=false;if(s.settings.tickerHover&&!s.usingCSS){s.viewport.hover(function(){o.stop()},function(){var t=0;s.children.each(function(n){t+=s.settings.mode=="horizontal"?e(this).outerWidth(true):e(this).outerHeight(true)});var n=s.settings.speed/t;var r=s.settings.mode=="horizontal"?"left":"top";var i=n*(t-Math.abs(parseInt(o.css(r))));j(i)})}j()};var j=function(e){speed=e?e:s.settings.speed;var t={left:0,top:0};var n={left:0,top:0};if(s.settings.autoDirection=="next"){t=o.find(".bx-clone").first().position()}else{n=s.children.first().position()}var r=s.settings.mode=="horizontal"?-t.left:-t.top;var i=s.settings.mode=="horizontal"?-n.left:-n.top;var u={resetValue:i};w(r,"ticker",speed,u)};var F=function(){s.touch={start:{x:0,y:0},end:{x:0,y:0}};s.viewport.bind("touchstart",I)};var I=function(e){if(s.working){e.preventDefault()}else{s.touch.originalPos=o.position();var t=e.originalEvent;s.touch.start.x=t.changedTouches[0].pageX;s.touch.start.y=t.changedTouches[0].pageY;s.viewport.bind("touchmove",q);s.viewport.bind("touchend",R)}};var q=function(e){if(s.settings.mode!="fade"){var t=e.originalEvent;var n=0;if(s.settings.mode=="horizontal"){var r=t.changedTouches[0].pageX-s.touch.start.x;var i=t.changedTouches[0].pageY-s.touch.start.y;if(Math.abs(r)>20&&Math.abs(r)>Math.abs(i)){n=s.touch.originalPos.left+r;w(n,"reset",0);e.preventDefault()}}else{e.preventDefault();var o=t.changedTouches[0].pageY-s.touch.start.y;n=s.touch.originalPos.top+o;w(n,"reset",0)}}};var R=function(e){s.viewport.unbind("touchmove",q);var t=e.originalEvent;var n=0;s.touch.end.x=t.changedTouches[0].pageX;s.touch.end.y=t.changedTouches[0].pageY;if(s.settings.mode=="fade"){var r=Math.abs(s.touch.start.x-s.touch.end.x);if(r>=s.settings.swipeThreshold){s.touch.start.x>s.touch.end.x?o.goToNextSlide():o.goToPrevSlide();o.stopAuto()}}else{var r=0;if(s.settings.mode=="horizontal"){r=s.touch.end.x-s.touch.start.x;n=s.touch.originalPos.left}else{r=s.touch.end.y-s.touch.start.y;n=s.touch.originalPos.top}if(!s.settings.infiniteLoop&&(s.active.index==0&&r>0||s.active.last&&r<0)){w(n,"reset",200)}else{if(Math.abs(r)>=s.settings.swipeThreshold){r<0?o.goToNextSlide():o.goToPrevSlide();o.stopAuto()}else{w(n,"reset",200)}}}s.viewport.unbind("touchend",R)};var U=function(t){var n=e(window).width();var r=e(window).height();if(u!=n||a!=r){u=n;a=r;o.redrawSlider()}};o.goToSlide=function(t,n){if(s.working||s.active.index==t)return;s.working=true;s.oldIndex=s.active.index;if(t<0){s.active.index=g()-1}else if(t>=g()){s.active.index=0}else{s.active.index=t}s.settings.onSlideBefore(s.children.eq(s.active.index),s.oldIndex,s.active.index);if(n=="next"){s.settings.onSlideNext(s.children.eq(s.active.index),s.oldIndex,s.active.index)}else if(n=="prev"){s.settings.onSlidePrev(s.children.eq(s.active.index),s.oldIndex,s.active.index)}s.active.last=s.active.index>=g()-1;if(s.settings.pager)M(s.active.index);if(s.settings.controls)P();if(s.settings.mode=="fade"){if(s.settings.adaptiveHeight&&s.viewport.height()!=p()){s.viewport.animate({height:p()},s.settings.adaptiveHeightSpeed)}s.children.filter(":visible").fadeOut(s.settings.speed).css({zIndex:0});s.children.eq(s.active.index).css("zIndex",51).fadeIn(s.settings.speed,function(){e(this).css("zIndex",50);_()})}else{if(s.settings.adaptiveHeight&&s.viewport.height()!=p()){s.viewport.animate({height:p()},s.settings.adaptiveHeightSpeed)}var r=0;var i={left:0,top:0};if(!s.settings.infiniteLoop&&s.carousel&&s.active.last){if(s.settings.mode=="horizontal"){var u=s.children.eq(s.children.length-1);i=u.position();r=s.viewport.width()-u.outerWidth()}else{var a=s.children.length-s.settings.minSlides;i=s.children.eq(a).position()}}else if(s.carousel&&s.active.last&&n=="prev"){var f=s.settings.moveSlides==1?s.settings.maxSlides-y():(g()-1)*y()-(s.children.length-s.settings.maxSlides);var u=o.children(".bx-clone").eq(f);i=u.position()}else if(n=="next"&&s.active.index==0){i=o.find("> .bx-clone").eq(s.settings.maxSlides).position();s.active.last=false}else if(t>=0){var l=t*y();i=s.children.eq(l).position()}if("undefined"!==typeof i){var c=s.settings.mode=="horizontal"?-(i.left-r):-i.top;w(c,"slide",s.settings.speed)}}};o.goToNextSlide=function(){if(!s.settings.infiniteLoop&&s.active.last)return;var e=parseInt(s.active.index)+1;o.goToSlide(e,"next")};o.goToPrevSlide=function(){if(!s.settings.infiniteLoop&&s.active.index==0)return;var e=parseInt(s.active.index)-1;o.goToSlide(e,"prev")};o.startAuto=function(e){if(s.interval)return;s.interval=setInterval(function(){s.settings.autoDirection=="next"?o.goToNextSlide():o.goToPrevSlide()},s.settings.pause);if(s.settings.autoControls&&e!=true)D("stop")};o.stopAuto=function(e){if(!s.interval)return;clearInterval(s.interval);s.interval=null;if(s.settings.autoControls&&e!=true)D("start")};o.getCurrentSlide=function(){return s.active.index};o.getSlideCount=function(){return s.children.length};o.redrawSlider=function(){s.children.add(o.find(".bx-clone")).outerWidth(v());s.viewport.css("height",p());if(!s.settings.ticker)b();if(s.active.last)s.active.index=g()-1;if(s.active.index>=g())s.active.last=true;if(s.settings.pager&&!s.settings.pagerCustom){E();M(s.active.index)}};o.destroySlider=function(){if(!s.initialized)return;s.initialized=false;e(".bx-clone",this).remove();s.children.each(function(){e(this).data("origStyle")!=undefined?e(this).attr("style",e(this).data("origStyle")):e(this).removeAttr("style")});e(this).data("origStyle")!=undefined?this.attr("style",e(this).data("origStyle")):e(this).removeAttr("style");e(this).unwrap().unwrap();if(s.controls.el)s.controls.el.remove();if(s.controls.next)s.controls.next.remove();if(s.controls.prev)s.controls.prev.remove();if(s.pagerEl)s.pagerEl.remove();e(".bx-caption",this).remove();if(s.controls.autoEl)s.controls.autoEl.remove();clearInterval(s.interval);if(s.settings.responsive)e(window).unbind("resize",U)};o.reloadSlider=function(e){if(e!=undefined)r=e;o.destroySlider();f()};f();return this}})(jQuery);
/* fastClick IOS Touch Fix
https://github.com/ftlabs/fastclick*/
function FastClick(e,t){"use strict";function r(e,t){return function(){return e.apply(t,arguments)}}var n;t=t||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=t.touchBoundary||10;this.layer=e;this.tapDelay=t.tapDelay||200;if(FastClick.notNeeded(e)){return}var i=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var s=this;for(var o=0,u=i.length;o<u;o++){s[i[o]]=r(s[i[o]],s)}if(deviceIsAndroid){e.addEventListener("mouseover",this.onMouse,true);e.addEventListener("mousedown",this.onMouse,true);e.addEventListener("mouseup",this.onMouse,true)}e.addEventListener("click",this.onClick,true);e.addEventListener("touchstart",this.onTouchStart,false);e.addEventListener("touchmove",this.onTouchMove,false);e.addEventListener("touchend",this.onTouchEnd,false);e.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;if(t==="click"){i.call(e,t,n.hijacked||n,r)}else{i.call(e,t,n,r)}};e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;if(t==="click"){i.call(e,t,n.hijacked||(n.hijacked=function(e){if(!e.propagationStopped){n(e)}}),r)}else{i.call(e,t,n,r)}}}if(typeof e.onclick==="function"){n=e.onclick;e.addEventListener("click",function(e){n(e)},false);e.onclick=null}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);var deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled){return true}break;case"input":if(deviceIsIOS&&e.type==="file"||e.disabled){return true}break;case"label":case"video":return true}return/\bneedsclick\b/.test(e.className)};FastClick.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return true;case"select":return!deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}};FastClick.prototype.sendClick=function(e,t){"use strict";var n,r;if(document.activeElement&&document.activeElement!==e){document.activeElement.blur()}r=t.changedTouches[0];n=document.createEvent("MouseEvents");n.initMouseEvent(this.determineEventType(e),true,true,window,1,r.screenX,r.screenY,r.clientX,r.clientY,false,false,false,false,0,null);n.forwardedTouchEvent=true;e.dispatchEvent(n)};FastClick.prototype.determineEventType=function(e){"use strict";if(deviceIsAndroid&&e.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};FastClick.prototype.focus=function(e){"use strict";var t;if(deviceIsIOS&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){t=e.value.length;e.setSelectionRange(t,t)}else{e.focus()}};FastClick.prototype.updateScrollParent=function(e){"use strict";var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n;e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}if(t){t.fastClickLastScrollTop=t.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(e){"use strict";if(e.nodeType===Node.TEXT_NODE){return e.parentNode}return e};FastClick.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1){return true}t=this.getTargetElementFromEventTarget(e.target);n=e.targetTouches[0];if(deviceIsIOS){r=window.getSelection();if(r.rangeCount&&!r.isCollapsed){return true}if(!deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier){e.preventDefault();return false}this.lastTouchIdentifier=n.identifier;this.updateScrollParent(t)}}this.trackingClick=true;this.trackingClickStart=e.timeStamp;this.targetElement=t;this.touchStartX=n.pageX;this.touchStartY=n.pageY;if(e.timeStamp-this.lastClickTime<this.tapDelay){e.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;if(Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n){return true}return false};FastClick.prototype.onTouchMove=function(e){"use strict";if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(e){"use strict";if(e.control!==undefined){return e.control}if(e.htmlFor){return document.getElementById(e.htmlFor)}return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,s,o=this.targetElement;if(!this.trackingClick){return true}if(e.timeStamp-this.lastClickTime<this.tapDelay){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=e.timeStamp;n=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){s=e.changedTouches[0];o=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)||o;o.fastClickScrollParent=this.targetElement.fastClickScrollParent}r=o.tagName.toLowerCase();if(r==="label"){t=this.findControl(o);if(t){this.focus(o);if(deviceIsAndroid){return false}o=t}}else if(this.needsFocus(o)){if(e.timeStamp-n>100||deviceIsIOS&&window.top!==window&&r==="input"){this.targetElement=null;return false}this.focus(o);this.sendClick(o,e);if(!deviceIsIOS||r!=="select"){this.targetElement=null;e.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){i=o.fastClickScrollParent;if(i&&i.fastClickLastScrollTop!==i.scrollTop){return true}}if(!this.needsClick(o)){e.preventDefault();this.sendClick(o,e)}return false};FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(e){"use strict";if(!this.targetElement){return true}if(e.forwardedTouchEvent){return true}if(!e.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}else{e.propagationStopped=true}e.stopPropagation();e.preventDefault();return false}return true};FastClick.prototype.onClick=function(e){"use strict";var t;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(e.target.type==="submit"&&e.detail===0){return true}t=this.onMouse(e);if(!t){this.targetElement=null}return t};FastClick.prototype.destroy=function(){"use strict";var e=this.layer;if(deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,true);e.removeEventListener("mousedown",this.onMouse,true);e.removeEventListener("mouseup",this.onMouse,true)}e.removeEventListener("click",this.onClick,true);e.removeEventListener("touchstart",this.onTouchStart,false);e.removeEventListener("touchmove",this.onTouchMove,false);e.removeEventListener("touchend",this.onTouchEnd,false);e.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(e){"use strict";var t;var n;if(typeof window.ontouchstart==="undefined"){return true}n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(n){if(deviceIsAndroid){t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1){return true}if(n>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(e.style.msTouchAction==="none"){return true}return false};FastClick.attach=function(e,t){"use strict";return new FastClick(e,t)};if(typeof define!=="undefined"&&define.amd){define(function(){"use strict";return FastClick})}else if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick};
/* TouchSwipe
Source: http://www.awwwards.com/touchswipe-a-jquery-plugin-for-touch-and-gesture-based-interaction.html */
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}return null};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}return null}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false);return null}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){if(J[a7]){return J[a7].distance}return undefined}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}}));

var hash = window.location.hash;
var ww = document.body.clientWidth;

/* Define smartphones */
var mob = false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { var mob = true; }
/* Define touch events */
var supportsTouch = false;
if ('ontouchstart' in window) { supportsTouch = true; } else if(window.navigator.msPointerEnabled) { supportsTouch = true; }
var TouchClickEvent = supportsTouch?'touchstart':'click';

$(document).ready(function () {
    FastClick.attach(document.body);
    valid_wpcf7_fix();
});

$(window).load(function(){
    footer();
});
$(window).bind('orientationchange resize', function(){
    footer();
});

function footer(){
    $('.footix').height($('footer').height());
}
function valid_wpcf7_fix(){
    $('body').on('click', '.wpcf7-not-valid-tip', function(){
        $(this).prev().trigger('focus');
        $(this).fadeOut(500,function(){
            $(this).remove();
        });
    });
}

//Columns height
function equalHeight(e){t=0;e.each(function(){th=$(this).height();if(th>t){t=th}});e.height(t);}
