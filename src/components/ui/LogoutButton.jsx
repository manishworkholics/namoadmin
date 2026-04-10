import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import ConfirmModal from "./ConfirmModal";

const LogoutButton = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90"
      >
        Logout
      </button>

      <ConfirmModal
        open={open}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default LogoutButton;