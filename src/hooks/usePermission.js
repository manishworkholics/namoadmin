import { useSelector } from "react-redux";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from "../utils/permission";

const usePermission = () => {
  const { user } = useSelector((state) => state.auth);

  return {
    can: (code) => hasPermission(user, code),
    canAny: (codes) => hasAnyPermission(user, codes),
    canAll: (codes) => hasAllPermissions(user, codes),
  };
};

export default usePermission;




// import usePermission from "../../hooks/usePermission";

// const Orders = () => {
//   const { can } = usePermission();

//   return (
//     <div>
//       {can("1") && <button>View Orders</button>}
//       {can("2") && <button>Edit Order</button>}
//       {can("3") && <button>Delete Order</button>}
//     </div>
//   );
// };


// const menu = [
//   { name: "Dashboard", code: "1" },
//   { name: "Orders", code: "2" },
//   { name: "Users", code: "3" },
// ];

// const { can } = usePermission();

// {menu.map((item) =>
//   can(item.code) && <div key={item.name}>{item.name}</div>
// )}



// import { Navigate } from "react-router-dom";
// import usePermission from "../hooks/usePermission";

// const ProtectedRoute = ({ children, code }) => {
//   const { can } = usePermission();

//   if (!can(code)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;



{/* <Route
  path="/orders"
  element={
    <ProtectedRoute code="2">
      <Orders />
    </ProtectedRoute>
  }
/> */}