import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const clickListener = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", clickListener);

    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggling}>
        {children ? children : selectedOption || "Select an Option"}
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="dropdown-list">
            {options.map((OptionComponent, index) => (
              <div
                onClick={onOptionClicked(OptionComponent)}
                key={index}
                className="dropdown-list-item"
              >
                <OptionComponent />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default Dropdown;
