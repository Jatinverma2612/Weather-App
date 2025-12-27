import { NavLink } from "react-router-dom";
import { FiHome, FiCloud, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const base =
    "p-3 rounded-xl transition text-gray-400 hover:text-white";

  const active = "bg-[#1f1f1f] text-white";

  return (
    <aside className="w-20 bg-[#121212] flex flex-col items-center py-8 gap-6">
      <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <FiHome size={22} />
      </NavLink>

      <NavLink to="/forecast" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <FiCloud size={22} />
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <FiSettings size={22} />
      </NavLink>
    </aside>
  );
}
