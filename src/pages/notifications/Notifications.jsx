import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} from "../../store/slices/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state) => state.notification);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (editId) {
      await dispatch(updateNotification({ id: editId, formData }));
    } else {
      await dispatch(addNotification(formData));
    }

    setForm({ title: "", description: "" });
    setEditId(null);
    dispatch(fetchNotifications());
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.desc,
    });
    setEditId(item._id);

    window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 UX
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this notification?")) {
      dispatch(deleteNotification(id));
    }
  };

  const formattedData = data.map((item) => ({
    _id: item._id,
    title: item.title,
    desc: item.description,
    date: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Notifications
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage alerts & messages
        </p>
      </div>

      {/* 🔥 FORM FIRST */}
      <Card className="p-4 space-y-4 shadow-sm">

        <h2 className="font-semibold text-gray-800 dark:text-white">
          {editId ? "Edit Notification" : "Add Notification"}
        </h2>

        <Input
          label="Title"
          placeholder="Enter title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Description
          </label>

          <textarea
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full mt-1 p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
          />
        </div>

        <div className="flex gap-2">
          {editId && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setEditId(null);
                setForm({ title: "", description: "" });
              }}
            >
              Cancel
            </Button>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </Button>
        </div>

      </Card>

      {/* 📱 MOBILE LIST */}
      <div className="space-y-3 md:hidden">
        {formattedData.map((item) => (
          <Card key={item._id} className="p-4 space-y-3 shadow-sm">

            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-800 dark:text-white">
                {item.title}
              </p>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil size={16} />
                </Button>

                <Button
                  size="icon"
                  variant="danger"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {item.desc}
            </p>

            <p className="text-xs text-gray-400">
              {item.date}
            </p>

          </Card>
        ))}
      </div>

      {/* 💻 DESKTOP TABLE */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table
          columns={[
            { header: "#", render: (_, i) => i + 1 },
            { header: "Title", accessor: "title" },
            {
              header: "Description",
              render: (row) => (
                <p className="truncate max-w-xs">{row.desc}</p>
              ),
            },
            { header: "Date", accessor: "date" },
            {
              header: "Action",
              render: (row) => (
                <div className="flex gap-2">
                  <Button size="icon" onClick={() => handleEdit(row)}>
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="danger"
                    onClick={() => handleDelete(row._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ),
            },
          ]}
          data={formattedData}
        />
      </Card>

    </div>
  );
};

export default Notifications;