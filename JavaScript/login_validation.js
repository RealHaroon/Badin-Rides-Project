document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.querySelector('.error-message');

    // Validation functions
    const validators = {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        password: (value) => value.length >= 8,
    };

    // Real-time validation
    Object.keys(validators).forEach((field) => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', function () {
                validateField(this);
                errorMessage.style.display = 'none';
            });
        }
    });

    function validateField(input) {
        const value = input.value;
        const isValid = validators[input.id](value);

        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }

        return isValid;
    }

    // Form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;
        isValid = validateField(email) && isValid;
        isValid = validateField(password) && isValid;

        if (isValid) {
            // If valid, submit the form to the PHP backend
            errorMessage.style.display = 'none';
            loginForm.submit(); // Use the form's default action for PHP processing
        } else {
            errorMessage.style.display = 'block';
        }
    });
});
