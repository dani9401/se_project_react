import React from "react";
import "./Profile.css";
import Avatar from "../../images/avatar.svg";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

const myClothingItems = defaultClothingItems.filter((item) => {
  return item;
});

const Profile = ({ onCreateModal }) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <img className="profile__avatar" src={Avatar} alt="avatar"></img>
        <div className="profile__name">Danielle Foss</div>
      </div>
      <div className="profile__menu">
        <div className="profile__menu-top">
          <h3 className="profile__menu-title">Your Items:</h3>
          <button
            type="button"
            className="profile__addItems-button"
            onClick={onCreateModal}
          >
            +Add Items
          </button>
        </div>
        <div className="profile__item-list">
          {" "}
          {myClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;

//what does profile need?
//side bar: avatar and name
//clothing section: clothing cards
//style 2 sections with flex column?
