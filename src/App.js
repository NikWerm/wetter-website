import React, { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import SideNavigation from "./SideNavigation";
import { Line } from 'react-chartjs-2';

function MyApp() {
  const [weatherData, setWeatherData] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [apiUrl, setApiUrl] = useState("");
  

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

  const handleSearch = () => {
    const element = document.getElementsByClassName("input-field");
    if (element[0].value === "") {
      return 0;
    }
    const newApiUrl = "https://09651711-8867-4adf-8ae7-070a3ce64f43.mock.pstmn.io/" + element[0].value;
    setApiUrl(newApiUrl);
  };

  return (
    <div>
      <SideNavigation></SideNavigation>
      <div className="flex items-center justify-center mt-4">
        <div className="w-1/2">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="w-full p-2 rounded-full bg-gray-800 text-white focus:outline-none focus:border focus:border-blue-500 input-field"
            />
            <div className="cursor-pointer absolute top-1 right-1 p-2 rounded-full bg-blue-500 text-white flex items-center justify-center w-8 h-8" onClick={handleSearch}>
              <FaSearch size={18} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/*<Line
        data={{
          labels: ["2000", "2001", "2002"],
          datasets: [
            {
              label: "Temperatur",
              data: [20, 23, 38],
              backgroundColor: "black",
              borderColor: "blue"
            }
          ]
        }}
      />*/}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg">
          {weatherData.map((day, index) => (
            <div key={index} className={`mt-${index === 0 ? '0' : '4'}`}>
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
          <div className="flex items-center justify-center mt-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Temperature Unit
              </label>
              <select
                className="w-full p-2 rounded-full bg-gray-800 text-white focus:outline-none focus:border focus:border-blue-500"
                value={temperatureUnit}
                onChange={(e) => setTemperatureUnit(e.target.value)}
              >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default MyApp;
