# Kurstin-King-Intro-To-Programming-Portfolio-Code-To-Dream-26.2-

# Open API Project: Weather App

Welcome to my Weather App! This project demostrates how to connect to an Open API to fetch, and isolate data. Using JavaScript, HTML and CSS, this application allows users to search for any city globally and selectively view its current temperature or wind speed.

## How It Works

This application utilizes a two-step asynchronous flow to fetch accurate, real-time data without overloading network requests:

1. **Geocoding Search:** When a user types a city name and clicks a button, the application first queries the **Open-Meteo Geocoding API** (`https://geocoding-api.open-meteo.com`). This converts the plain text city name into precise geographical coordinates (`latitute` and `longitude`) and returns the official location name.
2. **Targeted Weather Fetch:** Once coordinates are successfully captured, the app triggers a specific secondary request to the **Open-Meteo Forcast API** (`https://api.open-meteo.com`) depending on which button the user pressed:
    * **Get Temperature:** Requests *only* the `temperature_2m` data point in Fahrenheit.
    * **Get Windspeed:** Requests *only* the `windspeed_10m` data point in mph.
---

