import type { MarketCoin } from '../models/market-coin';
import type { CoinListItem } from '../models/coin-list-item';

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
