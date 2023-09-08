import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onCreateModal, clothingItems, onSelectCard }) => {
  return (
    <div className="profile__clothes-section">
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
        {clothingItems.map((item) => (
          <ItemCard key={item.id} item={item} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
