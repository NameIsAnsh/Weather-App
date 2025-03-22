import Chart from "chart.js/auto";

export default function createTemperatureChart(weatherDays) {
    const labels = weatherDays.map(day => day.datetime); // Dates
    const tempMax = weatherDays.map(day => day.tempmax); // Max Temperatures
    const tempMin = weatherDays.map(day => day.tempmin); // Min Temperatures
    const precipProb = weatherDays.map(day => day.precipprob); // Probability of precipitation

    // Get the canvas element
    const ctx = document.getElementById("temperatureChart").getContext("2d");

    // Create a line chart
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Max Temperature (°C)",
                    data: tempMax,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 // Smooth curve
                },
                {
                    label: "Min Temperature (°C)",
                    data: tempMin,
                    borderColor: "blue",
                    backgroundColor: "rgba(99, 132, 255, 0.2)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 // Smooth curve
                },
                {
                    label: "Probability of Rain (%)",
                    data: precipProb,
                    borderColor: "green",
                    borderWidth: 2,
                    borderDash: [5, 5], // Dotted line
                    fill: false,
                    tension: 0.3, // Smooth curve
                    yAxisID: 'y1' // Use the second y-axis
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            },
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { 
                    title: { display: true, text: "Temperature (°C)" },
                    position: 'left'
                },
                y1: {
                    title: { display: true, text: "Probability of Rain (%)" },
                    position: 'right',
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}