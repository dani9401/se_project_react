import "../WeatherCard/WeatherCard.css";

const weatherOptions = [
  {
    url: require("../../images/Day/Day - Sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/Day/Day - Cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/Day/Day - Fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../../images/Day/Day - Rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../../images/Day/Day - Snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../../images/Day/Day - Storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../../images/Night/Night - Clear.svg").default,
    day: false,
    type: "clear",
  },
  {
    url: require("../../images/Night/Night - Cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../../images/Night/Night - Fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../../images/Night/Night - Rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../../images/Night/Night - Snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../../images/Night/Night - Storm.svg").default,
    day: false,
    type: "storm",
  },
];

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
