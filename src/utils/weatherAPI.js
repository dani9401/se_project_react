import { apiKey, latitude, longitude } from "./constants";
import { checkResponse } from "./utils";

export const getWeatherForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: `${Math.round(temperature)}`,
      C: `${Math.round(((data.main.temp - 32) * 5) / 9)}`,
    },
  };
  return weather;
};

export const parseLocationData = (data) => {
  const locationName = data.name;
  return locationName;
};

//export const parseWeatherCondition = (data) => {
//  const weatherCondition = data.weather.main;
//  return weatherCondition;
//};
