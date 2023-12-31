import { useUserStore } from "store/UserStore";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { user } = useUserStore();

  if (!user.id) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}