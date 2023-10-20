export interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

export interface Coin extends CoinInfo {
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  current_price: number;
  sparkline_in_7d: PriceCharts | [];
  market_cap: number;
}

type PriceCharts = {
  price: number[];
};

export interface TableProps {
  coins: Coin[];
}

export interface CoinListState {
  data: Coin[];
  price: PriceData[];
  ohlc: OHLCData[];
  trending: CoinInfo[];
  coin: TokenDetail | null;
  loading: boolean;
  search: string;
  error: string | null;
  perPage: number;
  id: string | null;
  page: number;
}

export interface MarketData {
  current_price: Record<string, number>;
  high_24h: Record<string, number>;
  low_24h: Record<string, number>;
  market_cap: Record<string, number>;
  market_cap_rank: number;
  total_volume: Record<string, number>;
}

export interface TokenDetail {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: MarketData;
}

export interface OHLCData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PriceData {
  timestamp: number;
  value: number;
}
