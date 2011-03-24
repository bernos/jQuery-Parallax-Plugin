(function($){
  
  var methods = {
    init: function(options) {
      
      var settings = {
        width:  this.width(),
        height: this.height()
      };

      return this.each(function(){
        if (options) {
          $.extend(settings, options);  
        }

        $(this).css('position', 'relative');
        $(this).width(settings.width);
        $(this).height(settings.height);

        $(this).append('<div class="background" style="position:absolute;top:0;left:0;z-index:1;"></div><div class="foreground" style="position:absolute;top:0;left:0;z-index:2;"></div>');
      });
    },

    scrollTo: function($el, direction) {


      $('.foreground', this).append($el.css({
        'top': '0px',
        'left' : (this.width() - $('.foreground', this).position().left) + 'px',
        'position' : 'absolute'
      }));

      if (direction == 'left') {
        $fg = $('.foreground', this);

        console.debug('move from ' + $fg.position());
        $fg.animate({left:$fg.position().left - this.width()})
      }
    }
  };
  
  $.fn.parallax = function(method) {
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.parallax' );
    }   
  };

})(jQuery);