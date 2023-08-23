import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css'

function Main({weatherTemp, onSelectCard}) {
    return <main className="main">
        <WeatherCard day={false} type='storm' weatherTemp={weatherTemp} />
        <section className="card__section" id='card'>
            <h2 className="card__section-title">Today is {weatherTemp} / You may want to wear:</h2>
            <div className="card__items"> {defaultClothingItems.map((item) => (
                <ItemCard item={item} onSelectCard={onSelectCard}/>
            ))}</div>
        </section>
    </main>;
}

export default Main;