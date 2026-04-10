import { Menu, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import LogoutButton from "../ui/LogoutButton";

const Topbar = ({ setOpen }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-800">

      <div className="flex items-center gap-3">
        <Menu className="md:hidden cursor-pointer" onClick={() => setOpen(true)} />
        <h1 className="font-semibold text-gray-800 dark:text-gray-200">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
          A
        </div>
        <LogoutButton />

      </div>
    </div>
  );
};

export default Topbar;