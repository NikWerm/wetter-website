import React, { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import SideNavigation from "./SideNavigation";
import { Line } from 'react-chartjs-2';
import Sun from "../images/happysun.png";
import Graph from "../pages/graph"
import SearchBar from "./searchbar";

function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [showGreeting, setShowGreeting] = useState(true);
  const [inputFocused, setInputFocused] = useState(false);
  const [apiUrl, setApiUrl] = useState("");

  const handleSearch = (value) => {
        if (value === "") {
            return 0;
        }
        const newApiUrl = "https://09651711-8867-4adf-8ae7-070a3ce64f43.mock.pstmn.io/" + value;
        setApiUrl(newApiUrl);
        setShowGreeting(false);
    };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try { 
        const response = await fetch(apiUrl);
        const data = await response.json();

        const processedData = data.days.slice(0, 4).map((day, index) => ({
          name: data.resolvedAddress,
          date: day.datetime,
          main: { temp: convertTemperature(day.temp, temperatureUnit).toFixed(2) },
          weather: [{ description: day.description }],
          wind: { speed: day.windspeed },
          isToday: index === 0,
        }));

        setWeatherData(processedData);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [apiUrl, temperatureUnit]);

  const convertTemperature = (temperature, unit) => {
    switch (unit) {
      case "celsius":
        return (temperature - 32) * (5 / 9);
      case "fahrenheit":
        return temperature;
      case "kelvin":
        return (temperature - 32) * (5 / 9) + 273.15;
      default:
        return temperature;
    }
  };

  return (
    <div>
      <SideNavigation></SideNavigation>
      <SearchBar onEnter={handleSearch}></SearchBar>

      {showGreeting && (
        <div className="pt-48 flex flex-col items-center justify-center">
          <p className="font-poppins text-5xl">Guten Tag!</p>
          <img src={Sun} className="mt-4 h-40" alt="Sun" />
        </div>
      )}

      <div className="flex items-center justify-center">
        <div className="bg-white rounded shadow-lg">
          {weatherData.map((day, index) => (
            <div key={index} className={`mt-${index === 0 ? '0' : '4'} mx-4 my-4`}>
              <h1 className={`text-3xl font-bold mb-4 ${index === 0 ? 'text-blue-500' : ''}`}>
                {day.name}
                {day.isToday && ' (Today)'}
              </h1>
              <div>
                <h2 className="text-xl font-semibold">{day.date}</h2>
                <p className="text-gray-600">
                  Temperature: {day.main.temp}{" "}
                  {temperatureUnit === "celsius"
                    ? "°C"
                    : temperatureUnit === "fahrenheit"
                    ? "°F"
                    : "K"}
                </p>
                {day.wind && (
                  <p className="text-gray-600">Wind Speed: {day.wind.speed} m/s</p>
                )}
                <p className="text-gray-600">Condition: {day.weather[0].description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

  export default Home;
