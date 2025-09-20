import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import type { GridPageChangeEvent } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import '../styles/CoinListPage.css';
import { CryptoIcon } from '@ledgerhq/crypto-icons';
import { Link } from 'react-router-dom';
import { fetchMarketCoins, type CoinListItem } from '../services/coingecko';

interface Coin extends CoinListItem {}

const CoinListPage: React.FC = () => {
  // UI constants
  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];
  const timeFrames = ['24h', '7d', '30d', '90d', '1y'];
  
  // Live data state
  const [coins, setCoins] = useState<Coin[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [vsCurrency, setVsCurrency] = useState<string>('usd');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState({ skip: 0, take: 10, currentPage: 1 });
  const itemsPerPage = 50;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const pageNumber = Math.floor(page.skip / page.take) + 1;
        const items = await fetchMarketCoins(vsCurrency, itemsPerPage, pageNumber);
        if (!cancelled) {
          setCoins(items);
          // Set a large enough number since we don't know the exact total
          setTotalItems(1000); // CoinGecko's max limit for free tier
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load coins');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [vsCurrency, page.skip, page.take]);

  const pageChange = (event: GridPageChangeEvent) => {
    setPage(prev => ({
      ...prev,
      skip: event.page.skip,
      take: event.page.take
    }));
  };

  return (
    <div className="coin-list-container">
      {/* Header Section */}
      <div className="coin-list-header">
        <h1>Cryptocurrency Prices</h1>
        <p>Real-time prices, charts, and market data</p>
      </div>

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
                value={vsCurrency.toUpperCase()}
                onChange={(e) => setVsCurrency(String(e.value).toLowerCase())}
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

      {/* Cryptocurrencies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardBody>
          {loading && <div style={{ padding: '8px 0' }}>Loading coins...</div>}
          {error && <div style={{ padding: '8px 0', color: 'var(--kendo-color-danger, #dc3545)' }}>{error}</div>}
          <div className="grid-wrapper">
            <Grid
              data={coins}
              style={{ height: '600px', width: '100%' }}
              className="kendo-grid"
              sortable={true}
              resizable={true}
              reorderable={true}
              pageable={{
                buttonCount: 5,
                pageSizes: [10, 25, 50],
                pageSizeValue: page.take,
                type: 'input',
                info: true,
                previousNext: true
              }}
              skip={page.skip}
              take={page.take}
              total={totalItems}
              onPageChange={pageChange}
              dataItemKey="id"
              scrollable="scrollable"
            >
              <GridColumn 
                field="name" 
                title="Name" 
                width="25%"
                cells={{
                  data: (props: any) => {
                    const dataItem = props.dataItem;
                    return (
                      <td className="name-cell">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {typeof dataItem.symbol === 'string' && dataItem.symbol ? (
                            <CryptoIcon
                              ledgerId={dataItem.name.toLowerCase()}
                              ticker={dataItem.symbol}
                              size="24px"
                            />
                          ) : (
                            <span style={{ width: 24, height: 24, display: 'inline-block' }} />
                          )}
                          <div className="name-symbol-container">
                            <div className="coin-name">{dataItem.name}</div>
                            <div className="coin-symbol">{dataItem.symbol}</div>
                          </div>
                        </div>
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="price" 
                title="Price" 
                format="{0:c}" 
                width="15%"
              />
              <GridColumn 
                field="change24h" 
                title="24h %"
                width="12%"
                cells={{
                  data: (props: any) => {
                    const dataItem = props.dataItem as Coin;
                    const value = dataItem.change24h;
                    return (
                      <td className={`change-cell ${value >= 0 ? 'positive-change' : 'negative-change'}`}>
                        {value >= 0 ? '+' : ''}{value}%
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="change7d" 
                title="7d %"
                width="12%"
                cells={{
                  data: (props: any) => {
                    const dataItem = props.dataItem as Coin;
                    const value = dataItem.change7d;
                    return (
                      <td className={`change-cell ${value >= 0 ? 'positive-change' : 'negative-change'}`}>
                        {value >= 0 ? '+' : ''}{value}%
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="marketCap" 
                title="Market Cap" 
                format="{0:c}" 
                width="18%"
              />
              <GridColumn 
                field="volume24h" 
                title="Volume (24h)" 
                format="{0:c}" 
                width="18%"
              />
              <GridColumn 
                width="10%"
                cells={{
                  data: (props: any) => {
                    const dataItem = props.dataItem as Coin;
                    return (
                      <td className="action-cell">
                        <Link to={`/coin-details?symbol=${encodeURIComponent(dataItem.symbol)}`}>
                          <Button themeColor="primary" size="small" className="view-details-btn">
                            View Details
                          </Button>
                        </Link>
                      </td>
                    );
                  }
                }}
              />
            </Grid>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CoinListPage;