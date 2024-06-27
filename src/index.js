import "./style.css";

const div = document.querySelector(".output");

function createDom(icon, text) {
  const container = document.querySelector(".container");
  const pic = new Image();
  pic.src = icon;
  const weather = document.createElement("div");
  weather.textContent = text;
  container.appendChild(pic);
  container.appendChild(weather);
}

async function fetching(web) {
  try {
    const response = await fetch(web, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    createDom(data.current.condition.icon, data.current.condition.text);
  } catch (error) {
    console.error(`Catch error : ${error}`);
  }
}

function deleteSearch(search) {
  const address = `http://api.weatherapi.com/v1/current.json?key=5572d6b5506540f1a26101902242406&q=${search}`;
  fetching(address);
}

const btn = document.querySelector("button");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const userInput = document.getElementById("search").value;
  deleteSearch(userInput);
});

async function conditions() {
  const url = await fetch(
    "https://www.weatherapi.com/docs/weather_conditions.json",
    {
      mode: "cors",
    }
  );
  const convert = url.json();
  return convert;
}
conditions().then((result) => result.forEach((i) => console.log(i.day)));
/* deleteSearch(url); */
