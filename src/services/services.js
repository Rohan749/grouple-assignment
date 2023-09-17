import { DateTime } from "luxon";

const API_KEY = "ENTER_YOUR_API_KEY_HERE"
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json()).catch((error) => console.warn("Error occurred:", error));
};

const weatherFormat = (data, units) => {

  let tempFormat;
  if(units === "metric") tempFormat = "C"
  else tempFormat = "F"

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    dt,
    name,
    cod,
    sys: { country, sunrise, sunset },
  } = data;


  const { main: details, icon } = data.weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    dt,
    name,
    cod,
    country,
    sunrise,
    sunset,
    details,
    icon,
    tempFormat
  };
};

const forecastFormat = async (data) => {
  let { timezone, list } = data;

  list = list.filter((obj, index) => {
    const datePart = obj.dt_txt.split(" ")[0];
    return list.findIndex((o) => o.dt_txt.split(" ")[0] === datePart) === index;
  }).slice(1, 4).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.main.temp,
            icon: d.weather[0].icon,
            min_temp: d.main.temp_min,
            max_temp: d.main.temp_max
        }
      });


  return { timezone, list }
};

const getFormattedWeatherData = async (searchParams) => {


  const formattedData = await getWeatherData("weather", searchParams).then(
    (data) => weatherFormat(data, searchParams.units)
  )

  const { lat, lon } = formattedData;

  const formattedForcast = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(forecastFormat);

  return {...formattedData, ...formattedForcast};
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const urlIconCreator = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export { formatToLocalTime, urlIconCreator }
