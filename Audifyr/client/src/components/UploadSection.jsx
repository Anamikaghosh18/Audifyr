// src/components/ModernUploadSection.jsx
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Play,
  Copy,
  Download,
  X,
  File,
} from "lucide-react";

// Professional Glass Card
const GlassCard = ({ children, className = "", hover = true }) => (
  <div
    className={`
      relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow
      ${
        hover
          ? "hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
          : ""
      }
      ${className}
    `}
  >
    <div className="relative">{children}</div>
  </div>
);

// Main Component
export default function ModernUploadSection({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [summary, setSummary] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setSummary("");
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setSummary("");
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setSummary("");
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUploadSuccess?.();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSummarize = () => {
    if (!selectedFile) return;
    setSummary("Generating summary...");
    setTimeout(() => {
      setSummary(
        "This document explores advanced concepts in artificial intelligence and machine learning. Key findings include breakthrough algorithms for natural language processing, improved neural network architectures, and practical applications in real-world scenarios."
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      

      {/* Upload Area */}
      <GlassCard className={`p-8 ${isDragOver ? "bg-blue-50" : "bg-white"}`}>
        {!selectedFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <UploadCloud className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Drop your PDF here
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Drag and drop your PDF file here, or click the button below
            </p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Browse Files
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supported format: PDF (Max 50MB)
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected File Card */}
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
                    <File className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate mb-1 text-lg">
                      {selectedFile.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span>PDF Document</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {uploadProgress === 100
                        ? "✓ Upload Complete"
                        : "Uploading..."}
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Upload & Summarize Buttons */}
            <div className="flex gap-3">
              {uploadProgress === 0 && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload PDF"}
                </button>
              )}
              {uploadProgress === 100 && !isUploading && (
                <button
                  onClick={handleSummarize}
                  className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Generate AI Summary
                </button>
              )}
            </div>
          </div>
        )}
      </GlassCard>

      {/* Summary Section */}
      {summary && (
        <GlassCard className="p-6">
          <div className="bg-indigo-600 p-4 rounded-t-lg text-white">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <h3 className="text-lg font-bold">AI-Generated Summary</h3>
            </div>
          </div>
          <div className="p-4">
            {summary === "Generating summary..." ? (
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Analyzing your document...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700">{summary}</p>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
                    <Copy className="w-4 h-4" /> Copy Summary
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
                    <Play className="w-4 h-4" /> Convert to Audio
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
