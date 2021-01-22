jQuery(document).ready(function($) {
  $('.mobile-header__burger').click(function(e) {
    this.classList.toggle('toggled');
    document.querySelector('body').classList.toggle('body-burger-toggled');
    $('.mobile-header__nav').toggle('fast');
  });
});