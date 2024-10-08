# Weather Dashboard
Weather Dashboard is a web application that allows users to search for the current weather and a 5-day forecast for any city. The application uses the OpenWeather API to fetch weather data and dynamically displays the results. It also saves a history of previously searched cities, allowing users to easily revisit the weather for those locations.

## Table of Contents
- [Description](#Description)
- [Features](#Features)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [Usage](#Usage)
- [API](#API)
- [License](#License)
  
## Description
The Weather Dashboard is a simple, easy-to-use tool for viewing both current weather and a 5-day weather forecast for cities around the world. Users can enter a city name to search for its weather data, which is then displayed in two sections:
Current Weather: Displays temperature, wind speed, humidity, and weather conditions for the current day.
5-Day Forecast: Displays the temperature, wind speed, humidity, and weather conditions for the next five days.
The search history is stored in local storage, so previous city searches are saved and can be revisited with a single click.

## Features
City Search: Search for any city’s weather by entering its name.
Current Weather Display: Displays the current temperature, wind speed, and humidity.
5-Day Forecast: Shows weather information for the next five days.
Search History: Saves searched cities and displays them as clickable buttons for easy re-search.
Responsive Design: Works on a variety of screen sizes.
Random City Weather: If no cities are in search history, the app will display weather for a random city.

## Technologies
HTML5: Structure of the web page.
CSS: Styling, including external Bootstrap for responsive design.
JavaScript (ES6): DOM manipulation, data fetching, and event handling.
OpenWeather API: Used to fetch weather data.
Day.js: Library for date manipulation.
Local Storage: To store search history.

## Installation
- Clone the repository:
`git clone https://github.com/astro0725/weather-dash.git`
- Navigate to the project directory:
`cd weather-dash`
- Open the index.html file in your preferred web browser to run the application locally.
- Alternatively, you can access the live deployment of the project [here](https://astro0725.github.io/weather-dash/).

## Usage
How the Website Works:
- Search for a City:
  - Enter a city name in the search bar and click "Search."
  - The current weather and a 5-day forecast will be displayed for the city you searched for.
- View Weather Data:
  - The current weather section shows the temperature (in Fahrenheit), wind speed, humidity, and weather icon.
  - The 5-day forecast displays the weather information for each day, including the date, temperature, wind speed, and humidity.
- Search History:
  - Previous searches are saved in a search history on the sidebar as buttons.
  - Click any previously searched city to view its weather again.
- Random City Weather:
  - If there is no search history, a random city from a predefined list will be selected and its weather will be displayed.

## API
This project uses the OpenWeather API to retrieve weather data. To use this project, you must obtain an API key from OpenWeather and include it in the scripts.js file:
`const apiKey = 'your-api-key-here';  // Replace with your OpenWeather API key`

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) <br/>
This project is licensed under the MIT license. For more details, see [this link](https://opensource.org/licenses/MIT).
