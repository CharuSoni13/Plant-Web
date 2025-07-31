import React from 'react';
import aboutImg from '../../assets/plant-about.jpg';
// Add a plant-themed image in this path
import 'remixicon/fonts/remixicon.css';

const About = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 md:px-20 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div>
          <img
            src={aboutImg}
            alt="About Green Roots"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h1 className="text-4xl font-bold text-green-700 mb-4">About <span className="text-green-500">Green Roots</span></h1>
          <p className="mb-4 leading-relaxed">
            Welcome to <strong>Green Roots</strong> — your one-stop destination for a wide variety of indoor, outdoor, flowering, and exotic plants. 🌿
          </p>
          <p className="mb-4 leading-relaxed">
            We believe that plants don't just beautify your space — they purify the air, uplift moods, and bring harmony to your environment. 
            Whether you're a beginner or a seasoned gardener, we provide the right plants and guidance to help your green journey bloom.
          </p>
          <p className="mb-4 leading-relaxed">
            From vibrant succulents and flowering plants to large leafy greens and rare species — our collection is hand-picked to ensure quality and health.
          </p>
          <p className="mb-4 leading-relaxed">
            <i className="ri-plant-line text-green-600"></i> Join our growing community of plant lovers and turn your space into a sanctuary of life and calm.
          </p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md transition">
            Explore Our Plants
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
