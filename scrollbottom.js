/*
* jQuery scrollBottom
* https://github.com/carlosrberto/jquery-scrollbottom
*
* Copyright (c) 2012 Carlos Roberto Gomes Junior
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 0.1.1
*/

// simple scrollend Event
$(function(){
    var scrollTimer;
    $(window).on('scroll', function() {
        clearTimeout( scrollTimer );
        scrollTimer = setTimeout( function(){
            $(window).trigger('scrollBottom.scrollend');
        }, 200);
    });          
});

(function($) {
    var defaults = {
        offsetY : 0,
        callback: function() {}
    };
    
    function ScrollBottom (win, options) {

        // plugin options
        if ( options ) {
            // extend options
            this.options = $.extend(defaults, options); 
        } else {
            // use default options
            this.options = defaults;
        }

        this.scrollTop = $(document).scrollTop();
        this.pageHeight = $(document).height() - $(window).height();
        if ( win === window ) {
            $(win).on('scrollBottom.scrollend', $.proxy(this.scrollHandler, this));
        }

    }

    ScrollBottom.prototype.scrollHandler = function(event) {
        var direction = $(document).scrollTop() > this.scrollTop ? 'bottom' : 'top';
        this.scrollTop = $(document).scrollTop();
        this.pageHeight = $(document).height() - $(window).height();
        if ( this.scrollTop >= this.pageHeight+this.options.offsetY && typeof this.options.callback === 'function' ) {
            this.options.callback.apply(this, [event, {'scrollTop':this.scrollTop, 'pageHeight':this.pageHeight, 'direction' : direction}]);
        }
    };

    $.fn.scrollBottom = function(options) {
        this.each(function() {
            new ScrollBottom(this, options);
        });
    };
})(jQuery);