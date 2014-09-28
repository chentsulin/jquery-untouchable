/*
 *
 *
 */

(function($) {
  'use strict';

  //
  // Class DEFINITION

  var Untouchable = function(element, options) {
    this.options = options;
    this.$element = $(element);

    $(document).on('mousemove', this.away.bind(this));
  };

  //
  // DEFAULT SETTING

  Untouchable.DEFAULTS = {
    distance: 100,
    duration: 100
  };

  Untouchable.prototype.getXvactor = function(elem, mouseX) {
    console.log(elem)
    return mouseX - (elem.offset().left + (elem.width() / 2));
  };

  Untouchable.prototype.getYvactor = function(elem, mouseY) {
    return mouseY - (elem.offset().top + (elem.height() / 2));
  };

  Untouchable.prototype.getDistance = function(elem, mouseX, mouseY) {
    return Math.sqrt(Math.pow(this.getXvactor(elem, mouseX), 2) + Math.pow(this.getYvactor(elem, mouseY), 2));
  };

  Untouchable.prototype.away = function(e) {

    console.log('onAway');

    var mouseX = e.pageX;
    var mouseY = e.pageY;

    console.log('mouseX', mouseX);
    console.log('mouseY', mouseY);

    var distance = this.getDistance(this.$element, mouseX, mouseY);
    console.log('d', distance)

    if (distance < this.options.distance) {

      var x = this.getXvactor(this.$element, mouseX);
      var y = this.getYvactor(this.$element, mouseY);

      console.log('x', x);
      console.log('y', y);


      var topMove  = ( y > 0 ? '-=' : '+=') + Math.abs(this.getYvactor(this.$element, mouseY));
      var leftMove = ( x > 0 ? '-=' : '+=') + Math.abs(this.getXvactor(this.$element, mouseX));

      // away
      this.$element.stop().animate({
        top : topMove,
        left: leftMove
      }, this.options.duration, this.options.easing, this.options.onAway);
    }
  };

  //
  // PLUGIN DEFINITION

  var old = $.fn.untouchable;

  $.fn.untouchable = function(option) {
    return this.each(function() {
      var $this   = $(this);
      var data    = $this.data('untouchable');
      var options = $.extend({}, Untouchable.DEFAULTS, $this.data(), typeof option == 'object' && options);

      if (!data) $this.data('untouchable', (data = new Untouchable(this, options)));

    });
  };

  $.fn.untouchable.Constructor = Untouchable;

  //
  // NO CONFLICT
  $.fn.untouchable.noConflict = function () {
    $.fn.untouchable = old;
    return this;
  };


}(jQuery))