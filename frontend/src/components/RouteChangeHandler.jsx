'use client';

import { usePathname } from "next/navigation";
import { useGlobalStore } from "@/store/global";
import { useEffect } from "react";

export default function RouteChangeHandler() {
  const { startLoadingDelay } = useGlobalStore();
  const pathname = usePathname();
  
  useEffect(() => {
    startLoadingDelay(250);
  }, [pathname]);

  return null;
}