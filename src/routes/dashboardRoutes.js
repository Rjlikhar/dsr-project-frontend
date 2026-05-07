import AppPassword from "../layouts/components/AppPassword";
import CreateDSR from "../feature/dsr/pages/CreateDsr";
import Dashboard from "../feature/dsr/pages/Dashboard";

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
];

export default dashboardRoutes;