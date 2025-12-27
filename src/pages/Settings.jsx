import Sidebar from "../components/Sidebar";
import { useWeather } from "../context/WeatherContext";

export default function Settings() {
  const { unit, setUnit, theme, setTheme } = useWeather();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        <div className="space-y-6">
          <div className="bg-[#151515] dark:bg-[#151515] light:bg-white p-4 rounded-xl">
            <p className="mb-2">Temperature Unit</p>
            <button
              onClick={() =>
                setUnit(unit === "metric" ? "imperial" : "metric")
              }
              className="bg-blue-600 px-4 py-2 rounded-xl"
            >
              {unit === "metric" ? "Switch to °F" : "Switch to °C"}
            </button>
          </div>

          <div className="bg-[#151515] dark:bg-[#151515] light:bg-white p-4 rounded-xl">
            <p className="mb-2">Theme</p>
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="bg-purple-600 px-4 py-2 rounded-xl"
            >
              Switch to {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
