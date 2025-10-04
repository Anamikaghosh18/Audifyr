import { motion } from "framer-motion";

function Features() {
  const featureList = [
    {
      title: "AI Summarization",
      desc: "Quickly summarize your PDFs into concise, easy-to-read insights for faster learning and comprehension.",
      img: "/feature1.png",
    },
    {
      title: "Audio Book Conversion",
      desc: "Convert the summarized content or full PDFs into natural-sounding audio, perfect for learning on the go.",
      img: "/feature2.png",
    },
    {
      title: "Multi-Language Support",
      desc: "Supports 20+ languages and various AI voices to match your preferred style and tone.",
      img: "/feature3.png",
    },
    {
      title: "Offline & Private",
      desc: "Your files remain local and private. Convert PDFs to audio securely without uploading sensitive documents.",
      img: "/feature4.png",
    },
  ];

  return (
    <section className="relative bg-gray-50 py-20 px-6 md:px-20 overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Discover the Capabilities
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          From summarization to natural audio conversion, Audifyr is designed to
          make your learning and accessibility effortless.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-24">
        {featureList.map((feature, idx) => (
          <motion.div
            key={feature.title}
            className={`relative flex flex-col md:flex-row items-center gap-12 ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            {/* Zigzag background behind cards */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
              <svg
                className="w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 50 L200 150 L400 50 L600 150 L800 50 L1000 150 L1200 50"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0 100 L250 0 L500 100 L750 0 L1000 100 L1250 0"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <div className="bg-white/40 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <motion.img
                src={feature.img}
                alt={feature.title}
                className="rounded-2xl shadow-2xl border border-white/30 bg-white/40 backdrop-blur-md w-96 h-64 object-cover relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
