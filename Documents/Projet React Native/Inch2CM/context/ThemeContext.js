import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      // Dark theme colors
      background: '#0f172a',
      surface: '#1e293b',
      primary: '#3b82f6',
      secondary: '#64748b',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#334155',
      card: '#1e293b',
      input: '#334155',
      keyboard: '#1e293b',
      numberButton: '#334155',
      specialButton: '#475569',
      clearButton: '#ef4444',
      activeBorder: '#fcb905',
      shadow: '#000',
    } : {
      // Light theme colors
      background: '#f8fafc',
      surface: '#ffffff',
      primary: '#3b82f6',
      secondary: '#64748b',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      card: '#ffffff',
      input: '#f1f5f9',
      keyboard: '#ffffff',
      numberButton: '#f1f5f9',
      specialButton: '#e2e8f0',
      clearButton: '#ef4444',
      activeBorder: '#fcb905',
      shadow: '#000',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 