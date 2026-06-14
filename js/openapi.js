const BASE_URL ='https://api.open-meteo.com/v1/forecast'
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

const windButton = document.getElementById("windButton");
const windDisplay = document.getElementById("windDisplay");
const tempButton = document.getElementById("tempButton");
const tempDisplay = document.getElementById("tempDisplay");

const footer = document.createElement("footer");
const body = document.querySelector("body");
body.appendChild(footer);
const copyright = document.createElement("p");
const today = new Date();
const thisYear = today.getFullYear();

copyright.innerHTML = `&copy; Kurstin King ${thisYear}`
footer.appendChild(copyright);



async function fetchCoordinates(cityName) {
    if (!cityName) {
        console.error("fetchCoordinates was called with an empty city name.");
        return null;
    }
    const coordURL = `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en`;
    try {
        const response = await fetch(coordURL);
        if(!response.ok) 
            throw new Error("Location not found.");

        const data = await response.json();

        if(!data.results || data.results.length === 0) {
            throw new Error(`No results found for ${cityName}`);
        }
        const result = data.results[0];

        const {name, latitude, longitude} = result;
        const state = result.admin1 || "";
        return {name, latitude, longitude, state};
    } catch (error) {
        console.error("Failed to fetch coordinates", error);
        return null;
    }
}


 tempButton.addEventListener('click', async (e) => {
    e.preventDefault();
    windDisplay.textContent = "";

    const cityInputElement = document.getElementById("cityInput");
    const cityInput = cityInputElement ? cityInputElement.value.trim() : "";
    console.log("Captured input text:", cityInput);

    if (cityInput === "") {
        tempDisplay.textContent = "Please enter a city name.";
        return;
    }
    
    try {
        const coords = await fetchCoordinates(cityInput);
        if (coords) {
            fetchTemperature(coords.latitude, coords.longitude, coords.name, coords.state);
        } else {
            tempDisplay.textContent = `Could not find results for ${cityInput}.`;
        }
    } catch (error) {
        tempDisplay.textContent = "An error occurred while looking up the city.";
    }
});



 async function fetchTemperature(lat, lon, cityName, stateName) {
    
    const tempUrl =`${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=fahrenheit`;
   
    try {
        const response = await fetch(tempUrl);
        if(!response.ok) {
            throw new Error("Network did not respond.");
        }
        const data = await response.json();
        console.log("Hourly Temperature Data:", data);
        const currentTemp = data.current.temperature_2m;
        const unit = data.current_units.temperature_2m;
        const locationText = stateName ? `${cityName}, ${stateName}` : cityName;

        tempDisplay.textContent =`Current Temperature in ${locationText}: ${currentTemp}${unit}`;
    } catch (error) {
        console.error('Failed to fetch temperature data:', error);
        tempDisplay.textContent = "Failed to load temperature data.";
    }

    }


   windButton.addEventListener('click', async (e) => {
    e.preventDefault();
    tempDisplay.textContent = "";

    const cityInputElement = document.getElementById("cityInput");
    const cityInput = cityInputElement ? cityInputElement.value.trim() : "";
    console.log("Windspeed button clicked for:", cityInput);

    
    if (cityInput === "") {
        windDisplay.textContent = "Please enter a city name.";
        return;
    }
    
    try {
      
        const coords = await fetchCoordinates(cityInput);
        if (coords) {
            fetchWindspeed(coords.latitude, coords.longitude, coords.name, coords.state);
        } else {
            windDisplay.textContent = `Could not find results for ${cityInput}.`;
        }
    } catch (error) {
        windDisplay.textContent = "Could not find that city.";
    }
});


async function fetchWindspeed(lat, lon, cityName, stateName) {
    const windUrl =`${BASE_URL}?latitude=${lat}&longitude=${lon}&current=windspeed_10m&wind_speed_unit=mph`;
    try {
        const response = await fetch(windUrl);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Hourly Windspeed Data:", data);

        const currentWind = data.current.windspeed_10m;
        const unit = data.current_units.windspeed_10m;
        const locationText = stateName ? `${cityName}, ${stateName}` : cityName;
        windDisplay.textContent = `Current Windspeed in ${locationText}: ${currentWind} ${unit}`;
       
    } catch (error) {
        console.error('Error fetching windspeed:', error);
        windDisplay.textContent = "Failed to load windspeed data.";
    }
}
 
