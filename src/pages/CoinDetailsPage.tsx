import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CryptoIcon } from '@ledgerhq/crypto-icons';

// Minimal mapping from common tickers to Ledger ledgerId strings used by @ledgerhq/crypto-icons
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

const CoinDetailsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const symbol = (searchParams.get('symbol') || 'BTC').toUpperCase();
  const ledgerId = toLedgerId(symbol);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: 16 }}>Coin Details</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <CryptoIcon ledgerId={ledgerId} ticker={symbol} size="56px" />
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{symbol}</div>
          <div style={{ color: '#6c757d' }}>Ledger ID: {ledgerId}</div>
        </div>
      </div>
      <p>Detailed information about a specific cryptocurrency</p>
    </div>
  );
};

export default CoinDetailsPage;
