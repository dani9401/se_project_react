import { defaultClothingItems } from "../../utils/constants.js";
import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard";
import "../Main/Main.css"
import { useMemo } from "react";

function Main({weatherTemp, onSelectCard}) {

    const weatherType = useMemo(() => {
        if (weatherTemp >= 86) {
            return 'hot';
          } else if (weatherTemp >= 66 && weatherTemp <= 85) {
            return 'warm';
          } else if (weatherTemp <= 65) {
            return 'cold';
          }
    }, [weatherTemp]) //dependencies go in brackets

    const filteredCards = defaultClothingItems.filter((item) => {
        return item.weather.toLowerCase() === weatherType; //toLowerCase removes possibility that card might have weather style in non-identical string, ie; Hot vs hot
    })

    return (
        <main className="main">
        <WeatherCard day={false} type='storm' weatherTemp={weatherTemp} />
        <section className="card__section" id='card'>
            <h2 className="card__section-title">Today is {weatherTemp}°F / You may want to wear:</h2>
            <div className="card__items"> {filteredCards.map((item) => (
                <ItemCard key={item._id} item={item} onSelectCard={onSelectCard}/>
            ))}</div>
        </section>
    </main>);
}

export default Main;