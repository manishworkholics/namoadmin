import { Navigate } from "react-router-dom";
import usePermission from "../hooks/usePermission";

const ProtectedRoute = ({ children, code }) => {
  const { can } = usePermission();

  if (!can(code)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;