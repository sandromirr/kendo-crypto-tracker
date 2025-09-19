import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Update CSS custom properties
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--text-disabled', '#666666');
      root.style.setProperty('--background-primary', '#121212');
      root.style.setProperty('--background-secondary', '#1e1e1e');
      root.style.setProperty('--background-tertiary', '#2d2d2d');
      root.style.setProperty('--border-color', '#333333');
      root.style.setProperty('--divider-color', '#333333');
      root.classList.add('dark-theme');
    } else {
      root.style.setProperty('--text-primary', '#212121');
      root.style.setProperty('--text-secondary', '#757575');
      root.style.setProperty('--text-disabled', '#bdbdbd');
      root.style.setProperty('--background-primary', '#ffffff');
      root.style.setProperty('--background-secondary', '#f5f5f5');
      root.style.setProperty('--background-tertiary', '#fafafa');
      root.style.setProperty('--border-color', '#e0e0e0');
      root.style.setProperty('--divider-color', '#e0e0e0');
      root.classList.remove('dark-theme');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
