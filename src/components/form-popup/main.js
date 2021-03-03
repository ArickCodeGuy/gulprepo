jQuery(document).ready(function($) {
  $('.form-popup-toggler').fancybox({
    type: 'ajax',
    afterLoad: function() {
      console.log(this.opts.attr);
    }
  });
});