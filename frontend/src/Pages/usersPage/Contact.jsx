import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f6f9f4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-[#d0e2d0] p-8">
        <h2 className="text-3xl font-bold text-[#2f5d50] mb-6 text-center">
          🌱 Get in Touch
        </h2>

        <form
          action="https://formspree.io/f/mvgqvaoj" // <-- Replace with your actual Formspree ID
          method="POST"
        >
          {/* Name */}
          <label className="block text-[#4a6f5c] text-sm font-semibold mb-2">
            Name
          </label>
          <input
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#b4d6b4] bg-[#f9fff9] text-[#2f5d50] placeholder-[#8aa88a] focus:outline-none focus:ring-2 focus:ring-[#7bc47f]"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <label className="block text-[#4a6f5c] text-sm font-semibold mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#b4d6b4] bg-[#f9fff9] text-[#2f5d50] placeholder-[#8aa88a] focus:outline-none focus:ring-2 focus:ring-[#7bc47f]"
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Message */}
          <label className="block text-[#4a6f5c] text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            className="w-full px-4 py-2 mb-6 rounded-lg border border-[#b4d6b4] bg-[#f9fff9] text-[#2f5d50] placeholder-[#8aa88a] focus:outline-none focus:ring-2 focus:ring-[#7bc47f]"
            name="message"
            rows="5"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#7bc47f] hover:bg-[#6ab06e] text-white font-bold rounded-lg shadow-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
