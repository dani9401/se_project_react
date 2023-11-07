import React, { useContext } from "react";
import Avatar from "../../images/avatar.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = () => {

  const currentUser = useContext(CurrentUserContext)

  return (
    <div className="profile__sidebar">
      <img className="profile__avatar" src={currentUser.avatar} alt="avatar"></img>
      <div className="profile__name">{currentUser.name}</div>
    </div>
  );
};

export default SideBar;
