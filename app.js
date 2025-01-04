// Base URL and API Key
// import axios from "axios";


const ENCODED_API_KEY = 'YTdkNzAzNzBlZTZlMWQ1NDFlMWIxNTgyNjgzYzcxZDg='; // Replace with your API key
const API_KEY = atob(encodedKey);
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('fetchWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weatherInfo');

    if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });

        const data = response.data;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${icon}" alt="${data.weather[0].description}" class="weather-icon">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error.response || error);
        weatherInfo.innerHTML = '<p>Unable to fetch weather data. Please try again.</p>';
    }
});
