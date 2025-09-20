import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';

const CoinListPage: React.FC = () => {
  // Mock data for the grid
  const currencies = ['All', 'USD', 'EUR', 'GBP', 'JPY'];
  const timeFrames = ['24h', '7d', '30d', '90d', '1y'];
  
  // Mock data for the grid
  const coins = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 50321.45, change24h: 2.34, change7d: -1.23, marketCap: 950000000000, volume24h: 25000000000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2650.12, change24h: 1.56, change7d: 3.45, marketCap: 320000000000, volume24h: 18000000000 },
    // Add more mock data as needed
  ];

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cryptocurrency Prices</h1>
        <p className="text-gray-600">Real-time prices, charts, and market data</p>
      </div>

      {/* Filters Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Assets</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium mb-1">Search</label>
              <Input placeholder="Search by name or symbol" />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium mb-1">Currency</label>
              <DropDownList 
                data={currencies}
                defaultValue="USD"
                style={{ width: '100%' }}
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium mb-1">Time Frame</label>
              <div className="flex space-x-2">
                {timeFrames.map(time => (
                  <Button key={time} togglable={true}>
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Market Overview Cards */}
      <div className="flex flex-nowrap overflow-x-auto gap-4 mb-6 pb-2 -mx-2 px-2">
        <Card className="p-4 min-w-[220px] flex-1">
          <div className="text-sm text-gray-500">Total Market Cap</div>
          <div className="text-2xl font-bold">$2.1T</div>
          <div className="text-sm text-green-600">+5.2%</div>
        </Card>
        <Card className="p-4 min-w-[220px] flex-1">
          <div className="text-sm text-gray-500">24h Volume</div>
          <div className="text-2xl font-bold">$120.5B</div>
          <div className="text-sm text-green-600">+12.3%</div>
        </Card>
        <Card className="p-4 min-w-[220px] flex-1">
          <div className="text-sm text-gray-500">BTC Dominance</div>
          <div className="text-2xl font-bold">42.8%</div>
          <div className="text-sm text-red-600">-1.2%</div>
        </Card>
        <Card className="p-4 min-w-[220px] flex-1">
          <div className="text-sm text-gray-500">ETH Dominance</div>
          <div className="text-2xl font-bold">18.3%</div>
          <div className="text-sm text-green-600">+0.8%</div>
        </Card>
      </div>

      {/* Cryptocurrencies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardBody>
          <Grid
            data={coins}
            style={{ height: '600px' }}
            sortable={true}
          >
            <GridColumn field="name" title="Name" width="200px" />
            <GridColumn field="symbol" title="Symbol" width="100px" />
            <GridColumn field="price" title="Price" format="{0:c}" width="150px" />
            <GridColumn field="change24h" title="24h %" cell={({ dataItem }) => (
              <td className={dataItem.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                {dataItem.change24h >= 0 ? '+' : ''}{dataItem.change24h}%
              </td>
            )} width="120px" />
            <GridColumn field="change7d" title="7d %" cell={({ dataItem }) => (
              <td className={dataItem.change7d >= 0 ? 'text-green-600' : 'text-red-600'}>
                {dataItem.change7d >= 0 ? '+' : ''}{dataItem.change7d}%
              </td>
            )} width="120px" />
            <GridColumn field="marketCap" title="Market Cap" format="{0:c}" width="180px" />
            <GridColumn field="volume24h" title="Volume (24h)" format="{0:c}" width="180px" />
            <GridColumn width="150px" cell={(props) => (
              <td>
                <Button themeColor="primary" size="small">Trade</Button>
              </td>
            )} />
          </Grid>
        </CardBody>
      </Card>
    </div>
  );
};

export default CoinListPage;