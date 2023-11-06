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
import { CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import { Switch, Route, Link } from "react-router-dom/cjs/react-router-dom.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import {
  deleteClothingItems,
  getClothingItems,
  postNewClothingItem,
} from "../../utils/api.js";
import { postSignIn, postSignup } from "../../utils/auth.js";


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
  const [currentUser, setCurrentUser] = useState({});

  // ----------------HANDLERS ---------------------------

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
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

  const handleLoginSubmit = (email, password) => {
    postSignIn({email, password}).then((res) => {
      console.log(res)
      if (res.jwt) {
        localStorage.setItem("jwt", res.jwt);
        setLoggedIn(true);
        handleCloseModal();
        return res;
      } else {
        return;
      }
    }).catch(console.error)
  }

  const handleRegisterSubmit = (email, password, name, avatar) => {
    postSignup({email, password, name, avatar}).then((res) => {
      console.log(res)
      //need the response to be the new user info - then can set
      //that as setCurrentUser?
     handleCloseModal();
    }).then(() => {
      setLoggedIn(true)
      setCurrentUser({email, password, name, avatar})
      console.log(currentUser)
    })
    .catch(console.error)
  }

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
        setClothingItems(data.items);
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

  //useEffect(() => {
  //  const jwt = localStorage.getItem()
  //})

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
        <Header
          onCreateModal={handleCreateModal}
          weatherLocation={weatherLocation}
          onLoginModal={handleLoginModal}
          onRegisterModal={handleRegisterModal}
          loggedIn={loggedIn}
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
            loggedIn={loggedIn}
            currentUser={currentUser}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "login"}
            onLogin={handleLoginSubmit}
            //onRegister={handleRegister} //show them Register Modal
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "register"}
            //onLogin={handleLogin} //show them Login modal
            onRegister={handleRegisterSubmit} //"Next" button
          />
        )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
      
    </div>
    
  );
}

export default App;
