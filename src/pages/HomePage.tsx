import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody, CardTitle, PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
// Dialog component removed as we're using a custom implementation
import { faqs } from '../data/faq-data';
import { features } from '../data/features-data';
import { stats } from '../data/stats-data';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnswer(`I received your question: "${question}"`);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-content" 
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible ? 1 : 0
          }}
        >
          <h1 className="hero-title">
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
              className="primary-button primary-button-outline"
              themeColor="primary"
              fillMode="outline"
              size="large"
              onClick={() => navigate('/coins')}
              aria-label="View markets and coins list"
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
                className={`stat-card stat-item ${isVisible ? 'visible' : ''}`}
                role="group"
                aria-labelledby={`stat-${index}-label`}
                style={{
                  transitionDelay: `${0.2 + index * 0.1}s`
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

      {/* Education Section */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e9ecef',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '3rem',
            fontSize: '2rem',
            fontWeight: '600',
            color: '#212529'
          }}>
            Crypto Education Center
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {[
              {
                title: 'Getting Started with Crypto',
                description: 'Learn the basics of cryptocurrency, blockchain technology, and how to safely enter the crypto space.',
                icon: '📚',
                level: 'Beginner',
                duration: '15 min read'
              },
              {
                title: 'Trading Strategies',
                description: 'Discover different trading strategies, from day trading to HODLing, and find what works for you.',
                icon: '📈',
                level: 'Intermediate',
                duration: '20 min read'
              },
              {
                title: 'Security Best Practices',
                description: 'Essential security measures to protect your crypto assets from common threats and scams.',
                icon: '🔒',
                level: 'All Levels',
                duration: '10 min read'
              }
            ].map((lesson, index) => (
              <Card key={index} style={{ 
                height: '100%',
                boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                border: 'none',
                borderRadius: '8px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 25px rgba(0,0,0,0.12)'
                }
              }}>
                <CardBody style={{ 
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 0 auto'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem'
                  }}>
                    {lesson.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#212529'
                  }}>
                    {lesson.title}
                  </h3>
                  <p style={{
                    color: '#6c757d',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {lesson.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e9ecef'
                  }}>
                    <span style={{
                      backgroundColor: '#e9ecef',
                      color: '#495057',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {lesson.level}
                    </span>
                    <span style={{
                      color: '#6c757d',
                      fontSize: '0.875rem'
                    }}>
                      {lesson.duration}
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <Button
              themeColor="primary"
              rounded="medium"
              onClick={() => navigate('/education')}
              style={{
                padding: '0.75rem 2rem',
                fontWeight: '600'
              }}
            >
              Explore All Learning Resources
            </Button>
          </div>
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
      {/* Assistant Button */}
      <Button
        className="assistant-button"
        themeColor="primary"
        fillMode="solid"
        icon="question"
        onClick={() => setIsAssistantOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          padding: 0,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
        aria-label="Open assistant"
      >
        <span aria-hidden>{isAssistantOpen ? '✕' : '💬'}</span>
      </Button>

      {/* Assistant Dialog */}
      {isAssistantOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '350px',
          maxHeight: '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 5px 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#3f51b5',
            color: 'white',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Crypto Assistant</h3>
            <Button
              fillMode="flat"
              themeColor="light"
              icon="x"
              onClick={() => {
                setIsAssistantOpen(false);
                setQuestion('');
                setAnswer('');
              }}
              style={{ color: 'white', padding: '4px' }}
              aria-label="Close assistant"
            />
          </div>
          <div style={{
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}>
            <div style={{ marginBottom: '15px', marginTop: 'auto' }}>
              <div style={{
                backgroundColor: '#f5f5f5',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#333'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>👋 Hi there! I'm your crypto assistant.</p>
                <p style={{ margin: '8px 0 0 0' }}>Ask me anything about cryptocurrencies and trading!</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <div style={{ 
                  flex: 1,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      paddingRight: '40px',
                      borderRadius: '20px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                      // Focus styles are handled by CSS
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                  />
                  <button
                    onClick={handleAskQuestion}
                    disabled={isLoading || !question.trim()}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: question.trim() ? '#3f51b5' : '#ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}
                  >
                    {isLoading ? '...' : '→'}
                  </button>
                </div>
              </div>
            </div>
            
            {answer && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: '#f0f4ff',
                borderRadius: '8px',
                borderTopLeftRadius: '4px',
                alignSelf: 'flex-start',
                maxWidth: '85%',
                position: 'relative',
                marginBottom: '8px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '-8px',
                  width: '0',
                  height: '0',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '8px solid #f0f4ff'
                }} />
                {answer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;