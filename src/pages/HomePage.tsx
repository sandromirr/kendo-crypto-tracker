import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
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

  const topCryptos = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$43,250', change: '+2.5%', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', price: '$2,680', change: '+1.8%', icon: 'Ξ' },
    { name: 'Binance Coin', symbol: 'BNB', price: '$315', change: '-0.5%', icon: '🟡' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.48', change: '+3.2%', icon: '🔵' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      transition: 'all 0.3s ease',
      color: theme === 'dark' ? 'white' : '#333'
    }}>
      <ThemeToggle />
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'float 20s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease'
          }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '900',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Crypto Tracker Pro
            </h1>
            
            <p style={{
              fontSize: '1.5rem',
              marginBottom: '2rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 2rem auto',
              lineHeight: '1.6'
            }}>
              Track, analyze, and manage your cryptocurrency investments with professional-grade tools and real-time market data.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <Button
                themeColor="primary"
                fillMode="solid"
                size="large"
                onClick={() => navigate('/portfolio')}
                style={{
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  borderRadius: '50px',
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                🚀 Start Tracking
              </Button>
              
              <Button
                themeColor="base"
                fillMode="outline"
                size="large"
                onClick={() => navigate('/coin')}
                style={{
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  borderRadius: '50px',
                  border: '2px solid rgba(255,255,255,0.5)',
                  color: 'white',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                📊 View Markets
              </Button>
            </div>

            {/* Live Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease ${0.2 + index * 0.1}s`
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '4rem 2rem',
        background: theme === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        color: theme === 'dark' ? 'white' : '#333',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: theme === 'dark' ? 'white' : '#2c3e50'
            }}>
              Professional-grade Tools & Insights
            </h2>
            <p style={{
              fontSize: '1.2rem',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
              color: theme === 'dark' ? '#b3b3b3' : '#7f8c8d'
            }}>
              Professional-grade tools and insights to help you navigate the cryptocurrency market with confidence.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                style={{
                  border: 'none',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s ease ${0.4 + index * 0.1}s`,
                  background: theme === 'dark' 
                    ? 'linear-gradient(135deg, #2d2d2d, #1e1e1e)' 
                    : 'linear-gradient(135deg, #fff, #f8f9fa)'
                }}
              >
                <CardBody style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    display: 'block'
                  }}>
                    {feature.icon}
                  </div>
                  <CardTitle style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: theme === 'dark' ? '#ffffff' : '#2c3e50',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </CardTitle>
                  <p style={{
                    color: theme === 'dark' ? '#b3b3b3' : '#7f8c8d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Cryptocurrencies Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          animation: 'float 25s ease-in-out infinite',
          zIndex: 0
        }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #fff, #64b5f6, #42a5f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              Top Cryptocurrencies
            </h2>
            <p style={{
              fontSize: '1.3rem',
              opacity: 0.9,
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Track the most popular cryptocurrencies and their real-time performance with live market data.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {topCryptos.map((crypto, index) => (
              <Card
                key={crypto.symbol}
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + index * 0.1}s`,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-10px) scale(1.02)';
                  target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0) scale(1)';
                  target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                }}
              >
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: crypto.change.startsWith('+') 
                    ? 'linear-gradient(90deg, #4caf50, #8bc34a)' 
                    : 'linear-gradient(90deg, #f44336, #ff9800)',
                  borderRadius: '20px 20px 0 0'
                }} />
                
                <CardBody style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                      }}>
                        {crypto.icon}
                      </div>
                      <div>
                        <div style={{ 
                          fontWeight: '700', 
                          fontSize: '1.3rem',
                          marginBottom: '0.25rem',
                          color: '#fff'
                        }}>
                          {crypto.name}
                        </div>
                        <div style={{ 
                          opacity: 0.7, 
                          fontSize: '1rem',
                          fontWeight: '500',
                          color: '#b0bec5'
                        }}>
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      backgroundColor: crypto.change.startsWith('+') ? '#4caf50' : '#f44336',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Animated arrow */}
                      <div style={{
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        animation: crypto.change.startsWith('+') ? 'pulse 2s ease-in-out infinite' : 'none'
                      }}>
                        {crypto.change.startsWith('+') ? (
                          <span style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            transform: 'rotate(-45deg)',
                            display: 'inline-block'
                          }}>
                            ↗
                          </span>
                        ) : (
                          <span style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            transform: 'rotate(45deg)',
                            display: 'inline-block'
                          }}>
                            ↘
                          </span>
                        )}
                      </div>
                      <span>{crypto.change}</span>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: '#fff',
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                      {crypto.price}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.7,
                      color: '#b0bec5'
                    }}>
                      USD
                    </div>
                  </div>

                  {/* Progress bar simulation */}
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: crypto.change.startsWith('+') ? '75%' : '45%',
                      height: '100%',
                      background: crypto.change.startsWith('+') 
                        ? 'linear-gradient(90deg, #4caf50, #8bc34a)' 
                        : 'linear-gradient(90deg, #f44336, #ff9800)',
                      borderRadius: '2px',
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  </div>

                  {/* Additional info */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    opacity: 0.8,
                    color: '#b0bec5'
                  }}>
                    <span>24h Volume</span>
                    <span style={{ fontWeight: '600' }}>
                      ${Math.floor(Math.random() * 1000)}M
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button
              themeColor="primary"
              fillMode="outline"
              size="large"
              onClick={() => navigate('/coin')}
              style={{
                padding: '15px 40px',
                fontSize: '1.2rem',
                fontWeight: '600',
                borderRadius: '50px',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              📊 View All Cryptocurrencies
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Ready to Start Your Crypto Journey?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Join thousands of traders who trust Crypto Tracker Pro for their investment decisions.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              themeColor="primary"
              fillMode="solid"
              size="large"
              onClick={() => navigate('/portfolio')}
              style={{
                padding: '18px 40px',
                fontSize: '1.3rem',
                fontWeight: '700',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              🚀 Get Started Now
            </Button>
            <Button
              themeColor="base"
              fillMode="outline"
              size="large"
              onClick={() => navigate('/settings')}
              style={{
                padding: '18px 40px',
                fontSize: '1.3rem',
                fontWeight: '700',
                borderRadius: '50px',
                border: '2px solid rgba(255,255,255,0.5)',
                color: 'white',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              ⚙️ Customize Settings
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        background: '#2c3e50',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ margin: 0, opacity: 0.8 }}>
            © 2024 Crypto Tracker Pro. Real-time cryptocurrency tracking and portfolio management.
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.6 }}>
            Last updated: {currentTime.toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
