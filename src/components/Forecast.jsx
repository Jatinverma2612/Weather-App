import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";

const API_KEY = "0b5c641e9271899b8e43ea7dbe861922";

export default function Forecast() {
  const { city, unit } = useWeather();
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
    )
      .then(res => res.json())
      .then(data => setDays(data.list.filter((_, i) => i % 8 === 0)));
  }, [city, unit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#151515] rounded-2xl p-6"
    >
      <h3 className="font-semibold mb-4">5 Day Forecast</h3>

      <div className="grid grid-cols-5 gap-3 text-center text-sm">
        {days.map((day, i) => (
          <div key={i} className="bg-[#202020] p-3 rounded-xl">
            <p>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            />
            <p>{Math.round(day.main.temp)}°</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
