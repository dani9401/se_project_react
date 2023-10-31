import { baseUrl } from "./constants";
import { checkResponse } from "./utils";

//sign up

export const postSignup = ({ email, password, name, avatar }) => {
    return fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, avatar }),
    }).then(checkResponse);
  };
  
  //sign in
  export const postSignIn = ({ email, password }) => {
    return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(checkResponse);
  };