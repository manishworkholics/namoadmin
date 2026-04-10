import { useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

const Attendance = () => {

  const [filters, setFilters] = useState({
    date: "",
    branch: "",
  });

  const data = [
    {
      name: "Ramesh",
      role: "Chef",
      branch: "Indore",
      status: "present",
      time: "09:10 AM",
    },
    {
      name: "Suresh",
      role: "Manager",
      branch: "Indore",
      status: "absent",
      time: "-",
    },
    {
      name: "Amit",
      role: "Floor Manager",
      branch: "Bhopal",
      status: "late",
      time: "09:45 AM",
    },
  ];

  // 🔥 ANALYTICS
  const total = data.length;
  const present = data.filter(d => d.status === "present").length;
  const absent = data.filter(d => d.status === "absent").length;
  const late = data.filter(d => d.status === "late").length;

  const presentPercent = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-sm text-gray-500">
          Track staff attendance (biometric)
        </p>
      </div>

      {/* 🔥 ANALYTICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        <Card>
          <p className="text-sm text-gray-500">Total Staff</p>
          <h2 className="text-xl font-bold">{total}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Present</p>
          <h2 className="text-xl font-bold text-green-600">{present}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Absent</p>
          <h2 className="text-xl font-bold text-red-500">{absent}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Late</p>
          <h2 className="text-xl font-bold text-yellow-500">{late}</h2>
        </Card>

      </div>

      {/* 🔥 PROGRESS */}
      <Card>
        <p className="text-sm mb-2">Attendance %</p>

        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full">
          <div
            className="h-full bg-green-500"
            style={{ width: `${presentPercent}%` }}
          />
        </div>

        <p className="text-xs mt-2 text-gray-500">
          {presentPercent}% present today
        </p>
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

      {/* MOBILE VIEW */}
      <div className="space-y-3 md:hidden">
        {data.map((item, i) => (
          <Card key={i} className="space-y-2">

            <div className="flex justify-between">
              <p className="font-medium">{item.name}</p>

              <Badge
                text={item.status}
                type={
                  item.status === "present"
                    ? "success"
                    : item.status === "late"
                    ? "warning"
                    : "danger"
                }
              />
            </div>

            <p className="text-sm text-gray-500">
              {item.role} • {item.branch}
            </p>

            <p className="text-xs text-gray-400">
              Time: {item.time}
            </p>

          </Card>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Role", accessor: "role" },
            { header: "Branch", accessor: "branch" },

            {
              header: "Status",
              render: (row) => (
                <Badge
                  text={row.status}
                  type={
                    row.status === "present"
                      ? "success"
                      : row.status === "late"
                      ? "warning"
                      : "danger"
                  }
                />
              ),
            },

            { header: "Time", accessor: "time" },
          ]}
          data={data}
        />
      </Card>

    </div>
  );
};

export default Attendance;