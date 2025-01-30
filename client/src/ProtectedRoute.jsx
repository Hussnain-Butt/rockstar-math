import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { users } = useAuth();
  return users ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
