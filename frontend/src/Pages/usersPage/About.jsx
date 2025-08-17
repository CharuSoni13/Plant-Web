import React from "react";
import aboutImg1 from "../../assets/aboutimg.jpg";
import aboutImg2 from "../../assets/aboutimg2.jpg";
import aboutImg3 from "../../assets/aboutimg3.jpg";
import "remixicon/fonts/remixicon.css";

const About = () => {
  return (
    <div className="bg-green-50 min-h-screen font-sans text-gray-800">
      {/* Page Heading */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-green-700 mb-4">
          About <span className="text-green-500">Green Roots</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          At Green Roots, we’re on a journey to reconnect people with nature 🌿.
          Learn more about who we are, our mission, and why we’re trusted by
          thousands of plant lovers.
        </p>
      </div>

      {/* Timeline Style Sections */}
      <div className="max-w-6xl mx-auto space-y-20 px-6 pb-20">
        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Left */}
          <img
            src={aboutImg1}
            alt="Who We Are"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          {/* Text Right */}
          <div>
            <h2 className="text-3xl font-semibold text-green-700 flex items-center gap-2 mb-4">
              <i className="ri-leaf-line text-green-600 text-3xl"></i> Who We
              Are
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>Green Roots</strong> — your one-stop
              destination for indoor, outdoor, and exotic plants. We believe
              plants are more than décor; they are companions that bring peace,
              joy, and positivity into our lives.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Over the years, we’ve grown into a family of passionate plant
              lovers. Every plant we offer is handpicked, nurtured with care,
              and ready to thrive — ensuring that you take home a little piece
              of nature that flourishes with you.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          {/* Text Left */}
          <div>
            <h2 className="text-3xl font-semibold text-green-700 flex items-center gap-2 mb-4">
              <i className="ri-seedling-line text-green-600 text-3xl"></i> Our
              Mission
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is simple: make greenery accessible to every home,
              workplace, and community 🌍. We believe a single plant has the
              power to transform not just a space, but also how people feel in
              it.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to promoting eco-friendly practices — from
              sustainable packaging to encouraging responsible plant care.
              Together, we can nurture a greener tomorrow where every person
              plays a part in a healthier planet.
            </p>
          </div>
          {/* Image Right */}
          <img
            src={aboutImg2}
            alt="Our Mission"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
        {/* Sustainability Section */}
        <div className="my-16 bg-green-100 rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            🌍 Our Commitment to Sustainability
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            At <strong>Green Roots</strong>, we are deeply committed to
            protecting the environment while spreading the joy of greenery.
            Every step we take is aimed at building a more sustainable and
            eco-friendly world.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <i className="ri-recycle-line text-4xl text-green-600 mb-4"></i>
              <h3 className="font-semibold text-xl mb-2 text-green-700">
                Eco-Friendly Packaging
              </h3>
              <p className="text-gray-600 text-sm">
                We use biodegradable pots and recyclable materials for safe &
                green delivery.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <i className="ri-earth-line text-4xl text-green-600 mb-4"></i>
              <h3 className="font-semibold text-xl mb-2 text-green-700">
                Sourcing Locally
              </h3>
              <p className="text-gray-600 text-sm">
                Partnering with local nurseries to reduce carbon footprint and
                support communities.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <i className="ri-leaf-line text-4xl text-green-600 mb-4"></i>
              <h3 className="font-semibold text-xl mb-2 text-green-700">
                Urban Greenery
              </h3>
              <p className="text-gray-600 text-sm">
                Promoting urban gardening to create healthier, greener living
                spaces.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <i className="ri-hand-heart-line text-4xl text-green-600 mb-4"></i>
              <h3 className="font-semibold text-xl mb-2 text-green-700">
                Giving Back
              </h3>
              <p className="text-gray-600 text-sm">
                A part of our proceeds goes into tree plantation and
                eco-awareness drives.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Stories / Testimonials Section */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
            💬 What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">
                "Green Roots has completely transformed my balcony into a mini
                garden paradise. The plants were healthy and beautifully
                packed!"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=32"
                  alt="Customer"
                  className="w-12 h-12 rounded-full border border-green-300"
                />
                <div>
                  <h3 className="font-semibold text-green-700">Riya Sharma</h3>
                  <p className="text-sm text-gray-500">Plant Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">
                "I love their eco-friendly approach. The packaging was
                sustainable, and my Peace Lily is thriving beautifully in my
                living room!"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Customer"
                  className="w-12 h-12 rounded-full border border-green-300"
                />
                <div>
                  <h3 className="font-semibold text-green-700">Arjun Mehta</h3>
                  <p className="text-sm text-gray-500">Home Gardener</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">
                "The variety is amazing! I ordered succulents for my office desk
                and they not only look great but also bring positivity to my
                space."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=56"
                  alt="Customer"
                  className="w-12 h-12 rounded-full border border-green-300"
                />
                <div>
                  <h3 className="font-semibold text-green-700">Neha Kapoor</h3>
                  <p className="text-sm text-gray-500">Interior Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Left */}
          <img
            src={aboutImg3}
            alt="Why Choose Us"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          {/* Text Right */}
          <div>
            <h2 className="text-3xl font-semibold text-green-700 flex items-center gap-2 mb-4">
              <i className="ri-plant-line text-green-600 text-3xl"></i> Why
              Choose Us?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              From succulents to rare species, our plants are handpicked for
              quality and freshness 🌱. We don’t just deliver plants — we
              deliver care, love, and expert guidance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With eco-friendly packaging, reliable delivery, and a passionate
              team, we ensure your green journey blooms beautifully.
            </p>
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md transition">
              Explore Our Plants
            </button>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-green-700 text-white py-16 px-6 text-center relative overflow-hidden">
        {/* Decorative Quote Icon */}
        <i className="ri-double-quotes-l text-6xl text-green-300 absolute top-6 left-8 opacity-20"></i>
        <i className="ri-double-quotes-r text-6xl text-green-300 absolute bottom-6 right-8 opacity-20"></i>

        <blockquote className="max-w-3xl mx-auto relative">
          <p className="text-2xl md:text-3xl italic leading-relaxed font-light">
            “A garden is not complete without plants, and a life is not complete
            without nature. At{" "}
            <span className="font-semibold text-yellow-300">Green Roots</span>,
            we bring you closer to both.”
          </p>
          <hr className="w-24 border-t-2 border-yellow-300 mx-auto my-6" />
          <footer className="text-lg font-medium tracking-wide text-green-100">
            — Green Roots
          </footer>
        </blockquote>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16 px-6 mt-16 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4">
          🌿 Bring Nature Home with{" "}
          <span className="text-yellow-300">Green Roots</span>
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
          Discover our wide collection of indoor, outdoor, and exotic plants.
          Let’s make your space greener, fresher, and more vibrant — one plant
          at a time.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-100 text-green-900 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-green-400 transition"
        >
          🌱 Explore Our Plants
        </button>
      </div>
    </div>
  );
};

export default About;
