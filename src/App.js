import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeLocation from "./components/TimeLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forcast from "./components/Forcast";
import getFormattedWeatherData, { flag } from "./services/services";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorDisplay from "./components/ErrorDisplay";

function App() {
  const [query, setQuery] = useState({ q: "bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [validity, setValidity] = useState(true);

  useEffect(() => {
    const fetchedWeather = async () => {
      const message = query.q ? query.q : "Current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          setWeather(data);
          console.log("Recieved Data: ", data);
          setValidity(true);

          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}`
          );
        })
        .catch((error) => {
          setValidity(false);
          toast.info("No data available");
        });
    };

    fetchedWeather();
  }, [query, units]);

  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-900">
      <div
        className="mx-auto max-w-screen-md 
      py-5 px-16 md:px-32 min-h-screen h-fit
      bg-gradient-to-r from-cyan-500 to-blue-500"
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && validity && (
          <div>
            <TimeLocation weather={weather} />
            <TempAndDetails weather={weather} />
            <Forcast weather={weather} />
          </div>
        )}
        {!validity && <ErrorDisplay />}
        <ToastContainer
          autoClose={3000}
          theme="dark"
          hideProgressBar
          pauseOnHover
          position="bottom-left"
        />
      </div>
    </div>
  );
}

export default App;
