import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "store/UserStore";
import { useGlobalStore } from "store/GlobalStore";
import * as AuthService from "services/AuthService";

export default function AuthCheck() {
  const { setUser } = useUserStore();
  const { stopAuthLoading } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.CheckUser((user) => {
      setUser(user.id, user.username);
      stopAuthLoading();
    }, () => {
      stopAuthLoading();
      navigate("/auth/login");
    });
  }, []);

  return null;
}