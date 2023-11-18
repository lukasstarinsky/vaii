'use client';

import { usePathname } from "next/navigation";
import { useGlobalStore } from "@/store/global";
import { useLayoutEffect } from "react";

export default function RouteChangeHandler() {
  const { startLoadingDelay } = useGlobalStore();
  const pathname = usePathname();
  
  useLayoutEffect(() => {
    startLoadingDelay(250);
  }, [pathname]);

  return null;
}