let phoneMaskEl = document.querySelectorAll('.phone-mask');
for (let el of phoneMaskEl) {
	IMask(el, {
		mask: '+{7}(000)000-00-00'
	});
};