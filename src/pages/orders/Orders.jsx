import { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, page, total, limit } = useSelector(
    (state) => state.order
  );

  // ✅ FETCH DATA
  useEffect(() => {
    dispatch(fetchOrders({ page, limit }));
  }, [page]);

  // 🔍 FILTER
  const filteredOrders = orders
    ?.map((order) => ({
      id: order.orderNumber,
      user: order.user?.name,
      date: new Date(order.createdAt).toLocaleString(),
      status: order.isDeliveredStatus?.toLowerCase(),
      payment: order.isPaid ? "paid" : "unpaid",
      raw: order,
    }))
    .filter((order) => {
      return (
        order.user?.toLowerCase().includes(search.toLowerCase()) &&
        (status ? order.status === status : true)
      );
    });

  const columns = [
    { header: "Order ID", accessor: "id" },
    { header: "User", accessor: "user" },
    { header: "Date", accessor: "date" },

    {
      header: "Status",
      render: (row) => (
        <Badge
          text={row.status}
          type={
            row.status === "pending"
              ? "warning"
              : row.status === "delivered"
              ? "success"
              : "default"
          }
        />
      ),
    },

    {
      header: "Payment",
      render: (row) => (
        <Badge
          text={row.payment}
          type={row.payment === "unpaid" ? "danger" : "success"}
        />
      ),
    },

    {
      header: "Action",
      render: (row) => (
        <Button onClick={() => navigate(`/admin/orders/${row.raw._id}`)}>
          View
        </Button>
      ),
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">Manage all orders</p>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-2">
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-48 p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* MOBILE VIEW */}
      <div className="space-y-3 md:hidden">
        {filteredOrders.map((order, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-2xl space-y-3">

            <div className="flex justify-between">
              <p>{order.id}</p>
              <Badge text={order.status} />
            </div>

            <p className="text-sm">{order.user}</p>
            <p className="text-xs text-gray-400">{order.date}</p>

            <div className="flex justify-between">
              <Badge text={order.payment} />
              <Button
                size="sm"
                onClick={() =>
                  navigate(`/admin/orders/${order.raw._id}`)
                }
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table columns={columns} data={filteredOrders} />
      </Card>

      {/* ✅ PAGINATION (ALL DEVICES) */}
      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={(p) =>
          dispatch(fetchOrders({ page: p, limit }))
        }
      />

    </div>
  );
};

export default Orders;