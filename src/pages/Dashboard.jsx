import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import Highlights from "../components/Highlights";
import Forecast from "../components/Forecast";
import { useWeather } from "../context/WeatherContext";
import ForecastChart from "../components/ForecastChart";

export default function Dashboard() {
  const { weather, loading, error } = useWeather();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header />

        {loading && <p className="mt-6">Loading...</p>}
        {error && <p className="mt-6 text-red-400">{error}</p>}

        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <TodayCard />
            <Highlights />
            <Forecast />
            <ForecastChart/>
          </div>
        )}
      </div>
    </div>
  );
}
