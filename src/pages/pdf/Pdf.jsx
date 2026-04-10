import React, { useState, useEffect, useRef } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPdf,
  addPdf,
  updatePdf,
  deletePdf,
} from "../../store/slices/pdfSlice";

const Pdf = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state) => state.pdf);

  const [pdftype, setpdftype] = useState("");
  const [title, settitle] = useState("");
  const [image, setImage] = useState(null);
  const [documentTo, setdocumentTo] = useState("");

  const [isEditClick, setisEditClick] = useState(false);
  const [editId, seteditId] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPdf());
  }, []);

  const resetForm = () => {
    settitle("");
    setpdftype("");
    setImage(null);
    setdocumentTo("");
    setisEditClick(false);
    seteditId("");
    if (inputRef.current) inputRef.current.value = null;
  };

  const handleSubmit = async () => {
    if (!pdftype || !title || !documentTo) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("file", image);

    formData.append("pdftype", pdftype);
    formData.append("title", title);
    formData.append("documentfor_user", documentTo);

    if (isEditClick) {
      await dispatch(updatePdf({ id: editId, formData }));
    } else {
      if (!image) return alert("Select PDF");
      await dispatch(addPdf(formData));
    }

    resetForm();
    dispatch(fetchPdf());
  };

  const handleEdit = (item) => {
    setisEditClick(true);
    seteditId(item._id);
    setpdftype(item.pdftype);
    settitle(item.title);
    setdocumentTo(item.documentfor_user || "ALL");

    window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 UX
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this PDF?")) {
      dispatch(deletePdf(id));
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          PDF Manager
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload & manage documents
        </p>
      </div>

      {/* FORM FIRST (MOBILE PRIORITY) */}
      <Card className="p-4 space-y-4 shadow-sm">

        <h2 className="font-semibold text-gray-800 dark:text-white">
          {isEditClick ? "Edit PDF" : "Upload PDF"}
        </h2>

        <Input
          label="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Enter title"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={pdftype}
            onChange={(e) => setpdftype(e.target.value)}
            className="p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
          >
            <option value="">Type</option>
            <option value="Documents">Documents</option>
            <option value="Manual">Manual</option>
          </select>

          <select
            value={documentTo}
            onChange={(e) => setdocumentTo(e.target.value)}
            className="p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
          >
            <option value="">Send To</option>
            <option value="ALL">All</option>
            <option value="SUBADMIN">Sub Staff</option>
          </select>
        </div>

        <Input type="file" ref={inputRef} onChange={(e) => setImage(e.target.files[0])} />

        <div className="flex gap-2">
          {isEditClick && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            {isEditClick ? "Update" : "Upload"}
          </Button>
        </div>

      </Card>

      {/* MOBILE LIST */}
      <div className="space-y-3 md:hidden">
        {data.map((item) => (
          <Card key={item._id} className="p-4 space-y-3 shadow-sm">

            {/* TOP */}
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-800 dark:text-white">
                {item.title}
              </p>

              <Badge text={item.pdftype} />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <Button
                size="icon"
                onClick={() => window.open(item.fileurl)}
              >
                <Eye size={16} />
              </Button>

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

          </Card>
        ))}
      </div>

      {/* DESKTOP */}
      <Card className="hidden md:block p-4 space-y-3">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center p-3 rounded-xl border dark:border-gray-700"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.pdftype}</p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" onClick={() => window.open(item.fileurl)}>
                <Eye size={16} />
              </Button>

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
          </div>
        ))}
      </Card>

    </div>
  );
};

export default Pdf;