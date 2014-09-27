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

    this.$element.on('mousemove', this.away);
  };

  //
  // DEFAULT SETTING

  Untouchable.DEFAULTS = {
    distance: 100,
    duration: 400
  };

  Untouchable.prototype.getXvactor = function(elem, mouseX) {
    return mouseX - (elem.offset().left + (elem.width() / 2));
  };

  Untouchable.prototype.getYvactor = function(elem, mouseY) {
    return mouseY - (elem.offset().top + (elem.height() / 2));
  };

  Untouchable.prototype.getDistance = function(elem, mouseX, mouseY) {
    return Math.sqrt(Math.pow(this.getXvactor(elem, mouseX), 2) + Math.pow(this.getYvactor(elem, mouseY), 2));
  };

  Untouchable.prototype.away = function(e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var distance = this.getDistance($(this), mouseX, mouseY);

    if (distance < this.options.distance) {

      // away
      this.$element.animate({
        top : '-=' + this.getXvactor(),
        left: '-=' + this.getYvactor()
      }, $this.options.duration, $this.options.easing, $this.options.onAway);
    }
  };

  //
  // PLUGIN DEFINITION

  var old = $.fn.untouchable;

  $.fn.untouchable = function(option) {
    return this.each(function() {
      var $this   = $(this);
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
  }



}(jQuery))