import { X } from "lucide-react";

const Drawer = ({
  open,
  onClose,
  children,
  title = "",
  width = "md",
}) => {

  const sizes = {
    sm: "w-72",
    md: "w-96",
    lg: "w-[420px]",
    full: "w-full",
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-900 z-50 transform transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}
        ${sizes[width]} max-w-full flex flex-col`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>

      </div>
    </>
  );
};

export default Drawer;