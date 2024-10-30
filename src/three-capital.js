const cities = ['Kuala Lumpur', 'Bangkok', 'Jakarta', 'Hanoi'];
const apiKey = '32804b24a847407391c53709241010'; // Your API key
const weatherGrid = document.getElementById('weather-grid');

async function fetchWeather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`);
    const data = await response.json();
    return data;
}

// Map WeatherAPI conditions to Material Icons
// Map WeatherAPI conditions to Font Awesome Icons
const iconMap = {
    'Sunny': 'fas fa-sun',
    'Clear': 'fas fa-sun',
    'Partly cloudy': 'fas fa-cloud-sun fa-5x',
    'Partly Cloudy': 'fas fa-cloud-sun fa-5x',
    'Cloudy': 'fas fa-cloud',
    'Overcast': 'fas fa-cloud-meatball',
    'Rain': 'fas fa-cloud-rain',
    'Drizzle': 'fas fa-cloud-showers-heavy',
    'Thunderstorm': 'fas fa-bolt',
    'Snow': 'fas fa-snowflake',
    'Fog': 'fas fa-smog',
    'Mist': 'fas fa-smog fa-5x',
    'Patchy rain nearby': 'fas fa-cloud-sun-rain',
    'Light rain': 'fas fa-cloud-rain',
    'Patchy light rain with thunder': 'fas fa-cloud-bolt fa-5x',
    'Moderate or heavy rain with thunder': 'fas fa-cloud-showers-heavy fa-5x',
};

function createWeatherCard(data) {
    const card = document.createElement('div');
    card.classList.add('weather-card');

    const location = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const localTime = data.location.localtime;
    const currentTemp = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const forecastTemp = data.forecast.forecastday[0].day.avgtemp_c;
    const sunset = data.forecast.forecastday[0].astro.sunset;
    const sunrise = data.forecast.forecastday[0].astro.sunrise;
    const weatherDesc = data.current.condition.text;
    const icon = iconMap[weatherDesc] || 'help'; // Default icon if not found

    card.innerHTML = `
        <div class="left-partition">
            <h2>${location}, ${country}</h2>
            <div class="time">Local Time: ${localTime}</div>
            <hr>
            <div class="details">
                <div class="label">Forecast Temperature:</div>
                <div class="value">${forecastTemp} °C</div>
                <div class="label">Sunset:</div>
                <div class="value">${sunset}</div>
                <div class="label">Sunrise:</div>
                <div class="value">${sunrise}</div>
                <div class="label">Wind Speed:</div>
                <div class="value">${data.current.wind_kph} kph</div>
                <div class="label ">Humidity:</div>
                <div class="value">${data.current.humidity}%</div>
            </div>
        </div>
        <div class="right-partition"><br><br><br>
            <i class="${icon} icon"></i>
            <div class="temp">${currentTemp} °C</div>
            <div class="weather-desc">${weatherDesc}</div>
            <div class="feels-like">Feels Like: ${feelsLike} °C</div>
        </div>
    `;

    weatherGrid.appendChild(card);
}

async function displayWeather() {
    for (const city of cities) {
        const weatherData = await fetchWeather(city);
        createWeatherCard(weatherData);
    }
}

displayWeather();