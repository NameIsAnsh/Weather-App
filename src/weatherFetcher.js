import { generateMockData14Days } from "./mockWeatherData";
import {fetchGif} from "./gifFetcher"; 
function formatDate(date) {
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
}

const weatherApiKEy = import.meta.env.VITE_WEATHER_API_KEY;
const modeCors = {mode: 'cors'};
const useMockData = false; // Set this to true to use mock data
export default async function fetchWeather(location = "New York", days = 14) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    const startDate = formatDate(today);
    const endDate = formatDate(futureDate);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&key=${weatherApiKEy}`;

    // Check if data is already stored in localStorage
    let cachedData = localStorage.getItem("weatherData");
    cachedData = JSON.parse(cachedData);
    if (cachedData !== null && cachedData.address == location) {
        console.log("Using cached weather data.");
        console.log("Cached weather data:", cachedData);
        try {
            await fetchGif(cachedData.currentConditions.conditions);
        } catch (error) {
            console.error("Error fetching GIF:", error);
            // Set default images if fetching GIF fails
            document.getElementById("leftGif").src = "https://via.placeholder.com/300?text=No+GIF+Found";
            document.getElementById("rightGif").src = "https://via.placeholder.com/300?text=No+GIF+Found";
        }
        return cachedData;
    }

    if (useMockData) {
        console.warn("Using mock data for testing.");
        let generatedData = generateMockData14Days();
        fetchGif(generatedData.currentConditions.conditions)
        return generatedData
    }

    try {
        let response = await fetch(url, modeCors);

        if (response.status === 429) {
            console.warn("Too many requests! Using mock data.");
            return mockWeatherData;
        }

        const data = await response.json();
        console.log("Fetched new weather data:", data);

        // Store the data in localStorage
        localStorage.setItem("weatherData", JSON.stringify(data));
        fetchGif(data.currentConditions.conditions);

        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


