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
  }

  //
  // DEFAULT SETTING

  Untouchable.DEFAULTS = {

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