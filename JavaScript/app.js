const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Oracle DB connection configuration
const dbConfig = {
    user: 'C##USER_HAROON',
    password: 'haroon112233',
    connectString: 'localhost:1521/FREE',
};

// Utility to get a database connection
async function getConnection() {
    return await oracledb.getConnection(dbConfig);
}

// --- API Endpoints ---

// 1. Rider Registration
app.post('/api/riders/register', async (req, res) => {
    const { name, phone, location, vehicle, vehicleNumber, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const connection = await getConnection();
        const sql = `
            INSERT INTO RIDERS_DATA (NAME, PHONE, LOCATION, VEHICLE_TYPE, VEHICLE_NUMBER, EMAIL, PASSWORD_HASH)
            VALUES (:name, :phone, :location, :vehicle, :vehicleNumber, :email, :passwordHash)
        `;
        await connection.execute(sql, { name, phone, location, vehicle, vehicleNumber, email, passwordHash: hashedPassword }, { autoCommit: true });
        res.status(200).json({ success: true, message: 'Rider registered successfully!' });
        await connection.close();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Login Validation
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await getConnection();
        const result = await connection.execute(`SELECT PASSWORD_HASH FROM USERS_DATA WHERE EMAIL = :email`, { email });
        if (result.rows.length > 0) {
            const hashedPassword = result.rows[0][0];
            const isMatch = await bcrypt.compare(password, hashedPassword);
            if (isMatch) {
                res.status(200).json({ success: true, message: 'Login successful!' });
            } else {
                res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
        await connection.close();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. Booking Submission
app.post('/api/bookings', async (req, res) => {
    const { customerName, customerPhone, pickupLocation, destination, vehicleType, riderPhone } = req.body;
    try {
        const connection = await getConnection();
        const sql = `
            INSERT INTO BOOKINGS_DATA (CUSTOMER_NAME, CUSTOMER_PHONE, PICKUP_LOCATION, DESTINATION, VEHICLE_TYPE, RIDER_PHONE)
            VALUES (:customerName, :customerPhone, :pickupLocation, :destination, :vehicleType, :riderPhone)
        `;
        await connection.execute(sql, { customerName, customerPhone, pickupLocation, destination, vehicleType, riderPhone }, { autoCommit: true });
        res.status(200).json({ success: true, message: 'Booking created successfully!' });
        await connection.close();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. Rider Dashboard Operations
app.get('/api/riders/:riderId/current-orders', async (req, res) => {
    const { riderId } = req.params;
    try {
        const connection = await getConnection();
        const result = await connection.execute(
            `SELECT * FROM RIDER_ORDERS WHERE RIDER_ID = :riderId AND STATUS = 'ACTIVE'`,
            { riderId }
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/riders/:riderId/availability', async (req, res) => {
    const { riderId } = req.params;
    const { availability_status } = req.body;
    try {
        const connection = await getConnection();
        const sql = `
            UPDATE RIDERS_DATA
            SET AVAILABILITY_STATUS = :availability_status
            WHERE ID = :riderId
        `;
        await connection.execute(sql, { availability_status, riderId }, { autoCommit: true });
        res.status(200).json({ success: true, message: 'Availability status updated successfully!' });
        await connection.close();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
