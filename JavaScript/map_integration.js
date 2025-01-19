// Initialize and add the map
let map;

async function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India (modify as needed)
        zoom: 5,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    // Get active riders' locations from the database
    try {
        const activeRiders = await fetchActiveRiders();
        
        // Add markers for each active rider
        activeRiders.forEach(rider => {
            new google.maps.Marker({
                position: { lat: rider.latitude, lng: rider.longitude },
                map: map,
                title: `${rider.vehicleType} - ${rider.area}`,
                icon: getVehicleIcon(rider.vehicleType)
            });
        });

        // Add service area polygons
        const serviceAreas = await fetchServiceAreas();
        serviceAreas.forEach(area => {
            new google.maps.Polygon({
                paths: area.coordinates,
                map: map,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });
        });
    } catch (error) {
        console.error('Error loading map data:', error);
    }
}

// Function to get appropriate icon based on vehicle type
function getVehicleIcon(type) {
    const icons = {
        car: 'path/to/car-icon.png',
        bike: 'path/to/bike-icon.png',
        auto: 'path/to/auto-icon.png'
    };
    return icons[type] || icons.car;
}

// Function to fetch active riders from database
async function fetchActiveRiders() {
    try {
        const response = await fetch('/api/active-riders');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching active riders:', error);
        return [];
    }
}

// Function to fetch service areas from database
async function fetchServiceAreas() {
    try {
        const response = await fetch('/api/service-areas');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching service areas:', error);
        return [];
    }
}

// Function to update real-time stats
async function updateStats() {
    try {
        const response = await fetch('/api/service-stats');
        const stats = await response.json();
        
        // Update DOM elements with new stats
        document.getElementById('totalRides').textContent = stats.totalRides.toLocaleString();
        document.getElementById('activeRiders').textContent = stats.activeRiders.toLocaleString();
        document.getElementById('totalUsers').textContent = stats.totalUsers.toLocaleString();
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Update stats every 30 seconds
setInterval(updateStats, 30000);

// Initial stats update
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
});

// Load Google Maps API
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize map when the page loads
loadGoogleMapsAPI();