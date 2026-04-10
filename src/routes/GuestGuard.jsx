import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import ConfirmModal from "../components/ui/ConfirmModal";

const GuestGuard = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (token && location.pathname === "/") {
      // 👇 only when user manually visits login page
      setShowModal(true);
    }
    setChecked(true);
  }, [token, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    setShowModal(false);
  };

  const handleCancel = () => {
    window.location.replace("/admin/dashboard");
  };

  // 👇 IMPORTANT: wait for check
  if (!checked) return null;

  // 👇 if logged in & not showing modal → redirect directly
  if (token && !showModal) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <ConfirmModal
        open={showModal}
        onConfirm={handleLogout}
        onCancel={handleCancel}
      />
      {!token && children}
    </>
  );
};

export default GuestGuard;