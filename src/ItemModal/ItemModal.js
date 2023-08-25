import '../ModalWithForm/ModalWithForm.css'
import "./ItemModal.css"

const ItemModal = ({selectedCard, onClose}) => {
    console.log("item modal")
    return (
        <div className={`modal`}>
        <div className="modal__container modal__container-image">
        <button type="button" onClick={onClose} className="modal__close-button"></button>
        <img src={selectedCard.link} className="modal__image-preview"></img>
        <div className="modal__item-name">{selectedCard.name}</div>
        <div className="modal__weather-type">Weather Type: {selectedCard.weather}</div>
        </div>
    </div>
    )
}

export default ItemModal;