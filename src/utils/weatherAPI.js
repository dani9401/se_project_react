import { apiKey, latitude, longitude } from "./constants";

export const getWeatherForecast = () => {
    const weatherApi = fetch 
    (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error`);
        }
    })
    .catch(console.error);
    return weatherApi;
}

export const parseWeatherData = (data) => {
    const main = data.main;
    const temperature = main && main.temp;
    return Math.ceil(temperature);
}

export const parseLocationData = (data) => {
    const locationName = data.name;
    return locationName;
}