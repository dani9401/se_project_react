import Header from './Header/Header.js'

function App() {
    return (
        <div>
            <Header/>
            <main className="main">
                <section id='weather' className="weather">
                    <div className="weather__info">75°F</div>
                    <img className="weather__image" src='./images/Day/Day - Sunny.svg' alt='weather image'></img>
                </section>
                <section id='card'>Cards</section>
            </main>
        </div>
    );
}

export default App;