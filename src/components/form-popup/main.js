jQuery(document).ready(function($) {
  $('.form-popup-toggler').click( function (e) {
    e.preventDefault();
    $('.form-popup').slideToggle('fast');
  })
  $('.form-popup__close, .form-popup').click( function (e) {
    if (e.target === e.currentTarget) {
      $('.form-popup').slideToggle('fast');
    };
  });
});