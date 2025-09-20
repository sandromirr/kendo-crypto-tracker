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

export interface CoinListItem {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
}

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchMarketCoins(vsCurrency: string = 'usd', perPage: number = 50, page: number = 1): Promise<CoinListItem[]> {
  const params = new URLSearchParams({
    vs_currency: vsCurrency,
    order: 'market_cap_desc',
    per_page: String(perPage),
    page: String(page),
    sparkline: 'false',
    price_change_percentage: '24h,7d'
  });

  const url = `${COINGECKO_BASE}/coins/markets?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  }
  const data: MarketCoin[] = await res.json();
  return data.map((c, idx) => ({
    id: idx + 1,
    name: c.name,
    symbol: c.symbol.toUpperCase(),
    price: c.current_price,
    change24h: c.price_change_percentage_24h ?? 0,
    change7d: c.price_change_percentage_7d_in_currency ?? 0,
    marketCap: c.market_cap,
    volume24h: c.total_volume,
  }));
}
