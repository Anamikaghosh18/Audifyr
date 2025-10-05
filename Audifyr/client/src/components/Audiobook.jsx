import { useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Download,
  Settings,
  Headphones,
} from "lucide-react";

export default function AudiobookPlayer({ document }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes mock duration
  const [volume, setVolume] = useState(75);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    // TODO: Seek audio to newTime
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    // TODO: Update audio volume
  };

  const skipTime = (seconds) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
    setCurrentTime(newTime);
    // TODO: Update audio position
  };

  if (!document) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Headphones className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Audiobook Selected
          </h3>
          <p className="text-gray-600">
            Please select a document with audio from your library
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Album Art / Cover */}
      <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl shadow-2xl p-12 text-white">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6">
            <Headphones className="w-24 h-24 mx-auto text-white/90" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">
            {document.title}
          </h1>
          <p className="text-center text-white/80">Audiobook Summary</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                (currentTime / duration) * 100
              }%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={() => skipTime(-10)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <SkipBack className="w-8 h-8" />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>

          <button
            onClick={() => skipTime(10)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <SkipForward className="w-8 h-8" />
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600 w-8">{volume}%</span>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1.0">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2.0">2.0x</option>
            </select>
          </div>

          {/* Download */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download</span>
          </button>
        </div>
      </div>

      {/* Chapters / Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapters</h2>
        <div className="space-y-2">
          {[
            { title: "Introduction", duration: "2:30" },
            { title: "Key Concepts", duration: "5:45" },
            { title: "Main Discussion", duration: "8:20" },
            { title: "Conclusion", duration: "3:15" },
          ].map((chapter, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-800">{chapter.title}</span>
              </div>
              <span className="text-gray-500 text-sm">{chapter.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #3B82F6;
          cursor: pointer;
          border-radius: 50%;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3B82F6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  );
}
