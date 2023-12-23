// Function to parse the formatted date
function formatDate(date) {
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tueday",
        "Wedday",
        "Thuday",
        "Friday",
        "Saturday",
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

// Function that displays the input city weather data
function displayWeatherData(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temp-value");
    let descriptionElement = document.querySelector("#location-description");
    let humidityElement = document.querySelector("#location-humidity");
    let windElement = document.querySelector("#location-wind");
    let dateElement = document.querySelector("#location-date");
    let iconElement = document.querySelector("#temp-icon");

    let city = response.data.city;
    let temperature = Math.round(response.data.temperature.current);
    let description = response.data.condition.description;
    let humidity = response.data.temperature.humidity;
    let wind = response.data.wind.speed;
    let date = new Date(response.data.time * 1000);
    let icon = `<img
    src="${response.data.condition.icon_url}"
    class="current-temperature-icon"/>`;

    cityElement.innerHTML = `${city}`;
    temperatureElement.innerHTML = `${temperature}`;
    descriptionElement.innerHTML = `${description}`;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${wind}km/h`;
    dateElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `${icon}`;

    getForecast(response.data.city);
}

// function using Axios API to get the city weather data
function getCity(city) {
    let apiKey = "2b0dc590cd47ao3bt2dcefd407454554";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherData);
}

// Function that converts current City to input text
function handleSearch(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");

    getCity(searchInputElement.value);
}

// Search button event
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

getCity("Melbourne");

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayForecastData(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 6) {
            forecastHtml += `
            <div class="forecast-weather">
                <div class="forecast-day">${formatDay(day.time)}</div>
                    <div id="forecast-icon">
                    <img
                        src="${day.condition.icon_url}"
                        class="forecast-temperature-icon"
                        />
                    </div>
                    <div class="forecast-temperatures">
                        <span class="forecast-temp-max">${Math.round(
                            day.temperature.maximum
                        )}º</span>
                        <span class="forecast-temp-min">${Math.round(
                            day.temperature.minimum
                        )}º</span>
                    </div>
            </div>
        `;
        }
    });

    forecast.innerHTML = forecastHtml;
}

// Function to display the weekly weather forecast
function getForecast(city) {
    let apiKey = "2b0dc590cd47ao3bt2dcefd407454554";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecastData);
}
