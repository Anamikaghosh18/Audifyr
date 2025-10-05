// src/components/SummaryView.jsx
import { useState } from "react";
import { Copy, Download, Play } from "lucide-react";

export default function SummaryView({ document }) {
  const [copied, setCopied] = useState(false);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-xl">
        <p className="text-gray-500">Upload a document to generate summary</p>
      </div>
    );
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Summary for: {document.name}
      </h2>

      {/* Example: split summary into sections */}
      {document.summarySections.map((section, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              {section.title}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleCopy(section.text)}
                className="text-gray-500 hover:text-blue-600"
                title="Copy"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={() => console.log("Download section")}
                className="text-gray-500 hover:text-green-600"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              {section.audioUrl && (
                <button
                  onClick={() => console.log("Play audio")}
                  className="text-gray-500 hover:text-purple-600"
                  title="Play Audio"
                >
                  <Play className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600">{section.text}</p>
        </div>
      ))}

      {copied && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
