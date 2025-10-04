import { motion } from "framer-motion";

function Hero() {
  const blobs = [
    { size: 80, x: 50, y: 100, color: "bg-blue-300/40" },
    { size: 120, x: 200, y: 50, color: "bg-indigo-300/40" },
    { size: 60, x: 350, y: 120, color: "bg-blue-400/30" },
    { size: 100, x: 500, y: 80, color: "bg-indigo-400/30" },
    { size: 70, x: 650, y: 150, color: "bg-blue-300/30" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden px-6 pt-32 md:pt-40">
      {/* Floating Rounded Blobs */}
      {blobs.map((blob, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${blob.color} rounded-full`}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.y,
            left: blob.x,
          }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Hero Text Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Turn PDFs into Audio Instantly
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Audifyr summarizes your PDFs and converts them into natural-sounding
          audio. Learn on the go, review research, or make content accessible in
          seconds.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#"
            className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-lg font-medium"
          >
            Try it Free
          </a>
          <a
            href="#"
            className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow-md font-medium"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Zig-Zag Wave Background */}
      <motion.div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 60 L40 80 L80 40 L120 60 L160 20 L200 60 L240 40 L280 80 L320 60 L360 20 L400 60 L440 40 L480 80 L520 60 L560 20 L600 60 L640 40 L680 80 L720 60 L760 20 L800 60 L840 40 L880 80 L920 60 L960 20 L1000 60 L1040 40 L1080 80 L1120 60 L1160 20 L1200 60 L1240 40 L1280 80 L1320 60 L1360 20 L1400 60 L1440 40 V200 H0 Z"
            fill="#ffffff"
            fillOpacity="0.05"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 40 L40 60 L80 20 L120 40 L160 0 L200 40 L240 20 L280 60 L320 40 L360 0 L400 40 L440 20 L480 60 L520 40 L560 0 L600 40 L640 20 L680 60 L720 40 L760 0 L800 40 L840 20 L880 60 L920 40 L960 0 L1000 40 L1040 20 L1080 60 L1120 40 L1160 0 L1200 40 L1240 20 L1280 60 L1320 40 L1360 0 L1400 40 L1440 20 V200 H0 Z"
            fill="#000000"
            fillOpacity="0.03"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Demo Box with Glassmorphic Effect */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white/10 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-lg"
        whileHover={{ y: -5, boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}
        transition={{ duration: 0.3 }}
      >
        <video
          className="w-full h-[480px] object-cover rounded-3xl"
          autoPlay
          loop
          muted
          playsInline
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        >
          Your browser does not support the video tag.
        </video>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}

export default Hero;
