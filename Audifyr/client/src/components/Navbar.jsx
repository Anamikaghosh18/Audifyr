import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/favicon.png"
            alt="Audifyr Logo"
            className="h-8 w-8 rounded-md"
          />
          <span className="font-bold text-xl text-gray-800">Audifyr</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className="text-gray-600 font-medium hover:text-blue-900 transition-colors"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Try it Now Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="bg-gray-300 text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-gray-400 shadow-md transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-950 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-900 shadow-md transition"
          >
            Try it Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg shadow-md flex flex-col items-center py-6 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className="text-gray-700 text-lg font-semibold hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/signup"
            className="bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 shadow-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Try it Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
