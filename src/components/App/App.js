import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ItemModal from "../ItemModal/ItemModal.js";
import LoginModal from "../LoginModal/LoginModal.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import Profile from "../Profile/Profile.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.js";
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import {
  deleteClothingItems,
  getClothingItems,
  postNewClothingItem,
} from "../../utils/api.js";
import {
  postSignIn,
  postSignup,
  getUserInfo,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth.js";

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

  const handleEditProfileModal = () => {
    setActiveModal("editProfile");
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
      token: values.token,
    };
    postNewClothingItem(newItem)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        getClothingItems()
          .then((data) => {
            setClothingItems(data.items);
          })
          .catch(console.error);
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

  const handleLogin = (email, password) => {
    postSignIn({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          getUserInfo(res.token)
            .then((userData) => {
              setCurrentUser(userData);
            })
            .catch(console.error);
          setLoggedIn(true);
          handleCloseModal();
          return res;
        } else {
          console.log("handleLogin error");
        }
      })
      .catch(console.error);
  };

  const handleRegisterSubmit = (email, password, name, avatar) => {
    postSignup({ email, password, name, avatar }).then((res) => {
      handleCloseModal();
      postSignIn({ email, password })
        .then((res) => {
          return getUserInfo(res.token).then((userData) => {
            setCurrentUser(userData);
            setLoggedIn(true);
          });
        })
        .catch(console.error);
    });
  };

  const handleEditProfileSubmit = (name, avatar, token) => {
    editProfile(name, avatar, token)
      .then((res) => {
        console.log(res);
        getUserInfo(token).then((userData) => {
          setCurrentUser(userData);
          handleCloseModal();
        });
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    //remove token from local storage
    localStorage.removeItem("jwt");
    //update setLogin to false
    setLoggedIn(false);
    setClothingItems(clothingItems);
  };

  const handleCardLike = (item, isLiked, currentUser) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(item._id, currentUser._id, token)
          .then((res) => {
            setClothingItems((clothingItems) =>
              clothingItems.map((card) => (card._id === item._id ? res : card))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(item._id, currentUser._id, token)
          .then((updatedCard) => {
            console.log(updatedCard);
            setClothingItems((clothingItems) =>
              clothingItems.map((card) =>
                card._id === item._id ? updatedCard : card
              )
            );
          })
          .catch((err) => console.log(err));
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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch(console.error);
    }
  }, []);

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
                onCardLike={handleCardLike}
              />
            </Route>
            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Profile
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
                onEditProfileModal={handleEditProfileModal}
                onLogout={handleLogout}
                onCardLike={handleCardLike}
              />
            </ProtectedRoute>
            <Route exact path="">
              {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
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
              loggedIn={loggedIn}
              currentUser={currentUser}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "login"}
              onLogin={handleLogin}
              setActiveModal={setActiveModal}
              //onRegister={handleRegister} //show them Register Modal
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "register"}
              onRegister={handleRegisterSubmit}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal === "editProfile" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "editProfile"}
              onSubmit={handleEditProfileSubmit}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
