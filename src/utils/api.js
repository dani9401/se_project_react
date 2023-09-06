import React from "react";
import { baseUrl, headers } from "./constants";

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (res.ok) {
      console.log(res);
      Promise.resolve("Promise Resolved");
      return res.json();
    } else {
      console.error(res);
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const postNewClothingItem = (newItem) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
    }),
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      Promise.resolve("Promise Resolved");
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const deleteClothingItems = (id) => {
  return fetch(`${baseUrl}/items/:${id}`, { method: "DELETE" }).then((res) => {
    if (res.ok) {
      Promise.resolve("Promise Resolved");
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const createNewClothingItem = (data) => {
  data.forEach((item) => {
    const newClothingItem = {
      _id: item._id,
      name: item.name,
      weather: item.weather,
      link: item.imageUrl,
    };
    return newClothingItem;
  });
};

//call api
//call createNewClothingItem()
// - - - this function should take the data,
// - - - generate an array just like defaultClothingItems

//getClothingItems();
