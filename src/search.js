// Function to handle search button click
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city_input').value;
    if (city) {
        // Update the URL with the new city as a query parameter
        window.location.href = `?city=${encodeURIComponent(city)}`;
    } else {
        alert('Please enter a city name.');
    }
});

// Function to get clothing recommendations based on temperature
function getClothingRecommendation(temp) {
    let recommendation = '';
    let accessories = '';
    let tips = '';

    if (temp < 0) {
        recommendation = "Heavy winter coat, insulated layers, thermal leggings or pants, waterproof boots, gloves, scarf, hat, thermal socks.";
        accessories = "Hand warmers, ear muffs, thick scarf.";
        tips = "Dress in layers; opt for insulated, waterproof clothing to retain warmth.";
    } else if (temp >= 0 && temp <= 5) {
        recommendation = "Thick coat, sweater, thermal pants or jeans, boots, gloves, hat, scarf.";
        accessories = "Wool socks, neck gaiter.";
        tips = "Windproof jackets are helpful for extra warmth.";
    } else if (temp > 5 && temp <= 10) {
        recommendation = "Medium-weight jacket, long-sleeve shirt, jeans or thicker pants, closed-toe shoes.";
        accessories = "Light scarf, beanie.";
        tips = "Dress in layers that can be removed as needed.";
    } else if (temp > 10 && temp <= 15) {
        recommendation = "Light jacket or sweater, long-sleeve shirt, jeans or comfortable pants, sneakers or ankle boots.";
        accessories = "Light scarf.";
        tips = "Bring a light jacket for the evening chill.";
    } else if (temp > 15 && temp <= 20) {
        recommendation = "Light sweater or cardigan, t-shirt, jeans or pants, comfortable shoes.";
        accessories = "None usually needed, but a hat or light scarf could add style.";
        tips = "Dress in breathable fabrics for comfort.";
    } else if (temp > 20 && temp <= 25) {
        recommendation = "T-shirt or short-sleeve top, light pants or shorts, casual shoes or sneakers.";
        accessories = "Sunglasses, optional sun hat.";
        tips = "Avoid heavy fabrics; go for breathable materials like cotton.";
    } else if (temp > 25 && temp <= 30) {
        recommendation = "Short-sleeve shirt or tank top, shorts, light dress or skirt, sandals or breathable shoes.";
        accessories = "Sunglasses, sun hat, sunscreen.";
        tips = "Light, breathable fabrics are essential for staying cool.";
    } else if (temp > 30) {
        recommendation = "Tank top, light shorts or loose pants, light dress or maxi dress, flip-flops or open sandals .";
        accessories = "Sunglasses, wide-brimmed hat, high-SPF sunscreen.";
        tips = "Choose fabrics like linen or cotton for maximum breathability.";
    }

    return { recommendation, accessories, tips };
}

// Fetch weather data based on city name
function fetchWeather(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            createWeatherCard(data);
            fetchHourlyForecast(city); // Fetch hourly forecast after fetching weather data
        })
        .catch((error) => {
            alert(error.message); // Show an alert if the city is not found
        });
}

const iconMap = {
    'Sunny': 'fas fa-sun',
    'Clear': 'fas fa-sun',
    'Partly cloudy': 'fas fa-cloud-sun fa-5x',
    'Partly Cloudy': 'fas fa-cloud-sun fa-5x',
    'Cloudy': 'fas fa-cloud fa-5x',
    'Overcast': 'fas fa-cloud-meatball fa-5x',
    'Rain': 'fas fa-cloud-rain fa-5x',
    'Drizzle': 'fas fa-cloud-showers-heavy fa-5x',
    'Thunderstorm': 'fas fa-bolt fa-5x',
    'Snow': 'fas fa-snowflake fa-5x',
    'Fog': 'fas fa-smog fa-5x',
    'Mist': 'fas fa-smog fa-5x',
    'Patchy rain nearby': 'fas fa-cloud-sun-rain fa-5x',
    'Light rain': 'fas fa-cloud-rain fa-5x',
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

    const clothingRecommendation = getClothingRecommendation(currentTemp);
    const clothingSuggestionDiv = `
        <div class="clothing-suggestion"><br><br><br>
            <h3>Clothing Suggestion:</h3><hr>
            <p>Recommendation: ${clothingRecommendation.recommendation}</p><br>
            <p>Accessories: ${clothingRecommendation.accessories}</p><br>
            <p>Tips: ${clothingRecommendation.tips}</p><br>
        </div>
    `;

    card.innerHTML = `
        <div class="left-partition">
            <h2>${location}, ${region}, ${country}</h2>
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
        <div class="right-partition"><br><br>
            <i class="${icon} icon"></i>
            <div class="temp">${currentTemp} °C</div>
            <div class="weather-desc">${weatherDesc}</div>
            <div class="feels-like">Feels Like: ${feelsLike} °C</div>
        </div>
        ${clothingSuggestionDiv}
    `;

    document.getElementById('weather-grid').appendChild(card);

    const saveButton = document.getElementById('save-favorite-button');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            saveToFavorites(location); // Save the city name
            alert('Weather card saved to favorites!'); // Optional: alert user
        });
    }
}

function saveToFavorites(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(city)) { // Prevent duplicates
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Function to get query parameter
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch weather data when the page loads only if a city is provided
const city = getQueryParameter('city');
if (city) {
    fetchWeather(city);
}

// Function to fetch and display hourly forecast
function fetchHourlyForecast(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}&hours=24`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            displayHourlyForecast(data);
        })
        .catch((error) => {
            alert(error.message); // Show an alert if the city is not found
        });
}

// Function to display hourly forecast
function displayHourlyForecast(data) {
    const hourlyForecastContainer = document.createElement('div');
    hourlyForecastContainer.classList.add('hourly-forecast');

    hourlyForecastContainer.innerHTML = '<h3>Hourly Forecast:</h3><hr>';
    data.forecast.forecastday[0].hour.forEach(hour => {
        const time = new Date(hour.time_epoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        hourlyForecastContainer.innerHTML += `
            <div class="hour">
                <div class="time">${time}</div>
                <div class="temp">${hour.temp_c} °C</div>
                <div class="condition">${hour.condition.text}</div>
            </div>
        `;
    });

    // Append the hourly forecast to the weather grid or the weather card
    document.getElementById('weather-grid').appendChild(hourlyForecastContainer);
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

