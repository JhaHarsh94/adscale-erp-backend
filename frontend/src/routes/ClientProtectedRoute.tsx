import { Navigate, Outlet } from "react-router-dom";
import { isClientAuthenticated } from "../lib/clientAuth";

function ClientProtectedRoute() {
  if (!isClientAuthenticated()) {
    return <Navigate to="/client/login" replace />;
  }

  return <Outlet />;
}

export default ClientProtectedRoute;
