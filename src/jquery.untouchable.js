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
    speed: 400
  };

  Untouchable.prototype.calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
  }

  Untouchable.prototype.away = function(e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var distance = this.calculateDistance($(this), mouseX, mouseY);

    if (distance < this.options.distance) {
      // away
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