import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./ItemCard.css";
import heart_button_inactive from "../../../images/heart_button_inactive.svg";
//import heart_button_active from "../../images/heart_button_active.svg";"

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `...`;

  //handle like button click here
  const handleCardLikeClick = ({ id }) => {
    onCardLike({ id, isLiked, currentUser });
  };

  return (
    <div className="card__element">
      <img
        src={item.imageUrl}
        className="card__image"
        onClick={() => onSelectCard(item)}
        alt="card-image"
      />
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        <img
          className="card__likeButton"
          src={heart_button_inactive}
          onClick={handleCardLikeClick}
        ></img>
      </div>
    </div>
  );
};

export default ItemCard;
