import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "/favicon.png";
import googlelogo from "../assets/google.png";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      "Email:",
      email,
      "Password:",
      password,
      "Remember Me:",
      rememberMe
    );
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50 relative">
      {/* Left side abstract design */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center items-center bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Blobs */}
        <div
          className="absolute -top-24 -left-24 w-64 h-64 bg-blue-300/40 rounded-full animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute top-20 right-10 w-72 h-72 bg-indigo-300/30 rounded-full animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-16 left-20 w-48 h-48 bg-purple-300/30 rounded-full animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "0.5s" }}
        />

        {/* Squares */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-200/50 w-14 h-14 rounded-md animate-float2"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Zig-zag lines */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-2 bg-indigo-200/50"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${i % 2 === 0 ? 20 : -20}deg) skewX(20deg)`,
              animation: `floatZig ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Small circles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            50% { transform: translateY(-50px) translateX(25px); }
          }
          .animate-float { animation: float infinite ease-in-out; }

          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            50% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
          }
          .animate-float2 { animation: float2 infinite ease-in-out; }

          @keyframes floatZig {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(20deg) skewX(20deg); opacity: 0.3; }
            50% { transform: translateY(-20px) translateX(10px) rotate(20deg) skewX(20deg); opacity: 0.6; }
          }
        `}</style>

        {/* Left side text */}
        <div className="z-10 relative text-left px-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Join Audifyr Today
          </h2>
          <p className="text-gray-700 text-lg">
            Summarize PDFs, convert them to audio, and learn on the go. Audifyr
            makes content accessible and easy to digest.
          </p>
        </div>
      </div>

      {/* Right side signup card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-20">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center relative overflow-hidden">
          {/* Logo + Name */}
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="Audifyr Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold text-gray-800">Audifyr</span>
          </div>

          <p className="text-gray-600 text-center mb-6">
            Create your account to start using Audifyr
          </p>

          {/* Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center w-full">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google */}
          <button className="w-full py-2.5 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition text-gray-700">
            <img src={googlelogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
