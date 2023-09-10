import "../WeatherCard/WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({
  day,
  type,
  weatherTemp = "",
  currentTemperatureUnit = "",
}) => {
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });

  const weatherOptionUrl = weatherOption.url || ""; //empty string at end for defensive coding

  return (
    <section id="weather" className="weather">
      <h2 className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </h2>
      <img
        className="weather__image"
        src={weatherOptionUrl}
        alt="weather image"
      ></img>
    </section>
  );
};

export default WeatherCard;
