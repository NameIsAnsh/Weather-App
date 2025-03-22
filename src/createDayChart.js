import Chart from "chart.js/auto";

const getLocalHour = () => {
    return new Date().getHours(); // Get the user's local hour
};

export default function createDayChart(day) {
    console.log(day);
    let hourlyDataToShow;

    const eachDayContainer = document.querySelector(".eachDay-content");

    const isCurrentDay = (day) => {
        const today = new Date();
        const dayDate = new Date(day.datetime);
        return today.toDateString() === dayDate.toDateString();
    };
    function renderHourlyData() {
        const currentLocalHour = getLocalHour(); // User's local hour

        const currentIndex = day.hours.findIndex(hour => {
            const hourLocal = new Date(hour.datetimeEpoch * 1000).getHours(); // API's local hour
            console.log(`API Hour: ${hourLocal}, User Hour: ${currentLocalHour}`); 
            return hourLocal === currentLocalHour;
        });
console.log(currentIndex, day.hours.length);
        let startIndex = currentIndex !== -1 ? currentIndex : 0; // If not found, start at 0
        let endIndex
        if(startIndex + 14 <= day.hours.length) {
            endIndex = startIndex + 14;
        }
        else if(startIndex + 7 <= day.hours.length) {
            endIndex = startIndex + 7;
        }
        else {
            startIndex = day.hours.length - 14;
            endIndex = day.hours.length;
        }

        hourlyDataToShow = day.hours.slice(startIndex, endIndex);
  
    }

    renderHourlyData();

    eachDayContainer.innerHTML = `
    <h3>Details for ${day.datetime}</h3>
    <div class="chart-container">
        <canvas class="dayChart"></canvas>
    </div>
    <div class="hourly-data">
        ${hourlyDataToShow.map(hour => `
            <div class="hourly-data-item ${isCurrentDay(day) && parseInt(hour.datetime.slice(0, 2)) === getLocalHour() ? "current-hour" : ""}">
                <h4>${hour.datetime}</h4>
                <p>Temp: ${hour.temp}&#176C</p>
                <p>Precip Prob: ${hour.precipprob}%</p>
                <p>Humidity: ${hour.humidity}%</p>
                <p>UV Index: ${hour.uvindex}</p>
                <p>Wind Speed: ${hour.windspeed} km/h</p>
                ${hour.snowdepth > 0 ? `<p>Snow Depth: ${hour.snowdepth} cm</p>` : ''}
                <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Monochrome/${hour.icon}.svg" alt="${hour.conditions}">
            </div>
        `).join("")}
    </div>
    `;

    const ctx = document.querySelector(".dayChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: day.hours.map(hour => hour.datetime),
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: day.hours.map(hour => hour.temp),
                    borderColor: "red",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3 // Smooth curve
                },
                {
                    label: "Probability of Rain (%)",
                    data: day.hours.map(hour => hour.precipprob),
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
                x: { title: { display: true, text: "Time" } },
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
            }, color: "black"
        }
    });
}
