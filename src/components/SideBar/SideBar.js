import React from "react";
import Avatar from "../../images/avatar.svg";

const SideBar = () => {
  return (
    <div className="profile__sidebar">
      <img className="profile__avatar" src={Avatar} alt="avatar"></img>
      <div className="profile__name">Danielle Foss</div>
    </div>
  );
};

export default SideBar;
