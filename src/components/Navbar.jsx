import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FaHome,
  FaPlus,
  FaSignInAlt,
  FaMoon,
  FaSun,
  FaInfoCircle,
  FaSignOutAlt
} from 'react-icons/fa';

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.updateLoginStatus = checkLogin; // Allow external update
    checkLogin();

    const interval = setInterval(checkLogin, 1000); // Fallback polling every second
    return () => {
      clearInterval(interval);
      delete window.updateLoginStatus;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate("/AuthPage");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-md fixed top-0 z-50 w-full">
      <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Policy Management</h1>
      <div className="flex gap-6 items-center text-gray-800 dark:text-gray-200">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-500">
          <FaHome /> Home
        </Link>

        <Link to="/about" className="flex items-center gap-1 hover:text-blue-500">
          <FaInfoCircle /> About
        </Link>

        {isLoggedIn && (
          <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-500">
            <FaPlus /> Dashboard
          </Link>
        )}

        <Link to="/contact" className="flex items-center gap-1 hover:text-blue-500">
          <FaPlus /> Contact Us
        </Link>

        {!isLoggedIn ? (
          <Link to="/AuthPage" className="flex items-center gap-1 hover:text-blue-500">
            <FaSignInAlt /> Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-500">
            <FaSignOutAlt /> Logout
          </button>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 text-xl hover:text-yellow-400"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
