import "./style.css";
import { fetching } from "./logic.js";
import Sun from "./sunny.jpg";
import { format } from "date-fns";

const body = document.querySelector("body");
body.style.backgroundImage = `url(${Sun}`;

function addWeatherDetail() {
  const sideContent = document.querySelector(".side-content");
  const weatherDetail = document.createElement("div");
}

function addForecast(array, city) {
  const sideContent = document.querySelector(".side-content");
  if (document.querySelector(".forecast-container") !== null) {
    document.querySelector(".forecast-container").remove();
  }
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");

  array.forEach((obj) => {
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");
    const tempC = document.createElement("div");
    tempC.classList.add("forecast-avgtemp-c");
    const name = document.createElement("div");
    name.classList.add("forecast-name");
    const icon = document.createElement("div");
    icon.classList.add("forecast-icon");

    tempC.textContent = obj.avgtemp;
    name.textContent = city;
    const pic = new Image();
    pic.src = obj.icon;
    icon.appendChild(pic);

    forecast.appendChild(tempC);
    forecast.appendChild(name);
    forecast.appendChild(icon);
    forecastContainer.appendChild(forecast);
  });

  sideContent.appendChild(forecastContainer);
}

function createDom(icon, text, city, country, tempC) {
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
