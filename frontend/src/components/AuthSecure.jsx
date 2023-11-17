'use client';

import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthSecure(Component) {
  return function authSecure(props) {
    const { user } = useUserStore();
    const router = useRouter();
    
    useEffect(() => {
      if (!user.id)
        return router.push("/auth/login");
    }, []);

    if (!user.id)
      return null;

    return <Component />
  }
}