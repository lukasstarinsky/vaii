import { useUserStore } from "store/UserStore";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminProtectedRoute() {
  const { IsAdmin } = useUserStore();

  if (!IsAdmin()) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}