import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";

const API_KEY = "0b5c641e9271899b8e43ea7dbe861922";

export default function ForecastChart() {
  const { city, unit } = useWeather();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!city) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.list) return;

        // Pick one value per day (every 24 hrs)
        const dailyData = data.list
          .filter((_, index) => index % 8 === 0)
          .map((item) => ({
            day: new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            temp: Math.round(item.main.temp),
          }));

        setChartData(dailyData);
      });
  }, [city, unit]);

  if (!chartData.length) return null;

  return (
    <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 mt-6">
      <h3 className="font-semibold mb-4">5 Day Temperature Forecast</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
