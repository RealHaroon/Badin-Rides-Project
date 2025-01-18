# Transport Service Website - README

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
- **Database Connectivity**: JavaScript (via AJAX or direct API calls)

## Files Structure

```plaintext
/transport-service
│
├── /css
│   └── styles.css
├── /js
│   ├── validation_rider.js
│   ├── validation_booking.js
│   └── script.js
├── /images
│   └── background.jpg
├── /pages
│   ├── Become_rider.html
│   ├── booking.html
│   ├── login.html
│   └── dashboard_Rider.html
├── /db
│   └── connect_db.js
└── README.md
```

## File Descriptions

### 1. `Become_rider.html` & `validation_rider.js`
- **Purpose**: This page allows new riders to sign up. The form includes fields such as Name, Phone Number, Location, Vehicle Type, Vehicle Number, Email, and Password. The form validates the data using JavaScript, and upon successful submission, displays a success message and redirects to the login page.
- **File Names**:
  - `Become_rider.html`: Contains the HTML structure and form.
  - `validation_rider.js`: Handles form validation and the submission process.
  - **Related Files**:
    - `styles.css`: Custom CSS for form styling.
    - `background.jpg`: Background image for the form page.

### 2. `booking.html` & `validation_booking.js`
- **Purpose**: This page allows customers to book a rider by providing their name, phone number, location, destination, and available vehicle. Based on the selected vehicle, the rider's phone number will be auto-filled. After submitting, a booking confirmation message is displayed.
- **File Names**:
  - `booking.html`: Contains the HTML structure and booking form.
  - `validation_booking.js`: Handles form validation and the process of booking a rider.
  - **Related Files**:
    - `styles.css`: Custom CSS for booking form styling.
    - `background.jpg`: Background image for the booking page.

### 3. `login.html` & `dashboard_Rider.html`
- **Purpose**: The login page allows registered riders to log in. After a successful login, they are redirected to the `dashboard_Rider.html` page, where they can view their current and past orders, update their availability, and manage their bookings.
- **File Names**:
  - `login.html`: Contains the login form and redirects to the rider's dashboard after successful login.
  - `dashboard_Rider.html`: Displays rider-specific data like recent and previous orders, and a button to toggle availability.
  - **Related Files**:
    - `styles.css`: Custom CSS for login and dashboard page styling.
    - `script.js`: Handles dynamic content display and rider actions.

### 4. `connect_db.js`
- **Purpose**: This JavaScript file connects to the free Oracle database and handles CRUD operations for users and bookings. It ensures that data is stored and validated on the server-side.
- **File Name**: `connect_db.js`
- **Related Files**: 
  - **Oracle Database Setup**: Follow the steps below to create and connect your Oracle database.

---

## Steps to Set Up and Run the Project

### 1. **Create and Connect to Free Oracle Database**
Follow these steps to set up a free Oracle database:

1. **Create an Oracle Cloud Account**:
   - Sign up for a free Oracle Cloud account [here](https://www.oracle.com/cloud/free/).
   - After signing up, log in to the Oracle Cloud Dashboard.

2. **Create a Free Database**:
   - In the Oracle Cloud dashboard, go to **Autonomous Database** and create a new instance. Choose the "Always Free" option.
   - Note the database connection details such as `username`, `password`, `host`, and `port`.

3. **Connect to Database Locally**:
   - Install Oracle Instant Client on your local machine from [Oracle's official site](https://www.oracle.com/database/technologies/instant-client.html).
   - Use `Node.js` or `Python` to connect to the Oracle database via the `oracledb` package for Node.js or `cx_Oracle` for Python.

### 2. **Integrate Database with JavaScript**
Here’s an example of how to set up database connectivity using JavaScript:

```javascript
// connect_db.js
const oracledb = require('oracledb');

// Connect to the Oracle Database
async function connectDatabase() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "your_username",
            password: "your_password",
            connectString: "your_host:your_port/your_service_name"
        });

        console.log('Connected to Oracle Database');
        return connection;
    } catch (err) {
        console.error('Error connecting to Oracle Database', err);
    }
}

module.exports = connectDatabase;
```

This script establishes a connection to your Oracle database using the `oracledb` package. Replace the `your_username`, `your_password`, `your_host`, etc., with the actual details from your Oracle Cloud instance.

### 3. **Run the Project Locally**
1. Ensure all the HTML, CSS, JavaScript, and database connection files are saved in their respective directories.
2. Open `Become_rider.html`, `booking.html`, `login.html`, and `dashboard_Rider.html` in a web browser to check how they work.
3. Run your backend server (Node.js or Python) to connect the frontend to the Oracle database and test functionalities.

---

## Conclusion
This project demonstrates a complete transport service website with user registration, ride booking, and a rider dashboard. The entire system is backed by a free Oracle database, ensuring smooth data handling and validation. By following the instructions in this README, you can set up, run, and customize the project for your needs.

---

## Sources and References:
1. **Oracle Cloud Free Tier**: [Oracle Cloud Free](https://www.oracle.com/cloud/free/)
2. **Oracle Database Node.js Driver**: [Oracle Node.js](https://www.npmjs.com/package/oracledb)
3. **Bootstrap Documentation**: [Bootstrap Docs](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
4. **W3Schools JavaScript Validation**: [JS Validation](https://www.w3schools.com/js/js_validation.asp)

