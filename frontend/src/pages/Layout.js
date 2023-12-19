import AuthCheck from "components/AuthCheck";
import Loading from "components/Loading";
import Navbar from "components/Navbar";
import RouteChangeHandler from "components/RouteChangeHandler";
import { Outlet } from "react-router-dom";
import { useGlobalStore } from "store/GlobalStore";

export default function Layout() {
  const { isAuthLoading, isLoading } = useGlobalStore();

  return (
    <>
    <RouteChangeHandler />
    <AuthCheck />

    { isAuthLoading || isLoading ? 
      <Loading />
    : <></>}

    { !isAuthLoading && !isLoading ?
      <Navbar />
    : <></>}

    { !isAuthLoading && 
      <main className={`${isLoading ? 'hidden': ''} container self-center flex justify-center flex-col items-center`}>
        <Outlet />
      </main>
    }
    </>
  );
}