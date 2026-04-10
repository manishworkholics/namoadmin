import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import { fetchQr, updateQr } from "../../store/slices/qrSlice";

const Qr = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.qr);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔥 LOAD EXISTING QR
  useEffect(() => {
    dispatch(fetchQr());
  }, [dispatch]);

  // 🔥 SET PREVIEW FROM API
  useEffect(() => {
    if (data?.imageurl) {
      setPreview(data.imageurl);
    }
  }, [data]);

  // 🔥 FILE CHANGE
  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await dispatch(updateQr(formData));
    alert("QR Updated");

    dispatch(fetchQr());
  };

  return (
    <div className="p-4 pb-24 flex justify-center">

      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm space-y-4">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-bold">Update QR Code</h1>
          <p className="text-sm text-gray-500">Upload new QR image</p>
        </div>

        {/* PREVIEW */}
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="QR Preview"
              className="w-40 h-40 object-contain border rounded-lg"
            />
          </div>
        )}

        {/* UPLOAD */}
        <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">

          <Upload className="mb-2 text-gray-400" />

          <p className="text-sm text-gray-500">
            Click to upload QR Code
          </p>

          <Input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-3 rounded-xl"
        >
          Submit
        </button>

      </div>

    </div>
  );
};

export default Qr;