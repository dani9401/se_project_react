import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css'

function Main({weatherTemp}) {
    return <main className="main">
        <WeatherCard day={false} type='storm' weatherTemp={weatherTemp} />
        <section className="card__section" id='card'>
            <h2>Today is {weatherTemp} / You may want to wear:</h2>
            <div className="card__items"> {defaultClothingItems.map((item) => (
                <ItemCard item={item} />
            ))}</div>
        </section>
    </main>;
}

export default Main;