import Card from "../../components/ui/Card";

const Dashboard = () => {

  const stats = [
    { title: "Pending Orders", value: 5, color: "text-red-500" },
    { title: "Unpaid Orders", value: 26, color: "text-yellow-500" },
    { title: "Franchises", value: 14, color: "text-blue-500" },
    { title: "Items", value: 54, color: "text-green-500" },
  ];

  const recentOrders = [
    { id: "#1021", branch: "Indore", amount: "₹1200", status: "Pending" },
    { id: "#1022", branch: "Bhopal", amount: "₹850", status: "Completed" },
    { id: "#1023", branch: "Indore", amount: "₹640", status: "Pending" },
  ];

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back 👋 here's your business overview
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="
              relative p-5 rounded-2xl border
              bg-white/70 dark:bg-gray-900/70
              backdrop-blur-xl
              border-gray-200 dark:border-gray-800
              shadow-sm hover:shadow-lg
              transition
            "
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {item.title}
            </p>

            <h2 className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </h2>

            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-gray-100 dark:to-gray-800 rounded-bl-3xl opacity-40" />
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* RECENT ORDERS */}
        <div className="lg:col-span-2">
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
              Recent Orders
            </p>

            <div className="space-y-3">
              {recentOrders.map((order, i) => (
                <div
                  key={i}
                  className="
                    flex justify-between items-center
                    p-3 rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition
                  "
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {order.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.branch}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {order.amount}
                    </p>
                    <p
                      className={`text-xs ${
                        order.status === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* INSIGHT CARD */}
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Performance Insight
            </p>

            <h3 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-100">
              Sales Increasing 📈
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              +18% growth compared to last week
            </p>
          </div>

          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[70%]" />
            </div>
          </div>
        </Card>

      </div>

      {/* ACTIVITY + QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500">Today's Orders</p>
          <h2 className="text-xl font-bold mt-1 text-gray-800 dark:text-gray-100">
            32
          </h2>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-xl font-bold mt-1 text-gray-800 dark:text-gray-100">
            ₹12,400
          </h2>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500">Active Staff</p>
          <h2 className="text-xl font-bold mt-1 text-gray-800 dark:text-gray-100">
            18
          </h2>
        </Card>

      </div>

    </div>
  );
};

export default Dashboard;