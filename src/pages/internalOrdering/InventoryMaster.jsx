import { Search, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import EmptyState from "./components/EmptyState";
import PageHeader from "./components/PageHeader";
import {
  clearInventoryUploadResult,
  fetchInventoryItems,
  uploadInventoryItems,
} from "../../store/slices/inventoryMasterSlice";

const InventoryMaster = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const {
    items,
    pagination,
    loading,
    uploadLoading,
    error,
    uploadError,
    uploadResult,
  } = useSelector((state) => state.inventoryMaster);

  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchInventoryItems());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return items;

    return items.filter((item) =>
      [item.name, item.category, item.unit].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query)
      )
    );
  }, [items, search]);

  const handleFileChange = (event) => {
    dispatch(clearInventoryUploadResult());
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an Excel or CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await dispatch(uploadInventoryItems(formData)).unwrap();
      alert(response?.message || "Items uploaded successfully");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      dispatch(fetchInventoryItems());
    } catch (err) {
      alert(err || "Failed to upload inventory sheet");
    }
  };

  return (
    <div className="space-y-5 p-4 pb-24 md:p-6">
      <PageHeader
        eyebrow="Internal Inventory"
        title="Inventory Master"
        description="Upload stock sheets and review internal inventory items."
      />

      <Card className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-primary dark:bg-orange-500/10">
            <Upload size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Upload Excel File
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select an inventory sheet and sync it with inventory master.
            </p>
          </div>
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center transition hover:border-primary/60 dark:border-gray-800 dark:bg-gray-900/60">
          <Upload className="text-primary" size={22} />
          <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Choose Excel file
          </span>
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {selectedFile ? selectedFile.name : "XLS, XLSX, or CSV"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xls,.xlsx,.csv"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploadLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={16} />
            {uploadLoading ? "Uploading..." : "Upload Inventory"}
          </button>

          {uploadResult?.data && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Inserted: {uploadResult.data.inserted || 0} | Updated:{" "}
              {uploadResult.data.updated || 0} | Matched:{" "}
              {uploadResult.data.matched || 0}
            </p>
          )}
        </div>

        {uploadError && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-300">
            {uploadError}
          </p>
        )}
      </Card>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          placeholder="Search item, category, or unit"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pl-10 text-sm text-gray-800 outline-none transition focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item._id} className="space-y-4 p-4" hover>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.category}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {item.unit}
              </span>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Current Stock
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {item.stock}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {loading && (
        <Card className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading inventory items...
        </Card>
      )}

      {error && (
        <Card className="p-4 text-center text-sm text-red-600 dark:text-red-300">
          {error}
        </Card>
      )}

      {!loading && filteredItems.length === 0 && (
        <EmptyState
          title="No inventory items found"
          description="Try a different search term or upload a fresh inventory sheet."
        />
      )}

      {pagination?.total > 0 && (
        <p className="text-center text-xs text-gray-400">
          Showing {filteredItems.length} of {pagination.total} inventory items
        </p>
      )}
    </div>
  );
};

export default InventoryMaster;
