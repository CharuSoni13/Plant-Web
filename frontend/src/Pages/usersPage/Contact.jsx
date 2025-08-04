import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Just console log the form data
      console.log("📧 Contact Form Submission:");
      console.log("Name:", formData.name);
      console.log("Email:", formData.email);
      console.log("Message:", formData.message);
      console.log("Timestamp:", new Date().toISOString());

      // Show success message
      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been received. We'll get back to you soon!"
      });
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error('Error processing form:', error);
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-800 mb-6">🌱 Contact Us</h1>

      <p className="text-gray-700 max-w-xl text-center mb-10">
        Have questions, suggestions, or just want to say hi? Reach out and we’ll
        get back to you as soon as possible!
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl space-y-6">
        {submitStatus && (
          <div className={`p-4 rounded-lg ${
            submitStatus.success 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded transition ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-700 hover:bg-green-800'
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line mr-2 animate-spin"></i> Sending...
            </>
          ) : (
            <>
              <i className="ri-mail-send-line mr-2"></i> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;
