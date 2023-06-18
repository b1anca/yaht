import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useGetDetailsQuery } from "../app/services/auth/authService";
import PageLayout from "../layouts/PageLayout";

const ProtectedRoute = () => {
  const { pathname } = useLocation();

  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  if (!data && isFetching) return null;

  if (!data) {
    return <Navigate to={`/login?redirectTo=${pathname}`} />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default ProtectedRoute;
