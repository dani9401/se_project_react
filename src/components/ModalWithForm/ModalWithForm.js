import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  onClose,
  modalName,
  isOpen,
  onSubmit,
}) => {
  return (
    <div className={`modal modal-type-${modalName}`}>
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button"
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
