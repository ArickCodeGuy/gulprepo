jQuery(document).ready(function($) {
  $('.form-popup-toggler').click((e) => {
    e.preventDefault();
    let popupId = '0';
    e.currentTarget.dataset.popupId ? popupId = e.currentTarget.dataset.popupId: false;
    $(`#form-popup-${popupId}`).slideToggle('fast');
    document.body.classList.toggle('form-popup-toggled');
  });

  $('.form-popup-closer').click((e) => {
    $(e.currentTarget).parents('.form-popup').slideUp('fast');
    document.body.classList.remove('form-popup-toggled');
  });

  // if clicks outside of .form-popup__content then close popup
  // never put .form-popup-closer outside of .form-popup__content
  $('.form-popup').click((e) => {
    if (e.target.querySelector('.form-popup__content')) {
      $(e.currentTarget).slideUp('fast');
      document.body.classList.remove('form-popup-toggled');
    };
  });
});