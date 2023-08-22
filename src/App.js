import Header from './Header/Header.js'
import WeatherCard from './WeatherCard/WeatherCard.js';
import ItemCard from './ItemCard/ItemCard.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';



function App() {
    const weatherTemp = "65°F";
    return (
        <div>
            <Header/>
            <Main weatherTemp={weatherTemp}/>
            <Footer/>
        </div>
    );




}

export default App;