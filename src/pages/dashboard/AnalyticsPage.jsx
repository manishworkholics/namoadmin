import { useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

const AnalyticsPage = () => {

    const [filters, setFilters] = useState({
        date: "",
        branch: "",
    });

    const data = [
        { branch: "Indore", staff: "Ravi", tasks: 45, attendance: 92 },
        { branch: "Indore", staff: "Amit", tasks: 30, attendance: 75 },
        { branch: "Bhopal", staff: "Suresh", tasks: 50, attendance: 88 },
    ];

    // 🔥 CALCULATIONS
    const totalTasks = data.reduce((sum, d) => sum + d.tasks, 0);
    const avgAttendance = Math.round(
        data.reduce((sum, d) => sum + d.attendance, 0) / data.length
    );

    const topPerformer = data.reduce((prev, curr) =>
        curr.tasks > prev.tasks ? curr : prev
    );

    // 🔥 BRANCH PERFORMANCE
    const branchStats = {};
    data.forEach(item => {
        if (!branchStats[item.branch]) {
            branchStats[item.branch] = { total: 0, count: 0 };
        }
        branchStats[item.branch].total += item.tasks;
        branchStats[item.branch].count++;
    });

    return (
        <div className="p-4 md:p-6 pb-24 space-y-5">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <p className="text-sm text-gray-500">
                    Track performance & insights
                </p>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                <Card>
                    <p className="text-sm text-gray-500">Total Tasks</p>
                    <h2 className="text-xl font-bold">{totalTasks}</h2>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Avg Attendance</p>
                    <h2 className="text-xl font-bold">{avgAttendance}%</h2>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Top Performer</p>
                    <h2 className="text-xl font-bold text-green-600">
                        {topPerformer.staff}
                    </h2>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Branches</p>
                    <h2 className="text-xl font-bold">
                        {Object.keys(branchStats).length}
                    </h2>
                </Card>

            </div>

            {/* 🔥 OVERALL PERFORMANCE */}
            <Card>
                <p className="text-sm mb-2">Overall Task Completion</p>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary"
                        style={{ width: "75%" }}
                    />
                </div>

                <p className="text-xs mt-2 text-gray-500">
                    Performance based on total tasks
                </p>
            </Card>

            {/* 🔥 BRANCH PERFORMANCE */}
            <Card>
                <p className="text-sm mb-3 font-medium">Branch Performance</p>

                <div className="space-y-3">
                    {Object.keys(branchStats).map((branch, i) => {
                        const stat = branchStats[branch];
                        const avg = Math.round(stat.total / stat.count);

                        return (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{branch}</span>
                                    <span>{avg}</span>
                                </div>

                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${avg}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* FILTERS */}
            <Card className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <Input
                        type="date"
                        value={filters.date}
                        onChange={(e) =>
                            setFilters({ ...filters, date: e.target.value })
                        }
                        className="p-3 rounded-xl border"
                    />

                    <Select
                        value={filters.branch}
                        onChange={(e) =>
                            setFilters({ ...filters, branch: e.target.value })
                        }
                        className="p-3 rounded-xl border"
                    >
                        <option value="">All Branch</option>
                        <option>Indore</option>
                        <option>Bhopal</option>
                    </Select>

                </div>
            </Card>

            {/* TABLE */}
            <Card className="p-0 overflow-hidden hidden md:block">
                <Table
                    columns={[
                        { header: "Branch", accessor: "branch" },
                        { header: "Staff", accessor: "staff" },
                        { header: "Tasks", accessor: "tasks" },
                        {
                            header: "Attendance",
                            render: (row) => (
                                <Badge
                                    text={`${row.attendance}%`}
                                    type={row.attendance > 85 ? "success" : "danger"}
                                />
                            ),
                        },
                    ]}
                    data={data}
                />
            </Card>

        </div>
    );
};

export default AnalyticsPage;