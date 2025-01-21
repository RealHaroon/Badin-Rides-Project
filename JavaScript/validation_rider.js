document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('riderForm');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    // Validation functions
    const validators = {
        name: (value) => {
            const isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
            return {
                isValid,
                message: isValid ? '' : 'Name should contain only letters and be at least 2 characters long',
            };
        },
        phone: (value) => {
            const isValid = /^\d{10}$/.test(value);
            return {
                isValid,
                message: isValid ? '' : 'Phone number should be 10 digits',
            };
        },
        location: (value) => {
            const isValid = value.length >= 3;
            return {
                isValid,
                message: isValid ? '' : 'Location should be at least 3 characters long',
            };
        },
        vehicle: (value) => {
            const isValid = value !== '';
            return {
                isValid,
                message: isValid ? '' : 'Please select a vehicle type',
            };
        },
        vehicleNumber: (value) => {
            const isValid = /^[A-Z0-9-]{5,10}$/.test(value);
            return {
                isValid,
                message: isValid ? '' : 'Vehicle number should be 5-10 characters (uppercase letters, numbers, hyphens)',
            };
        },
        email: (value) => {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return {
                isValid,
                message: isValid ? '' : 'Please enter a valid email address',
            };
        },
        password: (value) => {
            const isValid =
                value.length >= 8 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value);
            return {
                isValid,
                message: isValid
                    ? ''
                    : 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
            };
        },
        confirmPassword: (value) => {
            const password = document.getElementById('password').value;
            const isValid = value === password;
            return {
                isValid,
                message: isValid ? '' : 'Passwords do not match',
            };
        },
    };

    // Show/hide message functions
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }

    // Real-time validation
    Object.keys(validators).forEach((field) => {
        const input = document.getElementById(field);
        if (input) {
            // Validate on input
            input.addEventListener('input', function () {
                validateField(this);
            });

            // Validate on blur
            input.addEventListener('blur', function () {
                validateField(this, true);
            });

            // Add required attribute
            input.required = true;
        }
    });

    function validateField(input, showMessage = false) {
        const validation = validators[input.id](input.value);
        const errorDisplay = input.nextElementSibling;

        if (validation.isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (errorDisplay && errorDisplay.classList.contains('invalid-feedback')) {
                errorDisplay.style.display = 'none';
            }
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            if (errorDisplay && errorDisplay.classList.contains('invalid-feedback')) {
                errorDisplay.textContent = validation.message;
                errorDisplay.style.display = showMessage ? 'block' : 'none';
            }
        }

        return validation.isValid;
    }

    // Add password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    }

    // Add custom styling on focus
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach((input) => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });

    // Form submission handling
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const isValid = Array.from(form.elements)
            .filter((element) => element.id && validators[element.id])
            .every((input) => validateField(input, true));

        if (isValid) {
            showSuccess('Form submitted successfully!'); // Replace with PHP backend submission
            form.reset(); // Reset the form
        } else {
            showError('Please fix the errors in the form before submitting.');
        }
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .focused {
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }

        .invalid-feedback {
            display: none;
            color: #dc3545;
            font-size: 80%;
            margin-top: 0.25rem;
        }

        .is-invalid {
            border-color: #dc3545;
        }

        .is-valid {
            border-color: #28a745;
        }

        .success-message {
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
            padding: 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;
        }

        .error-message {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
            padding: 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
});
