import "./Header.css";
import { useState } from "react";
import Logo from "../../images/Logo_wtwr.svg";
import Avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ onCreateModal, weatherLocation, onLoginModal, loggedIn }) => {
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
        <h3 className="header__date-location">August 23, {weatherLocation}</h3>
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
          Danielle Foss
        </Link>
        <div>
          <img src={Avatar} alt="avatar" className="header__avatar"></img>
        </div>
      </div>
      ) : (
        <div className="header__menu-right">
        <ToggleSwitch />
        <div className="header__menu-buttons">
          <button
            className="header__add-button"
            onClick={onCreateModal}
            type="text"
          >
            Sign Up
          </button>
          <button
            className="header__add-button"
            onClick={onCreateModal}
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
