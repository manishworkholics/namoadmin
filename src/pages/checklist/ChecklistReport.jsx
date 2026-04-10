import { useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

const ChecklistReport = () => {

  const [filters, setFilters] = useState({
    date: "",
    branch: "",
  });

  const data = [
    { branch: "Indore", role: "Chef", task: "Clean Kitchen", status: "completed", date: "2026-04-07" },
    { branch: "Indore", role: "Manager", task: "Stock Check", status: "pending", date: "2026-04-07" },
    { branch: "Bhopal", role: "Chef", task: "Prepare Dough", status: "completed", date: "2026-04-06" },
  ];

  // 🔥 ANALYTICS CALCULATION
  const total = data.length;
  const completed = data.filter(d => d.status === "completed").length;
  const pending = total - completed;

  const completedPercent = total ? Math.round((completed / total) * 100) : 0;
  const pendingPercent = 100 - completedPercent;

  // 🔥 BRANCH PERFORMANCE
  const branchStats = {};
  data.forEach(item => {
    if (!branchStats[item.branch]) {
      branchStats[item.branch] = { total: 0, completed: 0 };
    }
    branchStats[item.branch].total++;
    if (item.status === "completed") {
      branchStats[item.branch].completed++;
    }
  });

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Checklist Report</h1>
        <p className="text-sm text-gray-500">
          Track daily checklist performance
        </p>
      </div>

      {/* 🔥 ANALYTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        <Card>
          <p className="text-sm text-gray-500">Total Tasks</p>
          <h2 className="text-xl font-bold">{total}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="text-xl font-bold text-green-600">{completed}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-xl font-bold text-red-500">{pending}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Completion %</p>
          <h2 className="text-xl font-bold">{completedPercent}%</h2>
        </Card>

      </div>

      {/* 🔥 PROGRESS BAR */}
      <Card>
        <p className="text-sm mb-2">Overall Progress</p>

        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${completedPercent}%` }}
          />
        </div>

        <p className="text-xs mt-2 text-gray-500">
          {completedPercent}% completed • {pendingPercent}% pending
        </p>
      </Card>

      {/* 🔥 BRANCH PERFORMANCE */}
      <Card>
        <p className="text-sm mb-3 font-medium">Branch Performance</p>

        <div className="space-y-3">
          {Object.keys(branchStats).map((branch, i) => {
            const stat = branchStats[branch];
            const percent = Math.round((stat.completed / stat.total) * 100);

            return (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{branch}</span>
                  <span>{percent}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* FILTERS */}
      <Card className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value })
            }
            className="p-3 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700"
          />

          <select
            value={filters.branch}
            onChange={(e) =>
              setFilters({ ...filters, branch: e.target.value })
            }
            className="p-3 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="">All Branch</option>
            <option>Indore</option>
            <option>Bhopal</option>
          </select>

        </div>
      </Card>

      {/* TABLE */}
      <Card className="p-0 overflow-hidden hidden md:block">
        <Table
          columns={[
            { header: "Branch", accessor: "branch" },
            { header: "Role", accessor: "role" },
            { header: "Task", accessor: "task" },

            {
              header: "Status",
              render: (row) => (
                <Badge
                  text={row.status}
                  type={row.status === "completed" ? "success" : "danger"}
                />
              ),
            },

            { header: "Date", accessor: "date" },
          ]}
          data={data}
        />
      </Card>

    </div>
  );
};

export default ChecklistReport;