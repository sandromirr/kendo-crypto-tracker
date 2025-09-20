import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor cryptocurrency prices and market trends in real-time with live updates.',
      color: 'primary'
    },
    {
      icon: '💼',
      title: 'Portfolio Management',
      description: 'Track your investments and analyze portfolio performance with detailed analytics.',
      color: 'success'
    },
    {
      icon: '📈',
      title: 'Market Analysis',
      description: 'Get insights into market trends and make informed trading decisions.',
      color: 'warning'
    },
    {
      icon: '🔔',
      title: 'Price Alerts',
      description: 'Set custom price alerts and never miss important market movements.',
      color: 'info'
    }
  ];

  const stats = [
    { label: 'Cryptocurrencies', value: '10,000+', icon: '🪙' },
    { label: 'Active Users', value: '1M+', icon: '👥' },
    { label: 'Markets Tracked', value: '500+', icon: '🌍' },
    { label: 'Price Updates', value: '24/7', icon: '⚡' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content" style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible ? 1 : 0
        }}>
          <h1 className="hero-title">
            Crypto Tracker Pro
          </h1>
          
          <p className="hero-description">
            Track, analyze, and manage your cryptocurrency investments with professional-grade tools and real-time market data.
          </p>

          <div className="hero-buttons">
            <Button
              className="primary-button"
              themeColor="primary"
              fillMode="solid"
              size="large"
              onClick={() => navigate('/portfolio')}
            >
              🚀 Start Tracking
            </Button>
            
            <Button
              className="secondary-button"
              themeColor="base"
              fillMode="outline"
              size="large"
              onClick={() => navigate('/coin-list')}
            >
              📊 View Markets
            </Button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="stat-card"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s ease ${0.2 + index * 0.1}s`
                }}
              >
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-value">
                  {stat.value}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">
          Powerful Features
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <CardBody className="feature-card-body">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <CardTitle className="feature-title">
                  {feature.title}
                </CardTitle>
                <p className="feature-description">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Crypto Tracker Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
