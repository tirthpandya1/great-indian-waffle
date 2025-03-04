import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#FF6B6B',
      background: '#F5FCFF',
      text: '#333',
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });

  const toggleTheme = () => {
    setTheme(prevTheme => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        background: prevTheme.colors.background === '#F5FCFF' ? '#FFFFFF' : '#F5FCFF',
      },
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
