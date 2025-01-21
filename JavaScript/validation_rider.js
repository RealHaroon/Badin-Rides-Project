document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('riderForm');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.createElement('div'); // Create error message dynamically
    errorMessage.classList.add('error-message');
    form.parentNode.appendChild(errorMessage); // Append to the form container

    // Validation functions
    const validators = {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
        name: (value) => /^[a-zA-Z\s]{2,}$/.test(value) ? '' : 'Name must be at least 2 characters and contain only letters and spaces.',
        phone: (value) => /^\d{10}$/.test(value) ? '' : 'Phone number must be exactly 10 digits.',
        location: (value) => value.length >= 3 ? '' : 'Location must be at least 3 characters long.',
        vehicle: (value) => value ? '' : 'Please select a vehicle type.',
        vehicleNumber: (value) => /^[A-Z0-9-]{5,10}$/.test(value) ? '' : 'Vehicle number must be 5-10 characters, uppercase letters, numbers, or hyphens.',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address.',
        password: (value) => value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value)
            ? ''
            : 'Password must be at least 8 characters with uppercase, lowercase, and numbers.',
        confirmPassword: (value) => value === document.getElementById('password').value ? '' : 'Passwords do not match.',
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    };

    // Validation handler
    function validateField(input) {
        const error = validators[input.id](input.value);
        const errorDisplay = input.nextElementSibling;

        if (error) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (errorDisplay) {
                errorDisplay.textContent = error;
                errorDisplay.style.display = 'block';
            }
            return false;
        } else {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            if (errorDisplay) {
                errorDisplay.style.display = 'none';
            }
            return true;
        }
    }

    // Real-time and blur validation
    Object.keys(validators).forEach((field) => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', () => validateField(input));
            input.addEventListener('blur', () => validateField(input));
        }
    });

    // Form submission handler
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        let isValid = true;
        Object.keys(validators).forEach((field) => {
            const input = document.getElementById(field);
            if (input && !validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showError('Please correct the highlighted errors.');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Registering...';

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            vehicle: document.getElementById('vehicle').value,
            vehicleNumber: document.getElementById('vehicleNumber').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('/api/riders/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                showSuccess();
                form.reset();
                form.style.display = 'none';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            } else {
                throw new Error(result.error || 'Registration failed.');
            }
        } catch (err) {
            showError(err.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });

    // Show success message
    function showSuccess() {
        successMessage.style.display = 'block';
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
});

const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
// Set up Express app
const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> Stashed changes

// Oracle DB connection details
const dbConfig = {
    user: 'C##USER_HAROON',          // Replace with your Oracle DB username
    password: 'haroon112233',        // Replace with your Oracle DB password
    connectString: 'localhost:1521/FREE'  // Replace with your Oracle DB connection string
};

<<<<<<< Updated upstream
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
=======
// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

=======
// Set up Express app
const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Oracle DB connection details
const dbConfig = {
    user: 'C##USER_HAROON',          // Replace with your Oracle DB username
    password: 'haroon112233',        // Replace with your Oracle DB password
    connectString: 'localhost:1521/FREE'  // Replace with your Oracle DB connection string
};

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

>>>>>>> Stashed changes
// Handle form submission
app.post('/api/riders/register', async (req, res) => {
    const { name, phone, location, vehicle, vehicleNumber, email, password } = req.body;

    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Connect to the Oracle database
        const connection = await oracledb.getConnection(dbConfig);

        // Insert the form data into the RIDERS_DATA table
        const sql = `
            INSERT INTO RIDERS_DATA (NAME, PHONE, LOCATION, VEHICLE_TYPE, VEHICLE_NUMBER, EMAIL, PASSWORD_HASH)
            VALUES (:name, :phone, :location, :vehicle, :vehicleNumber, :email, :passwordHash)
        `;
        const binds = {
            name,
            phone,
            location,
            vehicle,
            vehicleNumber,
            email,
            passwordHash: hashedPassword
        };

        const result = await connection.execute(sql, binds, { autoCommit: true });
        console.log('Data inserted:', result);

        // Close the connection
        await connection.close();

        // Send a success response
        res.status(200).json({ success: true, message: 'Rider registered successfully!' });
    } catch (error) {
        console.error('Error inserting data:', error);

        // Send an error response
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to register the rider'
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
