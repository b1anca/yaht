import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";

const PageLayout = ({ children }) => (
  <>
    <Header />
    <div className="max-w-6xl mx-auto p-6">{children}</div>
  </>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
