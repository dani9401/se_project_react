import "../WeatherCard/WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({
  day,
  type,
  weatherTemp = "",
  currentTemperatureUnit = "",
}) => {
  const imageSource = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSourceURL = imageSource[0].url || ""; //empty string at end for defensive coding

  return (
    <section id="weather" className="weather">
      <h2 className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </h2>
      <img
        className="weather__image"
        src={imageSourceURL}
        alt="weather image"
      ></img>
    </section>
  );
};

export default WeatherCard;
