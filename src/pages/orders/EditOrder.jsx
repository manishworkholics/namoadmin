import { useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

const EditOrder = () => {
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");

  const order = {
    orderNumber: "DDL19K86378",
    total: 2054,
    payment: "PENDING",
    name: "Parth Muchhal",
    phone: "7987088717",
    status: "PENDING",
    items: [
      { name: "NMO Garlic loaf", qty: "3 PKT" },
      { name: "Nmo Pizza Base -2Pcs", qty: "10 PKT" },
      { name: "NMO WB BREAD", qty: "10 PCS" },
    ],
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617] text-gray-200">

      <div className="w-full space-y-5">

        {/* HEADER */}
        <div>
          <h1 className="text-lg md:text-2xl font-semibold">
            Edit Order
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            Manage order details & updates
          </p>
        </div>

        {/* 🔥 UPLOAD (MOBILE STACK) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Card className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 space-y-3">
            <p className="text-orange-400 text-sm font-medium">
              Upload Courier
            </p>

            <div className="flex gap-2">
              <input
                type="file"
                className="flex-1 text-xs file:bg-orange-500/10 file:text-orange-400 file:border-0 file:px-3 file:py-1.5 file:rounded-lg"
              />
              <Button size="sm">Upload</Button>
            </div>
          </Card>

          <Card className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 space-y-3">
            <p className="text-orange-400 text-sm font-medium">
              Upload Invoice
            </p>

            <div className="flex gap-2">
              <input
                type="file"
                className="flex-1 text-xs file:bg-orange-500/10 file:text-orange-400 file:border-0 file:px-3 file:py-1.5 file:rounded-lg"
              />
              <Button size="sm">Upload</Button>
            </div>
          </Card>

        </div>

        {/* ORDER DETAILS */}
        <Card className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 space-y-4">

          <p className="text-orange-400 font-medium">
            Order Details
          </p>

          {/* GRID INFO */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-400 text-xs">Order No</p>
              <p>{order.orderNumber}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Total</p>
              <p>₹{order.total}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">User</p>
              <p>{order.name}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Phone</p>
              <p>{order.phone}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Status</p>
              <span className="px-2 py-1 text-[10px] rounded-full bg-red-500/20 text-red-400">
                {order.status}
              </span>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Payment</p>
              <span className="px-2 py-1 text-[10px] rounded-full bg-yellow-500/20 text-yellow-400">
                {order.payment}
              </span>
            </div>

          </div>

          {/* FORM */}
          <div className="space-y-3">

            <Select
              label="Update Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { label: "Pending", value: "PENDING" },
                { label: "Delivered", value: "DELIVERED" },
              ]}
            />

            <Input
              label="Remark / Payment"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter transaction detail"
            />

          </div>

          <div className="flex gap-2">
            <Button size="sm">Update</Button>
            <Button size="sm" variant="secondary">
              Update Payment
            </Button>
          </div>

        </Card>

        {/* PRODUCTS */}
        <Card className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4 space-y-3">

          <p className="text-orange-400 font-medium">
            Ordered Products
          </p>

          {order.items.map((item, i) => (
            <div
              key={i}
              className="
                flex justify-between items-center
                p-3 rounded-xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition
              "
            >
              <div>
                <p className="text-sm font-medium">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">
                  {item.qty}
                </p>
              </div>

              <button className="text-orange-400 text-xs">
                Edit
              </button>
            </div>
          ))}

        </Card>

      </div>
    </div>
  );
};

export default EditOrder;