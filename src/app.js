let apiKey = "3af0ace7e53bde08dtbd8a6b4o60a6d7";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kyiv&key=${apiKey}&units=metric`;
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

function displayTemperature(response) {
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
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
