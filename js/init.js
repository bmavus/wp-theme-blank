/*jslint browser: true, white: true*/
/*global $, jQuery, FastClick*/
$ = jQuery;
var hash = window.location.hash;
var supportsTouch = false;
if (window.hasOwnProperty('ontouchstart') || window.navigator.msPointerEnabled) { supportsTouch = true; }
var TouchClickEvent = supportsTouch ? 'touchstart' : 'click';
function footer(e){
    "use strict";
    $('.footix').height($('footer').outerHeight());
}
function ww(){
    'use strict';
    return document.body.clientWidth;
}
$(document).ready(function () {
    "use strict";
    $(this).on('click', '.wpcf7-not-valid-tip', function(){
        $(this).prev().trigger('focus');
        $(this).fadeOut(500,function(){
            $(this).remove();
        });
    });
});

$(window).load(function(){
    "use strict";
    footer();
    FastClick.attach(document.body);
});
$(window).bind('orientationchange resize', function(){
    "use strict";
    footer();
});
