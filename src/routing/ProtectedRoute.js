import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to={`/login?redirectTo=${pathname}`} />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default ProtectedRoute;
