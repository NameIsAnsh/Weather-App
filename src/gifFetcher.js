

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
const leftGifImage = document.getElementById("leftGif");
const rightGifImage = document.getElementById("rightGif");
const errorMessage = document.getElementById("errorMessage");

let currentSearchTerm = "";
let gifIndex = 0;
let gifs = [];

export async function fetchGif(searchTerm = "funny") {
    console.log("Fetching GIFs for:", searchTerm);
    if (searchTerm !== currentSearchTerm) {
        currentSearchTerm = searchTerm;
        gifIndex = 0;
    }

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`;
    
    errorMessage.textContent = "Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data.length > 0) {
            gifs = data.data;
            displayGif();
        } else {
            leftGifImage.src = "https://via.placeholder.com/300?text=No+GIF+Found";
            rightGifImage.src = "https://via.placeholder.com/300?text=No+GIF+Found";
            errorMessage.textContent = "No GIFs found, try a different keyword!";
            throw new Error("No GIFs found");
        }
    } catch (error) {
        errorMessage.textContent = "Error fetching data. Please try again!";
        console.error("Fetch error:", error);
    }
}

function displayGif() {
    if (gifs.length > 0) {
        leftGifImage.src = gifs[gifIndex].images.fixed_height.url;
        rightGifImage.src = gifs[(gifIndex + 1) % gifs.length].images.fixed_height.url;
        errorMessage.textContent = "";
    }
}

/* function showNextGif() {
    if (gifs.length > 0) {
        gifIndex = (gifIndex + 1) % gifs.length;
        console.log(gifIndex)
        displayGif();
    }
} */


