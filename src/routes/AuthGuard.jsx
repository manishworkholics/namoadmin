import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;