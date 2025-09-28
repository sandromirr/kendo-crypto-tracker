import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import type { GridPageChangeEvent } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import { Dialog } from '@progress/kendo-react-dialogs';
import { fetchMarketCoins, type CoinListItem } from '../services/coingecko';
import MarketOverview from '../components/MarketOverview';
import Header from '../components/Header';
import { formatCurrency, formatPercentage } from '../utils/numberUtils';

const CoinListPage: React.FC = () => {
  // UI constants
  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];
  const timeFrames = ['24h', '7d', '30d', '90d', '1y'];
  
  // Live data state
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinListItem | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
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

  const handleViewDetails = (coin: CoinListItem) => {
    setSelectedCoin(coin);
    setShowDetails(true);
  };

  const closeDialog = () => {
    setShowDetails(false);
    setSelectedCoin(null);
  };

  return (
    <div className="coin-list-container" style={{ margin: '0 1.5rem' }}>
      <Header />
      
      {/* Market Overview Cards */}
      <MarketOverview />

      {/* Filters Section */}
      <Card style={{ marginBottom: '1rem' }}>
        <CardBody>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 250px', minWidth: '200px' }}>
              <DropDownList 
                data={currencies}
                value={vsCurrency.toUpperCase()}
                onChange={(e) => setVsCurrency(String(e.value).toLowerCase())}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: '2 1 350px', minWidth: '250px' }}>
              <Input 
                placeholder="Search by name or symbol" 
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              flexWrap: 'wrap',
              flex: '1 1 auto',
              justifyContent: 'flex-end'
            }}>
              {timeFrames.map(time => (
                <Button 
                  key={time} 
                  togglable={true} 
                  style={{ minWidth: '50px' }}
                >
                  {time}
                </Button>
              ))}
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
          {error && <div style={{ padding: '8px 0', color: 'var(--kendo-color-danger, #dc3545)' }}>{error}</div>}
          <div className="grid-wrapper">
            <Grid
              data={coins}
              skip={page.skip}
              take={page.take}
              total={totalItems}
              pageable={{
                buttonCount: 5,
                pageSizes: [10, 20, 50],
                pageSizeValue: page.take
              }}
              onPageChange={pageChange}
              style={{ height: '600px' }}
            >
              {loading && <div className="k-loading-mask" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <span className="k-loading-text">Loading</span>
                <div className="k-loading-image"></div>
                <div className="k-loading-color"></div>
              </div>}
              <GridColumn 
                field="symbol" 
                title="Symbol" 
                width="150px"
                headerClassName="text-center"
                cells={{
                  data: (props: { dataItem: CoinListItem }) => {
                    const coinId = props.dataItem.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const imageUrl = `https://cryptoicons.org/api/icon/${props.dataItem.symbol.toLowerCase()}/50`;
                    const fallbackUrl = `https://cryptologos.cc/logos/${props.dataItem.symbol.toLowerCase()}-${coinId}-logo.png`;
                    
                    return (
                      <td className="text-center">
                        <div className="symbol-cell" style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            marginRight: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#f0f0f0'
                          }}>
                            <img 
                              src={imageUrl}
                              alt={props.dataItem.symbol}
                              style={{ 
                                width: '100%', 
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block'
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== fallbackUrl) {
                                  target.src = fallbackUrl;
                                } else {
                                  target.style.display = 'none';
                                  // Show first letter as fallback
                                  const fallbackText = document.createElement('div');
                                  fallbackText.textContent = props.dataItem.symbol[0];
                                  fallbackText.style.fontWeight = 'bold';
                                  fallbackText.style.color = '#666';
                                  target.parentNode?.appendChild(fallbackText);
                                }
                              }}
                            />
                          </div>
                          <span style={{ fontWeight: 500 }}>{props.dataItem.symbol}</span>
                        </div>
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="change24h" 
                title="24h %"
                cells={{
                  data: (props: { dataItem: CoinListItem }) => {
                    const value = props.dataItem.change24h;
                    return (
                      <td className={`change-cell ${value >= 0 ? 'positive-change' : 'negative-change'}`}>
                        {formatPercentage(value / 100, Math.abs(value) < 0.01 ? 4 : 2)}
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
                  data: (props: { dataItem: CoinListItem }) => {
                    const value = props.dataItem.change7d;
                    return (
                      <td className={`change-cell ${value >= 0 ? 'positive-change' : 'negative-change'}`}>
                        {formatPercentage(value, Math.abs(value) < 0.01 ? 4 : 2)}
                      </td>
                    );
                  }
                }}
              />
              <GridColumn 
                field="marketCap" 
                title="Market Cap" 
                width="18%"
                cells={{
                  data: (props: { dataItem: CoinListItem }) => (
                    <td>
                      {formatCurrency(props.dataItem.marketCap, vsCurrency, 0)}
                    </td>
                  )
                }}
              />
              <GridColumn 
                field="volume24h" 
                title="Volume (24h)" 
                width="18%"
                cells={{
                  data: (props: { dataItem: CoinListItem }) => (
                    <td>
                      {formatCurrency(props.dataItem.volume24h, vsCurrency, 0)}
                    </td>
                  )
                }}
              />
              <GridColumn 
                width="10%"
                cells={{
                  data: (props: any) => {
                    return (
                      <td className="action-cell">
                        <Button
                          icon="eye"
                          fillMode="solid"
                          themeColor="primary"
                          className="view-details-button"
                          style={{
                            backgroundColor: 'var(--kendo-color-primary, #3f51b5)',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease',
                            fontWeight: 500
                          }}
                          onClick={() => handleViewDetails(props.dataItem as CoinListItem)}
                        >
                          View
                        </Button>
                      </td>
                    );
                  }
                }}
              />
            </Grid>
          </div>
        </CardBody>
      </Card>

      {/* Coin Details Dialog */}
      {showDetails && selectedCoin && (
        <Dialog
          title={`${selectedCoin.name} (${selectedCoin.symbol.toUpperCase()})`}
          onClose={closeDialog}
          width={600}
        >
          <div className="coin-details">
            <div className="coin-header">
              <div className="coin-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img 
                  src={`https://cryptoicons.org/api/icon/${selectedCoin.symbol.toLowerCase()}/200`}
                  alt={selectedCoin.symbol}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallbackUrl = `https://cryptologos.cc/logos/${selectedCoin.symbol.toLowerCase()}-${selectedCoin.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-logo.png`;
                    
                    if (target.src !== fallbackUrl) {
                      target.src = fallbackUrl;
                    } else {
                      // If both image sources fail, show the first letter of the symbol
                      target.style.display = 'none';
                      const fallbackText = document.createElement('div');
                      fallbackText.textContent = selectedCoin.symbol[0].toUpperCase();
                      fallbackText.style.fontSize = '24px';
                      fallbackText.style.fontWeight = 'bold';
                      fallbackText.style.color = '#666';
                      target.parentNode?.appendChild(fallbackText);
                    }
                  }}
                />
              </div>
              <div className="coin-info">
                <h2>{selectedCoin.name}</h2>
                <p className="symbol">{selectedCoin.symbol.toUpperCase()}</p>
              </div>
              <div className="coin-price">
                <h3>{formatCurrency(selectedCoin.price, vsCurrency)}</h3>
                <p className={selectedCoin.change24h >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(selectedCoin.change24h / 100)}
                </p>
              </div>
            </div>
            <div className="coin-stats">
              <div className="stat-item">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">{formatCurrency(selectedCoin.marketCap, vsCurrency)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">24h Trading Volume</span>
                <span className="stat-value">{formatCurrency(selectedCoin.volume24h, vsCurrency)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Circulating Supply</span>
                <span className="stat-value">
                  {/* Circulating supply not available in the API response */}
                  N/A
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">All Time High</span>
                <span className="stat-value">
                  {/* ATH data not available in the API response */}
                  N/A
                </span>
              </div>
            </div>
            <div className="coin-actions">
              <Button onClick={closeDialog} themeColor="primary">Close</Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CoinListPage;