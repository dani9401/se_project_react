import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");

  const handleChange = () => {
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };

  console.log(currentTemperatureUnit);

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleChange}
      ></input>
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-f ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-c ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;