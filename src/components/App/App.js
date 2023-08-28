import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import ItemModal from "../ItemModal/ItemModal.js";
import "./App.css";
import {
  getWeatherForecast,
  parseLocationData,
  parseWeatherData,
} from "../../utils/weatherAPI.js";
import { useEffect, useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState(""); //setting the default values for modals
  //when page renders. Make sure to always use a string.
  //this allows react to know what the starting default value is
  //and how to move forward from that starting value
  //so if it's a string, it's expecting string values
  //if it's a boolean, it'll expect only booleans,
  //if it's a number, it'll expect numbers, etc

  const [selectedCard, setSelectedCard] = useState({}); //we chose and empty object on this one because
  // the defaultClothingItems (ie: the card) is also an object.
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState("");

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

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    getWeatherForecast()
    .then((data) => {
      const temperature = parseWeatherData(data);
      const location = parseLocationData(data);
      setWeatherTemp(temperature);
      setWeatherLocation(location);
    })
    .catch(console.error);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleCloseModal]);

  return (
    <div>
      <Header
        onCreateModal={handleCreateModal}
        weatherLocation={weatherLocation}
      />
      <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <div className="modal__text-inputs">
            <label className="modal__label">
              Name
              <input
                type="text"
                name="name"
                placeholder="Name"
                minLength="1"
                maxLength="30"
                className="modal__input"
              ></input>
            </label>
            <label className="modal__label">
              Image
              <input
                type="url"
                name="link"
                placeholder="Image URL"
                minLength="1"
                maxLength="200"
                className="modal__input"
              ></input>
            </label>
          </div>
          <p className="modal__select-weather">Select Weather Type:</p>
          <div className="modal__radio-inputs">
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="hot"
                value="hot"
                name="radio-button-weather"
              ></input>
              <label className="modal__radio-button-label">Hot</label>
            </div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="warm"
                value="warm"
                name="radio-button-weather"
              ></input>
              <label className="modal__radio-button-label">Warm</label>
            </div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="cold"
                value="cold"
                name="radio-button-weather"
              ></input>
              <label className="modal__radio-button-label">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
