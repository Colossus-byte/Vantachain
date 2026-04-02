// services/marketService.ts
// Clarix — Live Market Data via CoinGecko Free API (no API key required)

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

export interface WalletMarketData {
  ethPrice: number;
  ethChange24h: number;
  btcPrice: number;
  btcChange24h: number;
  totalMarketCap: number;
  fearGreedIndex: number; // We'll compute a simple proxy
}

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

// Simple in-memory cache to avoid hammering the free API
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 60 * 1000; // 1 minute

async function fetchWithCache(url: string): Promise<any> {
  const now = Date.now();
  if (cache[url] && now - cache[url].timestamp < CACHE_TTL) {
    return cache[url].data;
  }

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    if (response.status === 429) throw new Error('Rate limited. Data will refresh in a minute.');
    throw new Error(`Market data error: ${response.status}`);
  }

  const data = await response.json();
  cache[url] = { data, timestamp: now };
  return data;
}

// ─── Top coins for market dashboard ──────────────────────────────────────────
export async function getTopCoins(limit = 10): Promise<CoinPrice[]> {
  const url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`;
  return fetchWithCache(url);
}

// ─── Specific coin prices ─────────────────────────────────────────────────────
export async function getCoinPrices(coinIds: string[]): Promise<Record<string, { usd: number; usd_24h_change: number }>> {
  const ids = coinIds.join(',');
  const url = `${COINGECKO_BASE}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
  return fetchWithCache(url);
}

// ─── Wallet summary data ──────────────────────────────────────────────────────
export async function getWalletMarketData(): Promise<WalletMarketData> {
  try {
    const prices = await getCoinPrices(['ethereum', 'bitcoin']);
    const globalData = await fetchWithCache(`${COINGECKO_BASE}/global`);

    return {
      ethPrice: prices['ethereum']?.usd || 0,
      ethChange24h: prices['ethereum']?.usd_24h_change || 0,
      btcPrice: prices['bitcoin']?.usd || 0,
      btcChange24h: prices['bitcoin']?.usd_24h_change || 0,
      totalMarketCap: globalData?.data?.total_market_cap?.usd || 0,
      fearGreedIndex: computeFearGreedProxy(prices['bitcoin']?.usd_24h_change || 0),
    };
  } catch (err) {
    console.error('Failed to fetch wallet market data:', err);
    // Return last known cache or zeros
    return {
      ethPrice: 0,
      ethChange24h: 0,
      btcPrice: 0,
      btcChange24h: 0,
      totalMarketCap: 0,
      fearGreedIndex: 50,
    };
  }
}

// Simple Fear & Greed proxy based on BTC 24h change
function computeFearGreedProxy(btcChange: number): number {
  // Map -10% to +10% range to 0-100
  const clamped = Math.max(-10, Math.min(10, btcChange));
  return Math.round((clamped + 10) * 5);
}

// ─── Price for a specific coin with USD & KES equivalent ─────────────────────
export async function getCoinWithKES(coinId: string): Promise<{
  usd: number;
  kes: number;
  change24h: number;
}> {
  const url = `${COINGECKO_BASE}/simple/price?ids=${coinId},tether&vs_currencies=usd,kes&include_24hr_change=true`;
  const data = await fetchWithCache(url);
  return {
    usd: data[coinId]?.usd || 0,
    kes: data[coinId]?.kes || 0,
    change24h: data[coinId]?.usd_24h_change || 0,
  };
}

// ─── Format helpers ───────────────────────────────────────────────────────────
export function formatPrice(price: number, compact = false): string {
  if (compact && price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`;
  }
  if (compact && price >= 1_000) {
    return `$${(price / 1_000).toFixed(1)}K`;
  }
  if (price >= 1) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toFixed(6)}`;
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

export function isPositive(change: number): boolean {
  return change >= 0;
}
