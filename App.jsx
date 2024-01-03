import { useState } from "react";
import CityTab from "./CityTab";
function App() {
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [condition, Setcondition] = useState("");
  const [image, setImage] = useState();
  const [showcity, setShowCity] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [showCities, setShowCities] = useState(false);

  async function getAllCities(name) {
   
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=b2d765fdea4c41098d472223232112&q=${name}&aqi=no`
    );
    if (!res.ok) {
      alert("City not found");
      return;
    }

    const response = await res.json();
    if (response) {
      Setcondition(response.current.condition.text);
      setImage(response.current.condition.icon);
      setShowCity(name);
      setShow(true);
    }
  }

  function handleClick() {
    if (city) {
      if(!allCities.includes(city)){
        setAllCities([...allCities,city.toUpperCase()]);
        setShowCities(true);
      }
      console.log(allCities)
      getAllCities(city);
      setCity('');
    } else {
      alert("enter city name");
    }
  }

  return (
    <div className=" flex flex-col h-screen  items-center  bg-black-500 text-white-500 gap-4 p-4">
      <div className=" text-5xl font-bold ">Find Weather !</div>
      <div className=" mt-5 flex w-full gap-4 justify-center">
        <div className="flex w-1/3 justify-center items-center gap-1 h-10 bg-black-400 rounded-xl ">
          <div className="ml-2">🔎 </div>
          <input
            type="text"
            className="bg-black-400 h-10 p-2 w-full rounded-xl placeholder:items-end outline-none"
            placeholder="Search City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-blue-900 px-2 rounded-xl font-bold "
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
      {showCities  && <span className="text-lg underline">Recent Searches</span>}
      {showCities  && (
        <span className=" bg-black-400 text-white-500  px-2 p-1 rounded-xl max-w-xl">
          {allCities.map((elem, index) => (
          
            <CityTab
              city={elem}
              setallcities={setAllCities}
              allcities={allCities}
              index={index}
            />
          ))}
        </span>
      )}
      {show && (
        <div className="bg-black-400 text-white-500 h-60 w-60 items-center p-2 flex flex-col gap-4 rounded-xl mt-10">
          <div className="font-bold text-2xl uppercase underline ">
            {showcity}
          </div>
          <div className="font-md text-lg">{condition}</div>
          <img src={image} alt="" className="h-28 w-28" />
        </div>
      )}
    </div>
  );
}

export default App;
