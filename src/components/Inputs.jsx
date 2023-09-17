import React, { useState, useEffect } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Inputs = ({ setQuery, units, setUnits }) => {

  useEffect(() => {
    AOS.init();
  }, [])

  const [city, setCity] = useState("");
  let identifier = `bg-black`

  const handleSearchClick = (event) => {
    event.preventDefault();
    if (city !== "") setQuery({ q: city });
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
    if (units === "metric") {

    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success(`Location fetched Successfully.`);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div data-aos="fade" data-aos-delay="400" className="flex-row justify-center my-6 md:flex">
      <form
        onSubmit={handleSearchClick}
        className="flex flex-row md:w-3/4 items-center border-r-black justify-center space-x-4"
      >
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          className="md:text-lg p-2 w-full shadow-xl capitalize focus:outline-none rounded-xl font-medium text-gray-400"
          placeholder="Enter state/zip code"
        />
        <UilSearch
          type="submit"
          onClick={handleSearchClick}
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <UilLocationPoint
          onClick={handleLocationClick}
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </form>
      <div data-aos="fade" data-aos-delay="400" className="md:w-1/4 flex justify-center items-center md:mt-0 mt-2">
        <div className="flex bg-cyan-950 rounded-2xl justify-center items-center">
        <button
          onClick={handleUnitsChange}
          name="metric"
          className="text-sm text-white font-medium pl-5"
        >
          &deg;C
        </button>
        <p className="text-white text-sm mx-2">|</p>
          <button
            onClick={handleUnitsChange}
            name="imperial"
            className="text-sm text-white font-medium pr-5"
          >
            &deg;F
          </button>
          </div>
      </div>
    </div>
  );
};

export default Inputs;
