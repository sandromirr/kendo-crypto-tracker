import React, { useState, useEffect } from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartTitle } from '@progress/kendo-react-charts';
import { Card, CardTitle, CardBody, CardSubtitle, CardHeader } from '@progress/kendo-react-layout';
import { Skeleton } from '@progress/kendo-react-indicators';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import Header from '../components/Header';
import '../styles/PortfolioPage.css';

type GridCellProps = {
  dataItem: any;
  field?: string;
  className?: string;
};

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  quantity: number;
  value: number;
  price_change_percentage_24h: number;
  value_change_24h: number;
}

interface PortfolioData {
  total_value: number;
  total_change_24h: number;
  change_percentage_24h: number;
  history: { date: string; value: number }[];
  coins: Coin[];
}

const PortfolioPage: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    // Simulate API call to fetch portfolio data
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // In a real app, replace this with an actual API call
        const mockData: PortfolioData = {
          total_value: 12850.75,
          total_change_24h: 325.50,
          change_percentage_24h: 2.6,
          history: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: 9000 + Math.random() * 4000
          })),
          coins: [
            {
              id: 'bitcoin',
              symbol: 'btc',
              name: 'Bitcoin',
              image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
              current_price: 45000,
              quantity: 0.15,
              value: 6750,
              price_change_percentage_24h: 2.5,
              value_change_24h: 125.25
            },
            {
              id: 'ethereum',
              symbol: 'eth',
              name: 'Ethereum',
              image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
              current_price: 3200,
              quantity: 1.2,
              value: 3840,
              price_change_percentage_24h: 3.2,
              value_change_24h: 85.30
            },
            {
              id: 'cardano',
              symbol: 'ada',
              name: 'Cardano',
              image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
              current_price: 1.25,
              quantity: 1000,
              value: 1250,
              price_change_percentage_24h: -1.5,
              value_change_24h: -18.75
            },
            {
              id: 'solana',
              symbol: 'sol',
              name: 'Solana',
              image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
              current_price: 105.50,
              quantity: 10,
              value: 1055,
              price_change_percentage_24h: 5.2,
              value_change_24h: 52.10
            }
          ]
        };
        
        setData(mockData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setPageSize(Number(e.target.value));
  };

  if (loading || !data) {
    return (
      <div className="coin-list-container">
        <Header />
        <div style={{ padding: '1rem' }}>
          <Skeleton shape="text" style={{ width: '200px', height: '32px' }} />
          <Skeleton shape="text" style={{ width: '300px', height: '24px', marginTop: '8px' }} />
          <div style={{ marginTop: '1.5rem' }}>
            <Skeleton shape="rectangle" style={{ height: '300px', width: '100%' }} />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Skeleton shape="rectangle" style={{ height: '400px', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <Header />
      <div className="portfolio-header">
        <h1>Portfolio Overview</h1>
        <p>Track your cryptocurrency investments and performance in real-time</p>
      </div>

      {/* Portfolio Summary */}
      <div className="summary-grid">
        <Card className="card">
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-3xl font-bold">{formatCurrency(data.total_value)}</div>
          </CardBody>
        </Card>
        <Card className="card">
          <CardBody>
            <CardSubtitle>24h Change</CardSubtitle>
            <div className="flex items-center">
              <CardTitle className={`text-2xl font-bold ${data.total_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(data.total_change_24h)}
              </CardTitle>
              <span className={`ml-2 text-sm ${data.change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({formatPercentage(data.change_percentage_24h)})
              </span>
            </div>
          </CardBody>
        </Card>
        <Card className="card">
          <CardBody>
            <CardSubtitle>Assets</CardSubtitle>
            <CardTitle className="text-2xl font-bold">{data.coins.length}</CardTitle>
          </CardBody>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <Card className="card">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
          <div style={{ height: '300px' }}>
            <Chart>
              <ChartTitle text="Portfolio Value (30 Days)" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={data.history.map(item => item.date)} />
              </ChartCategoryAxis>
              <ChartValueAxis>
                <ChartValueAxisItem labels={{ format: '${0}' }} />
              </ChartValueAxis>
              <ChartSeries>
                <ChartSeriesItem 
                  type="line" 
                  data={data.history.map(item => item.value)}
                  markers={{ visible: false }}
                  style="smooth"
                />
              </ChartSeries>
            </Chart>
          </div>
        </CardBody>
      </Card>

      {/* Portfolio Holdings */}
      <Card className="card">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
          <div className="grid-container">
            <Grid
              data={data.coins.slice((page - 1) * pageSize, page * pageSize)}
              style={{ height: '500px' }}
              className="grid"
              resizable
              reorderable
              sortable
            >
              <GridColumn 
                field="name" 
                title="Asset" 
                width={250}
                cells={{
                  data: (props: GridCellProps) => {
                    const coin = props.dataItem as Coin;
                    return (
                      <td className="px-4 py-2">
                        <div className="coin-cell">
                          <img 
                            src={coin.image} 
                            alt={coin.name}
                            className="coin-image"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="coin-info">
                            <div className="coin-name">{coin.name}</div>
                            <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="current_price" 
                title="Price" 
                cells={{
                  data: (props: GridCellProps) => {
                    const coin = props.dataItem as Coin;
                    return (
                      <td className="text-right">
                        {formatCurrency(coin.current_price)}
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="quantity" 
                title="Quantity" 
                cells={{
                  data: (props: GridCellProps) => {
                    const coin = props.dataItem as Coin;
                    const quantity = coin.quantity;
                    return (
                      <td className="text-right">
                        {quantity < 0.000001 ? quantity.toExponential(4) : quantity.toFixed(6).replace(/\.?0+$/, '')}
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="value" 
                title="Value" 
                cells={{
                  data: (props: GridCellProps) => {
                    const coin = props.dataItem as Coin;
                    return (
                      <td className="text-right" style={{ fontWeight: 500 }}>
                        {formatCurrency(coin.value)}
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="price_change_percentage_24h" 
                title="24h %" 
                cells={{
                  data: (props: GridCellProps) => {
                    const coin = props.dataItem as Coin;
                    const change = coin.price_change_percentage_24h;
                    return (
                      <td className={`text-right ${change >= 0 ? 'green' : 'red'}`} style={{ fontWeight: 500 }}>
                        {formatPercentage(change)}
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="value_change_24h" 
                title="24h Change" 
                cells={{
                  data: (props: GridCellProps) => {
                    const coin = props.dataItem as Coin;
                    const change = coin.value_change_24h;
                    return (
                      <td className={`px-4 py-2 text-right font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(change)}
                      </td>
                    );
                  }
                }}
              />
            </Grid>
            <div className="pagination-container">
              <div className="pagination-mobile">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="pagination-button"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page * pageSize >= data.coins.length}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
              <div className="pagination-desktop">
                <div>
                  <p className="pagination-info">
                    Showing <span style={{ fontWeight: 500 }}>{(page - 1) * pageSize + 1}</span> to{' '}
                    <span style={{ fontWeight: 500 }}>
                      {Math.min(page * pageSize, data.coins.length)}
                    </span>{' '}
                    of <span style={{ fontWeight: 500 }}>{data.coins.length}</span> results
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.25rem 0 0 0.25rem',
                        backgroundColor: 'white',
                        color: '#4B5563',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={20}>20 per page</option>
                    </select>
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="pagination-button"
                      style={{
                        borderRadius: '0',
                        borderLeft: 'none',
                        borderRight: 'none'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem' }}>←</span>
                    </button>
                    <span className="pagination-page">
                      Page {page}
                    </span>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page * pageSize >= data.coins.length}
                      className="pagination-button"
                      style={{
                        borderRadius: '0 0.375rem 0.375rem 0',
                        borderLeft: 'none'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem' }}>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PortfolioPage;
