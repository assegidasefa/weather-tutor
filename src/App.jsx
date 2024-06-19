import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Add your CSS here if needed

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "b79ed9614282a1eb5220f5aafff080f4"; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log(response?.data);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  let backgroundImage;
  if (weather) {
    switch (weather.weather[0].main) {
      case "Clouds":
        backgroundImage = "url('/snow.jpg')";
        break;
      case "Clear":
        backgroundImage = "url('/sunny.jpeg')";
        break;
      case "Snow":
        backgroundImage = "url('/snow.jpg')";
        break;
      case "Rain":
        backgroundImage = "url('/rain.jpg')";
        break;
      // Add more cases as needed
      default:
        backgroundImage = "url('/rain.jpg')";
    }
  }else{
    backgroundImage = "url('/sunny.jpeg')";
  }

  return (
    <div
      className="app"
      style={{
        backgroundImage:backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
