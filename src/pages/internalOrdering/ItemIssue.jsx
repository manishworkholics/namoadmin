import { ClipboardCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import PageHeader from "./components/PageHeader";
import { departments } from "./internalOrderingData";
import { fetchInventoryItems } from "../../store/slices/inventoryMasterSlice";
import { createIssue } from "../../store/slices/issueSlice";
import { getStores } from "../../store/slices/storeSlice";

const ItemIssue = () => {
  const dispatch = useDispatch();
  const { items: inventoryItems, loading: itemsLoading } = useSelector(
    (state) => state.inventoryMaster
  );
  const { createLoading, createError } = useSelector((state) => state.issue);
  const { list: stores = [], loading: storesLoading } = useSelector(
    (state) => state.store
  );

  const [form, setForm] = useState({
    store: "",
    department: "",
    quantities: {},
  });

  useEffect(() => {
    dispatch(fetchInventoryItems());
    dispatch(getStores());
  }, [dispatch]);

  const storeOptions = useMemo(
    () =>
      stores.map((store) => ({
        value: store._id,
        label: [store.name, store.city].filter(Boolean).join(" - "),
      })),
    [stores]
  );

  const departmentOptions = useMemo(
    () =>
      departments.map((department) => ({
        value: department.label,
        label: department.label,
      })),
    []
  );

  const updateQuantity = (itemId, value) => {
    setForm((prev) => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [itemId]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const selectedItems = Object.entries(form.quantities)
      .map(([itemId, quantity]) => ({
        itemId,
        quantity: Number(quantity),
      }))
      .filter((item) => item.quantity > 0);

    if (!form.store || !form.department) {
      alert("Please select store and department");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please enter quantity for at least one item");
      return;
    }

    try {
      const response = await dispatch(
        createIssue({
          storeId: form.store,
          department: form.department,
          items: selectedItems,
        })
      ).unwrap();

      alert(response?.message || "Issue created successfully");
      setForm({
        store: "",
        department: "",
        quantities: {},
      });
      dispatch(fetchInventoryItems());
    } catch (err) {
      alert(err || "Failed to create issue");
    }
  };

  return (
    <div className="space-y-5 p-4 pb-28 md:p-6">
      <PageHeader
        eyebrow="Internal Ordering"
        title="Item Issue"
        description="Create an internal issue request for a store and department."
      />

      <Card className="space-y-4 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Select Store"
            value={form.store}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, store: e.target.value }))
            }
            options={storeOptions}
            placeholder={storesLoading ? "Loading stores..." : "Choose store"}
            disabled={storesLoading}
          />
          <Select
            label="Select Department"
            value={form.department}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, department: e.target.value }))
            }
            options={departmentOptions}
            placeholder="Choose department"
          />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
              <ClipboardCheck size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Issue Checklist
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter quantity only for the items needed.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {itemsLoading && (
            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Loading inventory items...
            </div>
          )}

          {inventoryItems.map((item) => (
            <div
              key={item._id}
              className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_160px] sm:items-center"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Available stock: {item.stock} {item.unit}
                </p>
              </div>

              <Input
                type="number"
                placeholder="Qty"
                value={form.quantities[item._id] || ""}
                onChange={(e) => updateQuantity(item._id, e.target.value)}
              />
            </div>
          ))}

          {!itemsLoading && inventoryItems.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No inventory items available.
            </div>
          )}
        </div>
      </Card>

      {createError && (
        <Card className="p-4 text-sm text-red-600 dark:text-red-300">
          {createError}
        </Card>
      )}

      <div className="sticky bottom-0 -mx-4 border-t border-gray-100 bg-white/95 p-4 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none dark:border-gray-800 dark:bg-gray-950/95 md:dark:bg-transparent">
        <Button className="w-full md:ml-auto md:w-auto" onClick={handleSubmit}>
          {createLoading ? "Submitting..." : "Submit Issue"}
        </Button>
      </div>
    </div>
  );
};

export default ItemIssue;
