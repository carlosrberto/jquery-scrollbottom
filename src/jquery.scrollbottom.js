/*
* jQuery scrollBottom
* https://github.com/carlosrberto/jquery-scrollbottom
*
* Copyright (c) 2013 Carlos Roberto Gomes Junior
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 1.0.0
*/

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
        this.win = win;
        this.scrollTop = $(document).scrollTop();
        this.pageHeight = $(document).height() - $(window).height();
        if ( win === window ) {
            $(win).on('scrollend.sb', $.proxy(this.scrollHandler, this));
        }

    }

    ScrollBottom.prototype.scrollHandler = function(event) {
        var direction = $(document).scrollTop() > this.scrollTop ? 'bottom' : 'top';
        this.scrollTop = $(document).scrollTop();
        this.pageHeight = $(document).height() - $(window).height();
        if ( this.scrollTop >= this.pageHeight+this.options.offsetY && typeof this.options.callback === 'function' ) {
            $(this.win).trigger('scrollBottom', [direction, this.scrollTop, this.pageHeight]);
        }
    };    

    $.event.special.scrollBottom = {
        setup: function( data, namespaces, eventHandle ) {
            var el = this;
            var scrollTimer;
            $(el).on('scroll.sb', function() {
                clearTimeout( scrollTimer );
                scrollTimer = setTimeout( function(){
                    $(el).trigger('scrollend.sb');
                }, 200);
            });
        },

        teardown: function( namespaces ) {
            $(window).off('.sb');
        },

        add: function( handleObj ) {
            var options = ( typeof handleObj.data === "object" ) ? handleObj.data : {};
            var sb = new ScrollBottom(this, options);
        }
    };
})(jQuery);