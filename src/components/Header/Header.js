import "./Header.css";
import { useContext, useState } from "react";
import Logo from "../../images/Logo_wtwr.svg";
import { months } from "../../utils/constants";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  onCreateModal,
  weatherLocation,
  onLoginModal,
  onRegisterModal,
  loggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : undefined;
  const showAvatar = avatar !== "" ? true : false;
  const name = currentUser.name;

  const d = new Date();
  const currentMonth = months[d.getMonth()];
  const currentDay = d.getDate();

  return (
    <header className="header">
      <div className="header__menu-left">
        <div className="header__logo">
          <Link to="/">
            <img
              src={Logo}
              alt="WTWR-logo"
              className="header__logo-image"
            ></img>
          </Link>
        </div>
        <h3 className="header__date-location">
          {currentMonth} {currentDay}, {weatherLocation}
        </h3>
      </div>
      {loggedIn ? (
        <div className="header__menu-right">
          <ToggleSwitch />
          <div className="header__menu-buttons">
            <button
              className="header__add-button"
              onClick={onCreateModal}
              type="text"
            >
              + Add Clothes
            </button>
          </div>
          <Link className="header__name" to="/profile">
            {currentUser.name}
          </Link>
          <div>
            {showAvatar ? (
              <img className="header__avatar" src={avatar} alt="avatar" />
            ) : (
              <p className="header__avatar-placeholder">
                {name[0]?.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="header__menu-right">
          <ToggleSwitch />
          <div className="header__menu-buttons">
            <button
              className="header__add-button"
              onClick={onRegisterModal}
              type="text"
            >
              Sign Up
            </button>
            <button
              className="header__add-button"
              onClick={onLoginModal}
              type="text"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
