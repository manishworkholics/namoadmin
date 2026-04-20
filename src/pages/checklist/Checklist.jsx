import { useState, useEffect } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  createChecklist,
  getChecklists,
  deleteChecklist,
} from "../../store/slices/checklistSlice";
import { getStores } from "../../store/slices/storeSlice";

const Checklist = () => {
  const dispatch = useDispatch();
  const { loading, success, list } = useSelector((s) => s.checklist);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    role: "",
    branch: "",
    tasks: [""],
  });

  const { list: storeList } = useSelector((s) => s.store);

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);



  // 🔥 LOAD LIST
  useEffect(() => {
    dispatch(getChecklists());
  }, [dispatch, success]);

  // 🔥 SUBMIT
  const handleSubmit = () => {
    if (!form.title || !form.role || !form.branch) {
      alert("Please fill all fields");
      return;
    }

    const filteredTasks = form.tasks.filter((t) => t.trim() !== "");

    if (filteredTasks.length === 0) {
      alert("Add at least one task");
      return;
    }

    dispatch(
      createChecklist({
        ...form,
        tasks: filteredTasks,
        branch: form.branch, // ✅ already storeId
      })
    );

    setEditId(null);
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      title: item.checklistId?.title || "",
      role: item.role,
      branch:
        Object.keys(storeMap).find(
          (k) => storeMap[k] === item.storeId
        ) || "",
      tasks: item.checklistId?.description?.split(", ") || [""],
    });
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    if (confirm("Delete this checklist?")) {
      dispatch(deleteChecklist(id));
    }
  };

  // add task
  const addTask = () => {
    setForm({ ...form, tasks: [...form.tasks, ""] });
  };

  // remove task
  const removeTask = (index) => {
    const updated = form.tasks.filter((_, i) => i !== index);
    setForm({ ...form, tasks: updated });
  };

  // update task
  const updateTask = (value, index) => {
    const updated = [...form.tasks];
    updated[index] = value;
    setForm({ ...form, tasks: updated });
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Checklist Master</h1>
        <p className="text-sm text-gray-500">
          Create & manage daily checklists
        </p>
      </div>

      {/* FORM */}
      <Card className="space-y-4">

        {/* TITLE */}
        <Input
          label="Checklist Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Enter checklist name"
        />

        {/* ROLE */}
        <select
          className="w-full p-3 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="">Select Role</option>
          <option value="STAFF">Chef</option>
          <option value="MANAGER">Manager</option>
          <option value="MANAGER">Floor Manager</option>
        </select>

        {/* BRANCH */}
        <select
          className="w-full p-3 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700"
          value={form.branch}
          onChange={(e) =>
            setForm({ ...form, branch: e.target.value })
          }
        >
          <option value="">Select Branch</option>

          {storeList?.map((store) => (
            <option key={store._id} value={store._id}>
              {store.name}
            </option>
          ))}

        </select>

        {/* TASKS */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Tasks</p>

          {form.tasks.map((task, i) => (
            <div key={i} className="flex gap-2">

              <input
                value={task}
                onChange={(e) => updateTask(e.target.value, i)}
                placeholder={`Task ${i + 1}`}
                className="flex-1 p-3 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700"
              />

              {form.tasks.length > 1 && (
                <Button
                  variant="danger"
                  size="icon"
                  onClick={() => removeTask(i)}
                >
                  <Trash2 size={16} />
                </Button>
              )}

            </div>
          ))}

          <Button
            variant="secondary"
            onClick={addTask}
            className="w-full"
          >
            <Plus size={16} /> Add Task
          </Button>

        </div>

        {/* SUBMIT */}
        <Button className="w-full" onClick={handleSubmit}>
          {loading ? "Saving..." : editId ? "Update Checklist" : "Save Checklist"}
        </Button>

      </Card>

      {/* 🔥 LIST (UI SAME STYLE) */}
      <div className="space-y-3">
        {list?.map((item) => (
          <Card key={item._id} className="flex justify-between items-center p-3">

            <div>
              <p className="font-semibold">
                {item.checklistId?.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.role}
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

export default Checklist;