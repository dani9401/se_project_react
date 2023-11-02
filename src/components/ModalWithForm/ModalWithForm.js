import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  onClose,
  modalName,
  isOpen,
}) => {
  return (
    <div className={`modal modal-type-${modalName}`}>
      <div className={`modal__container modal-container-${modalName}`}>
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button"
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
