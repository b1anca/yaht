import React from "react";
import withSideNavLayout from "../hoc/withSidenavLayout";
import { H1 } from "../components/Typography";

const DashboardScreen = () => {
  return <H1>Dashboard</H1>;
};

export default withSideNavLayout(DashboardScreen);
