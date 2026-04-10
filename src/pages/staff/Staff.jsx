import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { useNavigate } from "react-router-dom";
import { fetchStaff, updateStaffStatus } from "../../store/slices/staffSlice";

const Staff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff, loading } = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(fetchStaff());
  }, []);

  const handleStatus = (id, e) => {
    const value = e.target.value;
    dispatch(updateStaffStatus({ id, value }));
  };

  const formattedData = staff.map((item) => ({
    id: item._id,
    name: item.name,
    phone: item.phone,
    type: item.loginType,
    date: new Date(item.createdAt).toLocaleDateString(),
    status: item.isBlocked ? "Inactive" : "Active",
    raw: item,
  }));

  return (
    <div className="p-4 md:p-6 pb-24 space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Sub Staff</h1>
        </div>
        <Button onClick={() => navigate("/admin/add-staff")}>
          + Add Staff
        </Button>
      </div>

      {/* MOBILE */}
      <div className="space-y-3 md:hidden">
        {formattedData.map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-2xl space-y-3">

            <div className="flex justify-between">
              <p>#{i + 1}</p>
              <Badge text={item.type} />
            </div>

            <p>{item.name}</p>
            <p className="text-xs">{item.phone}</p>

            <select
              value={item.status === "Active" ? false : true}
              onChange={(e) => handleStatus(item.id, e)}
              className="w-full p-2 border rounded"
            >
              <option value={false}>Active</option>
              <option value={true}>Inactive</option>
            </select>

          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table
          columns={[
            { header: "#", render: (_, i) => i + 1 },
            { header: "Name", accessor: "name" },
            { header: "Phone", accessor: "phone" },

            {
              header: "Type",
              render: (row) => <Badge text={row.type} />,
            },

            {
              header: "Status",
              render: (row) => (
                <select
                  value={row.status === "Active" ? false : true}
                  onChange={(e) => handleStatus(row.id, e)}
                  className="p-2 border rounded"
                >
                  <option value={false}>Active</option>
                  <option value={true}>Inactive</option>
                </select>
              ),
            },

            { header: "Date", accessor: "date" },

            {
              header: "Action",
              render: (row) => (
                <Button
                  size="sm"
                  onClick={() => navigate(`/admin/edit-staff/${row.id}`)}
                >
                  Edit
                </Button>
              ),
            },
          ]}
          data={formattedData}
        />
      </Card>

    </div>
  );
};

export default Staff;