async function fetching(web, dom, threeCast) {
  try {
    const response = await fetch(web, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    const array = [];
    data.forecast.forecastday.forEach((item) => {
      const obj = Forecast(
        item.day.avgtemp_c,
        item.day.condition.icon,
        item.day.condition.text
      );
      array.push(obj);
    });
    threeCast(array, data.location.name);
    dom(
      data.current.condition.icon,
      data.current.condition.text,
      data.location.name,
      data.location.country,
      data.current.temp_c
    );
  } catch (error) {
    console.error(`Catch error : ${error}`);
  }
}

function Forecast(avgtemp, icon, text) {
  return { avgtemp, icon, text };
}

export { fetching };
``;
