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

//Degrees
function changeDegreesToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(fahrenheitTemperature);
}

function changeDegreesToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeDegreesToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeDegreesToCelsius);

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
  console.log(coordinates);
  let apiKey = `46519a0dbe5d76596a4aa56440223836`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function updateUi(response) {
  console.log(response);
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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row g-3 my-5 mx-3">`;
  let forecastDays = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
              <div class="col-2 border border-1 rounded py-1 mx-2">
                <div class="">
                  <h5 class="weather-forcast-day">${day}</h5>
                </div>
                <div class="weather-forcast-date">Jul 2</div>
                <div>
                  <img
                    src="http://openweathermap.org/img/wn/10d@2x.png"
                    alt=""
                    width="42"
                  />
                </div>
                <div class="weather-forcast-temperature">
                  <span class="weather-forcast-temperature-max">28°</span>
                  <span class="weather-forcast-temperature-min">14°</span>
                </div>
              </div>
            
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-button");
form.addEventListener("click", search);
let formSubmit = document.querySelector("#search-form");
formSubmit.addEventListener("submit", search);
