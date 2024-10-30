// Function to fetch weather data for favorite cities
function fetchWeatherForFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Favorites:', favorites); // Debug: Log the favorites array

    if (favorites.length === 0) {
        document.getElementById('favorites-grid').innerHTML = '<p>No favorite cities found.</p>';
        return; // Exit if there are no favorites
    }

    favorites.forEach(city => {
        console.log('Fetching weather for:', city); // Debug: Log the city being fetched
        fetchWeather(city);
    });
}

// Fetch weather data based on city name
function fetchWeather(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${city}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data received:', data); // Debug: Log the received data
            createWeatherCard(data);
        })
        .catch(error => {
            console.error(error.message); // Log the error message
            alert(`Error fetching weather for ${city}: ${error.message}`);
        });
}


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

const iconMap = {
    'Sunny': 'fas fa-sun fa-5x',
    'Clear': 'fas fa-sun fa-5x',
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

// Function to create a weather card
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

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        deleteFavoriteCity(location);
        alert('Weather card removed from favorites!');
    };

    card.appendChild(deleteButton); // Append the delete button to the card

    document.getElementById('favorites-grid').appendChild(card);
}

// Function to delete a city from favorites
function deleteFavoriteCity(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite !== city); // Remove the city
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Update local storage
    document.getElementById('favorites-grid').innerHTML = ''; // Clear the grid
    fetchWeatherForFavorites(); // Reload favorites to reflect changes
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Fetch weather data for favorite cities when the page loads
fetchWeatherForFavorites();