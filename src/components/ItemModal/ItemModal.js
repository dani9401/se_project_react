import "../ItemModal/ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt");

  // Checking if the current user is the owner of the current clothing item
  const isOwner = selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassName = ` ${
    isOwner ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  const handleDeleteItemSubmit = () => {
    onDeleteItem(selectedCard._id, token);
  };

  return (
    <div className={`modal`}>
      <div className="modal__container-image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button-white"
        ></button>
        <img
          src={selectedCard.imageUrl}
          className="modal__image-preview"
          alt={selectedCard.name}
        ></img>
        <div className="modal__item-name">{selectedCard.name}</div>
        <div className="modal__weather-type">
          Weather Type: {selectedCard.weather}
        </div>
        <button
          type="button"
          //className="modal__delete-button"
          className={itemDeleteButtonClassName}
          onClick={handleDeleteItemSubmit}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
