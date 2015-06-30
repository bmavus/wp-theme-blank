/*jslint browser: true, white: true, plusplus: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, jQuery, FastClick, reSizer*/
$ = jQuery;

$(document).ready(function () {
    "use strict";
    $(this).on('click', '.wpcf7-not-valid-tip', function(){
        $(this).prev().trigger('focus');
        $(this).fadeOut(500,function(){
            $(this).remove();
        });
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
