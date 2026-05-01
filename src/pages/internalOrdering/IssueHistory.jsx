import { Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import EmptyState from "./components/EmptyState";
import PageHeader from "./components/PageHeader";
import { departments } from "./internalOrderingData";
import { fetchIssues } from "../../store/slices/issueSlice";

const departmentOptions = departments.map((department) => ({
  value: department.label,
  label: department.label,
}));

const statusType = {
  Approved: "success",
  Pending: "warning",
  Issued: "info",
};

const IssueHistory = () => {
  const dispatch = useDispatch();
  const { issues, loading, error } = useSelector((state) => state.issue);

  const [filters, setFilters] = useState({
    store: "",
    department: "",
  });

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const storeOptions = useMemo(() => {
    const stores = issues
      .map((entry) => entry.storeId)
      .filter((store) => store?._id);

    return Array.from(new Map(stores.map((store) => [store._id, store])).values()).map(
      (store) => ({
        value: store._id,
        label: [store.name, store.city].filter(Boolean).join(" - "),
      })
    );
  }, [issues]);

  const filteredHistory = useMemo(
    () =>
      issues.filter(
        (entry) =>
          (!filters.store || entry.storeId?._id === filters.store) &&
          (!filters.department || entry.department === filters.department)
      ),
    [filters, issues]
  );

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="space-y-5 p-4 pb-24 md:p-6">
      <PageHeader
        eyebrow="Internal Logs"
        title="Issue History"
        description="Review previous item issue requests across stores."
      />

      <Card className="space-y-4 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <Filter size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              UI only filters for store and department.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Store"
            value={filters.store}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, store: e.target.value }))
            }
            options={storeOptions}
            placeholder={loading ? "Loading stores..." : "All stores"}
            disabled={loading}
          />
          <Select
            label="Department"
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, department: e.target.value }))
            }
            options={departmentOptions}
            placeholder="All departments"
          />
        </div>
      </Card>

      {loading && (
        <Card className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading issue history...
        </Card>
      )}

      {error && (
        <Card className="p-4 text-center text-sm text-red-600 dark:text-red-300">
          {error}
        </Card>
      )}

      <div className="space-y-3">
        {filteredHistory.map((entry) => (
          <Card key={entry._id} className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {entry.storeId?.name || "Unknown Store"}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {entry.department}
                </p>
              </div>
              <Badge
                text="Issued"
                type={statusType.Issued}
              />
            </div>

            <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Items Issued
              </p>
              <div className="mt-3 space-y-2">
                {entry.items.map((item) => (
                  <div
                    key={`${entry._id}-${item.itemId?._id}`}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.itemId?.name || "Item"}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.quantity} {item.itemId?.unit || ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2 text-sm text-gray-500 sm:grid-cols-2 dark:text-gray-400">
              <p>Submitted by: {entry.issuedBy?.name || "Admin"}</p>
              <p className="sm:text-right">{formatDate(entry.createdAt)}</p>
            </div>
          </Card>
        ))}
      </div>

      {!loading && filteredHistory.length === 0 && (
        <EmptyState
          title="No issue logs found"
          description="Change the filters to see more internal issue records."
        />
      )}
    </div>
  );
};

export default IssueHistory;
