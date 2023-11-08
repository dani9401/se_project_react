import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  onCreateModal,
  clothingItems,
  onSelectCard,
  onEditProfileModal,
  onLogout,
}) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar onEditProfileModal={onEditProfileModal} onLogout={onLogout} />
      </div>
      <ClothesSection
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
