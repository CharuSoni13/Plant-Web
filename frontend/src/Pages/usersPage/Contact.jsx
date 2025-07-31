import React from "react";
import "remixicon/fonts/remixicon.css";

const Contact = () => {
  return (
    <div className="min-h-screen bg-green-50 px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-800 mb-6">🌱 Contact Us</h1>

      <p className="text-gray-700 max-w-xl text-center mb-10">
        Have questions, suggestions, or just want to say hi? Reach out and we’ll
        get back to you as soon as possible!
      </p>

      <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
        >
          <i className="ri-mail-send-line mr-2"></i> Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
