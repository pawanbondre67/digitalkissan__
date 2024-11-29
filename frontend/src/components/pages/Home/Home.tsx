import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiPlantFill } from "react-icons/ri";
import { MdPestControl } from "react-icons/md";
import { GiFertilizerBag } from "react-icons/gi";
import { BiSolidLandscape } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { IoIosArrowForward } from "react-icons/io";
const Home: React.FC = () => {
  interface WeatherData {
    weather: { description: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
    name: string;
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = "3b55bc4b16f6f35c786122fb20245d52";

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
        setLocation(response.data.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  }, []);

  return (
    <div className="max-h-screen  flex flex-col items-center justify-center">
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full md:w-96 mx-auto my-4">
        {weatherData ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Live Weather in {location}
            </h2>
            <p className="text-lg">{weatherData.weather[0].description}</p>
            <p className="text-4xl font-bold">
              {Math.round(weatherData.main.temp)}°C
            </p>
            <p className="text-sm mt-2">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="text-sm">Wind: {weatherData.wind.speed} m/s</p>
          </div>
        ) : (
          <p className="text-center">Loading weather data...</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-3 max-w-4xl mx-auto my-4">
        <Link to="/cropform">
          <div className="bg-green-400 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <h3 className="text-lg flex flex-col gap-2 font-semibold">
              {" "}
              <RiPlantFill className="text-3xl" /> Crop Prediction
            </h3>
          </div>
        </Link>

        <Link to="/login">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <h3 className="text-lg flex flex-col gap-2 font-semibold">
              {" "}
              <BiSolidLandscape className="text-3xl" />
              Soil Analysis
            </h3>
          </div>
        </Link>

        <Link to="/">
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <h3 className="text-lg flex flex-col gap-2 font-semibold">
              {" "}
              <MdPestControl className="text-3xl" /> Pest Detection
            </h3>
          </div>
        </Link>

        <Link to="/">
          <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <h3 className="text-lg flex flex-col gap-2 font-semibold">
              {" "}
              <GiFertilizerBag className="text-3xl" />
              Fertilizer Suggestion
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
