import { useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { Trash2, Pencil } from "lucide-react";

import { useDispatch } from "react-redux";
import { addStaff } from "../../store/slices/staffSlice";
import { useNavigate } from "react-router-dom";

const AddSubStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    loginType: "",
    permissions: [],
  });

  const permissionsList = [
    "ORDER",
    "FRANCHISE",
    "SUB STAFF",
    "ITEM",
    "PDF",
    "NOTIFICATION",
    "PAGES",
    "QR CODE",
    "FEEDBACK",
    "BANK DETAILS",
    "MOBILE ALERT",
  ];

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const togglePermission = (perm) => {
    if (form.permissions.includes(perm)) {
      setForm({
        ...form,
        permissions: form.permissions.filter((p) => p !== perm),
      });
    } else {
      setForm({
        ...form,
        permissions: [...form.permissions, perm],
      });
    }
  };

  const handleSubmit = async () => {
    const { name, username, email, password, phone, loginType, permissions } = form;

    if (!name || !username || !email || !password || !phone || !loginType) {
      toast.error("All fields required");
      return;
    }

    const usernm = username.replace(/\s+/g, "").toLowerCase();

    const payload = {
      name,
      username: usernm,
      email,
      password,
      phone,
      loginType,
      permission: permissions,
    };

    const res = await dispatch(addStaff(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Staff Created");
      navigate("/admin/staff");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Add Sub Staff
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create and manage staff permissions
          </p>
        </div>

        <Button variant="secondary">
          <Pencil size={16} className="mr-2" />
          Draft
        </Button>
      </div>

      {/* FORM CARD */}
      <Card className="p-5 md:p-6 space-y-6 shadow-sm">

        {/* INPUT GRID */}
        <div className="grid md:grid-cols-2 gap-4">

          <Input
            label="Full Name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input
            label="Username"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />

          <Input
            label="Email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Input
            label="Phone"
            placeholder="Enter phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <Select
            label="Login Type"
            value={form.loginType}
            onChange={(e) => handleChange("loginType", e.target.value)}
            options={[
              { label: "Select", value: "" },
              { label: "Sub Admin", value: "SUBADMIN" },
              { label: "Delivery", value: "DELIVERY" },
            ]}
          />

        </div>

        {/* PERMISSIONS */}
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
            Permissions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {permissionsList.map((perm, i) => {
              const active = form.permissions.includes(perm);

              return (
                <div
                  key={i}
                  onClick={() => togglePermission(perm)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all duration-200
                  ${active
                      ? "bg-primary text-white border-primary shadow"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{perm}</span>

                    {active && (
                      <span className="text-xs bg-white text-primary px-2 py-0.5 rounded">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">

          <Button variant="secondary">
            <Trash2 size={16} className="mr-2" />
            Reset
          </Button>

          <Button onClick={handleSubmit}>
            Create Staff
          </Button>

        </div>

      </Card>
    </div>
  );
};

export default AddSubStaff;