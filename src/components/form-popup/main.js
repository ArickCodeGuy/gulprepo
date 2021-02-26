jQuery(document).ready(function($) {
  $('.form-popup-toggler').click( function (e) {
    e.preventDefault();
    let formType = this.dataset.form;
    if (formType) {
      fetch(`components/default-form/${formType}.html`)
        .then((response) => {
          if (response.status != 200) {
            alert('couldn\'t find form with given name');
            throw 'couldn\'t find form with given name';
          };
          return response.text();
        })
        .then((data) => {
          $('.default-form-popup').slideToggle('fast');
          document.querySelector('body').classList.add('body-form-toggled');
          let formInner = document.getElementById('form-popup__inner');
          formInner.innerHTML = data;
        });
    }else {
      alert('Data attribute is not set');
    };
  });
  $('.form-popup__close, .form-popup__body, .form-popup').click( function (e) {
    if (e.target === e.currentTarget) {
      $(this).closest('.form-popup').slideToggle('fast');
      document.querySelector('body').classList.remove('body-form-toggled');
    };
  });
});