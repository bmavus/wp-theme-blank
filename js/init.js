/*jslint browser: true, white: true, plusplus: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, jQuery, FastClick, reSizer*/
$ = jQuery;

$(document).ready(function () {
    "use strict";
    //contact form 7
    $(this).on('click', '.wpcf7-not-valid-tip', function(){
        $(this).prev().trigger('focus');
        $(this).fadeOut(500,function(){
            $(this).remove();
        });
    });

    //fluid video (iframe)
    $('.content article iframe').each(function(i) {
        var t = $(this),
            p = t.parent();
        if (p.is('p') && !p.hasClass('fullframe')) {
            p.addClass('fullframe');
        }
    });

    reSizer();
});

$(window).load(function(){
    "use strict";
});

$(window).bind('orientationchange resize', function(){
    "use strict";
    reSizer();
});

$(window).resizeEnd(function(){
    "use strict";
});

window.onload = function () {
    aload();
};
