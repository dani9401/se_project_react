import Header from './Header/Header.js'
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import ModalWithForm from './ModalWithForm/ModalWithForm.js';
import "./ModalWithForm/ModalWithForm.css"
import "./ItemModal/ItemModal.css"
import ItemModal from './ItemModal/ItemModal.js';
import { useEffect, useState } from 'react';
import { getWeatherForecast, parseLocationData, parseWeatherData } from './utils/weatherAPI.js';

function App() {
    const [activeModal, setActiveModal] = useState(''); //setting the default values for modals 
    //when page renders. Make sure to always use a string. 
    //this allows react to know what the starting default value is
    //and how to move forward from that starting value
    //so if it's a string, it's expecting string values
    //if it's a boolean, it'll expect only booleans, 
    //if it's a number, it'll expect numbers, etc

    const [selectedCard, setSelectedCard] = useState({}); //we chose and empty object on this one because
    // the defaultClothingItems (ie: the card) is also an object.
    const [weatherTemp, setWeatherTemp] = useState(0);
    const [weatherLocation, setWeatherLocation] = useState({});

    const handleCreateModal = () => {
        setActiveModal("create");
    };

    const handleCloseModal = () => {
        setActiveModal("");
    };

    const handleSelectedCard = (card) => {
        setActiveModal("preview");
        setSelectedCard(card);
    };

    useEffect(() => {
        getWeatherForecast().then((data) => {
            const temperature = parseWeatherData(data);
            console.log(temperature);
            const location = parseLocationData(data);
            console.log(location);
            setWeatherTemp(temperature);
            setWeatherLocation(location);
        })
    }, []);

    return (
        <div>
            <Header onCreateModal={handleCreateModal} weatherLocation={weatherLocation}/>
            <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard}/>
            <Footer/>
            {activeModal === "create" && (
            <ModalWithForm title="New Garment" onClose={handleCloseModal}>
                <div className="modal__text-inputs">
                <label className='modal__label'> 
                    Name
                    <input inputType="text" name='name' placeholder="Name" minLength="1" maxLength="30" className="modal__input"></input>
                </label>
                <label className='modal__label'>
                    Image
                    <input inputType="url" name='link' placeholder="Image URL" minLength="1" maxLength="200" className="modal__input"></input>
                </label>
                </div>
                <p className="modal__select-weather">Select Weather Type:</p>
                <div className="modal__radio-inputs">
                    <div>
                        <input className="modal__radio-button" type="radio" id="hot" value="hot" name="radio-button-weather"></input>
                        <label>Hot</label>
                    </div>
                    <div>
                        <input className="modal__radio-button" type="radio" id="warm" value="warm" name="radio-button-weather"></input>
                        <label>Warm</label>
                    </div>
                    <div>
                        <input className="modal__radio-button" type="radio" id="cold" value="cold" name="radio-button-weather"></input>
                        <label>Cold</label>
                    </div>
                </div>
            </ModalWithForm>
    )}
        {activeModal === "preview" && 
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal}/>
    }
        </div>
    );
}

export default App;