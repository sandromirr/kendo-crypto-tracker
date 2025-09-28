export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d_in_currency?: number;
}
