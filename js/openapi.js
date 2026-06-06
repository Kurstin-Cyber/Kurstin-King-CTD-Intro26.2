const BASE_URL ='https://api.open-meteo.com/v1/forecast'
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const footer = document.createElement("footer");
const body = document.querySelector("body");
body.appendChild(footer);
const copyright = document.createElement("p");
const today = new Date();
const thisYear = today.getFullYear();

copyright.innerHTML = `&copy; Kurstin King ${thisYear}`
footer.appendChild(copyright);



async function fetchCoordinates(cityName) {
    const coordURL = `${GEO_URL}?name=${cityName}&count=1&language=en`;
    try {
        const response = await fetch(coordURL);
        if(!response.ok) 
            throw new Error("Location not found.");

        const data = await response.json();

        if(!data.results || data.results.length === 0) {
            throw new Error("No results found for that city");
        }
        const {name, latitude, longitude} = data.results[0];
        return {name, latitude, longitude};
    } catch(error) {
        console.error("Failed to fetch coordinates", error);
    }
};
    

const tempButton = document.getElementById("tempButton");
const tempDisplay = document.getElementById("tempDisplay");

 tempButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const cityInput = document.getElementById("cityInput").value;
    try {
        const coords = await fetchCoordinates(cityInput);
        fetchTemperature(coords.latitude, coords.longitude, coords.name);
    } catch (error) {
        tempDisplay.textContent = "Could not find that city.";
    }
 });

 async function fetchTemperature(lat, lon, cityName) {
    
    const tempUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=fahrenheit`;
   
    try {
        const response = await fetch(tempUrl);
        if(!response.ok) {
            throw new Error("Network did not respond.");
        }
        const data = await response.json();
        console.log("Hourly Temperature Data:", data);
        const currentTemp = data.current.temperature_2m;
        const unit = data.current_units.temperature_2m;

        tempDisplay.textContent =`Current Temperature in ${cityName}: ${currentTemp}${unit}`;
    } catch (error) {
        console.error('Failed to fetch temperature data:', error);
        tempDisplay.textContent = "Failed to load temperature data.";
    }

    }




const windButton = document.getElementById("windButton");
const windDisplay = document.getElementById("windDisplay");

    windButton.addEventListener('click',async (e) => {
    e.preventDefault();
    console.log("Windspeed button clicked!");
    const cityInput = document.getElementById("cityInput").value;
    try {
        const coords = await fetchCoordinates(cityInput);
        fetchWindspeed(coords.latitude, coords.longitude, coords.name);

    } catch (error) {
        windDisplay.textContent = "Could not find that city."
    }
    });


async function fetchWindspeed(lat, lon, cityName) {
    const windUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=windspeed_10m&wind_speed_unit=mph`;
    try {
        const response = await fetch(windUrl);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Hourly Windspeed Data:", data);

        const currentWind = data.current.windspeed_10m;
        const unit = data.current_units.windspeed_10m;
        windDisplay.textContent = `Current Windspeed in ${cityName}: ${currentWind} ${unit}`;
       
    } catch (error) {
        console.error('Error fetching windspeed:', error);
        windDisplay.textContent = "Failed to load windspeed data.";
    }
}
 
