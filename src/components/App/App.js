import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ItemModal from "../ItemModal/ItemModal.js";
import LoginModal from "../LoginModal/LoginModal.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import Profile from "../Profile/Profile.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import "./App.css";
import {
  getWeatherForecast,
  parseLocationData,
  parseWeatherData,
  parseWeatherCondition,
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
  //const [newClothingItem, setNewClothingItem] = useState({});
  const [selectedCard, setSelectedCard] = useState({}); //we chose and empty object on this one because
  // the defaultClothingItems (ie: the card) is also an object.
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState("");
  //const [weatherCondition, setWeatherCondition] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [loggedIn, setLoggedIn] = useState(false);

  // ----------------HANDLERS ---------------------------

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = (values) => {
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType,
    };
    postNewClothingItem(newItem)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItemSubmit = (cardID) => {
    deleteClothingItems(cardID)
      .then((res) => {
        const newClothingItems = clothingItems.filter((card) => {
          return card.id !== cardID;
        });
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogin = () => {
    //handle login next steps here
  }

  const handleRegister = () => {
    //handle login next steps here
  }

  // ----------------USE EFFECT ---------------------------

  useEffect(() => {
    getWeatherForecast()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const location = parseLocationData(data);
        //const condition = parseWeatherCondition(data);
        setWeatherTemp(temperature);
        setWeatherLocation(location);
        //setWeatherCondition(condition);
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
          onLoginModal={handleLoginModal}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={weatherTemp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onCreateModal={handleCreateModal}
              clothingItems={clothingItems}
              onSelectCard={handleSelectedCard}
            />
          </ProtectedRoute>
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
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "login"}
            onLogin={handleLogin}
            onRegister={handleRegister} //show them Register Modal
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "register"}
            onLogin={handleLogin} //show them Login modal
            onRegister={handleRegister} //"Next" button
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
