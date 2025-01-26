document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const receipt = document.querySelector('.receipt');
    const vehicleSelect = document.getElementById('vehicleType');

    // Sample available riders data (this would come from  database)
    const availableRiders = {
        'bike': [
            { id: 'B1', phone: '1234567890', vehicleNum: 'KES-23', area: 'North' },
            { id: 'B2', phone: '2345678901', vehicleNum: 'KID-33', area: 'South' }
        ],
        'car': [
            { id: 'C1', phone: '3456789012', vehicleNum: 'MPK-25', area: 'East' },
            { id: 'C2', phone: '4567890123', vehicleNum: 'NPM-45', area: 'West' }
        ],
        'van': [
            { id: 'V1', phone: '5678901234', vehicleNum: 'HEB-11', area: 'Central' }
        ]
    };

    // Populate vehicle types
    function populateVehicleTypes() {
        const types = Object.keys(availableRiders);
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            vehicleSelect.appendChild(option);
        });
    }

    // Validation functions
    const validators = {
        customerName: (value) => {
            return value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
        },
        customerPhone: (value) => {
            return /^\d{10}$/.test(value);
        },
        pickupLocation: (value) => {
            return value.length >= 3;
        },
        destination: (value) => {
            return value.length >= 3;
        },
        vehicleType: (value) => {
            return value !== '';
        }
    };

    // Real-time validation
    Object.keys(validators).forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', function() {
                validateField(this);
            });

            input.addEventListener('blur', function() {
                validateField(this);
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

    // Variables to store selected rider details
    let selectedRiderPhone = '';
    let selectedVehicleNumber = '';

    // Handle vehicle type selection
    vehicleSelect.addEventListener('change', function() {
        const selectedType = this.value;
        if (selectedType && availableRiders[selectedType]) {
            // Randomly select a rider from available riders for the selected vehicle type
            const rider = availableRiders[selectedType][
                Math.floor(Math.random() * availableRiders[selectedType].length)
            ];
            
            // Store rider details
            selectedRiderPhone = rider.phone;
            selectedVehicleNumber = rider.vehicleNum;
        } else {
            selectedRiderPhone = '';
            selectedVehicleNumber = '';
        }
    });

    // Generate booking ID
    function generateBookingId() {
        return 'BK' + Date.now().toString().slice(-6);
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        Object.keys(validators).forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                const isValid = validateField(input);
                if (!isValid) {
                    isFormValid = false;
                }
            }
        });

        if (isFormValid) {
            // Collect form data
            const bookingData = {
                bookingId: generateBookingId(),
                customerName: document.getElementById('customerName').value,
                customerPhone: document.getElementById('customerPhone').value,
                pickupLocation: document.getElementById('pickupLocation').value,
                destination: document.getElementById('destination').value,
                vehicleType: document.getElementById('vehicleType').value,
                vehicleNumber: selectedVehicleNumber,
                riderPhone: selectedRiderPhone,
                bookingTime: new Date().toLocaleString()
            };

            // Update receipt with booking details
            document.getElementById('receiptBookingId').textContent = bookingData.bookingId;
            document.getElementById('receiptName').textContent = bookingData.customerName;
            document.getElementById('receiptPhone').textContent = bookingData.customerPhone;
            document.getElementById('receiptVehicle').textContent = bookingData.vehicleType;
            document.getElementById('receiptVehicleNumber').textContent = bookingData.vehicleNumber;
            document.getElementById('receiptRiderPhone').textContent = bookingData.riderPhone;
            document.getElementById('receiptTime').textContent = bookingData.bookingTime;
            document.getElementById('receiptPickup').textContent = bookingData.pickupLocation;
            document.getElementById('receiptDestination').textContent = bookingData.destination;

            // Hide form and show receipt
            form.style.display = 'none';
            receipt.style.display = 'block';

            // Here you would typically send the booking data to your backend
            console.log('Booking data:', bookingData);
        }
    });

    // Initialize
    populateVehicleTypes();
});