import "./Header.css";
import Logo from "../../images/Logo_wtwr.svg";
import Avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ onCreateModal, weatherLocation }) => {
  return (
    <header className="header">
      <div className="header__menu-left">
        <div className="header__logo">
          <Link to="/">
            <img src={Logo} alt="WTWR-logo"></img>
          </Link>
        </div>
        <h3 className="header__date-location">August 23, {weatherLocation}</h3>
      </div>
      <div className="header__menu-right">
        <ToggleSwitch />
        <div>
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
    </header>
  );
};

export default Header;
