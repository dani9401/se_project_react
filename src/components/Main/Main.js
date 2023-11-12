import WeatherCard from "./WeatherCard/WeatherCard.js";
import ItemCard from "./ItemCard/ItemCard.js";
import "../Main/Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({ weatherTemp, onSelectCard, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const getWeatherType = (temp) => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType(temp);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
    //toLowerCase removes possibility that card might have weather
    //style in non-identical string, ie; Hot vs hot
  });

  return (
    <main className="main">
      <WeatherCard
        day={false}
        type="storm"
        weatherTemp={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="card__section" id="card">
        <h2 className="card__section-title">
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        </h2>
        <div className="card__items" id="card-section">
          {" "}
          {filteredCards.map((item) => (
            <ItemCard
              key={item.id || item._id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
