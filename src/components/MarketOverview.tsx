import React from 'react';
import { Card, CardHeader, CardBody, CardTitle } from '@progress/kendo-react-layout';
import type { MarketCardProps } from '../models/market-card-props';
import { marketData } from '../data/market-data';

const MarketCard: React.FC<MarketCardProps> = ({ title, value, change, isPositive }) => (
  <Card style={{ height: '100%' }}>
    <CardHeader>
      <CardTitle style={{ fontSize: '0.875rem', color: '#6c757d', textTransform: 'uppercase' }}>{title}</CardTitle>
    </CardHeader>
    <CardBody>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</span>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: isPositive ? '#28a745' : '#dc3545',
          fontWeight: 500
        }}>
          {isPositive ? '↑' : '↓'} {change}
        </span>
      </div>
    </CardBody>
  </Card>
);

const MarketOverview: React.FC = () => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Market Overview</h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
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
    </div>
  );
};

export default MarketOverview;
