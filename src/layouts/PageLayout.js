import React from "react";
import PropTypes from "prop-types";
import Sidenav from "../components/Sidenav";

const PageLayout = ({ children }) => (
  <div className="relative mx-auto w-full max-w-container px-4 pt-12 sm:px-6 sm:pt-16 lg:flex lg:px-8 lg:pt-20">
    <Sidenav />
    <div className="mx-auto mt-20 min-w-0 max-w-[40rem] lg:ml-16 lg:mr-0 lg:mt-0 lg:max-w-[50rem] lg:flex-auto prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
      {children}
    </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
