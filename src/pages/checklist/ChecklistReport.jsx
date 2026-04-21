import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  LoaderCircle,
  RotateCw,
  Store,
  TimerReset,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { getStores } from "../../store/slices/storeSlice";
import { getChecklistReport } from "../../store/slices/checklistSlice";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ChecklistReport = () => {
  const dispatch = useDispatch();
  const { list: storeList } = useSelector((state) => state.store);
  const { report, reportLoading, reportError } = useSelector(
    (state) => state.checklist
  );

  const [filters, setFilters] = useState({
    date: getTodayDate(),
    branch: "",
  });

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const effectiveBranch = filters.branch || storeList[0]?._id || "";

  useEffect(() => {
    if (effectiveBranch && filters.date) {
      dispatch(
        getChecklistReport({
          storeId: effectiveBranch,
          date: filters.date,
        })
      );
    }
  }, [dispatch, effectiveBranch, filters.date]);

  const summary = report?.summary || {
    totalTasks: 0,
    completed: 0,
    pending: 0,
    completionPercent: 0,
  };
  const branchPerformance = report?.branchPerformance || [];
  const reportData = report?.data || [];
  const pendingPercent = Math.max(0, 100 - (summary.completionPercent || 0));

  const selectedStoreName = useMemo(
    () =>
      storeList.find((store) => store._id === effectiveBranch)?.name ||
      "Selected Branch",
    [effectiveBranch, storeList]
  );

  const stats = [
    {
      title: "Total Tasks",
      value: summary.totalTasks || 0,
      icon: ClipboardList,
      tone: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300",
    },
    {
      title: "Completed",
      value: summary.completed || 0,
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
    },
    {
      title: "Pending",
      value: summary.pending || 0,
      icon: TimerReset,
      tone: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300",
    },
    {
      title: "Completion %",
      value: `${summary.completionPercent || 0}%`,
      icon: BarChart3,
      tone: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
    },
  ];

  const handleRefresh = () => {
    if (effectiveBranch && filters.date) {
      dispatch(
        getChecklistReport({
          storeId: effectiveBranch,
          date: filters.date,
        })
      );
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
            Performance Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            Checklist Report
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
           Track branch wise checklist completion by date.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={handleRefresh}
          className="w-full sm:w-auto"
        >
          <RotateCw size={16} />
          Refresh Report
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid gap-4 border-b border-gray-100 px-5 py-4 md:grid-cols-[1fr_1fr_auto] dark:border-gray-800">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Report Date
            </label>
            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                value={filters.date}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Branch
            </label>
            <div className="relative">
              <Store
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={effectiveBranch}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    branch: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="">Select Branch</option>
                {storeList.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <div className="w-full rounded-2xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-900/70">
              <p className="text-gray-500 dark:text-gray-400">Current View</p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {selectedStoreName}
              </p>
            </div>
          </div>
        </div>

        {reportError && (
          <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {typeof reportError === "string"
              ? reportError
              : "Report load nahi ho paya."}
          </div>
        )}

        {reportLoading && (
          <div className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-primary">
            <LoaderCircle size={16} className="animate-spin" />
            Loading report...
          </div>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Overall Progress
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completion rate for {filters.date || "selected date"}
              </p>
            </div>
            <Badge text={`${summary.completionPercent || 0}%`} type="success" />
          </div>

          <div className="mt-5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-primary transition-all"
              style={{ width: `${summary.completionPercent || 0}%` }}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Completed
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-200">
                {summary.completed || 0}
              </p>
            </div>
            <div className="rounded-2xl bg-rose-50 p-4 dark:bg-rose-500/10">
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Pending
              </p>
              <p className="mt-1 text-2xl font-bold text-rose-700 dark:text-rose-200">
                {summary.pending || 0}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            {summary.completionPercent || 0}% completed, {pendingPercent}% pending
          </p>
        </Card>

        <Card className="p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Branch Performance
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
             Branch wise performance in selected report.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {branchPerformance.length > 0 ? (
              branchPerformance.map((item, index) => (
                <div key={`${item.branch}-${index}`}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {item.branch}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-3 rounded-full bg-primary transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-400 dark:border-gray-700">
               Branch performance data is not available.
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-3 md:hidden">
        {reportData.length > 0 ? (
          reportData.map((item, index) => {
            const isCompleted =
              String(item.status).toLowerCase() === "completed";

            return (
              <Card key={`${item.task}-${index}`} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.task}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.branch}
                    </p>
                  </div>
                  <Badge
                    text={item.status}
                    type={isCompleted ? "success" : "warning"}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Date</span>
                  <span>{item.date}</span>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center text-sm text-gray-400">
           No checklist records found for this filter.
          </Card>
        )}
      </div>

      <Card className="hidden overflow-hidden p-0 md:block">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Task Details
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detailed task records for the checklist report.
          </p>
        </div>

        <Table
          columns={[
            { header: "Branch", accessor: "branch" },
            { header: "Task", accessor: "task" },
            {
              header: "Status",
              render: (row) => {
                const isCompleted =
                  String(row.status).toLowerCase() === "completed";

                return (
                  <Badge
                    text={row.status}
                    type={isCompleted ? "success" : "warning"}
                  />
                );
              },
            },
            { header: "Date", accessor: "date" },
          ]}
          data={reportData}
        />
      </Card>
    </div>
  );
};

export default ChecklistReport;
