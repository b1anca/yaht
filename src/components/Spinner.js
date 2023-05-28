import React from "react";

const Spinner = () => {
  return (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-r-transparent"
      role="status"
    />
  );
};

export default Spinner;
