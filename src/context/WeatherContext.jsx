import { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();
const API_KEY = "0b5c641e9271899b8e43ea7dbe861922";

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(localStorage.getItem("city") || "Delhi");

  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 🌙 THEME APPLY */
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* 💾 SAVE SETTINGS */
  useEffect(() => {
    localStorage.setItem("city", city);
    localStorage.setItem("unit", unit);
  }, [city, unit]);

  const fetchWeather = async (cityName = city) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      setCity(cityName);
      setWeather(data);
      setLoading(false);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  /* 📍 AUTO LOCATION (FIRST LOAD ONLY) */
  useEffect(() => {
    if (localStorage.getItem("city")) {
      fetchWeather(localStorage.getItem("city"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
        );
        const data = await res.json();
        setCity(data.name);
        setWeather(data);
      },
      () => fetchWeather("Delhi")
    );
  }, [unit]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        unit,
        theme,
        setTheme,
        setUnit,
        weather,
        loading,
        error,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
