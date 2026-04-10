import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../store/slices/itemSlice";

const Items = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);

  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "",
    gst: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.unit || !form.gst) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      await dispatch(updateItem({ id: editId, data: form }));
    } else {
      await dispatch(addItem(form));
    }

    dispatch(fetchItems());
    setForm({ name: "", price: "", unit: "", gst: "" });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);

    // scroll to form (mobile UX 🔥)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (confirm("Delete item?")) {
      dispatch(deleteItem(id));
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Items
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your items list
        </p>
      </div>

      {/* FORM FIRST (MOBILE PRIORITY) */}
      <Card className="p-4 space-y-4 shadow-sm">

        <h2 className="font-semibold text-gray-800 dark:text-white">
          {editId ? "Edit Item" : "Add Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <Input
            label="Item Name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price"
              placeholder="₹"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <Input
              label="Unit"
              placeholder="kg / pcs"
              value={form.unit}
              onChange={(e) =>
                setForm({ ...form, unit: e.target.value })
              }
            />
          </div>

          <Input
            label="GST (%)"
            placeholder="Enter GST"
            value={form.gst}
            onChange={(e) =>
              setForm({ ...form, gst: e.target.value })
            }
          />

          <div className="flex gap-2 pt-2">
            {editId && (
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setForm({
                    name: "",
                    price: "",
                    unit: "",
                    gst: "",
                  });
                  setEditId(null);
                }}
              >
                Cancel
              </Button>
            )}

            <Button className="w-full">
              {editId ? "Update Item" : "Add Item"}
            </Button>
          </div>

        </form>
      </Card>

      {/* MOBILE LIST */}
      <div className="space-y-3 md:hidden">
        {items.map((item, i) => (
          <Card
            key={item._id}
            className="p-4 space-y-3 shadow-sm"
          >

            {/* TOP */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800 dark:text-white">
                {item.name}
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

            {/* DETAILS */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>💰 Price: ₹{item.price}</p>
              <p>📦 Unit: {item.unit}</p>
              <p>🧾 GST: {item.gst}%</p>
            </div>

          </Card>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table
          columns={[
            { header: "Name", accessor: "name" },
            {
              header: "Price",
              render: (row) => `₹${row.price}`,
            },
            { header: "Unit", accessor: "unit" },
            {
              header: "GST",
              render: (row) => `${row.gst}%`,
            },
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
          data={items}
        />
      </Card>

    </div>
  );
};

export default Items;