//Date and time
let currentDate = document.querySelector("#currentDate");
let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Now",
  "Dec",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${date}`;

let currentTime = document.querySelector("#time");
let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");

currentTime.innerHTML = `${hours}:${minutes}`;

//Form
function search(event) {
  event.preventDefault();
  let seachInput = document.querySelector("#search-text");
  let h1 = document.querySelector("h1");
  let cityName = seachInput.value;
  if (cityName) {
    h1.innerHTML = `${cityName}`;
    getData(cityName);
    return cityName;
  } else {
    alert("Please enter the city");
  }
}

function getForecast(coordinates) {
  let apiKey = `46519a0dbe5d76596a4aa56440223836`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function updateUi(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemperature = Math.round(celsiusTemperature);
  let temp = document.querySelector("#temperature");
  let currentTempDescription = response.data.weather[0].main;
  let tempDescription = document.querySelector("#temp-description");
  let currentWind = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  let currectHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  let icon = response.data.weather[0].icon;
  let mainIcon = document.querySelector("#mainIcon");

  temp.innerHTML = `${currentTemperature}`;
  tempDescription.innerHTML = `${currentTempDescription}`;
  wind.innerHTML = `${currentWind}`;
  humidity.innerHTML = `${currectHumidity}`;
  mainIcon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  );
  getForecast(response.data.coord);
}

function getData(cityName) {
  let apiKey = "46519a0dbe5d76596a4aa56440223836";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateUi);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row g-3 my-5 mx-3">`;
  let forecastDays = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  
              <div class="col-2 border border-1 rounded py-1 mx-2">
                <div class="">
                  <h5 class="weather-forcast-day">${formatDay(
                    forecastDay.dt
                  )}</h5>
                </div>
                
                <div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                  />
                </div>
                <div class="weather-forcast-temperature">
                  <span class="weather-forcast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forcast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-button");
form.addEventListener("click", search);
let formSubmit = document.querySelector("#search-form");
formSubmit.addEventListener("submit", search);
