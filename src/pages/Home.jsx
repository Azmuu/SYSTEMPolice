import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import v1 from "../videos/1.mp4";
import v2 from "../videos/2.mp4";
import v3 from "../videos/3.mp4";
import About from "./About";
import AddPolicy from "./AddPolicy";
import Footer from "../components/Footer";
import ContactUs from "./ContactUs";

const videos = [v1, v2, v3];

function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <div className="relative h-screen w-full overflow-hidden">
      <video
        key={index}
        src={videos[index]}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 z-10 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to the Future of Policy Management
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl drop-shadow-sm">
          Streamline how you create, manage, and access all your organization’s policies — all in one smart system.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add-policy")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          >
            🚀 Get Started
          </button>
          <button
            onClick={() => navigate("/AuthPage")}
            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-lg transition"
          >
            🔐 Login
          </button>
        </div>
      </div>
    </div>
    <About />
    <AddPolicy />
    <ContactUs />
    <Footer />
    </div>
  );

}

export default Home;
