import "../WeatherCard/WeatherCard.css";
import { weatherOptions } from "../../utils/constants";


const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSource = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSourceURL = imageSource[0].url || ""; //empty string at end for defensive coding

  return (
    <section id="weather" className="weather">
      <h2 className="weather__info">{weatherTemp}°F</h2>
      <img
        className="weather__image"
        src={imageSourceURL}
        alt="weather image"
      ></img>
    </section>
  );
};

export default WeatherCard;
