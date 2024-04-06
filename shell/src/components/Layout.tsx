import React from "react";
import { Link, Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import { app1RoutingPrefix, app2RoutingPrefix } from "../routing/constants";

export function Layout() {
  const { pathname } = useLocation();

  if (/\/$/.test(pathname)) {
    return <Navigate to={pathname.slice(0, -1)} replace={true} />
  }
  
  return (
    <>
      <nav style={{ marginBottom: "3rem" }}>
        <Link to={`/home`} style={{ marginRight: "1rem" }}>
          Home Page
        </Link>
        <Link
          to={`/${app1RoutingPrefix}/`}
          style={{ marginRight: "1rem" }}
        >
          App1
        </Link>
        <Link
          to={`/${app2RoutingPrefix}`}
          style={{ marginRight: "1rem" }}
        >
          App2
        </Link>
      </nav>
      <Outlet />
    </>
  );
}
