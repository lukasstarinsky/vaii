import { useGlobalStore } from "store/GlobalStore";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteChangeHandler() {
  const { startLoadingDelay } = useGlobalStore();
  const location = useLocation();
  
  useLayoutEffect(() => {
    startLoadingDelay(250);
  }, [location]);

  return null;
}