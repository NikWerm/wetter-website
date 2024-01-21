import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import SearchBar from "../components/searchbar";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
function Graph() {
  const [apiData, setApiData] = useState([]);

  const countries = [
    { label: "Deutschland" },
    { label: "Polen" },
    { label: "Russland" },
    { label: "Frankreich" },
    { label: "Italien" },
    { label: "USA" },
    { label: "Japan" },
    { label: "Australien" },
    { label: "Südafrika" },
    { label: "Vereinigte Arabische Emirate" }
];

  const handleSearch = (value) => {
    if (value === "") {
      return 0;
    }
  
    const newApiUrl = "https://09651711-8867-4adf-8ae7-070a3ce64f43.mock.pstmn.io/" + value;
    fetch(newApiUrl)
      .then((response) => response.json())
      .then((data) => setApiData(data[value]));
  };
  

  const data = {
    labels: apiData.map((dataPoint) => dataPoint.year),
    datasets: [
      {
        label: "Temperature",
        data: apiData.map((dataPoint) => dataPoint.temperature),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <SearchBar onEnter={handleSearch} suggestions={countries}/>
      <div className="mx-96 mt-20">
        <Line data={data} />
      </div>
      
    </div>
  );
}

export default Graph;