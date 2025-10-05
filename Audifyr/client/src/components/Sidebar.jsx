import { Settings, LogOut, X } from "lucide-react";
import logo from "/favicon.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({
  tabs = [],
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  onLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (tabId) => {
    let path = "/workspace";
    if (tabId === "library") path = "/workspace/library";
    else if (tabId === "audiobooks") path = "/workspace/audiobooks";
    else if (tabId === "settings") path = "/workspace/settings";

    navigate(path);
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo + Close */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Audifyr" className="w-10 h-10 rounded-md" />
            <span className="text-xl font-bold text-gray-800 tracking-wide">
              Audifyr
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 space-y-3 mt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              activeTab === tab.id || location.pathname.includes(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => handleNavigation(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-inner"
                    : "text-gray-700"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="text-sm md:text-base">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer (Settings + Logout) */}
        <div className="p-4 border-t border-gray-200 mt-auto space-y-2">
          <button
            onClick={() => handleNavigation("settings")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:shadow-sm transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm md:text-base">Settings</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-sm transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm md:text-base">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
