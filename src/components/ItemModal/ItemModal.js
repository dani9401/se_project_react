import "../ItemModal/ItemModal.css";

const ItemModal = ({ selectedCard, onClose, onDeleteItem, currentUser }) => {
 // Checking if the current user is the owner of the current clothing item
//const isOwner = selectedCard.owner.id === currentUser.id;

//const itemDeleteButtonClassName = (
//  `modal__delete-button ${isOwner ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'}`
//);
 
  const handleDeleteItemSubmit = () => {
    onDeleteItem(selectedCard.id);
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
          alt="image-preview"
        ></img>
        <div className="modal__item-name">{selectedCard.name}</div>
        <div className="modal__weather-type">
          Weather Type: {selectedCard.weather}
        </div>
        <button
          type="button"
          className="modal__delete-button"
          //className={itemDeleteButtonClassName}
          onClick={handleDeleteItemSubmit}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
