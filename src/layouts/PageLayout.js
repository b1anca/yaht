import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";

const PageLayout = ({ children }) => (
  <>
    <Header />
    <div className="p-6">{children}</div>
  </>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
