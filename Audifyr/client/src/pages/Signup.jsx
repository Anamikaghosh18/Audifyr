import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "/favicon.png";
import googlelogo from "../assets/google.png";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../Firebase/firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/workspace", { replace: true });
      if (rememberMe) {
        console.log("User will be remembered!");
      }
      alert("Account created successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/workspace", { replace: true });
    } catch (err) {
      alert("Google Sign-In failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50 relative">
      {/* Left side abstract design */}
      {/* ... */}
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
            {/* Email Input */}
            {/* Password Input */}
            {/* Remember Me & Forgot Password */}
            {/* Submit Button */}
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center w-full">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition text-gray-700"
          >
            <img src={googlelogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
