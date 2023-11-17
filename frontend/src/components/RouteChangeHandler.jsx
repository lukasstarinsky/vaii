'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useGlobalStore } from "@/store/global";

export default function RouteChangeHandler() {
  const { startLoadingDelay } = useGlobalStore();
  const pathname = usePathname();
  
  useEffect(() => {
    startLoadingDelay(250);
  }, [pathname]);

  return null;
}