import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { addFranchise } from "../../store/slices/franchiseSlice";

const AddFranchise = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    companyname: "",
    gstnumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      username,
      email,
      password,
      phone,
      companyname,
      gstnumber,
      address,
    } = form;

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !phone ||
      !companyname ||
      !gstnumber ||
      !address
    ) {
      alert("Please fill all fields");
      return;
    }

    // 🔥 username clean
    const cleanUsername = username.replace(/\s+/g, "").toLowerCase();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", cleanUsername);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("companyname", companyname);
    formData.append("gstnumber", gstnumber);
    formData.append("address", address);

    dispatch(addFranchise(formData));

    navigate("/namo/admin/franchise");
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
            Add Franchise
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Create new franchise account
          </p>
        </div>

        {/* FORM CARD */}
        <Card className="
      bg-white dark:bg-[#0b1220]
      border border-gray-200 dark:border-gray-800
      rounded-2xl p-4 md:p-6 space-y-5
    ">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input label="Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="User Name" name="username" value={form.username} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
              <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="Company Name" name="companyname" value={form.companyname} onChange={handleChange} />
              <Input label="GST Number" name="gstnumber" value={form.gstnumber} onChange={handleChange} />
              <Input label="Address" name="address" value={form.address} onChange={handleChange} />

            </div>

            <div className="pt-2">
              <Button className="w-full md:w-auto">
                Submit
              </Button>
            </div>

          </form>

        </Card>

      </div>
    </div>
  );
};

export default AddFranchise;