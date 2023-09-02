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
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.js";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({}); //we chose and empty object on this one because
  // the defaultClothingItems (ie: the card) is also an object.
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeatherForecast()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const location = parseLocationData(data);
        //const temperatureUnit =
        setWeatherTemp(temperature);
        setWeatherLocation(location);
        //setCurrentTemperatureUnit();
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onCreateModal={handleCreateModal}
          weatherLocation={weatherLocation}
        />
        <Switch>
          <Route exact path="/">
            <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route path="/profile">Profile</Route>
        </Switch>
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
