// This is the official Bootstrap script to enable custom form validation styles.
// It waits for the page to load, then finds all forms with the 'needs-validation' class.

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // checkValidity() checks if all form fields are valid based on 'required', 'type', etc.
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      // 'was-validated' is the class that tells Bootstrap to show
      // the red (invalid) and green (valid) feedback messages.
      form.classList.add('was-validated')
    }, false)
  })
})()