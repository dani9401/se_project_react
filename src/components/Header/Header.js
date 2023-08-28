import "./Header.css";
import Logo from "../../images/Logo_wtwr.svg";
import Avatar from "../../images/avatar.svg"

console.log(Avatar)

const Header = ({ onCreateModal, weatherLocation }) => {
  return (
    <header className="header">
      <div className="header__menu-left">
        <div className="header__logo">
          <img src={Logo} alt="WTWR-logo"></img>
        </div>
        <h3 className="header__date-location">August 23, {weatherLocation}</h3>
      </div>
      <div className="header__menu-right">
        <div>
          <button
            className="header__add-button"
            onClick={onCreateModal}
            type="text"
          >
            + Add Clothes
          </button>
        </div>
        <h3 className="header__name">Danielle Foss</h3>
        <div>
          <img
            src={Avatar}
            alt="avatar"
            className="header__avatar"
          ></img>
        </div>
      </div>
    </header>
  );
};

export default Header;
