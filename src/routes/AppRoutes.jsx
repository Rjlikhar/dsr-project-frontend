import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import dashboardRoutes from "./dashboardRoutes";
import authRoutes from "./authRoutes";
import { useAuthCheck } from "../feature/auth/hooks/useAuthCheck";

export default function AppRoutes() {
  const { isLoggedIn, loading } = useAuthCheck();

  return (
    <Routes>
      {/* ── Auth Routes (No Layout) ── */}
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* ── Protected Routes (WITH Layout) ── */}
      <Route
        element={
          isLoggedIn ? <MainLayout /> : <Navigate to="/signin" replace />
        }
      >
        {dashboardRoutes.map(({ path, element, index }) =>
          index ? (
            <Route key="index" index element={element} />
          ) : (
            <Route key={path} path={path} element={element} />
          ),
        )}
      </Route>

      {/* ── Fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
