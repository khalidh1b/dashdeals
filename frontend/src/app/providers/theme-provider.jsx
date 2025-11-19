import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('dashdeals-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    };
    
    localStorage.setItem('dashdeals-theme', theme ? 'dark' : 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme,
    isLight: !theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;