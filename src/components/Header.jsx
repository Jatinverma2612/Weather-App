import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const { fetchWeather } = useWeather();

  const handleSearch = () => {
    if (query.trim()) {
      fetchWeather(query);
      setQuery("");
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Good Morning</h2>
        <p className="text-gray-400 text-sm">Check today’s weather</p>
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search city..."
          className="bg-[#1a1a1a] px-4 py-2 rounded-xl outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          Search
        </button>
      </div>
    </div>
  );
}
