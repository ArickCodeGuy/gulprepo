jQuery(document).ready(function($) {
  $('.form-poup-opener').fancybox();
  $('.form-popup-closer').click((e) => {
    $.fancybox.close();
  })
});