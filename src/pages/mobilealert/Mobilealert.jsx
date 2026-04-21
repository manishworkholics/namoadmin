import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchMobileAlerts,
  addMobileAlert,
  updateMobileAlert,
  deleteMobileAlert,
} from "../../store/slices/mobileAlertSlice";

const Mobilealert = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector(
    (state) => state.mobileAlert || { data: [] }
  );

  const [form, setForm] = useState({
    title: "",
    number: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchMobileAlerts());
  }, [dispatch]);

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!form.title || !form.number) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      await dispatch(updateMobileAlert({ id: editId, data: form }));
      alert("Updated");
    } else {
      await dispatch(addMobileAlert(form));
      alert("Added");
    }

    setForm({ title: "", number: "" });
    setEditId(null);
    dispatch(fetchMobileAlerts());
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setForm({
      title: item.title,
      number: item.number,
    });
    setEditId(item._id);
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    if (window.confirm("Delete?")) {
      dispatch(deleteMobileAlert(id));
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Mobile Alerts</h1>
        <p className="text-sm text-gray-500">Manage contact numbers</p>
      </div>

      {/* MOBILE */}
      <div className="space-y-3 md:hidden">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl">

            <p>{item.title}</p>
            <p className="text-sm">{item.number}</p>

            <div className="flex gap-2 mt-2">

              <Button onClick={() => handleEdit(item)}>
                <Pencil size={14} /> Edit
              </Button>

              <Button
                variant="danger"
                onClick={() => handleDelete(item._id)}
              >
                <Trash2 size={14} /> Delete
              </Button>

            </div>

          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid md:grid-cols-2 gap-5">

        <Card>
          <h2 className="mb-3">Contact Numbers</h2>

          <Table
            columns={[
              { header: "Title", accessor: "title" },
              { header: "Number", accessor: "number" },

              {
                header: "Action",
                render: (row) => (
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(row)}>
                      <Pencil size={14} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(row._id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ),
              },
            ]}
            data={data}
          />
        </Card>

        <Card>
          <h2 className="mb-3">
            {editId ? "Edit Contact" : "Add Contact"}
          </h2>

          <div className="space-y-3">

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Input
              placeholder="Mobile Number"
              value={form.number}
              onChange={(e) =>
                setForm({ ...form, number: e.target.value })
              }
            />

            <Button onClick={handleSubmit}>
              {editId ? "Update" : "Submit"}
            </Button>

          </div>
        </Card>

      </div>

      {/* MOBILE FORM */}
      <Card className="md:hidden">
        <h2 className="mb-3">
          {editId ? "Edit Contact" : "Add Contact"}
        </h2>

        <div className="space-y-3">

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Input
            placeholder="Mobile Number"
            value={form.number}
            onChange={(e) =>
              setForm({ ...form, number: e.target.value })
            }
          />

          <Button onClick={handleSubmit}>
            {editId ? "Update" : "Submit"}
          </Button>

        </div>
      </Card>

    </div>
  );
};

export default Mobilealert;
