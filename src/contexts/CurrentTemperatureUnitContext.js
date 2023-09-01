import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

//give the first variable a string value bc
// we know it'll be either F or C passed
//second value is the function that changes temp

export { CurrentTemperatureUnitContext };
