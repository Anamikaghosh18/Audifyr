import { useState } from "react";
import { User, Mail, Bell, Moon, Sun, Trash2 } from "lucide-react";
import { auth } from "../Firebase/firebase";
import { updateProfile, updateEmail, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Professional Card Component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white shadow-sm border border-gray-200 rounded-2xl p-6 ${className}`}
  >
    {children}
  </div>
);

export default function ModernSettings() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (user) {
        await updateProfile(user, { displayName });
        if (user.email !== email) await updateEmail(user, email);
      }
      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteUser(user);
      alert("Account deleted!");
      navigate("/signup");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-10 text-gray-800">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      {/* Profile Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" /> Profile Information
        </h2>
        <div className="space-y-4">
          {/* Display Name */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-40 font-medium">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-40 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sun className="w-5 h-5 text-gray-600" /> Preferences
        </h2>
        <div className="space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-gray-600" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Toggle dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-8 rounded-full transition ${
                darkMode ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transform transition ${
                  darkMode ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive updates and alerts
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-8 rounded-full transition ${
                notifications ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transform transition ${
                  notifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
          <Trash2 className="w-5 h-5" /> Danger Zone
        </h2>
        <div className="space-y-3">
          <p className="text-red-600 text-sm">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete My Account
          </button>
        </div>
      </Card>
    </div>
  );
}
