import React, { useEffect, useState } from "react";
import Input from "../../components/ui/Input";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBank,
  updateBank,
} from "../../store/slices/bankSlice";

const Bank = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.bank);

  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    accountholder: "",
    accountnumber: "",
    branch: "",
    ifsc: "",
  });

  // 🔥 LOAD DATA
  useEffect(() => {
    dispatch(fetchBank());
  }, [dispatch]);

  // 🔥 SET DATA
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  // 🔥 HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SAVE
  const handleSave = async () => {
    const { accountholder, accountnumber, branch, ifsc } = form;

    if (!accountholder || !accountnumber || !branch || !ifsc) {
      alert("Fill all fields");
      return;
    }

    await dispatch(updateBank(form));
    alert("Updated Successfully");

    setEdit(false);
    dispatch(fetchBank());
  };

  return (
    <div className="p-4 pb-24 flex justify-center">

      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Bank Details
          </h1>

          <button
            onClick={() => setEdit(!edit)}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm"
          >
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          <Input
            name="accountholder"
            value={form.accountholder}
            onChange={handleChange}
            disabled={!edit}
            placeholder="Account Holder"
          />

          <Input
            name="accountnumber"
            value={form.accountnumber}
            onChange={handleChange}
            disabled={!edit}
            placeholder="Account Number"
          />

          <Input
            name="branch"
            value={form.branch}
            onChange={handleChange}
            disabled={!edit}
            placeholder="Branch"
          />

          <Input
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
            disabled={!edit}
            placeholder="IFSC Code"
          />

        </div>

        {/* SAVE */}
        {edit && (
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            Save Changes
          </button>
        )}

      </div>

    </div>
  );
};

export default Bank;