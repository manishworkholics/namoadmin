import React, { useEffect, useState } from "react";
import { Pencil, Plus, FileText, BookOpen, X } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";

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
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
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

    resetForm();
    dispatch(fetchPages());
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      file: null,
    });
    setEditId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({ title: "", description: "", file: null });
    setEditId(null);
    setErrors({});
    setShowForm(false);
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 pb-24">
      
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pages Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage and organize your static content pages
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            {showForm ? "Cancel" : "New Page"}
          </Button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Pages
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {data.length}
              </p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Published
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {data.filter(p => p.status === 'published').length}
              </p>
            </div>
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FileText className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Drafts
              </p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">
                {data.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <FileText className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <Card className="p-6 shadow-lg border-0 mb-8 bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editId ? "Edit Page" : "Create New Page"}
            </h2>
            <button
              onClick={resetForm}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Title Input */}
            <div>
              <Input
                label="Page Title"
                placeholder="Enter page title"
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: "" });
                }}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <div
                className={`rounded-lg border-2 overflow-hidden transition-colors ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-200 dark:border-slate-600"
                }`}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={form.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setForm({ ...form, description: data });
                    if (errors.description) setErrors({ ...errors, description: "" });
                  }}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "blockQuote",
                      "insertTable",
                      "|",
                      "undo",
                      "redo",
                    ],
                    heading: {
                      options: [
                        {
                          model: "paragraph",
                          title: "Paragraph",
                          class: "ck-heading_paragraph",
                        },
                        {
                          model: "heading1",
                          view: "h1",
                          title: "Heading 1",
                          class: "ck-heading_heading1",
                        },
                        {
                          model: "heading2",
                          view: "h2",
                          title: "Heading 2",
                          class: "ck-heading_heading2",
                        },
                      ],
                    },
                  }}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload File
              </label>
              <Input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, file: e.target.files[0] })
                }
              />
              {form.file && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  ✓ {form.file.name}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              {editId && (
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
              <Button 
                className="flex-1" 
                onClick={handleSubmit}
              >
                {editId ? "Update Page" : "Create Page"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block">
        <Card className="p-6 shadow-lg border-0 bg-white dark:bg-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Pages List
          </h2>

          {data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors ${
                        index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-gray-50 dark:bg-slate-800/50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        <p className="line-clamp-2">{item.description}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {item.status || "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No pages yet. Create one to get started!
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item._id}
              className="p-4 shadow-md border-0 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    {item.title}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                      item.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {item.status || "Draft"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {item.description}
                </p>

                <button
                  onClick={() => handleEdit(item)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center border-0 bg-white dark:bg-slate-800">
            <FileText size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No pages yet. Create one to get started!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pages;