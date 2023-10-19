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
  trending: CoinInfo[];
  loading: boolean;
  search: string;
  error: string | null;
  perPage: number;
  page: number;
}
