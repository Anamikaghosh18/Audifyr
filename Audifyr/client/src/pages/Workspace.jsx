import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Upload from "../components/UploadSection";
import Settings from "../components/Settings";
import { FileText, Headphones, Book } from "lucide-react";

export default function Workspace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleLogout = async () => {
    // Firebase logout
    await auth.signOut();
    navigate("/login");
  };

  const tabs = [
    { id: "upload", label: "Workspace", icon: FileText },
    { id: "library", label: "My Library", icon: Book },
    { id: "audiobooks", label: "Audiobooks", icon: Headphones },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        tabs={tabs}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          tabs={tabs}
        />

        {/* Page content */}
        <main className="flex-1 overflow-auto pt-24 p-6">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/library" element={<div>Library Content</div>} />
            <Route path="/audiobooks" element={<div>Audiobooks Content</div>} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
