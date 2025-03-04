# **Badin Rides** - *A Transport Service Website - README*

## Project Overview
This project is a fully responsive website designed for a transport service, where users can register as riders, book rides, and manage their ride history. The website allows new riders to sign up, existing riders to log in, and users to book rides by selecting available riders based on their location and vehicle availability.

The system is built using HTML, CSS, JavaScript, and connected to a free Oracle database to handle user registration, booking, and validation. The website includes multiple pages like "Become a Rider", "Book a Rider", "Login", and a "Rider Dashboard".

### Key Features:
- **Responsive Design**: The website is fully responsive and works well on mobile devices.
- **User Registration and Login**: Users can sign up as riders by providing necessary details and log in to manage their bookings.
- **Rider Dashboard**: After logging in, riders can view their current and past orders, update their availability status, and manage their bookings.
- **Booking System**: Customers can book riders, view available vehicles in their area, and receive confirmation and booking details.
- **Oracle Database Integration**: All user and booking information is stored and validated using a free Oracle database.

### Tech Stack:
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Oracle Database (free local setup)
- **Validation**: JavaScript
- **Animation**: CSS for smooth animations
- **Database Connectivity**: PHP

## Files Structure

```plaintext
project-folder/
│
├── /css
│   └── styles.css
├── /js
│   ├── validation_rider.js
│   ├── validation_booking.js
│   ├── map_integration.js
│   ├── counter.js
├── /assets
│   ├── images/
│   └── background.jpg
├── /pages
│   ├── index.html
│   ├── become_rider.html
│   ├── booking.html
│   ├── login.html
│   ├── dashboard_rider.html
│   ├── service.html
├── /database
│   ├── db_connect.php
└── README.md
```

## Project Implementation

### 1. Homepage (index.html)
- Introduces the service.
- Includes a navbar, carousel, and buttons for ride booking and rider registration.
- Footer and navigation bar are globally included across all pages.

### 2. Become a Rider (become_rider.html & validation_rider.js)
- Riders fill out a form with their details.
- JavaScript validation ensures data integrity.
- Form disappears after submission, showing a success message.
- Rider details are stored in an Oracle database.

### 3. Booking System (booking.html & validation_booking.js)
- Customers enter ride details.
- Available riders are automatically suggested.
- Successful bookings generate confirmation messages.

### 4. Rider Dashboard (dashboard_rider.html)
- Displays pending and completed bookings.
- Includes an availability toggle for riders.

### 5. Service Page (service.html & service.js)
- Displays service-related statistics using live data.
- Uses Google Maps API to display service areas.
- Fetches and updates real-time statistics from the Oracle database.

### 6. Database Integration
- Oracle Database 21Ai stores all user and booking data.
- Connected via PHP scripts running on the XAMPP Apache Server.
- Secure authentication and data validation are implemented.

## Steps to Set Up and Run the Project

### 1. Create and Connect to Free Oracle Database
Follow these steps to set up a free Oracle database:

1. **Create an Oracle Cloud Account**:
   - Sign up for a free Oracle Cloud account [here](https://www.oracle.com/cloud/free/).
   - After signing up, log in to the Oracle Cloud Dashboard.

2. **Create a Free Database**:
   - In the Oracle Cloud dashboard, go to **Autonomous Database** and create a new instance. Choose the "Always Free" option.
   - Note the database connection details such as `username`, `password`, `host`, and `port`.

3. **Connect to Database Locally**:
   - Install Oracle Instant Client on your local machine from [Oracle's official site](https://www.oracle.com/database/technologies/instant-client.html).
   - Use PHP to connect to the Oracle database via the `oci_connect` function.

### 2. Integrate Database with PHP
Here’s an example of how to set up database connectivity using PHP:

```php
// db_connect.php
<?php
$host = "your_host";
$port = "your_port";
$service_name = "your_service_name";
$username = "your_username";
$password = "your_password";

$connection_string = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$host)(PORT=$port))(CONNECT_DATA=(SERVICE_NAME=$service_name)))";

$conn = oci_connect($username, $password, $connection_string);
if (!$conn) {
    $error = oci_error();
    die("Error connecting to Oracle Database: " . $error['message']);
} else {
    echo "Connected to Oracle Database";
}
?>
```

### 3. Run the Project Locally
1. Ensure all the HTML, CSS, JavaScript, and database connection files are saved in their respective directories.
2. Open `become_rider.html`, `booking.html`, `login.html`, and `dashboard_rider.html` in a web browser to check how they work.
3. Run your backend server (PHP on XAMPP) to connect the frontend to the Oracle database and test functionalities.

## Resources and Documentation
- **Bootstrap Documentation**: [https://getbootstrap.com/docs/](https://getbootstrap.com/docs/)
- **JavaScript Form Validation**: [https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- **Google Maps API Documentation**: [https://developers.google.com/maps/documentation/javascript](https://developers.google.com/maps/documentation/javascript)
- **Oracle Database 23Ai**: [https://www.oracle.com/database/technologies/appdev.html](https://www.oracle.com/database/technologies/appdev.html)
- **XAMPP Apache Server**: [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)

## Conclusion
This project provides a structured approach to solving daily commuting issues while creating employment opportunities. With seamless UI/UX, robust database integration, and real-time updates, the platform ensures an efficient and user-friendly transport service.
