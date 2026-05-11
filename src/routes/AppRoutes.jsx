import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import dashboardRoutes from "./dashboardRoutes";
import authRoutes from "./authRoutes";
import { useAuthCheck } from "../feature/auth/hooks/useAuthCheck";
import FullScreenLoader from "../component/common/Loader";


function ProtectedRoute() {
  const token = localStorage.getItem("auth_token");
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default function AppRoutes() {
  const {isLoggedIn,loader}=useAuthCheck();
    if (loader) return <FullScreenLoader loading={loader}/>;

  return (
  <>  
    <Routes>
      {/* ── Auth Routes (No Layout) ── */}
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={localStorage.getItem("auht_token") ? <Navigate to="/" replace /> : element} />
      ))}

      {/* ── Protected Routes (WITH Layout) ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {dashboardRoutes.map(({ path, element, index }) =>
            index ? (
              <Route key="index" index element={element} />
            ) : (
              <Route key={path} path={path} element={element} />
            ),
          )}
        </Route>
      </Route>

      {/* ── Fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
  );
}
