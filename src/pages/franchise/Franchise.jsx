import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Trash2, Pencil,FileChartColumnIncreasing } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";

import {
  fetchFranchise,
  updateFranchiseOrder,
  clearFranchiseToken,
} from "../../store/slices/franchiseSlice";

const Franchise = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.franchise);

  useEffect(() => {
    dispatch(fetchFranchise());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Franchise</h1>
          <p className="text-sm text-gray-500">Manage all franchise users</p>
        </div>

        <Button
          onClick={() =>
            window.location.href = `/namo/admin/add-franchise`
          }
        >
          + Add
        </Button>
      </div>

      {/* MOBILE VIEW */}
      <div className="space-y-3 md:hidden">
        {data.map((item, i) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm space-y-3"
          >

            {/* Top */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">#{i + 1}</p>
              <Badge
                text={
                  item.device_notification_token_id
                    ? "ACTIVE"
                    : "INACTIVE"
                }
                type={
                  item.device_notification_token_id
                    ? "success"
                    : "danger"
                }
              />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                {item.name?.[0]}
              </div>

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.username}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>📞 {item.phone}</p>
              <p>
                📅 {new Date(item.createdAt).toDateString()}
              </p>
            </div>

            {/* Enable Toggle */}
            <Button
              variant={
                item.enable_disable_order === 1
                  ? "danger"
                  : "secondary"
              }
              onClick={() =>
                dispatch(
                  updateFranchiseOrder({
                    id: item._id,
                    value:
                      item.enable_disable_order === 1 ? 2 : 1,
                  })
                )
              }
              className="w-full"
            >
              {item.enable_disable_order === 1
                ? "Disable User"
                : "Enable User"}
            </Button>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() =>
                  window.location.href = `/namo/admin/franchise-orders/${item._id}`
                }
              >
                View
              </Button>

              <Button
                variant="secondary"
                className="flex-1"
                onClick={() =>
                  window.location.href = `/namo/admin/edit-franchise/${item._id}`
                }
              >
                Edit
              </Button>

              <Button
                variant="secondary"
                className="flex-1"
                onClick={() =>
                  window.location.href = `/namo/admin/consumption/${item._id}`
                }
              >
                Logs
              </Button>
            </div>

          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table
          columns={[
            { header: "#", render: (_, i) => i + 1 },

            {
              header: "Block",
              render: (row) => (
                <Button
                  size="sm"
                  variant={
                    row.enable_disable_order === 1
                      ? "danger"
                      : "secondary"
                  }
                  onClick={() =>
                    dispatch(
                      updateFranchiseOrder({
                        id: row._id,
                        value:
                          row.enable_disable_order === 1 ? 2 : 1,
                      })
                    )
                  }
                >
                  {row.enable_disable_order === 1
                    ? "Disable"
                    : "Enable"}
                </Button>
              ),
            },

            {
              header: "Image",
              render: (row) => (
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                  {row.name?.[0]}
                </div>
              ),
            },

            { header: "Name", accessor: "name" },
            { header: "Username", accessor: "username" },
            { header: "Phone", accessor: "phone" },

            {
              header: "Date",
              render: (row) =>
                new Date(row.createdAt).toDateString(),
            },

            {
              header: "Status",
              render: (row) => (
                <Badge
                  text={
                    row.device_notification_token_id
                      ? "ACTIVE"
                      : "INACTIVE"
                  }
                  type={
                    row.device_notification_token_id
                      ? "success"
                      : "danger"
                  }
                />
              ),
            },

            {
              header: "Action",
              render: (row) => (
                <div className="flex gap-2">

                  {/* VIEW */}
                  <Button
                    size="icon"
                    onClick={() =>
                      window.location.href = `/namo/admin/franchise-orders/${row._id}`
                    }
                  >
                    <Eye size={16} />
                  </Button>

                  {/* EDIT */}
                  <Button
                    size="icon"
                    variant="danger"
                    onClick={() =>
                      window.location.href = `/namo/admin/edit-franchise/${row._id}`
                    }
                  >
                    <Pencil size={14} />
                  </Button>

                  {/* LOGS */}
                  <Button
                    size="icon"
                    variant="danger"
                    onClick={() =>
                      window.location.href = `/namo/admin/consumption/${row._id}`
                    }
                  >
                    <FileChartColumnIncreasing size={14} />
                  </Button>

                  {/* CLEAR TOKEN */}
                  {/* <Button
                    size="icon"
                    variant="danger"
                    onClick={() =>
                      dispatch(clearFranchiseToken(row._id))
                    }
                  >
                 <Trash2 size={14} />
                  </Button> */}

                </div>
              ),
            },
          ]}
          data={data}
        />
      </Card>

    </div>
  );
};

export default Franchise;