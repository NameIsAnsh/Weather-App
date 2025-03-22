import createTemperatureChart from "./temperatureChart.js";
import createDayChart from "./createDayChart.js";

let currentPage = 0;
const daysPerPage = 7;
let weatherData;
const displayWeather = (weather) => {
    weatherData = weather;
    const weatherContainer = document.querySelector(".weather-container");
    const weatherDays = weather.days.slice(0, 14);

    const startIndex = currentPage * daysPerPage;
    const endIndex = startIndex + daysPerPage;
    const weatherDataToShow = weatherDays.slice(startIndex, endIndex);

    const weatherDataMarkdown = `
        <h2 class="weather-location">${weather.resolvedAddress}</h2>
         <div class="chart-container">
         <canvas id="temperatureChart" class="temperatureChartClass"></canvas>
        </div>
        <div class="weather-each-day">
        ${weatherDataToShow.map((day, index) => `
            <div class="weather-day" data-index="${startIndex + index}">
                <h3>${day.datetime}</h3>
                <p>Max Temp: ${day.tempmax}&#176C;</p>
                <p>Min Temp: ${day.tempmin}&#176C;</p>
                <p>Conditions: ${day.conditions}</p>
                <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Monochrome/${day.icon}.svg" alt="${day.conditions}">
            </div>
        `).join("")}
        <button class="prev-btn" ${currentPage === 0 ? "disabled" : ""}>&#10094;</button>
        <button class="next-btn" ${endIndex >= weatherDays.length ? "disabled" : ""}>&#10095;</button>
        </div>
        <div class="eachDay-content">
        </div>
         
    `;

    weatherContainer.innerHTML = weatherDataMarkdown;
    // Now that the HTML is updated, create the chart
    createTemperatureChart(weatherDataToShow);

        // Add event listeners to each day element
        document.querySelectorAll(".weather-day").forEach(dayElement => {
            dayElement.addEventListener("click", (event) => {
                document.querySelectorAll(".weather-day").forEach(el => el.classList.remove("selected-day"));
                event.currentTarget.classList.add("selected-day");
                const dayIndex = event.currentTarget.getAttribute("data-index");
                createDayChart(weatherDays[dayIndex]);
            });
        });

    
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");
    nextButton.addEventListener("click", () => {
        // Check if there are more days available after the current set of 7
        if ((currentPage + 1) * daysPerPage < weatherData.days.length) {
            currentPage += 1;  // Skip to the next set of 7 days
            displayWeather(weatherData);  // Re-render with the updated page
            nextButton.disabled = true
            prevButton.disabled = false
        }
    });
    
    // Event listener for "Previous" button
    prevButton.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage -= 1;  // Go back to the previous set of 7 days
            displayWeather(weatherData);  // Re-render with the updated page
            nextButton.disabled = false
            prevButton.disabled = true
        }
    });
    
};
export default displayWeather;