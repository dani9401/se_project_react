const ItemModal = ({selectedCard, onClose}) => {
    console.log("item modal")
    return (
        <div className={`modal`}>
        <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close-button">Close</button>
        <img src={selectedCard.link}></img>
        <div>{selectedCard.name}</div>
        <div>Weather Type: {selectedCard.weather}</div>
        </div>
    </div>
    )
}

export default ItemModal;