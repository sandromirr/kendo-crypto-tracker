import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '@progress/kendo-react-buttons';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const emojis = ['🚀', '🔍', '🌌', '💫', '👾'];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

  useEffect(() => {
    setIsVisible(true);
    
    const emojiInterval = setInterval(() => {
      setCurrentEmoji(prev => {
        const currentIndex = emojis.indexOf(prev);
        return emojis[(currentIndex + 1) % emojis.length];
      });
    }, 2000);

    return () => clearInterval(emojiInterval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)' 
        : 'linear-gradient(135deg, #f5f7ff 0%, #e9ecff 100%)',
      padding: '1rem',
      textAlign: 'center',
      transition: 'all 0.4s ease-out',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ThemeToggle />
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '40%',
        height: '40%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,149,237,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '40%',
        height: '40%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />

      <div style={{
        background: theme === 'dark' 
          ? 'rgba(20, 25, 45, 0.85)' 
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '4rem 2rem',
        maxWidth: '600px',
        width: '90%',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: theme === 'dark' 
          ? '0 12px 40px rgba(0, 0, 0, 0.3)' 
          : '0 12px 40px rgba(0, 0, 0, 0.1)',
        border: theme === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.05)' 
          : '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div className="emoji-container" style={{
          fontSize: '5rem',
          marginBottom: '1.5rem',
          animation: 'bounce 3s ease-in-out infinite',
          transformOrigin: 'center bottom',
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          userSelect: 'none'
        }}>
          {currentEmoji}
        </div>
        
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            margin: '0 0 1rem',
            background: theme === 'dark'
              ? 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 50%, #ff4d4d 100%)'  // Red to yellow gradient for dark theme
              : 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 50%, #ff4d4d 100%)',  // Same gradient for light theme
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'gradientShift 6s ease infinite',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            textShadow: theme === 'dark' 
              ? '0 0 15px rgba(255, 77, 77, 0.5)' 
              : '0 3px 6px rgba(0, 0, 0, 0.16)',
            position: 'relative',
            zIndex: 1,
            padding: '0 0.5rem',
            transition: 'all 0.5s ease-in-out',
            fontFamily: 'Arial, sans-serif'
          }}>
            Lost in Space?
          </h1>
          <div style={{
            content: '""',
            position: 'absolute',
            bottom: '0.5rem',
            left: '0',
            width: '100%',
            height: '0.5rem',
            background: theme === 'dark'
              ? 'linear-gradient(90deg, rgba(0,242,254,0.1), rgba(79,172,254,0.3), rgba(0,242,254,0.1))'
              : 'linear-gradient(90deg, rgba(26,35,126,0.1), rgba(21,101,192,0.3), rgba(26,35,126,0.1))',
            borderRadius: '0.25rem',
            zIndex: 0,
            transition: 'all 0.5s ease-in-out',
            transform: 'scaleX(0.9) translateY(0.5rem)'
          }} />
        </div>
        
        <div style={{
          fontSize: '6rem',
          fontWeight: 900,
          margin: '0 0 0.5rem',
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 50%, #ff4d4d 100%)'  // Matching red to yellow gradient
            : 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 50%, #ff4d4d 100%)',  // Same gradient for light theme
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% auto',
          animation: 'gradientShift 6s ease infinite',
          lineHeight: 1,
          opacity: 0.9,
          textShadow: theme === 'dark' 
            ? '0 0 20px rgba(255, 77, 77, 0.5)' 
            : '0 3px 6px rgba(0, 0, 0, 0.16)',
          fontFamily: 'Arial, sans-serif'
        }}>
          404
        </div>
        
        <p style={{
          fontSize: '1.25rem',
          margin: '0 auto 2.5rem',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
          lineHeight: 1.7,
          maxWidth: '32rem',
          opacity: 0.9
        }}>
          The page you're looking for has been lost in the digital universe.
          Don't worry, we'll help you get back on track.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '2rem',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 1rem',
            gap: '0.5rem'
          }}>
            <Button
              themeColor="primary"
              fillMode="solid"
              onClick={() => navigate('/')}
              style={{
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.3)',
                transition: 'all 0.3s ease, transform 0.2s ease',
                transform: 'translateY(0)',
              }}
              className="primary-button"
            >
              🏡 Return Home
            </Button>
          </div>
          
          <Button
            fillMode="outline"
            onClick={() => window.history.back()}
            style={{
              padding: '0.8rem 2rem',
              borderRadius: '50px',
              border: theme === 'dark' 
                ? '2px solid rgba(255, 255, 255, 0.15)' 
                : '2px solid rgba(0, 0, 0, 0.1)',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
              background: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
              fontWeight: 500,
              fontSize: '1rem',
              transition: 'all 0.3s ease, transform 0.2s ease',
              transform: 'translateY(0)',
              boxSizing: 'border-box'
            }}
            className="secondary-button"
          >
            ↩️ Go Back
          </Button>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% { 
              transform: translateY(0) rotate(0deg);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% { 
              transform: translateY(-15px) rotate(5deg);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .emoji-container:hover {
            animation: none;
            transform: scale(1.1) !important;
          }

          .primary-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.4) !important;
          }

          .primary-button:active,
          .secondary-button:active {
            transform: translateY(0) !important;
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;