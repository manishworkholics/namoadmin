import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
} from "../../store/storeSlice";

const Store = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.store);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
  });

  // 🔥 load stores
  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  // 🔥 submit
  const handleSubmit = () => {
    if (!form.name) {
      alert("Store name required");
      return;
    }

    if (editId) {
      dispatch(updateStore({ id: editId, data: form }));
    } else {
      dispatch(createStore(form));
    }

    setForm({
      name: "",
      city: "",
      address: "",
    });

    setEditId(null);
  };

  // 🔥 edit
  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name,
      city: item.city,
      address: item.address,
    });
  };

  // 🔥 delete
  const handleDelete = (id) => {
    if (confirm("Delete store?")) {
      dispatch(deleteStore(id));
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Store Management</h1>
        <p className="text-sm text-gray-500">
          Manage all store branches
        </p>
      </div>

      {/* FORM */}
      <Card className="space-y-4">

        <Input
          label="Store Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Enter store name"
        />

        <Input
          label="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          placeholder="Enter city"
        />

        <Input
          label="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          placeholder="Enter address"
        />

        <Button className="w-full" onClick={handleSubmit}>
          {loading ? "Saving..." : editId ? "Update Store" : "Add Store"}
        </Button>

      </Card>

      {/* LIST */}
      <div className="space-y-3">
        {list?.map((item) => (
          <Card
            key={item._id}
            className="flex justify-between items-center p-3"
          >

            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-gray-500">
                {item.city}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" onClick={() => handleEdit(item)}>
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

          </Card>
        ))}
      </div>

    </div>
  );
};

export default Store;