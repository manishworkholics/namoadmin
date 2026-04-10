import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeedbacks,
  markFeedbackRead,
} from "../../store/slices/feedbackSlice";

const Feedback = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state) => state.feedback);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, []);

  const handleView = (item) => {
    setModalData(item);
    dispatch(markFeedbackRead(item._id));
  };

  const formattedData = data.map((item) => ({
    _id: item._id,
    name: item.userid?.name || "User",
    title: item.title,
    description: item.description,
    date: new Date(item.createdAt).toLocaleDateString(),
    status: item.readstatus ? "read" : "unread",
  }));

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Feedback
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          User feedback & support
        </p>
      </div>

      {/* 📱 MOBILE */}
      <div className="space-y-3 md:hidden">
        {formattedData.map((item) => (
          <Card
            key={item._id}
            className={`p-4 space-y-3 shadow-sm border-l-4
              ${
                item.status === "unread"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-green-500 bg-white dark:bg-gray-900"
              }`}
          >

            {/* TOP */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800 dark:text-white">
                {item.name}
              </p>

              <Badge
                text={item.status}
                type={item.status === "unread" ? "danger" : "success"}
              />
            </div>

            {/* TITLE */}
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.title}
            </p>

            {/* DESCRIPTION PREVIEW */}
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {item.description}
            </p>

            {/* FOOTER */}
            <div className="flex justify-between items-center pt-2">

              <span className="text-xs text-gray-400">
                {item.date}
              </span>

              <Button
                size="icon"
                onClick={() => handleView(item)}
              >
                <Eye size={16} />
              </Button>

            </div>

          </Card>
        ))}
      </div>

      {/* 💻 DESKTOP */}
      <Card className="hidden md:block p-0 overflow-hidden">
        <Table
          columns={[
            { header: "#", render: (_, i) => i + 1 },
            { header: "Name", accessor: "name" },
            { header: "Date", accessor: "date" },
            { header: "Title", accessor: "title" },

            {
              header: "Status",
              render: (row) => (
                <Badge
                  text={row.status}
                  type={row.status === "unread" ? "danger" : "success"}
                />
              ),
            },

            {
              header: "Action",
              render: (row) => (
                <Button size="icon" onClick={() => handleView(row)}>
                  <Eye size={16} />
                </Button>
              ),
            },
          ]}
          data={formattedData}
        />
      </Card>

      {/* 🔥 PREMIUM MODAL */}
      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end md:items-center z-50">

          <div className="bg-white dark:bg-gray-900 w-full md:max-w-md rounded-t-2xl md:rounded-2xl p-5 space-y-4 animate-slideUp">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                {modalData.title}
              </h2>

              <Badge
                text={modalData.readstatus ? "read" : "unread"}
                type={modalData.readstatus ? "success" : "danger"}
              />
            </div>

            {/* USER */}
            <p className="text-sm text-gray-500">
              By: {modalData.userid?.name || "User"}
            </p>

            {/* DESC */}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {modalData.description}
            </p>

            {/* ACTION */}
            <Button
              className="w-full"
              onClick={() => setModalData(null)}
            >
              Close
            </Button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Feedback;