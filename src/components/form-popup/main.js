jQuery(document).ready(function($) {
  $('.form-popup-toggler').click( function (e) {
    e.preventDefault();
    $('.default-form-popup').slideToggle('fast');
    document.querySelector('body').classList.add('body-form-toggled');
  });
  $('.form-popup__close, .form-popup__body, .form-popup').click( function (e) {
    if (e.target === e.currentTarget) {
      $(this).closest('.form-popup').slideToggle('fast');
      document.querySelector('body').classList.remove('body-form-toggled');
    };
  });
});