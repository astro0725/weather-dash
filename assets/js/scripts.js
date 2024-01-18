// Constants and variables
const apiKey = 'ad0451d039549dcdec87e21b8af0b295'; 

const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityListDiv = document.getElementById('city-list');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastCardsDiv = document.getElementById('forecast-cards');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getCityCoordinates(cityName);
    }
});

function getCityCoordinates(cityName) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;

    fetch(geocodeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                getWeatherData(lat, lon, cityName);
                saveCityToHistory(cityName);
            } else {
                alert('City not found. Please try a different name.');
            }
        })
        .catch(error => alert(error.message));
}

function getWeatherData(lat, lon, cityName) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data, cityName);
            displayForecastWeather(data);
        })
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function displayCurrentWeather(weatherData, cityName) {
    const currentWeather = weatherData.list[0];
    currentWeatherDiv.innerHTML = `
        <h2>${cityName} (${new Date(currentWeather.dt * 1000).toLocaleDateString()})</h2>
        <img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="Weather icon">
        <p>Temp: ${currentWeather.main.temp}°F</p>
        <p>Wind: ${currentWeather.wind.speed} mph</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
    `;
}

function displayForecastWeather(weatherData) {
    forecastCardsDiv.innerHTML = ''; 
    weatherData.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.innerHTML = `
                <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
                <p>Temp: ${forecast.main.temp}°F</p>
                <p>Wind: ${forecast.wind.speed} mph</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
            `;
            forecastCardsDiv.appendChild(forecastCard);
        }
    });
}

function saveCityToHistory(cityName) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(cityName)) {
        cities.unshift(cityName);
        localStorage.setItem('cities', JSON.stringify(cities));
        addCityToHistory(cityName);
    }
}

function addCityToHistory(cityName) {
    const cityButton = document.createElement('button');
    cityButton.textContent = cityName;
    cityButton.className = 'city-button';
    cityButton.addEventListener('click', () => getCityCoordinates(cityName));
    cityListDiv.insertBefore(cityButton, cityListDiv.firstChild); // Add to the top of the list
}


function loadSearchHistory() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(city => addCityToHistory(city));
}

loadSearchHistory();
