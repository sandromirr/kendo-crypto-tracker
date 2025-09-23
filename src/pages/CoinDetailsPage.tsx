import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartTooltip } from '@progress/kendo-react-charts';
import { Skeleton } from '@progress/kendo-react-indicators';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

// Styled components
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CoinHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PriceChange = styled.span<{ positive: boolean }>`
  color: ${props => props.positive ? '#00c853' : '#ff3d00'};
  font-weight: bold;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 1rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

// Mock data - replace with actual API call
const mockCoinData = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  current_price: 50000,
  price_change_percentage_24h: 2.5,
  market_cap: 950000000000,
  total_volume: 25000000000,
  high_24h: 51000,
  low_24h: 49500,
  price_change_24h: 1250,
  price_change_percentage_7d: -1.5,
  price_change_percentage_30d: 15.5,
  circulating_supply: 18938181,
  total_supply: 21000000,
  description: 'Bitcoin (BTC) is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. Bitcoin was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto and started in 2009 when its source code was released as open-source software.',
  links: {
    homepage: ['https://bitcoin.org/'],
    blockchain_site: [
      'https://blockchair.com/bitcoin/',
      'https://www.blockchain.com/explorer/assets/btc',
      'https://blockstream.info/'
    ],
    official_forum_url: [
      'https://bitcointalk.org/',
      'https://bitcoin.stackexchange.com/'
    ],
    repos_url: {
      github: ['https://github.com/bitcoin/bitcoin'],
      bitbucket: []
    }
  },
  sparkline_in_7d: {
    price: Array(7).fill(0).map((_, i) => 48000 + Math.random() * 4000 - 2000)
  }
};

interface Purchase {
  id: string;
  coinId: string;
  amount: number;
  pricePerCoin: number;
  date: string;
  totalValue: number;
  currentValue: number;
  profitLoss: number;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
  description: string;
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
}

const CoinDetailsPage: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  // Mock purchase data - in a real app, this would come from your backend
  useEffect(() => {
    // Simulate fetching purchases for this coin
    const mockPurchases: Purchase[] = [
      {
        id: '1',
        coinId: coinId || '',
        amount: 0.5,
        pricePerCoin: 45000,
        date: '2025-08-15',
        totalValue: 22500,
        currentValue: coin ? (0.5 * coin.current_price) : 0,
        profitLoss: coin ? (0.5 * coin.current_price - 22500) : 0
      },
      {
        id: '2',
        coinId: coinId || '',
        amount: 0.75,
        pricePerCoin: 48000,
        date: '2025-09-01',
        totalValue: 36000,
        currentValue: coin ? (0.75 * coin.current_price) : 0,
        profitLoss: coin ? (0.75 * coin.current_price - 36000) : 0
      }
    ];
    setPurchases(mockPurchases);
  }, [coinId, coin]);

  useEffect(() => {
    // Simulate API call
    const fetchCoinData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API:
        // const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?sparkline=true`);
        // const data = await response.json();
        // setCoin(data);
        
        // Using mock data for now
        setTimeout(() => {
          setCoin(mockCoinData as any);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return formatCurrency(num);
  };

  if (loading) {
    return (
      <PageContainer>
        <Skeleton shape={'text'} style={{ width: '200px', height: '40px' }} />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <Skeleton shape={'rectangle'} style={{ width: '100%', height: '400px' }} />
        </div>
      </PageContainer>
    );
  }

  if (!coin) {
    return <PageContainer>Coin not found</PageContainer>;
  }

  const chartData = coin.sparkline_in_7d.price.map((price, index) => ({
    value: price,
    category: `${index + 1}d ago`
  }));

  return (
    <PageContainer>
      <Header>
        <CoinHeader>
          <img src={coin.image} alt={coin.name} style={{ width: '40px', height: '40px' }} />
          <div>
            <h1 style={{ margin: 0 }}>{coin.name} ({coin.symbol.toUpperCase()})</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h2 style={{ margin: '0.5rem 0' }}>{formatCurrency(coin.current_price)}</h2>
              <PriceChange positive={coin.price_change_percentage_24h >= 0}>
                {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}% (24h)
              </PriceChange>
            </div>
          </div>
        </CoinHeader>
        <div>
          <Button fillMode="outline" style={{ marginRight: '0.5rem' }}>Add to Watchlist</Button>
          <Button themeColor="primary">Buy/Sell</Button>
        </div>
      </Header>

      <Card style={{ marginBottom: '2rem' }}>
        <CardBody>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <Button onClick={() => setTimeRange('24h')} fillMode={timeRange === '24h' ? 'solid' : 'outline'}>24h</Button>
            <Button onClick={() => setTimeRange('7d')} fillMode={timeRange === '7d' ? 'solid' : 'outline'}>7d</Button>
            <Button onClick={() => setTimeRange('30d')} fillMode={timeRange === '30d' ? 'solid' : 'outline'}>30d</Button>
          </div>
          <div style={{ height: '400px' }}>
            <Chart>
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={chartData.map(item => item.category)} />
              </ChartCategoryAxis>
              <ChartValueAxis>
                <ChartValueAxisItem />
              </ChartValueAxis>
              <ChartSeries>
                <ChartSeriesItem 
                  type="line" 
                  data={chartData.map(item => item.value)}
                  color={coin.price_change_percentage_24h >= 0 ? '#00c853' : '#ff3d00'}
                  markers={{ visible: false }}
                />
              </ChartSeries>
              <ChartTooltip format="{0:c}" />
            </Chart>
          </div>
        </CardBody>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardBody>
          <h2 style={{ marginTop: 0 }}>About {coin.name}</h2>
          <p style={{ lineHeight: '1.6', color: '#333' }}>{coin.description}</p>
          
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Official Links</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {coin.links.homepage.map((link, index) => (
                <Button 
                  key={`homepage-${index}`}
                  themeColor="primary"
                  fillMode="outline"
                  onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
                >
                  Website
                </Button>
              ))}
              {coin.links.repos_url.github.map((repo, index) => (
                <Button 
                  key={`github-${index}`}
                  fillMode="outline"
                  onClick={() => window.open(repo, '_blank', 'noopener,noreferrer')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fab fa-github"></i> GitHub
                  </span>
                </Button>
              ))}
              {coin.links.blockchain_site.slice(0, 2).map((site, index) => (
                site && (
                  <Button 
                    key={`blockchain-${index}`}
                    fillMode="outline"
                    onClick={() => window.open(site, '_blank', 'noopener,noreferrer')}
                  >
                    Explorer {index + 1}
                  </Button>
                )
              ))}
              {coin.links.official_forum_url[0] && (
                <Button 
                  fillMode="outline"
                  onClick={() => window.open(coin.links.official_forum_url[0], '_blank', 'noopener,noreferrer')}
                >
                  Community
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <h2>Market Stats</h2>
      <StatsGrid>
        <StatCard>
          <StatLabel>Market Cap</StatLabel>
          <StatValue>{formatLargeNumber(coin.market_cap)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>24h Trading Volume</StatLabel>
          <StatValue>{formatLargeNumber(coin.total_volume)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>24h High / Low</StatLabel>
          <StatValue>
            {formatCurrency(coin.high_24h)} / {formatCurrency(coin.low_24h)}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Price Change (24h)</StatLabel>
          <StatValue>
            <PriceChange positive={coin.price_change_24h >= 0}>
              {coin.price_change_24h >= 0 ? '+' : ''}{formatCurrency(coin.price_change_24h)}
            </PriceChange>
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>7d Change</StatLabel>
          <StatValue>
            <PriceChange positive={coin.price_change_percentage_7d >= 0}>
              {coin.price_change_percentage_7d >= 0 ? '+' : ''}{coin.price_change_percentage_7d.toFixed(2)}%
            </PriceChange>
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>30d Change</StatLabel>
          <StatValue>
            <PriceChange positive={coin.price_change_percentage_30d >= 0}>
              {coin.price_change_percentage_30d >= 0 ? '+' : ''}{coin.price_change_percentage_30d.toFixed(2)}%
            </PriceChange>
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Circulating Supply</StatLabel>
          <StatValue>{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Supply</StatLabel>
          <StatValue>{coin.total_supply.toLocaleString()} {coin.symbol.toUpperCase()}</StatValue>
        </StatCard>
      </StatsGrid>

      {/* My Purchases Section */}
      <div style={{ marginTop: '3rem' }}>
        <h2>My {coin?.name} Purchases</h2>
        {purchases.length > 0 ? (
          <div style={{ marginTop: '1rem' }}>
            {/* Summary Cards */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div>
                <h3>Total Investment</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {purchases.reduce((sum, p) => sum + p.totalValue, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </div>
              <div>
                <h3>Current Value</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {purchases.reduce((sum, p) => sum + p.currentValue, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </div>
              <div>
                <h3>Total Profit/Loss</h3>
                {(() => {
                  const totalProfitLoss = purchases.reduce((sum, p) => sum + p.profitLoss, 0);
                  const totalInvested = purchases.reduce((sum, p) => sum + p.totalValue, 0);
                  const percentage = (totalProfitLoss / totalInvested) * 100;
                  return (
                    <div 
                      key="profit-loss"
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: totalProfitLoss >= 0 ? '#00c853' : '#ff3d00' 
                      }}
                    >
                      {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                        ({percentage.toFixed(2)}%)
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Purchases Table */}
            <Grid data={purchases} style={{ marginBottom: '2rem' }}>
              <GridColumn field="date" title="Date" width="120px" />
              <GridColumn field="amount" title="Amount" width="120px" format="{0:n4}" />
              <GridColumn field="pricePerCoin" title="Price/Coin" format="{0:c2}" width="150px" />
              <GridColumn field="totalValue" title="Total Paid" format="{0:c2}" width="150px" />
              <GridColumn field="currentValue" title="Current Value" format="{0:c2}" width="150px" />
              <GridColumn 
                field="profitLoss" 
                title="P/L" 
                width="150px"
                cells={{
                  data: (props: any) => {
                    const profitLoss = props.dataItem.profitLoss;
                    const totalValue = props.dataItem.totalValue;
                    const percentage = (profitLoss / totalValue) * 100;
                    const isPositive = profitLoss >= 0;
                    return (
                      <span style={{ color: isPositive ? '#00c853' : '#ff3d00' }}>
                        {isPositive ? '+' : ''}{profitLoss.toFixed(2)} $
                        ({percentage.toFixed(2)}%)
                      </span>
                    );
                  }
                }}
              />
            </Grid>
          </div>
        ) : (
          <Card style={{ padding: '2rem', textAlign: 'center' }}>
            <p>You haven't purchased any {coin?.name} yet.</p>
            <Button themeColor="primary" style={{ marginTop: '1rem' }}>
              Buy {coin?.symbol.toUpperCase()}
            </Button>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default CoinDetailsPage;
