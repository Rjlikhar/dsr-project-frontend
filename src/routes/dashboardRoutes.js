import AppPassword from "../layouts/components/AppPassword";
import CreateDSR from "../feature/dsr/pages/CreateDSR/CreateDsr";
import Dashboard from "../feature/dsr/pages/Dashboard/Dashboard";
import Admin from "../feature/dsr/pages/Admin/Admin";

const user = JSON.parse(localStorage.getItem("currentUser"));
export const dashboardRoutes = [
  {
    index: true,
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/create-dsr",
    element: <CreateDSR />,
  },
   ...(user?.role_id === 1
    ? [
        {
          path: "/admin",
          element: <Admin />,
        },
      ]
    : [])
];

export default dashboardRoutes;