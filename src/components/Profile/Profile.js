import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothingSection from "../ClothingSection/ClothingSection";

const Profile = ({ onCreateModal, clothingItems, onSelectCard }) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>
      <ClothingSection
        onCreateModal={onCreateModal}
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
      />
    </section>
  );
};

export default Profile;

//what does profile need?
//side bar: avatar and name
//clothing section: clothing cards
//style 2 sections with flex column?
