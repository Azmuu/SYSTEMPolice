import React from "react";
import { FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa";

function Profile() {
  const token = localStorage.getItem("token");

  let userInfo = {
    username: "",
    email: "",
    role: "",
  };

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userInfo.username = payload.sub || "";
      userInfo.email = payload.email || "";
      userInfo.role = payload.roles?.[0]?.replace("ROLE_", "") || "";
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        User Profile
      </h2>

      <div className="flex items-center gap-3 mb-4">
        <FaUser className="text-blue-500" />
        <span className="font-semibold">Username:</span>
        <span>{userInfo.username}</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <FaEnvelope className="text-green-500" />
        <span className="font-semibold">Email:</span>
        <span>{userInfo.email || "N/A"}</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <FaShieldAlt className="text-purple-500" />
        <span className="font-semibold">Role:</span>
        <span>{userInfo.role}</span>
      </div>
    </div>
  );
}

export default Profile;
