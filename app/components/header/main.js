jQuery(document).ready(function($) {
	$('.mobile-header__burger').click(function(e) {
		this.classList.toggle('toggled');
		$('.mobile-header__nav').toggle('fast');
	});
});