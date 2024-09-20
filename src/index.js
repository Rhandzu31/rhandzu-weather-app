function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
  }

  function searchCity(city) {
    let apiKey = "c9t181o33a037fabb0f43f3680067a57";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
  }

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  // By default, show the weather for Paris on page load
  searchCity("Paris");