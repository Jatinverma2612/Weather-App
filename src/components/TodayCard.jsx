import { motion } from "framer-motion";
import { useWeather } from "../context/WeatherContext";

export default function TodayCard() {
  const { weather } = useWeather();

  // 🛑 SAFETY CHECK (MOST IMPORTANT)
  if (!weather || !weather.main || !weather.weather) {
    return (
      <div className="bg-white dark:bg-[#151515] rounded-2xl p-6">
        <p className="text-gray-400">Loading weather...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#151515] rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold">{weather.name}</h3>

      <div className="flex items-center gap-4 mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
          className="w-20"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {Math.round(weather.main.temp)}°
          </h1>
          <p className="text-gray-400 capitalize">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
