import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import '../styles/NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className={`not-found-container ${isVisible ? 'visible' : ''}`}>
      {/* Decorative elements */}
      <div className="decorative-circle-1" />
      <div className="decorative-circle-2" />

      <div className={`not-found-content ${isVisible ? 'visible' : ''}`}>
        <div className="emoji-container">
          {currentEmoji}
        </div>
        
        <div className="title-container">
          <h1 className="not-found-title">
            Lost in Space?
          </h1>
          <div className="title-underline" />
        </div>

        <div className="not-found-subtitle">
          <h1 className="error-code">
            404
          </h1>
        </div>
        
        <p className="not-found-description">
          The page you're looking for has been lost in the digital universe.
          Don't worry, we'll help you get back on track.
        </p>
        
        <div className="button-container">
          <div className="button-group">
            <Button
              className="primary-button"
              themeColor="primary"
              fillMode="solid"
              onClick={() => navigate('/')}
            >
              🏡 Return Home
            </Button>
          </div>
          <div className="button-group">
            <Button
              className="secondary-button"
              fillMode="outline"
              onClick={() => window.history.back()}
            >
              ↩️ Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;