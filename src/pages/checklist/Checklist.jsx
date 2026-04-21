import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Plus,
  Send,
  Store,
  Trash2,
  UserCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import {
  assignChecklist,
  createChecklistTemplate,
  deleteChecklist,
  getChecklists,
} from "../../store/slices/checklistSlice";
import { getStores } from "../../store/slices/storeSlice";

const roleOptions = [
  { value: "STAFF", label: "Chef" },
  { value: "MANAGER", label: "Manager" },
  { value: "FLOOR_MANAGER", label: "Floor Manager" },
];

const emptyTemplateForm = {
  title: "",
  tasks: [""],
};

const emptyAssignForm = {
  checklistId: "",
  role: "",
  branch: "",
};

const Checklist = () => {
  const dispatch = useDispatch();
  const { loading, list, templates, error } = useSelector(
    (state) => state.checklist
  );
  const { list: storeList } = useSelector((state) => state.store);

  const [templateForm, setTemplateForm] = useState(emptyTemplateForm);
  const [assignForm, setAssignForm] = useState(emptyAssignForm);

  useEffect(() => {
    dispatch(getStores());
    dispatch(getChecklists());
  }, [dispatch]);

  const storeMap = useMemo(
    () =>
      Object.fromEntries(
        (storeList || []).map((store) => [store._id, store.name || "Branch"])
      ),
    [storeList]
  );

  const selectedTemplate = templates.find(
    (item) => item._id === assignForm.checklistId
  );

  const stats = {
    templates: templates.length,
    assigned: list.length,
    branches: new Set(list.map((item) => item.storeId).filter(Boolean)).size,
  };

  const addTask = () => {
    setTemplateForm((prev) => ({
      ...prev,
      tasks: [...prev.tasks, ""],
    }));
  };

  const updateTask = (value, index) => {
    setTemplateForm((prev) => {
      const nextTasks = [...prev.tasks];
      nextTasks[index] = value;

      return {
        ...prev,
        tasks: nextTasks,
      };
    });
  };

  const removeTask = (index) => {
    setTemplateForm((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const handleCreateTemplate = () => {
    const filteredTasks = templateForm.tasks
      .map((task) => task.trim())
      .filter(Boolean);

    if (!templateForm.title.trim()) {
      alert("Checklist title required hai.");
      return;
    }

    if (filteredTasks.length === 0) {
      alert("Kam se kam ek task add kariye.");
      return;
    }

    dispatch(
      createChecklistTemplate({
        title: templateForm.title.trim(),
        tasks: filteredTasks,
      })
    );

    setTemplateForm(emptyTemplateForm);
  };

  const handleAssignChecklist = () => {
    if (!assignForm.checklistId || !assignForm.role || !assignForm.branch) {
      alert("Checklist, role aur branch select kariye.");
      return;
    }

    dispatch(assignChecklist(assignForm)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(getChecklists());
      }
    });
    setAssignForm(emptyAssignForm);
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm("Assigned checklist delete karna hai?")) {
      dispatch(deleteChecklist(id));
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
            Checklist Workflow
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            Checklist Master
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
           Create a checklist once, then assign the same saved checklist to any branch or role.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Templates
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {stats.templates}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Assignments
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {stats.assigned}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Branches
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {stats.branches}
            </p>
          </Card>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {typeof error === "string" ? error : "Something went wrong."}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-0 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-primary dark:bg-orange-500/10">
                <ClipboardList size={22} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create Checklist Template
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                 The Russable checklist will be saved. You can assign it as many times as you want.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <Input
              label="Checklist Title"
              value={templateForm.title}
              onChange={(e) =>
                setTemplateForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Jaise Opening Kitchen Checklist"
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Tasks
                </p>
                <button
                  type="button"
                  onClick={addTask}
                  className="text-sm font-medium text-primary"
                >
                  + Add Task
                </button>
              </div>

              {templateForm.tasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={task}
                    onChange={(e) => updateTask(e.target.value, index)}
                    placeholder={`Task ${index + 1}`}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />

                  {templateForm.tasks.length > 1 && (
                    <Button
                      variant="danger"
                      size="icon"
                      onClick={() => removeTask(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button className="w-full" onClick={handleCreateTemplate}>
              <Plus size={16} />
              {loading ? "Saving..." : "Save Checklist Template"}
            </Button>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                <Send size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Assign Saved Checklist
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                 Select the existing checklist and assign it to the direct branch and role.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Saved Checklist
              </label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                value={assignForm.checklistId}
                onChange={(e) =>
                  setAssignForm((prev) => ({
                    ...prev,
                    checklistId: e.target.value,
                  }))
                }
              >
                <option value="">Select Checklist</option>
                {templates.map((template) => (
                  <option key={template._id} value={template._id}>
                    {template.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  value={assignForm.role}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Branch
                </label>
                <select
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  value={assignForm.branch}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      branch: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Branch</option>
                  {storeList?.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedTemplate && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedTemplate.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Selected template preview
                    </p>
                  </div>
                  <Badge text={`${selectedTemplate.tasks.length} Tasks`} type="info" />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedTemplate.tasks.map((task, index) => (
                    <span
                      key={`${selectedTemplate._id}-${index}`}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button className="w-full" onClick={handleAssignChecklist}>
              <UserCheck size={16} />
              {loading ? "Assigning..." : "Assign Checklist"}
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-0 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Saved Checklist Templates
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            These templates are ready for future assignments.
            </p>
          </div>

          <div className="space-y-3 p-4">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div
                  key={template._id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {template.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {template.tasks.length} tasks saved
                      </p>
                    </div>
                    <Badge text="Reusable" type="success" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {template.tasks.map((task, index) => (
                      <span
                        key={`${template._id}-task-${index}`}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-gray-400">
                No checklist templates saved yet.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Assigned Checklists
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Branch and role wise current assignments.
            </p>
          </div>

          <div className="space-y-3 p-4">
            {list.length > 0 ? (
              list.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {item.checklistId?.title || "Untitled Checklist"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.checklistId?.description || "No task description"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge text={item.role || "Unknown Role"} type="info" />
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300">
                          <Store size={12} />
                          {storeMap[item.storeId] || "Unknown Branch"}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteAssignment(item._id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-gray-400">
                No checklist assignments found.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checklist;
