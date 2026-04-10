import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { useState } from "react";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <Topbar setOpen={setOpen} />

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default MainLayout;