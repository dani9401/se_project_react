import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css'

function Main({temp, onSelectCard}) {
    return <main className="main">
        <WeatherCard day={false} type='storm' weatherTemp={temp} />
        <section className="card__section" id='card'>
            <h2 className="card__section-title">Today is {temp}°F / You may want to wear:</h2>
            <div className="card__items"> {defaultClothingItems.map((item) => (
                <ItemCard item={item} onSelectCard={onSelectCard}/>
            ))}</div>
        </section>
    </main>;
}

export default Main;