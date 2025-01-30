import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyCourses from "./pages/Dashboard/MyCourses";
import Schedule from "./pages/Dashboard/Schedule";
import Messages from "./pages/Dashboard/Messages";
import Settings from "./pages/Dashboard/Settings";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/courses" element={<MyCourses />} />
          <Route path="/dashboard/schedule" element={<Schedule />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
