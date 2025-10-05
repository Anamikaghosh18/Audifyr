import { Menu, Bell, User } from "lucide-react";

export default function Header({ setSidebarOpen, activeTab, tabs, user }) {
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b border-blue-100 px-6 py-4 shadow-sm z-40">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              {currentTab?.label || "Workspace"}
            </h1>
            <p className="text-sm text-gray-600">
              Convert PDFs to summaries and audiobooks
            </p>
          </div>
        </div>

        {/* Right: User + Notifications */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-ping" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l-2 border-blue-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email || ""}</p>
            </div>
            <div className="relative group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-100 transition-all duration-200 group-hover:ring-4 group-hover:ring-blue-200 group-hover:shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
