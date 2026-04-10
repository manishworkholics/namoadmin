import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Checklist = () => {
  const [form, setForm] = useState({
    title: "",
    role: "",
    branch: "",
    tasks: [""],
  });

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
          <option>Chef</option>
          <option>Manager</option>
          <option>Floor Manager</option>
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
          <option>Indore</option>
          <option>Bhopal</option>
          <option>Ujjain</option>
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
        <Button className="w-full">
          Save Checklist
        </Button>

      </Card>

    </div>
  );
};

export default Checklist;