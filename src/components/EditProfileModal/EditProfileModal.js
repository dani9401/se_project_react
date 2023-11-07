import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ handleCloseModal, isOpen }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = () => {};

  const handleAvatarChange = () => {};

  const handleSubmit = () => {};

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      onClose={handleCloseModal}
      isOpen={isOpen}
      modalName={"editProfile"}
    >
      <div className="modal__text-inputs">
        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            className="modal__input"
            value={name}
            onChange={handleNameChange}
          ></input>
        </label>
        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            name="name"
            placeholder="Avatar URL"
            minLength="1"
            maxLength="200"
            className="modal__input"
            value={avatar}
            onChange={handleAvatarChange}
          ></input>
        </label>
      </div>
      <div>
        <button
          type="submit"
          className="modal__submit-button"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
