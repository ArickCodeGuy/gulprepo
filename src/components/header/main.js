jQuery(document).ready(function($) {
  $('.header-menu-toggler').click(function(e) {
    this.classList.toggle('toggled');
    $('.header-menu').toggle('fast');
  });
});