import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
        borderRadius: '50%',
        width: '3rem',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme === 'dark' ? '#2d3748' : '#e2e8f0',
        color: theme === 'dark' ? '#f7fafc' : '#1a202c',
        border: 'none',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
