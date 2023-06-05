import React from "react";
import PropTypes from "prop-types";
import Sidenav from "../components/Sidenav";

const PageLayout = ({ children }) => (
  <div className="relative mx-auto w-full max-w-container px-4 pt-12 sm:px-6 sm:pt-16 lg:flex lg:px-8 lg:pt-20">
    <Sidenav />
    <div className="max-w-6xl mx-auto mt-20 lg:ml-16 lg:mr-0 lg:mt-0 lg:flex-auto prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
      {children}
    </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
