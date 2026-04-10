import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">

      <div className="
        w-full max-w-md
        bg-white/70 dark:bg-gray-900/70
        backdrop-blur-xl
        border border-gray-200 dark:border-gray-800
        rounded-2xl shadow-lg
        p-6 space-y-5
      ">

        {/* LOGO */}
        <div className="text-center">
          {/* <img
            src=""
            alt="logo"
            className="w-20 mx-auto mb-2"
          /> */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Login to Admin
          </h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">{error?.message || "Login failed"}</p>
          )}

        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-medium text-white
            bg-primary hover:opacity-90 transition
            disabled:opacity-50
          "
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>


        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500">
          Forgot Password?{" "}
          <span className="text-primary cursor-pointer">
            Click here
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;