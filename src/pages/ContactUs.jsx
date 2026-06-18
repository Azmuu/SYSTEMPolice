import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Haddii aad leedahay API endpoint backend ah
      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Do you have questions or want to work with us? Feel free to reach out.
          </p>


          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && <p className="text-green-500">Message sent successfully!</p>}
            {status === "error" && <p className="text-red-500">Something went wrong. Please try again.</p>}
          </form>
        </div>

        {/* Map Embed */}
        <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg mt-40 md:mt-0 ">
          <iframe
            title="Map"
            className="w-full h-full border-0 "
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.4979331454974!2d45.31816147499459!3d2.0469347979545164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58426b7ae38d7f%3A0x72cf158c8e13cd2b!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sso!4v1653154353170!5m2!1sen!2sso"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
