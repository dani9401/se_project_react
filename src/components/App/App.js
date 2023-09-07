import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ItemModal from "../ItemModal/ItemModal.js";
import Profile from "../Profile/Profile.js";
import "./App.css";
import {
  getWeatherForecast,
  parseLocationData,
  parseWeatherData,
} from "../../utils/weatherAPI.js";
import { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import {
  deleteClothingItems,
  getClothingItems,
  postNewClothingItem,
} from "../../utils/api.js";

function App() {
  // ----------------USE STATE ---------------------------
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [newClothingItem, setNewClothingItem] = useState({});
  const [selectedCard, setSelectedCard] = useState({}); //we chose and empty object on this one because
  // the defaultClothingItems (ie: the card) is also an object.
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // ----------------HANDLERS ---------------------------

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    console.log(card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (values) => {
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType,
    };
    postNewClothingItem(newItem)
      .then((res) => {
        setNewClothingItem([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItemSubmit = (id) => {
    deleteClothingItems(id)
      .then((res) => {
        handleCloseModal();
      })
      .catch(console.error);
  };

  // ----------------USE EFFECT ---------------------------

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
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
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
            <Main
              weatherTemp={weatherTemp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              clothingItems={clothingItems}
              onSelectCard={handleSelectedCard}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDeleteItem={handleDeleteItemSubmit}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
