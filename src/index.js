import "./style.css";
import { fetching } from "./logic.js";
import Sun from "./sunny.jpg";
import Rain from "./raining.jpg";
import Night from "./night.jpg";
import { format } from "date-fns";

const body = document.querySelector("body");
body.style.backgroundColor = "lightblue";

function addForecast(array) {
  const sideContent = document.querySelector(".side-content");
  if (document.querySelector(".forecast-container") !== null) {
    document.querySelector(".forecast-container").remove();
  }
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");

  array.forEach((obj) => {
    const forecastBox = document.createElement("div");
    forecastBox.classList.add("forecast-box");
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");
    const tempC = document.createElement("div");
    tempC.classList.add("forecast-avgtemp-c");

    const icon = document.createElement("div");
    icon.classList.add("forecast-icon");

    const text = document.createElement("div");
    text.classList.add("forecast-text");
    text.textContent = obj.text;

    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = format(new Date(obj.date), "eeee");
    forecastBox.appendChild(date);

    tempC.textContent = obj.avgtemp;

    const pic = new Image();
    pic.src = obj.icon;
    icon.appendChild(pic);
    icon.appendChild(text);

    forecast.appendChild(tempC);

    forecast.appendChild(icon);
    forecastBox.appendChild(forecast);
    forecastContainer.appendChild(forecastBox);
  });
  sideContent.appendChild(forecastContainer);
}

function checkWeather(isDay, text) {
  const weather = text.split(" ");
  if (isDay === 1 || weather.includes("sunny") || weather.includes("Sunny")) {
    body.style.backgroundImage = `url(${Sun})`;
    body.style.color = "black";
  } else if (weather.includes("Rain") || weather.includes("rain")) {
    body.style.backgroundImage = `url(${Rain})`;
    body.style.color = "white";
  } else if (isDay === 0) {
    body.style.backgroundImage = `url(${Night}`;
    body.style.color = "white";
  }
}

function createDom(
  icon,
  text,
  city,
  country,
  tempC,
  humidity,
  windDegree,
  windDir,
  cloud,
  isDay
) {
  checkWeather(isDay, text);
  if (document.querySelector(".weather-content") !== null) {
    document.querySelector(".weather-content").remove();
  }
  const container = document.querySelector(".container");
  const theCity = document.createElement("h2");
  theCity.classList.add("city");
  theCity.textContent = city;

  const theCountry = document.createElement("h5");
  theCountry.textContent = country;
  //location
  const location = document.createElement("div");
  location.classList.add("location");

  //date
  const date = document.createElement("div");
  date.textContent = format(new Date(), "eeee, cc, LLL, yy");
  location.appendChild(theCity);
  location.appendChild(theCountry);
  location.appendChild(date);
  //pic
  const picDiv = document.createElement("div");
  picDiv.classList.add("logo");
  const pic = new Image();
  pic.src = icon;
  picDiv.appendChild(pic);

  const info = document.createElement("div");
  info.classList.add("info");
  //temperate
  const temp = document.createElement("div");
  temp.classList.add("temp");
  temp.textContent = tempC + "°C";
  info.appendChild(temp);
  //condition text
  const p = document.createElement("p");
  p.classList.add("condition");
  p.textContent = text;
  picDiv.appendChild(p);

  const weatherDetail = document.createElement("div");
  weatherDetail.classList.add("weather-content");

  // humidity

  const humidDiv = document.createElement("div");
  humidDiv.classList.add("weather-humidity");
  humidDiv.textContent = `Humidity: ${humidity}`;

  const windDegDiv = document.createElement("div");
  windDegDiv.classList.add("weather-wind-degree");
  windDegDiv.textContent = `Wind Degree: ${windDegree}`;

  const windDirDiv = document.createElement("div");
  windDirDiv.classList.add("weather-wind-direction");
  windDirDiv.textContent = `Wind Direction: ${windDir}`;

  const cloudDiv = document.createElement("div");
  cloudDiv.classList.add("weather-cloud");
  cloudDiv.textContent = `Cloud: ${cloud}`;

  weatherDetail.appendChild(humidDiv);
  weatherDetail.appendChild(windDegDiv);
  weatherDetail.appendChild(windDirDiv);
  weatherDetail.appendChild(cloudDiv);

  const weatherContainer = document.querySelector(".weather-detail");
  weatherContainer.appendChild(weatherDetail);

  container.appendChild(info);
  container.appendChild(location);
  container.appendChild(picDiv);
}

function deleteSearch(search) {
  const address = `http://api.weatherapi.com/v1/forecast.json?key=5572d6b5506540f1a26101902242406&&days=3&q=${search}`;
  fetching(address, createDom, addForecast);
}

const btn = document.querySelector("button");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("form");
  const container = document.querySelector(".container");
  container.textContent = "";

  const userInput = document.getElementById("search").value;
  deleteSearch(userInput);
  form.reset();
});

/* deleteSearch(url); */
