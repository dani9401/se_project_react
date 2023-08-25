//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
//My API Key: 68247c01732e1119e845b344423d9160

const latitude = 39.73;
const longitude = -104.99;
const apiKey = "68247c01732e1119e845b344423d9160";

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