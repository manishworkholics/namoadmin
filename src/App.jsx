import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import Orders from "./pages/orders/Orders";
import OrdersDetail from "./pages/orders/OrderDetails";
import EditOrder from "./pages/orders/EditOrder";

import Franchise from "./pages/franchise/Franchise";
import AddFranchise from "./pages/franchise/AddFranchise";
import FranchiseOrders from "./pages/franchise/FranchiseOrders";
import Consumption from "./pages/franchise/Consumption";
import EditFranchise from "./pages/franchise/EditFranchise";

import Items from "./pages/items/Items";
import InventoryMaster from "./pages/internalOrdering/InventoryMaster";
import ItemIssue from "./pages/internalOrdering/ItemIssue";
import IssueHistory from "./pages/internalOrdering/IssueHistory";

import Staff from "./pages/staff/Staff";
import AddSubStaff from "./pages/staff/AddSubStaff";
import EditSubStaff from "./pages/staff/EditSubStaff";

import Pdf from "./pages/pdf/Pdf";
import Notification from "./pages/notifications/Notifications";
import Pages from "./pages/pages/Pages";
import Qr from "./pages/qr/Qr";
import Feedback from "./pages/feedback/Feedback";
import Bank from "./pages/bank/Bank";
import Mobilealert from "./pages/mobilealert/Mobilealert";
import Checklist from "./pages/checklist/Checklist";
import ChecklistReport from "./pages/checklist/ChecklistReport";
import Attendance from "./pages/attendance/Attendance";
import Login from "./pages/auth/Login";
import AppUser from "./pages/appuser/AppUser";

// 🔥 GUARDS
import AuthGuard from "./routes/AuthGuard";
import GuestGuard from "./routes/GuestGuard";

function App() {
  return (
    <BrowserRouter basename="/namo">
      <Routes>

        {/* 🔥 LOGIN (Guest Only) */}
        <Route
          path="/"
          element={
            <GuestGuard>
              <Login />
            </GuestGuard>
          }
        />

        {/* 🔥 PROTECTED APP */}
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrdersDetail />} />
          <Route path="edit-orders/:id" element={<EditOrder />} />

          <Route path="franchise" element={<Franchise />} />
          <Route path="add-franchise" element={<AddFranchise />} />
          <Route path="franchise-orders/:id" element={<FranchiseOrders />} />
          <Route path="consumption/:id" element={<Consumption />} />
          <Route path="edit-franchise/:id" element={<EditFranchise />} />

          <Route path="items" element={<Items />} />
          <Route path="inventory-master" element={<InventoryMaster />} />
          <Route path="item-issue" element={<ItemIssue />} />
          <Route path="issue-history" element={<IssueHistory />} />

          <Route path="staff" element={<Staff />} />
          <Route path="add-staff" element={<AddSubStaff />} />
          <Route path="edit-staff/:id" element={<EditSubStaff />} />

          <Route path="pdf" element={<Pdf />} />
          <Route path="notification" element={<Notification />} />
          <Route path="pages" element={<Pages />} />
          <Route path="qr" element={<Qr />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="bank" element={<Bank />} />
          <Route path="mobile-alert" element={<Mobilealert />} />

          <Route path="checklist" element={<Checklist />} />
          <Route path="checklist-report" element={<ChecklistReport />} />
          <Route path="attendance-report" element={<Attendance />} />
          <Route path="analytics-page" element={<AnalyticsPage />} />
          <Route path="app-users" element={<AppUser />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
