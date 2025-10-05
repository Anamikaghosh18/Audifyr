import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase/firebase";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Workspace from "./pages/Workspace";
import Settings from "./components/Settings";
import AudiobookPlayer from "./components/Audiobook";
import UploadSection from "./components/UploadSection";
import SummaryView from "./components/SummaryView";

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/signin" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/workspace/*"
          element={
            <PrivateRoute>
              <Workspace />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <div className="flex flex-col gap-6">
                <UploadSection />
                <SummaryView />
              </div>
            }
          />
          <Route path="audiobooks" element={<AudiobookPlayer />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
