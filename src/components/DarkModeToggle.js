import React, { useState, useEffect } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <FontAwesomeIcon
      onClick={toggleDarkMode}
      size="lg"
      className="dark:text-zinc-200 text-zinc-600 cursor-pointer dark:hover:text-sky-600 hover:text-sky-600 p-2"
      icon={darkMode ? faMoon : faSun}
    />
  );
};

export default DarkModeToggle;
