import React from "react";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({
  onCreateModal,
  clothingItems,
  onSelectCard,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const ownedItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  console.log(ownedItems);

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
        {ownedItems.map((item) => (
          <ItemCard
            key={item.id || item._id}
            item={item}
            onSelectCard={onSelectCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
