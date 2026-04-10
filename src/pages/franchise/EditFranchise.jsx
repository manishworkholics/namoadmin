import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import {
    fetchSingleFranchise,
    updateSingleFranchise,
} from "../../store/slices/franchiseSlice";

const EditFranchise = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { single } = useSelector((state) => state.franchise);

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        companyname: "",
        gstnumber: "",
        address: "",
    });

    // 🔥 FETCH DATA
    useEffect(() => {
        dispatch(fetchSingleFranchise(id));
    }, [id]);

    // 🔥 SET FORM
    useEffect(() => {
        if (single && Object.keys(single).length > 0) {
            setForm({
                name: single.name || "",
                username: single.username || "",
                email: single.email || "",
                phone: single.phone || "",
                password: "",
                companyname: single.companyname || "",
                gstnumber: single.gstnumber || "",
                address: single.address || "",
            });
        }
    }, [single]);

    // 🔥 HANDLE CHANGE
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone, companyname, gstnumber, address } = form;

        if (!name || !email || !phone || !companyname || !gstnumber || !address) {
            alert("Please fill all fields");
            return;
        }

        dispatch(updateSingleFranchise({ id, data: form }));
        navigate("/namo/admin/franchise");
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <Card className="border border-orange-400/40 bg-white dark:bg-gray-900 rounded-2xl p-6 space-y-5">

                <p className="text-orange-500 font-semibold">
                    Update Franchise
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="grid md:grid-cols-2 gap-4">

                        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                        <Input label="Address" name="address" value={form.address} onChange={handleChange} />
                        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                        <Input label="Password" name="password" value={form.password} onChange={handleChange} />
                        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                        <Input label="Company Name" name="companyname" value={form.companyname} onChange={handleChange} />
                        <Input label="GST Number" name="gstnumber" value={form.gstnumber} onChange={handleChange} />
                        <Input label="Username" name="username" value={form.username} onChange={handleChange} />

                    </div>

                    <Button type="submit">
                        Submit
                    </Button>

                </form>

            </Card>
        </div>
    );
};

export default EditFranchise;