const weatherOptions = [
    {url: "./images/Day/Day - Sunny.svg", day: true, type: "sunny"},
    {url: "./images/Day/Day - Cloudy.svg", day: true, type: "cloudy"},
    {url: "./images/Day/Day - Fog.svg", day: true, type: "fog"},
    {url: "./images/Day/Day - Rain.svg", day: true, type: "rain"},
    {url: "./images/Day/Day - Snow.svg", day: true, type: "snow"},
    {url: "./images/Day/Day - Storm.svg", day: true, type: "storm"},
    {url: "./images/Night/Night - Clear.svg", day: false, type: "clear"},
    {url: "./images/Night/Night - Cloudy.svg", day: false, type: "cloudy"},
    {url: "./images/Night/Night - Fog.svg", day: false, type: "fog"},
    {url: "./images/Night/Night - Rain.svg", day: false, type: "rain"},
    {url: "./images/Night/Night - Snow.svg", day: false, type: "snow"},
    {url: "./images/Night/Night - Storm.svg", day: false, type: "storm"}
]

const WeatherCard = ({day, type}) => {
    //console.log("WeatherCard");

const imageSource = weatherOptions.filter((i) => {
    //console.log(i);
    return i.day === day && i.type === type
})

//console.log(imageSource)
//console.log(imageSource[0].url)

const imageSourceURL = imageSource[0].url || "" //empty string at end for defensive coding

    return (
        <section id='weather' className="weather">
                    <div className="weather__info">65°F</div>
                    <img className="weather__image" src={imageSourceURL} alt='weather image'></img>
                </section>
    )
}

export default WeatherCard;