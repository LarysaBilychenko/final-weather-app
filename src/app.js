function formatData(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "3af0ace7e53bde08dtbd8a6b4o60a6d7";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let skyElement = document.querySelector("#sky");
  skyElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let currentTimeElement = document.querySelector("#current-time");
  currentTimeElement.innerHTML = formatData(response.data.time * 1000);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "3af0ace7e53bde08dtbd8a6b4o60a6d7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCityElement = document.querySelector("#input-city");
  search(inputCityElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

function displayCelsius(event) {
  event.preventDefault();
  //celsiusLink.classList.add("active");
  //fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="forecast-time">${formatDay(forecastDay.time)}</div>
        <img src="${
          forecastDay.condition.icon_url
        }" alt="weather icon" id="main-icon" />
          <div class="forecast-temperature">
           <span class="forecast-temperature-max">${Math.round(
             forecastDay.temperature.maximum
           )}°</span
           ><span class="forecast-temperature-min">${Math.round(
             forecastDay.temperature.minimum
           )}°</span>
          </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Kyiv");
