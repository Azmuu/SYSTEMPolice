import { useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
  FaList,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function NavSide() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // Get and decode token
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rawRole = payload.roles?.[0]; // "ROLE_ADMIN" or "ROLE_USER"
      role = rawRole?.replace("ROLE_", ""); // Convert to "ADMIN" or "USER"
    } catch (error) {
      console.error("Invalid token format", error);
    }
  }

  // Define menu items based on role
  const menuItems =
    role === "ADMIN"
      ? [
          { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
          { name: "Policies", path: "/add-policy", icon: <FaFileAlt /> },
          { name: "View Policies", path: "/view-policies", icon: <FaList /> },
          { name: "Profile", path: "/profile", icon: <FaCog /> },
        ]
      : role === "USER"
      ? [
          { name: "Profile", path: "/profile", icon: <FaCog /> },
        ]
      : [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/AuthPage");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-200 shadow-lg transition-width duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">PolicyMgmt</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map(({ name, path, icon }) => (
          <NavLink
            to={path}
            key={name}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                isActive ? "bg-blue-600 text-white font-semibold" : ""
              }`
            }
            end
          >
            <span className="text-lg">{icon}</span>
            {isOpen && <span className="text-sm">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white transition-colors mb-4 mx-4 rounded"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
}

export default NavSide;
