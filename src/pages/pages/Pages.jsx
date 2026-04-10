import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPages,
  addPage,
  updatePage,
} from "../../store/slices/pagesSlice";

const Pages = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state) => state.pages);

  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchPages());
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (form.file) formData.append("file", form.file);

    if (editId) {
      await dispatch(updatePage({ id: editId, formData }));
    } else {
      await dispatch(addPage(formData));
    }

    setForm({ title: "", description: "", file: null });
    setEditId(null);
    dispatch(fetchPages());
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      file: null,
    });
    setEditId(item._id);

    window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 UX
  };

 return (
  <div className="p-4 md:p-6 pb-24 space-y-6">

    {/* HEADER */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Pages
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Manage static content pages
      </p>
    </div>

    {/* ✅ FORM (ONLY ONE TIME) */}
    <Card className="p-4 space-y-4 shadow-sm">

      <h2 className="font-semibold text-gray-800 dark:text-white">
        {editId ? "Edit Page" : "Add Page"}
      </h2>

      <Input
        label="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        rows={4}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
      />

      <Input
        type="file"
        onChange={(e) =>
          setForm({ ...form, file: e.target.files[0] })
        }
      />

      <div className="flex gap-2">
        {editId && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setEditId(null);
              setForm({ title: "", description: "", file: null });
            }}
          >
            Cancel
          </Button>
        )}

        <Button className="w-full" onClick={handleSubmit}>
          {editId ? "Update" : "Submit"}
        </Button>
      </div>

    </Card>

    {/* 📱 MOBILE LIST */}
    <div className="space-y-3 md:hidden">
      {data.map((item) => (
        <Card key={item._id} className="p-4 space-y-3 shadow-sm">
          <div className="flex justify-between">
            <p className="font-medium">{item.title}</p>
            <Button size="icon" onClick={() => handleEdit(item)}>
            < Pencil size={14}/>
            </Button>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </Card>
      ))}
    </div>

    {/* 💻 DESKTOP LIST ONLY */}
    <div className="hidden md:block">
      <Card className="p-4 space-y-3">
        <h2 className="font-semibold">Pages List</h2>

        {data.map((item) => (
          <div
            key={item._id}
            className="flex justify-between p-3 border rounded-xl"
          >
            <p>{item.title}</p>

            <Button size="icon" onClick={() => handleEdit(item)}>
                < Pencil size={14}/>
            </Button>
          </div>
        ))}
      </Card>
    </div>

  </div>
);
};

export default Pages;