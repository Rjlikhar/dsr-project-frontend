import Login from "../feature/auth/pages/Login";
import Signup from "../feature/auth/pages/Signup";

export const authRoutes = [
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
];

export default authRoutes;