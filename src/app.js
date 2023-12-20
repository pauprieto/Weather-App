// Function that displays the current city weather
function displayWeatherData(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temp-value");

    let city = response.data.city;
    let temperature = Math.round(response.data.temperature.current);

    cityElement.innerHTML = `${city}`;
    temperatureElement.innerHTML = `${temperature}`;
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
