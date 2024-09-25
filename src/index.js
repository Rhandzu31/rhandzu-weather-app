function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon img"); // Select img tag

  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  iconElement.setAttribute("src", response.data.condition.icon_url); // Update image src
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "c9t181o33a037fabb0f43f3680067a57";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather).catch(error => {
    console.error("Error fetching weather data:", error);
  });

  // Fetch forecast data for the city
  getForecast(city);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "c9t181o33a037fabb0f43f3680067a57";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast).catch(error => {
    console.error("Error fetching forecast data:", error);
  });
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  let days = response.data.daily; // Assuming 'daily' contains forecast for the next few days

  days.forEach(function (day, index) {
    if (index < 5) { // Show forecast for 5 days
      forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDate(new Date(day.time * 1000))}</div>
        <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" alt="${day.condition.description}">
        </div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"><strong>${Math.round(day.temperature.maximum)}°</strong></span>
          <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
        </div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default city to load
searchCity("Paris");
