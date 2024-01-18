const apiKey = 'ad0451d039549dcdec87e21b8af0b295';

const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityListDiv = document.getElementById('city-list');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastCardsDiv = document.getElementById('forecast-cards');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    getCityCoordinates(cityName);
});

function getCityCoordinates(cityName) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            getWeatherData(lat, lon, cityName);
            saveCityToHistory(cityName);
            cityInput.value = '';
        } else {
            alert('City not found. Please try again.');
        }
    })
    .catch(error => console.error('Error fetching coordinates:', error));
}

function getWeatherData(lat, lon, cityName) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => updateUI(data, cityName))
    .catch(error => console.error('Error fetching weather data:', error));
}
