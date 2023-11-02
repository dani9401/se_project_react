import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"

const LoginModal = ({handleCloseModal, isOpen, onLogin}) => {
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

      const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
          return;
        } else {
          onLogin(email, password);
        }
      };

      const handleRegisterClick = () => {
              //close Login modal
              //open Register modal
      }

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      }

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      }

    return (
        <ModalWithForm 
        title="Log In" 
        onClose={handleCloseModal} 
        isOpen={isOpen} 
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
      <button type="submit" className="modal__submit-button modal__submit-button1" onClick={handleLoginSubmit}>
            Log In
          </button>
          <button type="submit" className="modal__submit-button modal__submit-button2" onClick={handleRegisterClick}>
            or Register
          </button>
        </div> 
        </ModalWithForm>
        
    )
}

export default LoginModal;