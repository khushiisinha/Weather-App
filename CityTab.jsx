import React from "react";

function CityTab(props) {
  function handleClick() {
    const Cities = [...props.allcities];
    Cities.splice(props.index,1);
    props.setallcities(Cities);
  }
  return (
    <button
      className="bg-black-500 text-white-500 p-2 m-1 rounded-xl"
      onClick={handleClick}
    >
      {props.city} ❌
    </button>
  );
}

export default CityTab;
