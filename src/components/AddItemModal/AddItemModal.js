import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const token = localStorage.getItem("jwt");

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleURLChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weatherType, token });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
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
          Image
          <input
            type="url"
            name="link"
            placeholder="Image URL"
            minLength="1"
            maxLength="200"
            className="modal__input"
            value={imageUrl}
            onChange={handleURLChange}
          ></input>
        </label>
      </div>
      <p className="modal__select-weather">Select Weather Type:</p>
      <div className="modal__radio-inputs">
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="hot"
            value="hot"
            name="radio-button-weather"
            onChange={handleWeatherTypeChange}
          ></input>
          <label className="modal__radio-button-label" for="hot">
            Hot
          </label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="warm"
            value="warm"
            name="radio-button-weather"
            onChange={handleWeatherTypeChange}
          ></input>
          <label className="modal__radio-button-label" for="warm">
            Warm
          </label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="cold"
            value="cold"
            name="radio-button-weather"
            onChange={handleWeatherTypeChange}
          ></input>
          <label className="modal__radio-button-label" for="cold">
            Cold
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="modal__submit-button"
        onClick={handleSubmit}
      >
        Add Garment
      </button>
    </ModalWithForm>
  );
};

export default AddItemModal;
