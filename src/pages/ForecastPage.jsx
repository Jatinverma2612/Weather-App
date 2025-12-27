import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API_KEY = "0b5c641e9271899b8e43ea7dbe861922";

export default function ForecastPage() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(data => setForecast(data.list.filter((_, i) => i % 8 === 0)));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6">5 Day Forecast</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, i) => (
            <div
              key={i}
              className="bg-[#151515] p-4 rounded-2xl text-center"
            >
              <p className="text-sm">
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <img
                className="mx-auto"
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt=""
              />

              <p className="text-lg font-semibold">
                {Math.round(day.main.temp)}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
