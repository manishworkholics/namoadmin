import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Pencil, Trash2, Users, UserCheck, UserX } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import {
  fetchAppUsers,
  updateUserStatus,
  deleteAppUser,
  createAppUser,
  updateAppUser,
} from "../../store/slices/appUserSlice";

const initialForm = {
  name: "",
  username: "",
  phone: "",
  password: "",
  role: "STAFF",
};

const AppUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.appUser);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    dispatch(fetchAppUsers());
  }, [dispatch]);

  const activeUsers = users.filter(
    (user) => Number(user.enable_disable_order) === 1
  ).length;
  const inactiveUsers = users.length - activeUsers;

  const openCreateForm = () => {
    setEditId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(initialForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.username || !form.phone) {
      alert("Please fill name, username and phone.");
      return;
    }

    if (!editId && !form.password) {
      alert("Please enter password for new user.");
      return;
    }

    if (editId) {
      const payload = {
        name: form.name,
        username: form.username,
        phone: form.phone,
        role: form.role,
      };

      dispatch(updateAppUser({ id: editId, data: payload }));
    } else {
      dispatch(createAppUser(form));
    }

    closeForm();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      username: item.username || "",
      phone: item.phone || "",
      password: "",
      role: item.role || "STAFF",
    });
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) {
      dispatch(deleteAppUser(id));
    }
  };

  const handleStatus = (id, e) => {
    dispatch(updateUserStatus({ id, value: Number(e.target.value) }));
  };

  const summaryCards = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      tone: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      tone: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      tone: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300",
    },
  ];

  const tableData = users.map((user, index) => ({
    index: index + 1,
    id: user._id,
    name: user.name || "-",
    username: user.username || "-",
    phone: user.phone || "-",
    role: user.role || "STAFF",
    statusValue: Number(user.enable_disable_order) || 2,
    statusLabel:
      Number(user.enable_disable_order) === 1 ? "Active" : "Inactive",
    raw: user,
  }));

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
            User Management
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            App Users
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Staff aur manager accounts yahin se create, edit aur manage kar
            sakte hain.
          </p>
        </div>

        <Button onClick={openCreateForm} className="w-full sm:w-auto shadow-sm">
          <Plus size={16} />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <Card className="overflow-hidden p-0">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editId ? "Edit User" : "Create New User"}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Basic account details fill karke save kar dijiye.
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </span>
              <input
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Username
              </span>
              <input
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone Number
              </span>
              <input
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Role
              </span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="STAFF">STAFF</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </label>

            {!editId && (
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </label>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end dark:border-gray-800">
            <Button variant="secondary" onClick={closeForm} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              {editId ? "Update User" : "Create User"}
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              User List
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              App access  accounts  current list.
            </p>
          </div>

          {loading && (
            <span className="text-sm font-medium text-primary">
              Loading users...
            </span>
          )}
        </div>

        {error && (
          <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-3 p-4 md:hidden">
          {tableData.length > 0 ? (
            tableData.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      @{item.username}
                    </p>
                  </div>

                  <Badge
                    text={item.statusLabel}
                    type={item.statusLabel === "Active" ? "success" : "warning"}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Role</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <select
                    value={item.statusValue}
                    onChange={(e) => handleStatus(item.id, e)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    <option value={1}>Active</option>
                    <option value={2}>Inactive</option>
                  </select>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(item.raw)}
                  >
                    <Pencil size={14} />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="flex-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-gray-400">
              No users found
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <Table
            columns={[
              { header: "#", accessor: "index" },
              { header: "Name", accessor: "name" },
              { header: "Username", accessor: "username" },
              { header: "Phone", accessor: "phone" },
              {
                header: "Role",
                render: (row) => <Badge text={row.role} type="info" />,
              },
              {
                header: "Status",
                render: (row) => (
                  <select
                    value={row.statusValue}
                    onChange={(e) => handleStatus(row.id, e)}
                    className="min-w-[120px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    <option value={1}>Active</option>
                    <option value={2}>Inactive</option>
                  </select>
                ),
              },
              {
                header: "Action",
                render: (row) => (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(row.raw)}>
                      <Pencil size={14} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                ),
              },
            ]}
            data={tableData}
          />
        </div>
      </Card>
    </div>
  );
};

export default AppUser;
