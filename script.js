// Get chart contexts
const tempCtx = document.getElementById('tempChart').getContext('2d');
const humidityCtx = document.getElementById('humidityChart').getContext('2d');
const moistureCtx = document.getElementById('moistureChart').getContext('2d');
const waterCtx = document.getElementById('waterChart').getContext('2d');

// Initialize charts with empty data
const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Temperature (°C)', data: [], borderColor: 'rgba(0, 255, 170, 1)', borderWidth: 2 }] },
    options: { responsive: true, scales: { x: { title: { display: true, text: 'Time' } }, y: { title: { display: true, text: 'Temperature (°C)' } } } }
});

const humidityChart = new Chart(humidityCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Humidity (%)', data: [], borderColor: 'rgba(0, 255, 255, 1)', borderWidth: 2 }] },
    options: { responsive: true, scales: { x: { title: { display: true, text: 'Time' } }, y: { title: { display: true, text: 'Humidity (%)' } } } }
});

const moistureChart = new Chart(moistureCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Soil Moisture (%)', data: [], borderColor: 'rgba(34, 193, 195, 1)', borderWidth: 2 }] },
    options: { responsive: true, scales: { x: { title: { display: true, text: 'Time' } }, y: { title: { display: true, text: 'Soil Moisture (%)' } } } }
});

const waterChart = new Chart(waterCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Water Level (%)', data: [], borderColor: 'rgba(0, 191, 255, 1)', borderWidth: 2 }] },
    options: { responsive: true, scales: { x: { title: { display: true, text: 'Time' } }, y: { title: { display: true, text: 'Water Level (%)' } } } }
});

// Function to fetch data from the backend
function fetchSensorData() {
    fetch('get_data.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                console.warn('No data received from server.');
                return;
            }
            updateCharts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to update charts with new data
function updateCharts(data) {
    const labels = data.map(entry => entry.timestamp);
    const temperature = data.map(entry => entry.temperature);
    const humidity = data.map(entry => entry.humidity);
    const moisture = data.map(entry => entry.soil_moisture);
    const waterLevel = data.map(entry => entry.water_level);

    updateChart(tempChart, labels, temperature);
    updateChart(humidityChart, labels, humidity);
    updateChart(moistureChart, labels, moisture);
    updateChart(waterChart, labels, waterLevel);
}

// Helper function to update a single chart
function updateChart(chart, labels, dataset) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = dataset;
    chart.update();
}

// Fetch data every 5 seconds
setInterval(fetchSensorData, 5000);
