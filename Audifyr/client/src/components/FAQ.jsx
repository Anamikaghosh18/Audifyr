import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const faqs = [
    {
      question: "What is Audifyr?",
      answer:
        "Audifyr is a tool that converts your PDFs into natural-sounding audio. It also provides AI-powered summaries so you can quickly understand long documents.",
    },
    {
      question: "Do I need to install anything?",
      answer:
        "No installation required. Audifyr works directly in your browser. Just upload your PDF and start listening instantly.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. Your files are processed securely and never shared with anyone. We prioritize privacy and confidentiality.",
    },
    {
      question: "Can I download the audio files?",
      answer:
        "Yes. You can listen online or download the generated audio for offline use anytime.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "Currently, we support 20+ languages including English, Spanish, French, Hindi, and more. We’re adding new voices regularly.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Have more questions? We’ve got you covered.
        </p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md">
      <button
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800">
          {faq.question}
        </span>
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4 text-gray-600"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FAQ;
