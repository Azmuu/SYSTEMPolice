import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const policies = {
  terms: {
    title: "Terms of Service",
    content:
      "These Terms of Service outline the rules and regulations for the use of our website. By accessing this website, you accept these terms in full.",
  },
  privacy: {
    title: "Privacy Policy",
    content:
      "We respect your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and store your information.",
  },
  cookies: {
    title: "Cookie Policy",
    content:
      "Our website uses cookies to improve user experience. By continuing to use our site, you accept our use of cookies as outlined in this policy.",
  },
};

function Footer() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const handleOpen = (policyKey) => {
    setSelectedPolicy(policies[policyKey]);
  };

  const handleClose = () => {
    setSelectedPolicy(null);
  };

  return (
    <>
      {/* Footer Content */}
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-4 mt-12 relative z-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex items-center gap-2 mb-1">
              <FaEnvelope className="text-blue-500" />
              <a href="mailto:info@policymgmt.com" className="hover:text-white">
                info@policymgmt.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-500" />
              <a href="tel:+252612345678" className="hover:text-white">
                +252 61 2345678
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Policies</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleOpen("terms")}
                  className="hover:text-blue-400 underline"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpen("privacy")}
                  className="hover:text-blue-400 underline"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpen("cookies")}
                  className="hover:text-blue-400 underline"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-gray-400 text-xl">
              <a href="#" className="hover:text-blue-600" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-400" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-500" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-700" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Policy Management. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Popup Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg shadow-lg relative animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedPolicy.title}
            </h2>
            <p className="text-gray-700 mb-4">{selectedPolicy.content}</p>
            <button
              onClick={handleClose}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
