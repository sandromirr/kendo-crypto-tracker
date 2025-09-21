import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody, CardTitle, PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
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

  const faqs = [
    {
      q: 'How often are prices updated?',
      a: 'Prices are updated in real-time using the latest available market data from our provider.'
    },
    {
      q: 'Can I import my portfolio?',
      a: 'Yes — you can manually add holdings today. CSV import is coming soon.'
    },
    {
      q: 'Are alerts available?',
      a: 'You can set up price alerts from the coin details page; push and email alerts will be available later.'
    }
    ,
    {
      q: 'Where does your data come from?',
      a: 'We aggregate market data from leading public APIs and exchanges to give broad coverage and redundancy.'
    },
    {
      q: 'Is my data secure?',
      a: 'We follow best practices for data storage and transport. Sensitive data is encrypted in transit. For production use, ensure you follow our security recommendations.'
    },
    {
      q: 'Do you offer an API?',
      a: 'A public API is planned. For now, use the UI. If you need programmatic access, reach out via our contact channels.'
    },
    {
      q: 'Which coins are supported?',
      a: 'We cover the top 10,000 cryptocurrencies by market presence and continuously add more as data sources expand.'
    },
    {
      q: 'Is there a mobile app?',
      a: 'A mobile app is in our roadmap. The web app is mobile-responsive today for on-the-go use.'
    }
  ];

  return (
    <div className="home-container">
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)',
        padding: '6rem 0 5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        backgroundSize: '200% 200%',
        animation: 'gradientBG 15s ease infinite'
      }}>
        <div className="hero-content" style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible ? 1 : 0
        }}>
          <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
            Crypto Tracker Pro
          </h1>
          
          <p className="hero-description">
            Track, analyze, and manage your cryptocurrency investments with professional-grade tools and real-time market data.
          </p>

          <div className="hero-buttons" role="group" aria-label="Primary actions">
            <Button
              className="primary-button"
              themeColor="primary"
              fillMode="solid"
              size="large"
              onClick={() => navigate('/portfolio')}
              aria-label="Start tracking your portfolio"
            >
              <span aria-hidden>🚀</span>
              <span>Start Tracking</span>
            </Button>

            <Button
              className="primary-button"
              themeColor="primary"
              fillMode="solid"
              size="large"
              onClick={() => navigate('/coin-list')}
              aria-label="View markets and coins list"
              style={{ color: 'white', borderColor: 'white' }}
            >
              <span aria-hidden>📊</span>
              <span>View Markets</span>
            </Button>
          </div>

          {/* Stats */}
          <dl className="stats-grid" aria-label="Platform statistics">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="stat-card stat-item"
                role="group"
                aria-labelledby={`stat-${index}-label`}
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s ease ${0.2 + index * 0.1}s`
                }}
              >
                <dt className="stat-icon" id={`stat-${index}-label`}>
                  {stat.icon}
                </dt>
                <dd className="stat-value">
                  {stat.value}
                </dd>
                <dd className="stat-label">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" style={{
        padding: '6rem 0',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <h2 className="section-title" style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontSize: '2rem',
            fontWeight: '500',
            color: '#333'
          }}>
            Powerful Features
          </h2>

          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card" role="article" aria-label={feature.title}>
                <CardBody className="feature-card-body">
                  <div className="feature-icon" aria-hidden>
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
        </div>
      </section>

      {/* Cryptocurrency Cards Section */}
      <section style={{ 
        padding: '4rem 0 6rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2.5rem',
          fontSize: '2rem',
          fontWeight: '500',
          color: '#333'
        }}>
          Top Cryptocurrencies
        </h2>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          maxWidth: '1200px',
          width: '100%',
          padding: '0 1rem'
        }}>
          {[
            { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 45032.12, change24h: 2.34, icon: '₿' },
            { id: 2, symbol: 'ETH', name: 'Ethereum', price: 2387.45, change24h: -1.23, icon: 'Ξ' },
            { id: 3, symbol: 'BNB', name: 'Binance Coin', price: 312.67, change24h: 0.56, icon: '🪙' },
            { id: 4, symbol: 'SOL', name: 'Solana', price: 98.76, change24h: 5.67, icon: '◎' },
            { id: 5, symbol: 'XRP', name: 'Ripple', price: 0.78, change24h: 1.25, icon: '✕' },
            { id: 6, symbol: 'ADA', name: 'Cardano', price: 1.45, change24h: -0.89, icon: '₳' }
          ].map((crypto) => (
            <Card key={crypto.id} style={{ 
              height: '100%', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              width: '280px',
              transition: 'transform 0.2s ease-in-out',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardBody style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                padding: '1.5rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ 
                    fontSize: '2.5rem',
                    marginRight: '0.75rem',
                    lineHeight: 1
                  }} aria-hidden="true">
                    {crypto.icon}
                  </span>
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#212529'
                    }}>
                      {crypto.symbol}
                    </h3>
                    <small style={{ color: '#6c757d', fontSize: '0.875rem' }}>{crypto.name}</small>
                  </div>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#212529'
                  }}>
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25em 0.75em',
                    borderRadius: '20px',
                    backgroundColor: crypto.change24h >= 0 ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                    color: crypto.change24h >= 0 ? '#198754' : '#dc3545',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    gap: '0.5rem'
                  }}>
                    {crypto.change24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.change24h)}%
                    <span style={{ color: '#6c757d', fontWeight: '400' }}>24h</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ / Q&A Section */}
      <section className="faq-section" style={{
        padding: '6rem 0',
        backgroundColor: '#f8f9ff',
        borderTop: '1px solid #eef0ff'
      }}>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-inner">
          <PanelBar className="faq-panel">
            {faqs.map((f, i) => (
              <PanelBarItem title={f.q} key={i}>
                <div className="faq-answer">{f.a}</div>
              </PanelBarItem>
            ))}
          </PanelBar>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo" aria-label="Site footer" style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '3rem 0 2rem',
        marginTop: '0'
      }}>
        <div className="footer-min">
          <div className="footer-left">
            <span className="footer-brand">Crypto Tracker Pro</span>
            <span className="footer-sep">•</span>
            <span className="footer-copy">© {new Date().getFullYear()}</span>
          </div>
          <div className="footer-right">
            <div className="footer-socials" aria-label="Social links">
              <span className="visually-hidden">Follow us</span>
              <a href="#" title="Twitter" aria-label="Twitter" rel="noopener noreferrer">🐦</a>
              <a href="#" title="GitHub" aria-label="GitHub" rel="noopener noreferrer">💻</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;