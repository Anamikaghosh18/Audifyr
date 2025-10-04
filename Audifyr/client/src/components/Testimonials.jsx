import { motion } from "framer-motion";
import { useState } from "react";

// Example testimonials
const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Student",
    feedback: "Audifyr transformed how I study!",
    avatar: "RM",
    rating: 5,
  },
  {
    name: "Ananya Singh",
    role: "Content Creator",
    feedback: "Perfect for multitasking while editing videos.",
    avatar: "AS",
    rating: 5,
  },
  {
    name: "Vikram Patel",
    role: "Researcher",
    feedback: "Multi-language support is amazing!",
    avatar: "VP",
    rating: 5,
  },
  {
    name: "Sneha Roy",
    role: "Designer",
    feedback: "I can listen to PDFs while working.",
    avatar: "SR",
    rating: 5,
  },
];

function Testimonials() {
  const [pauseAnimation, setPauseAnimation] = useState(false);

  return (
    <section className="relative bg-gradient-to-br via-indigo-200 to-white py-24 px-6 md:px-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          Hear from Our Users
        </h2>
        <p className="text-base text-gray-600 max-w-4xl mx-auto">
          Join thousands of students, creators, and professionals who trust
          Audifyr
        </p>
      </div>

      {/* Scrolling Testimonials */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-6 w-max"
          animate={pauseAnimation ? {} : { x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          onHoverStart={() => setPauseAnimation(true)}
          onHoverEnd={() => setPauseAnimation(false)}
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="min-w-[320px] md:min-w-[320px] p-4 rounded-2xl shadow-md bg-white border border-blue-300"
            >
              <p className="text-sm text-gray-800 mb-2">{t.feedback}</p>
              <p className="font-bold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-700">{t.role}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
