import { NavLink } from "react-router-dom";
import {
  Home, X, ShoppingCart, Users, Package,
  FileText, Bell, File, QrCode,
  MessageSquare, Landmark, Smartphone,
  ClipboardList, BarChart3, CheckSquare, CalendarDays
} from "lucide-react";


const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Franchise", path: "/admin/franchise", icon: Users },
  { name: "Sub Staff", path: "/admin/staff", icon: Users },
  { name: "Items", path: "/admin/items", icon: Package },

  { name: "Checklist", path: "/admin/checklist", icon: CheckSquare },
  { name: "Checklist Report", path: "/admin/checklist-report", icon: ClipboardList },
  { name: "Attendance", path: "/admin/attendance-report", icon: CalendarDays },
  { name: "Analytics", path: "/admin/analytics-page", icon: BarChart3 },

  { name: "PDF", path: "/admin/pdf", icon: FileText },
  { name: "Notification", path: "/admin/notification", icon: Bell },
  { name: "Pages", path: "/admin/pages", icon: File },
  { name: "QR Code", path: "/admin/qr", icon: QrCode },
  { name: "Feedback", path: "/admin/feedback", icon: MessageSquare },
  { name: "Bank Detail", path: "/admin/bank", icon: Landmark },
  { name: "Mobile Alert", path: "/admin/mobile-alert", icon: Smartphone },
  { name: "App Users", path: "/admin/app-users", icon: Users },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 z-50 
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        flex flex-col`}
      >

        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-lg font-bold text-primary">Namo Admin</h1>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">

          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
                ${isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}

        </nav>

      </div>
    </>
  );
};

export default Sidebar;