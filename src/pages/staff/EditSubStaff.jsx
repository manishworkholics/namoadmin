import { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { Trash2, Pencil } from "lucide-react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getSingleStaff, updateStaff } from "../../store/slices/staffSlice";
import { permissionMap } from "../../utils/permissionMap";
import { useNavigate } from "react-router-dom";

const EditSubStaff = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams(); // dynamic id

    const [loading, setLoading] = useState(true);

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

    // ✅ FETCH DATA (MOCK for now)
    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(getSingleStaff(id));

            if (res.meta.requestStatus === "fulfilled") {
                const data = res.payload;

                // 🔥 convert numeric → label
                const mappedPermissions = data.permission.map(
                    (p) => permissionMap[p]
                );

                setForm({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    loginType: data.loginType,
                    permissions: mappedPermissions, // ✅ FIX
                });

                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
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

    const handleUpdate = async () => {
        const payload = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            loginType: form.loginType,
            permission: form.permissions,
        };

        if (form.password) {
            payload.password = form.password;
        }

        const res = await dispatch(updateStaff({ id, data: payload }));

        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Updated Successfully");
            navigate("/admin/staff");
        }
    };

    const handleDelete = () => {
        console.log("Delete Staff:", id);
    };

    if (loading) return <Loader />;

    return (
        <div className="p-4 space-y-5 pb-24">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                        Edit Staff
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Update staff details & permissions
                    </p>
                </div>

                <Button variant="secondary" size="sm">
                    <Pencil size={14} className="mr-1" />
                    Edit Mode
                </Button>
            </div>

            {/* FORM */}
            <Card className="p-4 space-y-5">

                {/* INPUTS - MOBILE FIRST */}
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">

                    <Input
                        label="Full Name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <Input
                        label="Username"
                        value={form.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                    />

                    <Input
                        label="Email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <Input
                        label="Phone"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Leave blank to keep same"
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
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                        Permissions
                    </h2>

                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {permissionsList.map((perm, i) => {
                            const active = form.permissions.includes(perm);

                            return (
                                <div
                                    key={i}
                                    onClick={() => togglePermission(perm)}
                                    className={`p-3 rounded-xl border cursor-pointer transition-all text-sm
                  ${active
                                            ? "bg-primary text-white border-primary"
                                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                        }`}
                                >
                                    {perm}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-3 pt-4 border-t dark:border-gray-700 md:flex-row md:justify-end">

                    <Button
                        variant="secondary"
                        className="w-full md:w-auto"
                        onClick={handleDelete}
                    >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                    </Button>

                    <Button
                        className="w-full md:w-auto"
                        onClick={handleUpdate}
                    >
                        Update Staff
                    </Button>

                </div>

            </Card>
        </div>
    );
};

export default EditSubStaff;