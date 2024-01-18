// Constants and variables
const apiKey = 'ad0451d039549dcdec87e21b8af0b295'; 

const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityListDiv = document.getElementById('city-list');
const currentWeatherDiv = document.getElementById('current-weather');
const cityNameDiv = document.getElementById('city-header');
const weatherInfoDiv = document.getElementById('weather-info');
const forecastCardsDiv = document.getElementById('forecast-cards');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getCityCoordinates(cityName);
    }
});

function getCityCoordinates(cityName, saveToHistory = true) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;

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
                if (saveToHistory) {
                    saveCityToHistory(cityName);
                }
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
    const cityHeaderDiv = document.getElementById('city-header');
    const weatherInfoDiv = document.getElementById('weather-info');

    cityHeaderDiv.innerHTML = '';
    weatherInfoDiv.innerHTML = '';

    const currentWeather = weatherData.list[0];

    const header = document.createElement('h2');
    header.textContent = `${cityName} (${new Date(currentWeather.dt * 1000).toLocaleDateString()})`;

    const icon = document.createElement('img');
    icon.src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
    icon.alt = 'Weather icon';

    cityHeaderDiv.appendChild(header);
    cityHeaderDiv.appendChild(icon);

    const temperatureP = document.createElement('p');
    temperatureP.textContent = `Temperature: ${currentWeather.main.temp}°F`;
    weatherInfoDiv.appendChild(temperatureP);

    const windP = document.createElement('p');
    windP.textContent = `Wind: ${currentWeather.wind.speed} mph`;
    weatherInfoDiv.appendChild(windP);

    const humidityP = document.createElement('p');
    humidityP.textContent = `Humidity: ${currentWeather.main.humidity}%`;
    weatherInfoDiv.appendChild(humidityP);
}

function displayForecastWeather(weatherData) {
    const forecastCardsDiv = document.getElementById('forecast-cards');
    forecastCardsDiv.innerHTML = ''; 

    weatherData.list.forEach((forecast, index) => {
        if (index % 8 === 0) { 
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';

            const dateH3 = document.createElement('h3');
            dateH3.textContent = new Date(forecast.dt * 1000).toLocaleDateString();

            const iconImg = document.createElement('img');
            iconImg.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
            iconImg.alt = 'Weather icon';

            const tempP = document.createElement('p');
            tempP.textContent = `Temp: ${forecast.main.temp}°F`;

            const windP = document.createElement('p');
            windP.textContent = `Wind: ${forecast.wind.speed} mph`;

            const humidityP = document.createElement('p');
            humidityP.textContent = `Humidity: ${forecast.main.humidity}%`;

            forecastCard.appendChild(dateH3);
            forecastCard.appendChild(iconImg);
            forecastCard.appendChild(tempP);
            forecastCard.appendChild(windP);
            forecastCard.appendChild(humidityP);
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

function populateCurrentWeather() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (cities.length > 0) {
        const lastSearchedCity = cities[0];
        getCityCoordinates(lastSearchedCity);
    } else {
        randomCityWeather();
    }
}

function randomCityWeather() {
    const randomCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    getCityCoordinates(randomCity, false);
}

loadSearchHistory();
populateCurrentWeather();
