import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "0b5c641e9271899b8e43ea7dbe861922";

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name");
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        alert(data.message);
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">🌤️ Weather Forecast</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h3>{Math.round(weather.main.temp)}°C</h3>
            <p>{weather.weather[0].description.toUpperCase()}</p>

            <div className="extra-info">
              <div>
                💧 Humidity: <b>{weather.main.humidity}%</b>
              </div>
              <div>
                🌬️ Wind Speed: <b>{weather.wind.speed} m/s</b>
              </div>
              <div>
                🌡️ Feels Like: <b>{Math.round(weather.main.feels_like)}°C</b>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">Made with ❤️ by Jatin Verma</footer>
    </div>
  );
}

export default App;
