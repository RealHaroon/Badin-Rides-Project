// State management for rider availability
let isAvailable = true;
import { apiCall } from './api_config.js';

let riderId = localStorage.getItem('riderId');
// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const availabilityBtn = document.getElementById('availabilityBtn');
    const currentOrdersTable = document.getElementById('currentOrdersTable').getElementsByTagName('tbody')[0];
    const orderHistoryTable = document.getElementById('orderHistoryTable').getElementsByTagName('tbody')[0];
    
    // Initialize the dashboard
    loadRiderProfile();
    loadCurrentOrders();
    loadOrderHistory();
    setupEventListeners();
});

// Load rider's profile information
async function loadRiderProfile() {
    try {
        const riderData = await apiCall(`/riders/${riderId}`);
        
        document.getElementById('riderName').textContent = riderData.name;
        document.getElementById('todayRides').textContent = riderData.todayRides;
        document.getElementById('totalEarnings').textContent = `$${riderData.totalEarnings}`;
        document.getElementById('rating').textContent = `${riderData.rating} ⭐`;
        
        // Set initial availability status
        isAvailable = riderData.availability_status === 1;
        updateAvailabilityStatus(isAvailable);
    } catch (error) {
        console.error('Error loading profile:', error);
        // Handle error (show message to user)
    }
}

// Setup event listeners
function setupEventListeners() {
    const availabilityBtn = document.getElementById('availabilityBtn');
    
    availabilityBtn.addEventListener('click', () => {
        isAvailable = !isAvailable;
        updateAvailabilityStatus(isAvailable);
    });
}

// Update rider's availability status
async function updateAvailabilityStatus(status) {
    try {
        await apiCall(`/riders/${riderId}/availability`, 'PUT', {
            availability_status: status ? 1 : 0
        });
        updateAvailabilityUI(status);
    } catch (error) {
        console.error('Error updating status:', error);
        // Revert UI if update fails
        updateAvailabilityStatus(!status);
    }
}

// Load current orders
async function loadCurrentOrders() {
    try {
        const orders = await apiCall(`/riders/${riderId}/current-orders`);
        const currentOrdersTable = document.getElementById('currentOrdersTable')
            .getElementsByTagName('tbody')[0];
        currentOrdersTable.innerHTML = '';

        orders.forEach(order => {
            const row = createCurrentOrderRow(order);
            currentOrdersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading current orders:', error);
    }
}

// Create row for current order
function createCurrentOrderRow(order) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.customerName}</td>
        <td>${order.pickupLocation}</td>
        <td>${order.destination}</td>
        <td><span class="badge bg-primary">${order.status}</span></td>
        <td>
            <button class="btn btn-success btn-sm" onclick="markOrderComplete('${order.orderId}')">
                Mark Complete
            </button>
        </td>
    `;
    return row;
}

// Load order history
async function loadOrderHistory() {
    try {
        const orders = await apiCall(`/riders/${riderId}/order-history`);
        const orderHistoryTable = document.getElementById('orderHistoryTable')
            .getElementsByTagName('tbody')[0];
        orderHistoryTable.innerHTML = '';

        orders.forEach(order => {
            const row = createOrderHistoryRow(order);
            orderHistoryTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading order history:', error);
    }
}

// Create row for order history
function createOrderHistoryRow(order) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.date}</td>
        <td>${order.customerName}</td>
        <td>${order.route}</td>
        <td>$${order.amount}</td>
        <td>${order.rating} ⭐</td>
    `;
    return row;
}

// Mark order as complete
async function markOrderComplete(orderId) {
    try {
        await apiCall(`/bookings/${orderId}/complete`, 'PUT', {
            status: 'COMPLETED',
            completion_time: new Date().toISOString()
        });
        
        // Reload tables after successful update
        await Promise.all([loadCurrentOrders(), loadOrderHistory()]);
    } catch (error) {
        console.error('Error completing order:', error);
        // Show error message to user
    }
}

// Database placeholder functions
function updateRiderStatusInDatabase(status) {
    // This will be implemented when we connect to Oracle
    console.log(`Updating rider status to: ${status}`);
}

function updateAvailabilityUI(status) {
    const availabilityBtn = document.getElementById('availabilityBtn');
    
    if (status) {
        availabilityBtn.classList.remove('btn-danger');
        availabilityBtn.classList.add('btn-success');
        availabilityBtn.textContent = 'Available';
    } else {
        availabilityBtn.classList.remove('btn-success');
        availabilityBtn.classList.add('btn-danger');
        availabilityBtn.textContent = 'Unavailable';
    }
}

// Refresh dashboard data periodically
setInterval(() => {
    loadCurrentOrders();
    loadOrderHistory();
}, 30000); // Refresh every 30 seconds