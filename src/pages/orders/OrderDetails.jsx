import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import API from "../../services/api";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [file, setFile] = useState(null);

  // 🔥 GET ORDER DETAIL
  const fetchOrder = async () => {
    try {
      const res = await API.get(`/admin/getSingleOrderdetail/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // 🔥 UPDATE ORDER STATUS
  const updateStatus = async () => {
    try {
      await API.put(`/admin/updateOrderStatus/${id}`, {
        status,
        remark,
      });
      fetchOrder();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE PAYMENT STATUS
  const updatePayment = async () => {
    try {
      await API.put(`/admin/updatePaymentStatus/${id}`, {
        remark,
      });
      fetchOrder();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPLOAD COURIER
  const uploadCourier = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await API.post(
      `/admin/courierrecept/uploadcourierrecept/${id}`,
      formData
    );
    fetchOrder();
  };

  // 🔥 UPLOAD INVOICE
  const uploadInvoice = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await API.post(
      `/admin/uploadinvoices/uploadinvoic/${id}`,
      formData
    );
    fetchOrder();
  };

  if (!order) return <Loader />;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* UPLOAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <Card className="space-y-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
          <p className="text-primary font-medium">Upload Courier</p>

          <div className="flex items-center gap-3">
            <input
              type="file"
              className="text-sm flex-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <Button size="sm">Upload</Button>
          </div>
        </Card>

        <Card className="space-y-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
          <p className="text-primary font-medium">Upload Invoice</p>

          <div className="flex items-center gap-3">
            <input
              type="file"
              className="text-sm flex-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <Button size="sm">Upload</Button>
          </div>
        </Card>

      </div>

      {/* ORDER INFO */}
      <Card className="space-y-5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">

        <p className="text-primary font-semibold text-lg">
          Order Details
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">

          <div>
            <p className="text-gray-400">Order No</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {order.orderNumber}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Total</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              ₹{order.totalamount}
            </p>
          </div>

          <div>
            <p className="text-gray-400">User</p>
            <p className="text-gray-800 dark:text-gray-200">
              {order.user?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p className="text-gray-800 dark:text-gray-200">
              {order.user?.phone}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              {order.isDeliveredStatus}
            </span>
          </div>

          <div>
            <p className="text-gray-400">Payment</p>
            <span
              className={`px-2 py-1 text-xs rounded-full ${order.isPaid
                ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
                }`}
            >
              {order.isPaid ? "Paid" : "Unpaid"}
            </span>
          </div>

        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-4">

          <Select
            label="Update Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { label: "Pending", value: "PENDING" },
              { label: "Completed", value: "COMPLETED" },
            ]}
          />

          <Input
            label="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter remark"
          />

        </div>

        <div className="flex gap-3">
          <Button size="sm">Update Status</Button>
          <Button size="sm" variant="secondary">
            Update Payment
          </Button>
        </div>

      </Card>

      {/* PRODUCTS */}
      <Card className="space-y-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800">

        <p className="text-primary font-semibold text-lg">
          Products
        </p>

        {order.orderItems.map((item, i) => (
          <div
            key={i}
            className="
            flex justify-between items-center
            p-4 rounded-xl
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
          "
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {item.itemid?.name}
              </p>
              <p className="text-xs text-gray-400">
                Qty: {item.qty}
              </p>
            </div>

            <button className="text-primary text-sm hover:underline">
              Edit
            </button>
          </div>
        ))}

      </Card>

    </div>
  );
};

export default OrderDetails;