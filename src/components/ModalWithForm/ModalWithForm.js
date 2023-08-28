import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add Garment",
  title,
  onClose,
  modalName,
}) => {
  return (
    <div className={`modal modal-type-${modalName}`}>
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">{children}</form>
        <button type="submit" className="modal__submit-button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
