import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onCreateModal, clothingItems, onSelectCard, currentUser }) => {
  //get list of clothingItemIds
//const clothingItemId = clothingItems.map((item) => {
//  return item.id;
//});


 // Checking if the current user is the owner of the current clothing item
//const isOwner = clothingItemId.owner.id === currentUser.id;

//return only clothing items that belong to that owner - create new array with approved 
//items and pass to map below


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
          <ItemCard key={item.id || item._id} item={item} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
