import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [checked, setChecked] = useState(false);

  const toggleTheme = () => setChecked((prev) => !prev);
    useEffect(() => {
    if (checked) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [checked]);


  return (
    <ThemeContext.Provider value={{ checked, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);