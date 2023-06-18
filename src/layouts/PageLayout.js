import React from "react";
import PropTypes from "prop-types";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";

const PageLayout = ({ children }) => (
  <div className="relative mx-auto w-full max-w-container flex min-h-screen">
    <Sidenav />
    <div className="w-full">
      <Header />
      <div className="max-w-6xl mx-auto lg:ml-16 lg:mt-10 lg:mr-0 lg:mt-0 mb-20 lg:flex-auto prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
        {children}
      </div>
    </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
