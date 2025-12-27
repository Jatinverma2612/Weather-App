import { useWeather } from "../context/WeatherContext";

export default function Highlights() {
  const { weather } = useWeather();

  // 🛑 SAFETY GUARD (MOST IMPORTANT)
  if (
    !weather ||
    !weather.main ||
    !weather.wind ||
    typeof weather.visibility !== "number"
  ) {
    return (
      <div className="bg-white dark:bg-[#151515] rounded-2xl p-6">
        <p className="text-gray-400">Loading highlights...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#151515] rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Today's Highlights</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-100 dark:bg-[#202020] p-4 rounded-xl">
          Humidity: {weather.main.humidity}%
        </div>

        <div className="bg-gray-100 dark:bg-[#202020] p-4 rounded-xl">
          Wind: {weather.wind.speed} km/h
        </div>

        <div className="bg-gray-100 dark:bg-[#202020] p-4 rounded-xl">
          Feels Like: {Math.round(weather.main.feels_like)}°
        </div>

        <div className="bg-gray-100 dark:bg-[#202020] p-4 rounded-xl">
          Visibility: {weather.visibility / 1000} km
        </div>
      </div>
    </div>
  );
}
