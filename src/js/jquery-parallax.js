(function($){
  
  var settings = {
    factor: 0.25,
    time:   500,
    easing: 'swing',
  }; 

  var methods = {
    init: function(options) {
      
      $.extend(settings, {
        width:  this.width(),
        height: this.height()
      });

      return this.each(function(){
        if (options) {
          $.extend(settings, options);  
        }

        var $this = $(this);
        var data  = $this.data('parallax');

        $(this).css({
          'position' : 'relative',
          'overflow' : 'hidden'
        });

        $(this).width(settings.width);
        $(this).height(settings.height);

        if (!data) {
         $this.data('parallax', {settings:settings});
        }

        $(this).append('<div class="buffer" style="display:none;"></div><div class="background" style="position:absolute;top:0;left:0;z-index:1;"><img src="' + settings.background + '"/></div><div class="foreground" style="position:absolute;top:0;left:0;z-index:2;"></div>');

        $('.background', $(this)).css({
          'position' : 'relative'
        });
      });
    },

    showElement: function($el, direction) {
      var $buf= $('.buffer', this);     // Buffer for used elements
      var $fg = $('.foreground', this); // Foreground element
      var $bg = $('.background', this); // Background image
      var ox  = $fg.position().left;    // Current foreground offset relative to container
      var px  = 0;                      // x pos to attach the element at
      var tx  = 0;                      // x pos to animate the foreground container to
      var btx = 0;                      // x pos to animate the bg container to
      var t   = settings.time;          // animation time
   
      $el.addClass('parallax-next');
      $el.show();

      var onComplete = function() {
        $('.parallax-current', $fg).removeClass('parallax-current').appendTo($buf);
        $el.removeClass('parallax-next').addClass('parallax-current').show();
      };

      if (direction == 'none') {
        $fg.append($el.css({
          'top'       : 0,
          'left'      : 0,
          'position'  : 'absolute'
        })).css({
          'top'       : 0,
          'left'      : 0
        });
        onComplete();
      } else {

        // in from the right...
        if (direction == 'right') {
          px = -ox - settings.width;
          tx = ox + settings.width;
          btx = $bg.position().left + (settings.factor * settings.width);
        } else {
        // in from the left...
          px = settings.width - ox;
          tx = ox - settings.width;
          btx = $bg.position().left - (settings.factor * settings.width);
        }

        $fg.append($el.css({
          'top'       : 0,
          'left'      : px + 'px',
          'position'  : 'absolute'
        })).animate({
          'left'      : tx
        }, t, settings.easing, onComplete);

        $bg.animate({
          'left' : btx
        }, t, settings.easing);
      }     

      return this;
    },

    reset: function() {
      var $buf= $('.buffer', this); 
      var $fg = $('.foreground', this); // Foreground element
      var $bg = $('.background', this); // Background image
      
      $bg.css({
        'top':0,
        'left':0
      });

      $fg.css({
        'top':0,
        'left':0
      });

      $('.parallax-current', $fg).removeClass('parallax-current').appendTo($buf);
    },

    setBackground: function(src) {
      $('.background img', this).attr('src', src);
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