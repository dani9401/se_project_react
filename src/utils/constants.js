// - - - WEATHER API & WEATHER OPTIONS - - - //

export const latitude = 39.73;
export const longitude = -104.99;
export const apiKey = "68247c01732e1119e845b344423d9160";

export const weatherOptions = [
  {
    url: require("../images/Day/Day - Sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../images/Day/Day - Cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/Day/Day - Fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../images/Day/Day - Rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../images/Day/Day - Snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../images/Day/Day - Storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../images/Night/Night - Clear.svg").default,
    day: false,
    type: "clear",
  },
  {
    url: require("../images/Night/Night - Cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../images/Night/Night - Fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../images/Night/Night - Rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../images/Night/Night - Snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../images/Night/Night - Storm.svg").default,
    day: false,
    type: "storm",
  },
];

// - - - CLOTHING API - - - //
export const baseUrl = "http://localhost:3001";

export const headers = {
  authorization: "",
  "Content-Type": "application/json",
};


  //"https://my-json-server.typicode.com/dani9401/se_project_react";