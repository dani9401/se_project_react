import Header from './Header/Header.js'
import WeatherCard from './WeatherCard/WeatherCard.js';

function App() {
    return (
        <div>
            <Header/>
            <main className="main">
                <WeatherCard day ={true} type='storm'/>
                <section id='card'>Cards</section>
            </main>
        </div>
    );
}

export default App;