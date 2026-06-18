import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPolicy from './pages/AddPolicy';
import ViewPolicies from './pages/ViewPolicies';
import EditPolicy from './pages/EditPolicy';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ContactUs from './pages/ContactUs';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-policy" element={<AddPolicy />} />
        <Route path="/view-policies" element={<ViewPolicies />} />
        <Route path="/edit-policy/:id" element={<EditPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />


        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ ToastContainer si loogu muujiyo fariimaha guusha/qaladaadka */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover theme="colored" />
    </div>
  );
}

export default App;
