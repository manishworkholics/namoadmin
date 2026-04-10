import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../../store/slices/orderSlice";

const FranchiseOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userOrders = [] } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrdersByUser(id));
  }, [id]);

  return (
    <div className="
      p-4 md:p-6 min-h-screen
      bg-gray-50 dark:bg-[#020617]
      text-gray-800 dark:text-gray-200
    ">

      <div className="w-full space-y-5">

        {/* HEADER */}
        <div>
          <h1 className="text-lg md:text-2xl font-semibold">
            Franchise Orders
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            View all orders of this franchise
          </p>
        </div>

        {/* 🔥 MOBILE VIEW */}
        <div className="space-y-3 md:hidden">
          {userOrders.map((o, i) => (
            <div
              key={i}
              className="
                p-4 rounded-2xl
                bg-white dark:bg-[#0b1220]
                border border-gray-200 dark:border-gray-800
                space-y-3
              "
            >

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{o.user?.phone}</span>
                <span>
                  {new Date(o.createdAt).toDateString()}
                </span>
              </div>

              <p className="font-medium text-sm">
                {o.orderNumber}
              </p>

              <div className="flex justify-between items-center">

                <span
                  className={`px-2 py-1 text-[10px] rounded-full ${
                    o.isDeliveredStatus === "PENDING"
                      ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      : "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                  }`}
                >
                  {o.isDeliveredStatus}
                </span>

                <span
                  className={`px-2 py-1 text-[10px] rounded-full ${
                    o.isPaid
                      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                  }`}
                >
                  {o.isPaid ? "PAID" : "UNPAID"}
                </span>

                <button
                  onClick={() =>
                    navigate(`/admin/orders/${o._id}`)
                  }
                  className="
                    px-3 py-1 rounded-full text-xs
                    bg-orange-500 hover:bg-orange-600 text-white
                  "
                >
                  View
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP TABLE */}
        <div className="hidden md:block">

          <div
            className="
              w-full
              bg-white dark:bg-[#0b1220]
              border border-gray-200 dark:border-gray-800
              rounded-2xl
              overflow-hidden
            "
          >
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="text-left py-4 px-4">Phone</th>
                    <th className="text-left px-4">Order No</th>
                    <th className="text-left px-4">Date</th>
                    <th className="px-4">Status</th>
                    <th className="px-4">Payment</th>
                    <th className="text-right px-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {userOrders.map((o, i) => (
                    <tr
                      key={i}
                      className="
                        border-b border-gray-200 dark:border-gray-800
                        hover:bg-gray-100 dark:hover:bg-[#111827]
                        transition
                      "
                    >
                      <td className="py-4 px-4">{o.user?.phone}</td>
                      <td className="px-4">{o.orderNumber}</td>
                      <td className="px-4">
                        {new Date(o.createdAt).toDateString()}
                      </td>

                      <td className="px-4 text-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            o.isDeliveredStatus === "PENDING"
                              ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                              : "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                          }`}
                        >
                          {o.isDeliveredStatus}
                        </span>
                      </td>

                      <td className="px-4 text-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            o.isPaid
                              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          }`}
                        >
                          {o.isPaid ? "PAID" : "UNPAID"}
                        </span>
                      </td>

                      <td className="px-4 text-right">
                        <button
                          onClick={() =>
                            navigate(`/admin/orders/${o._id}`)
                          }
                          className="
                            px-4 py-1.5 rounded-full text-xs font-medium
                            bg-orange-500 hover:bg-orange-600 text-white
                          "
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FranchiseOrders;