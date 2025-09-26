import React, { useState, useEffect } from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartTitle } from '@progress/kendo-react-charts';
import { Card, CardTitle, CardBody, CardHeader } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Skeleton } from '@progress/kendo-react-indicators';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
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

interface InvestmentFormValues {
  coinId: string;
  amount: number;
  price: number;
  date: string;
  notes: string;
}

const PortfolioPage: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showAddInvestment, setShowAddInvestment] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  
  const availableCoins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'tether', name: 'Tether', symbol: 'USDT' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'xrp', name: 'XRP', symbol: 'XRP' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH' },
    { id: 'stellar', name: 'Stellar', symbol: 'XLM' },
    { id: 'uniswap', name: 'Uniswap', symbol: 'UNI' },
    { id: 'ethereum-classic', name: 'Ethereum Classic', symbol: 'ETC' },
    { id: 'monero', name: 'Monero', symbol: 'XMR' },
    { id: 'eos', name: 'EOS', symbol: 'EOS' },
    { id: 'aave', name: 'Aave', symbol: 'AAVE' }
  ];

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

  const handleAddInvestment = (values: { [name: string]: any }) => {
    const investment: InvestmentFormValues = {
      coinId: values.coinId as string,
      amount: parseFloat(values.amount) || 0,
      price: parseFloat(values.price) || 0,
      date: values.date as string,
      notes: values.notes as string
    };
    
    console.log('Adding investment:', investment);
    setSelectedCoin(null);
    setShowAddInvestment(false);
    
    // Here you would typically make an API call to save the investment
    // For now, we'll just show an alert
    alert(`Added investment: ${values.amount} ${selectedCoin?.name} at $${values.price} each`);
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

  const renderInvestmentForm = (
    <Dialog
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Add New Investment</span>
          <Button 
            icon="x" 
            fillMode="flat" 
            onClick={() => {
              setShowAddInvestment(false);
              setSelectedCoin(null);
            }}
            style={{ color: 'var(--text-secondary)' }}
          />
        </div>
      }
      onClose={() => {
        setShowAddInvestment(false);
        setSelectedCoin(null);
      }}
      width={450}
      style={{ borderRadius: '12px', overflow: 'hidden' }}
    >
      <Form
        onSubmit={handleAddInvestment}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: '100%' }}>
            <FieldWrapper>
              <div className="k-form-field" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>Cryptocurrency</label>
                <Field
                  name="coinId"
                  component={DropDownList}
                  data={availableCoins}
                  dataItemKey="id"
                  textField="name"
                  value={selectedCoin}
                  onChange={(e: any) => setSelectedCoin(e.value)}
                  required={true}
                  placeholder="Select a cryptocurrency..."
                  style={{ width: '100%', borderRadius: '6px', borderColor: 'var(--border-color)' }}
                  filterable={true}
                  clearButton={true}
                  itemRender={(li: any, itemProps: any) => {
                    const item = itemProps.dataItem;
                    const itemChildren = (
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.name}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>{item.symbol}</span>
                      </div>
                    );
                    return React.cloneElement(li, li.props, itemChildren);
                  }}
                />
              </div>
              <div className="k-form-field" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>Amount</label>
                <Field
                  name="amount"
                  component={NumericTextBox}
                  required={true}
                  min={0.00000001}
                  format="n8"
                  spinners={false}
                  style={{ width: '100%', borderRadius: '6px', borderColor: 'var(--border-color)' }}
                  placeholder="0.00000000"
                />
              </div>
              <div className="k-form-field" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>Price per Coin (USD)</label>
                <Field
                  name="price"
                  component={NumericTextBox}
                  required={true}
                  min={0.00000001}
                  format="n2"
                  spinners={false}
                  style={{ width: '100%', borderRadius: '6px', borderColor: 'var(--border-color)' }}
                  placeholder="0.00"
                />
              </div>
              <div className="k-form-field" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>Date</label>
                <Field
                  name="date"
                  component={Input}
                  type="date"
                  required={true}
                  defaultValue={new Date().toISOString().split('T')[0]}
                  style={{ width: '100%', borderRadius: '6px', borderColor: 'var(--border-color)', padding: '0.5rem' }}
                />
              </div>
              <div className="k-form-field" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>Notes (Optional)</label>
                <Field
                  name="notes"
                  component={Input}
                  textArea={true}
                  style={{ width: '100%', minHeight: '80px', borderRadius: '6px', borderColor: 'var(--border-color)', padding: '0.5rem' }}
                  placeholder="Add any additional notes about this investment..."
                />
              </div>
            </FieldWrapper>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <Button
                onClick={() => {
                  setShowAddInvestment(false);
                  setSelectedCoin(null);
                }}
                style={{ 
                  padding: '0.5rem 1.25rem',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  borderRadius: '6px'
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                themeColor="primary"
                disabled={!formRenderProps.allowSubmit || !selectedCoin}
                style={{ 
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: 500
                }}
              >
                Add Investment
              </Button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );

  return (
    <div className="portfolio-container">
      <Header />
      {showAddInvestment && renderInvestmentForm}
      <div className="portfolio-header">
        <h1>Portfolio Overview</h1>
        <p>Track your cryptocurrency investments and performance in real-time</p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          margin: 0,
          color: 'var(--text-primary)'
        }}>Portfolio Overview</h1>
        <Button
          themeColor="primary"
          onClick={() => setShowAddInvestment(true)}
        >
          Add Investment
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Total Value Card */}
        <Card style={{
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          height: '100%',
          border: '1px solid var(--border-color)'
        }}>
          <CardHeader style={{
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--card-header-bg)'
          }}>
            <CardTitle style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0
            }}>Total Value</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              {formatCurrency(data.total_value)}
            </div>
          </CardBody>
        </Card>

        {/* 24h Change Card */}
        <Card style={{
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          height: '100%',
          border: '1px solid var(--border-color)'
        }}>
          <CardHeader style={{
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--card-header-bg)'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0
            }}>24h Change</div>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: data.total_change_24h >= 0 ? '#10b981' : '#ef4444'
              }}>
                {formatCurrency(data.total_change_24h)}
              </div>
              <div style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: 500,
                backgroundColor: data.change_percentage_24h >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: data.change_percentage_24h >= 0 ? '#10b981' : '#ef4444',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                {data.change_percentage_24h >= 0 ? '↑' : '↓'} {formatPercentage(data.change_percentage_24h)}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Assets Card */}
        <Card style={{
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          height: '100%',
          border: '1px solid var(--border-color)'
        }}>
          <CardHeader style={{
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--card-header-bg)'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0
            }}>Assets</div>
          </CardHeader>
          <CardBody style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            height: 'calc(100% - 60px)'
          }}>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              {data.coins.length}
            </div>
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
