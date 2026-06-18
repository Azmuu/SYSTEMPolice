import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaHeading,
  FaAlignLeft,
  FaFileUpload,
} from "react-icons/fa";

export default function AddPolicy() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    date: "",
    title: "",
    description: "",
    file: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.post("http://localhost:4000/api/policies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Policy submitted successfully!");
      setForm({
        fullName: "",
        email: "",
        date: "",
        title: "",
        description: "",
        file: null,
      });
    } catch (error) {
      console.error("Submission failed:", error);
      setMessage("Failed to submit policy.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 ">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-40">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Submit a Policy
        </h2>

        {message && (
          <div
            className={`mb-6 p-3 rounded text-center font-semibold ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-green-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-purple-500" />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-200"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <FaHeading className="text-yellow-500" />
            <input
              type="text"
              name="title"
              placeholder="Policy Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-200"
              required
            />
          </div>

          <div className="flex items-start gap-3">
            <FaAlignLeft className="text-pink-500 mt-2" />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-200"
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-3">
            <FaFileUpload className="text-gray-600" />
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Submit Policy
          </button>
        </form>
      </div>
    </div>
  );
}
