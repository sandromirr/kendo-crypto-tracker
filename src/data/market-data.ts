import type { MarketCardProps } from '../models/market-card-props';

export const marketData: Omit<MarketCardProps, 'onClick'>[] = [
  {
    title: 'Total Market Cap',
    value: '$2.1T',
    change: '5.2%',
    isPositive: true,
  },
  {
    title: '24h Volume',
    value: '$120.5B',
    change: '12.3%',
    isPositive: true,
  },
  {
    title: 'BTC Dominance',
    value: '42.8%',
    change: '1.2%',
    isPositive: false,
  },
  {
    title: 'ETH Dominance',
    value: '18.3%',
    change: '0.8%',
    isPositive: true,
  },
];
