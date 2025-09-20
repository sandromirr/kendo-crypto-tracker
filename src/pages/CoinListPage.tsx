import React, { useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import type { GridPageChangeEvent } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import './CoinListPage.css';
import { CryptoIcon } from '@ledgerhq/crypto-icons';
import { Link } from 'react-router-dom';

interface Coin {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
}

// Minimal mapping from common tickers to Ledger ledgerId strings used by @ledgerhq/crypto-icons
// If a ticker is not found, we pass a best-effort lowercase string; the component will fallback to a letter icon.
const ledgerIdBySymbol: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  ada: 'cardano',
  sol: 'solana',
  xrp: 'ripple',
  dot: 'polkadot',
  doge: 'dogecoin',
  avax: 'avalanche',
  matic: 'polygon',
  link: 'chainlink'
};

const toLedgerId = (symbol: string): string => {
  const s = symbol?.toLowerCase() ?? '';
  return ledgerIdBySymbol[s] ?? s;
};

const CoinListPage: React.FC = () => {
  // UI constants
  const currencies = ['All', 'USD', 'EUR', 'GBP', 'JPY'];
  const timeFrames = ['24h', '7d', '30d', '90d', '1y'];
  

  // Mock data for the grid with icons
  const coins: Coin[] = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 50321.45, change24h: 2.34, change7d: -1.23, marketCap: 950000000000, volume24h: 25000000000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2650.12, change24h: 1.56, change7d: 3.45, marketCap: 320000000000, volume24h: 18000000000 },
    { id: 3, name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: -0.5, change7d: 2.1, marketCap: 15000000000, volume24h: 800000000 },
    { id: 4, name: 'Solana', symbol: 'SOL', price: 95.30, change24h: 3.2, change7d: -2.4, marketCap: 32000000000, volume24h: 1200000000 },
    { id: 5, name: 'Ripple', symbol: 'XRP', price: 0.52, change24h: 0.8, change7d: 1.2, marketCap: 25000000000, volume24h: 1500000000 },
    { id: 6, name: 'Polkadot', symbol: 'DOT', price: 6.78, change24h: -1.2, change7d: -3.4, marketCap: 7500000000, volume24h: 450000000 },
    { id: 7, name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: 5.6, change7d: 12.3, marketCap: 16000000000, volume24h: 2000000000 },
    { id: 8, name: 'Avalanche', symbol: 'AVAX', price: 35.67, change24h: 2.3, change7d: 8.9, marketCap: 8900000000, volume24h: 670000000 },
    { id: 9, name: 'Polygon', symbol: 'MATIC', price: 0.78, change24h: -0.4, change7d: 1.2, marketCap: 5600000000, volume24h: 320000000 },
    { id: 10, name: 'Chainlink', symbol: 'LINK', price: 14.56, change24h: 1.8, change7d: -2.3, marketCap: 6800000000, volume24h: 450000000},
  ];

  const [page, setPage] = useState({ skip: 0, take: 5 });
  const pageChange = (event: GridPageChangeEvent) => {
    setPage({
      skip: event.page.skip,
      take: event.page.take
    });
  };

  return (
    <div className="coin-list-container">
      {/* Header Section */}
      <div className="coin-list-header">
        <h1>Cryptocurrency Prices</h1>
        <p>Real-time prices, charts, and market data</p>
      </div>

      {/* Filters Section */}
      <Card className="filter-section">
        <CardHeader>
          <CardTitle>Filter Assets</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="filter-grid">
            <div className="filter-item">
              <label className="filter-label">Search</label>
              <Input placeholder="Search by name or symbol" />
            </div>
            <div className="filter-item">
              <label className="filter-label">Currency</label>
              <DropDownList 
                data={currencies}
                defaultValue="USD"
                className="dropdown"
              />
            </div>
            <div className="filter-item">
              <label className="filter-label">Time Frame</label>
              <div className="time-frame-buttons">
                {timeFrames.map(time => (
                  <Button key={time} togglable={true} className="time-frame-button">
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Market Overview Cards */}
      <div className="market-overview">
        <Card className="market-card">
          <div className="market-card-title">Total Market Cap</div>
          <div className="market-card-value">$2.1T</div>
          <div className="market-card-change positive-change">+5.2%</div>
        </Card>
        <Card className="market-card">
          <div className="market-card-title">24h Volume</div>
          <div className="market-card-value">$120.5B</div>
          <div className="market-card-change positive-change">+12.3%</div>
        </Card>
        <Card className="market-card">
          <div className="market-card-title">BTC Dominance</div>
          <div className="market-card-value">42.8%</div>
          <div className="market-card-change negative-change">-1.2%</div>
        </Card>
        <Card className="market-card">
          <div className="market-card-title">ETH Dominance</div>
          <div className="market-card-value">18.3%</div>
          <div className="market-card-change positive-change">+0.8%</div>
        </Card>
      </div>

      {/* Cryptocurrencies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardBody>
          <Grid
            data={coins.slice(page.skip, page.skip + page.take)}
            className="grid-container"
            sortable={true}
            pageable={{
              buttonCount: 5,
              pageSizes: [5, 10, 15, 20]
            }}
            skip={page.skip}
            take={page.take}
            total={coins.length}
            onPageChange={pageChange}
          >
            <GridColumn 
              field="name" 
              title="Name" 
              width="220px"
              cells={{
                data: (props: any) => {
                  const dataItem = props.dataItem;
                  return (
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {/* Crypto Icon via @ledgerhq/crypto-icons */}
                        {typeof dataItem.symbol === 'string' && dataItem.symbol ? (
                          <CryptoIcon
                            ledgerId={toLedgerId(dataItem.symbol)}
                            ticker={dataItem.symbol}
                            size="24px"
                          />
                        ) : (
                          <span style={{ width: 24, height: 24, display: 'inline-block' }} />
                        )}
                        {/* Name and Symbol */}
                        <div>
                          <div>{dataItem.name}</div>
                          <div style={{ color: '#6c757d', fontSize: '0.875rem' }}>{dataItem.symbol}</div>
                        </div>
                      </div>
                    </td>
                  );
                }
              }}
            />
            <GridColumn field="price" title="Price" format="{0:c}" width="150px" />
            <GridColumn 
              field="change24h" 
              title="24h %"
              cells={{
                data: (props: any) => {
                  const dataItem = props.dataItem as Coin;
                  const value = dataItem.change24h;
                  return (
                    <td className={value >= 0 ? 'positive-change' : 'negative-change'}>
                      {value >= 0 ? '+' : ''}{value}%
                    </td>
                  );
                }
              }}
              width="120px" 
            />
            <GridColumn 
              field="change7d" 
              title="7d %"
              cells={{
                data: (props: any) => {
                  const dataItem = props.dataItem as Coin;
                  const value = dataItem.change7d;
                  return (
                    <td className={value >= 0 ? 'positive-change' : 'negative-change'}>
                      {value >= 0 ? '+' : ''}{value}%
                    </td>
                  );
                }
              }}
              width="120px" 
            />
            <GridColumn field="marketCap" title="Market Cap" format="{0:c}" width="180px" />
            <GridColumn field="volume24h" title="Volume (24h)" format="{0:c}" width="180px" />
            <GridColumn 
              width="150px"
              cells={{
                data: (props: any) => {
                  const dataItem = props.dataItem as Coin;
                  return (
                    <td>
                      <Link to={`/coin-details?symbol=${encodeURIComponent(dataItem.symbol)}`}>
                        <Button themeColor="primary" size="small">View Details</Button>
                      </Link>
                    </td>
                  );
                }
              }}
            />
          </Grid>
        </CardBody>
      </Card>
    </div>
  );
};

export default CoinListPage;