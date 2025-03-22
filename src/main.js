import "./styles.css";
import fetchWeather from "./weatherFetcher.js";
import displayWeather from "./displayWeather.js";


document.addEventListener("DOMContentLoaded", () => {
    fetchWeather("New York").then(data => displayWeather(data));

});

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const handleSearch = () => {
    const query = searchInput.value.trim();
    fetchWeather(query).then(data => displayWeather(data));

};

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});