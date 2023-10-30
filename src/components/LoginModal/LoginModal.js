import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"

const LoginModal = ({handleCloseModal, isOpen}) => {
    //think about what props I need for this to function

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!isOpen) {
          setEmail("");
          setPassword("");
        }
      }, [isOpen]);

      //handlers go here

      const handleSubmit = (e) => {
        e.preventDefault();
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      }

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      }

    return (
        <ModalWithForm 
        title="Login" 
        onClose={handleCloseModal} 
        isOpen={isOpen} 
        onSubmit={handleSubmit}
        buttonText={"Login"}
        modalName={"login"}>

        <div className="modal__text-inputs">
        <label className="modal__label">
          Email
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
          Password
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
      </div>
      <div> 
        <button type="submit" className="modal__submit-button">
            or Register
          </button>
        </div> 
        </ModalWithForm>
        
    )
}

export default LoginModal;