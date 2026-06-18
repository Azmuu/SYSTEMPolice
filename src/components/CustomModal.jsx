// src/components/CustomModal.jsx (tusaale ahaan)
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const modalRoot = document.getElementById("modal-root") || (() => {
  const root = document.createElement("div");
  root.setAttribute("id", "modal-root");
  document.body.appendChild(root);
  return root;
})();

export default function CustomModal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg max-w-lg w-full p-6 shadow-xl relative transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
