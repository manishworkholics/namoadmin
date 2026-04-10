import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Select from "../../components/ui/Select";
import Card from "../../components/ui/Card";

import { fetchConsumption } from "../../store/slices/franchiseSlice";

const Consumption = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { consumption = [] } = useSelector((state) => state.franchise);

    const [month, setMonth] = useState("0");

    useEffect(() => {
        dispatch(fetchConsumption({ id, month: 0 }));
    }, [id]);

    const handleMonth = (e) => {
        const value = e.target.value;
        setMonth(value);
        dispatch(fetchConsumption({ id, month: value }));
    };

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
                        Consumption Data
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        Track monthly consumption
                    </p>
                </div>

                {/* FILTER */}
                <Card className="
      bg-white dark:bg-[#0b1220]
      border border-gray-200 dark:border-gray-800
      rounded-2xl p-4
    ">
                    <Select
                        label="Select Month"
                        value={month}
                        onChange={handleMonth}
                        options={[
                            { label: "All Data", value: "0" },
                            { label: "January", value: "1" },
                            { label: "February", value: "2" },
                            { label: "March", value: "3" },
                            { label: "April", value: "4" },
                            { label: "May", value: "5" },
                            { label: "June", value: "6" },
                            { label: "July", value: "7" },
                            { label: "August", value: "8" },
                            { label: "September", value: "9" },
                            { label: "October", value: "10" },
                            { label: "November", value: "11" },
                            { label: "December", value: "12" },
                        ]}
                    />
                </Card>

                {/* 🔥 MOBILE VIEW */}
                <div className="space-y-3 md:hidden">
                    {consumption.map((d, i) => (
                        <div
                            key={i}
                            className="
            p-4 rounded-2xl
            bg-white dark:bg-[#0b1220]
            border border-gray-200 dark:border-gray-800
            flex justify-between items-center
          "
                        >
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    #{i + 1}
                                </p>
                                <p className="text-sm font-medium">
                                    {d?.item?.name || d?.name}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Unit
                                </p>
                                <p className="text-sm font-semibold text-orange-500">
                                    {d?.unit || d?.qty}
                                </p>
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
                                        <th className="text-left py-4 px-4">ID</th>
                                        <th className="text-left px-4">Item Name</th>
                                        <th className="text-right px-4">Unit</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {consumption.map((d, i) => (
                                        <tr
                                            key={i}
                                            className="
                    border-b border-gray-200 dark:border-gray-800
                    hover:bg-gray-100 dark:hover:bg-[#111827]
                    transition
                  "
                                        >
                                            <td className="py-4 px-4">#{i + 1}</td>
                                            <td className="px-4">
                                                {d?.item?.name || d?.name}
                                            </td>
                                            <td className="px-4 text-right text-orange-500 font-medium">
                                                {d?.unit || d?.qty}
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

export default Consumption;