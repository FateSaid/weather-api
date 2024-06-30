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
        item.day.condition.text,
        item.date
      );
      obj.name = data.location.name;
      array.push(obj);
    });
    threeCast(array);
    dom(
      data.current.condition.icon,
      data.current.condition.text,
      data.location.name,
      data.location.country,
      data.current.temp_c,
      data.current.humidity,
      data.current.wind_degree,
      data.current.wind_dir,
      data.current.cloud,
      data.current.is_day
    );
  } catch (error) {
    console.error(`Catch error : ${error}`);
  }
}

function Forecast(avgtemp, icon, text, date) {
  return { avgtemp, icon, text, date };
}

export { fetching };
