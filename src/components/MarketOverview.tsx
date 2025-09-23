import React from 'react';
import { Card } from '@progress/kendo-react-layout';

interface MarketCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({ title, value, change, isPositive }) => (
  <Card className="market-card">
    <div className="market-card-title">{title}</div>
    <div className="market-card-value">{value}</div>
    <div className={`market-card-change ${isPositive ? 'positive-change' : 'negative-change'}`}>
      {change}
    </div>
  </Card>
);

const MarketOverview: React.FC = () => {
  const marketData = [
    {
      title: 'Total Market Cap',
      value: '$2.1T',
      change: '+5.2%',
      isPositive: true,
    },
    {
      title: '24h Volume',
      value: '$120.5B',
      change: '+12.3%',
      isPositive: true,
    },
    {
      title: 'BTC Dominance',
      value: '42.8%',
      change: '-1.2%',
      isPositive: false,
    },
    {
      title: 'ETH Dominance',
      value: '18.3%',
      change: '+0.8%',
      isPositive: true,
    },
  ];

  return (
    <div className="market-overview">
      {marketData.map((item, index) => (
        <MarketCard
          key={index}
          title={item.title}
          value={item.value}
          change={item.change}
          isPositive={item.isPositive}
        />
      ))}
    </div>
  );
};

export default MarketOverview;
