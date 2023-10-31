import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"

const RegisterModal = ({handleCloseModal, isOpen}) => {
    //think about what props I need for this to function

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (!isOpen) {
          setEmail("");
          setPassword("");
          setName("");
          setAvatar("");
        }
      }, [isOpen]);

      //handlers go here

      const handleSubmit = (e) => {
        e.preventDefault();
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleNameChange = (e) => {
        setName(e.target.value);
      };

      const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
      };

    return (
        <ModalWithForm 
        title="Sign Up" 
        onClose={handleCloseModal} 
        isOpen={isOpen} 
        onSubmit={handleSubmit}
        buttonText={"Next"}
        modalName={"register"}>

        <div className="modal__text-inputs">
        <label className="modal__label">
          Email*
          <input
            type="text"
            name="email"
            placeholder="Email"
            minLength="1"
            maxLength="30"
            className="modal__input"
            value={email}
            onChange={handleEmailChange}
          ></input>
        </label>
        <label className="modal__label">
          Password*
          <input
            type="text"
            name="password"
            placeholder="Password"
            minLength="1"
            maxLength="30"
            className="modal__input"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </label>
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
        <button type="submit" className="modal__submit-button">
            or Login
          </button>
        </div> 
        </ModalWithForm>
        
    )
}

export default RegisterModal;