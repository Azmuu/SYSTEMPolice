import { useState } from "react";
import { FaRegFileAlt, FaUsers, FaHistory, FaLock, FaChartBar, FaInfoCircle, FaRocket } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const policies = [
  {
    img: img1,
    icon: <FaRegFileAlt className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
    title: "Policy Creation Made Easy",
    desc: "Create and manage policies with a simple, intuitive interface.",
    details:
      "Our platform offers a user-friendly interface that lets you quickly create, edit, and organize your policies without hassle. Templates and guidelines help you maintain consistency.",
  },
  {
    img: img2,
    icon: <FaUsers className="text-green-600 dark:text-green-400 w-6 h-6" />,
    title: "Real-Time Collaboration",
    desc: "Work with your team seamlessly and update policies instantly.",
    details:
      "Collaborate live with your team members. Changes are reflected immediately so everyone stays on the same page, reducing errors and improving productivity.",
  },
  {
    img: img3,
    icon: <FaHistory className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />,
    title: "Version Control",
    desc: "Track changes and maintain versions effortlessly for compliance.",
    details:
      "Every policy update is tracked with detailed version histories. Roll back changes or compare versions easily to ensure compliance and audit readiness.",
  },
  {
    img: img4,
    icon: <FaLock className="text-red-600 dark:text-red-400 w-6 h-6" />,
    title: "Secure Access",
    desc: "Role-based permissions keep your data safe and secure.",
    details:
      "Define roles and permissions for your team to ensure sensitive policy information is only accessible by authorized users, maintaining confidentiality and security.",
  },
  {
    img: img5,
    icon: <FaChartBar className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
    title: "Comprehensive Reporting",
    desc: "Generate detailed reports to monitor policy adherence.",
    details:
      "Use our reporting tools to generate insights on policy usage, compliance status, and audit trails, helping you make informed decisions and improve governance.",
  },
];

function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);
  const navigate = useNavigate();

  const openModal = (policy) => {
    setActivePolicy(policy);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActivePolicy(null);
  };

  const handleGetStarted = () => {
    toast.success("Redirecting you to Add Policy page...", {
      position: "top-right",
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => navigate("/add-policy"),
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-12 transition-colors duration-500 flex flex-col items-center mt-5">
      {/* Toast container */}
      <ToastContainer />

      {/* Header with icon */}
      <h1 className="text-5xl font-extrabold mb-12 text-center max-w-3xl drop-shadow-md animate-fadeIn flex items-center justify-center gap-3">
        About Our Policy Management System
      </h1>

      <p className="max-w-3xl mb-12 text-center text-lg leading-relaxed animate-fadeIn delay-100">
        Empowering organizations to create, distribute, and monitor policies efficiently. Secure, transparent, and easy to use.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              src={policy.img}
              alt={policy.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6 flex flex-col justify-between h-52">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {policy.icon}
                  <h3 className="text-xl font-semibold">{policy.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{policy.desc}</p>
              </div>
              <button
                onClick={() => openModal(policy)}
                className="mt-6 self-start bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-lg transition"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && activePolicy && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-xl w-full p-8 shadow-lg relative animate-scaleFadeIn"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{activePolicy.title}</h2>
            <img
              src={activePolicy.img}
              alt={activePolicy.title}
              className="w-full h-56 object-cover rounded mb-4"
              loading="lazy"
            />
            <p className="text-gray-800 dark:text-gray-200">{activePolicy.details}</p>
          </div>
        </div>
      )}

      {/* Footer Call-to-Action */}
      <footer className="mt-16 w-full bg-blue-600 dark:bg-blue-700 py-8 text-center rounded-t-lg shadow-lg">
        <h3 className="text-white text-2xl font-semibold mb-4 flex items-center justify-center gap-3">
          <FaRocket className="w-7 h-7" />
          Ready to get started?
        </h3>
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          🚀 Get Started Now
        </button>
      </footer>

      {/* Animations CSS */}
      <style>
        {`
          @keyframes fadeIn {
            0% {opacity: 0; transform: translateY(20px);}
            100% {opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease forwards;
          }
          .animate-fadeIn.delay-100 {
            animation-delay: 0.1s;
          }
          @keyframes scaleFadeIn {
            0% { opacity: 0; transform: scale(0.7);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-scaleFadeIn {
            animation: scaleFadeIn 0.3s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default About;
