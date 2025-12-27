import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForecastPage from "./pages/ForecastPage";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/forecast" element={<ForecastPage />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
