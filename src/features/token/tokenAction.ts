import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/settings";
import { RootState } from "../../stores/stores";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (_, { getState }) => {
    const { perPage, page } = (getState() as RootState).tokens;
    const response = await axios.get(
      config.baseApiUrl +
        `v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
    );
    return response.data;
  }
);

export const fetchTrendCoins = createAsyncThunk(
  "coins/fetchTrending",
  async (_, {}) => {
    const response = await axios.get(config.baseApiUrl + `v3/search/trending`);
    return response.data.coins;
  }
);

export const fetechSearchCoin = createAsyncThunk(
  "coins/fetchSearch",
  async (_, { getState }) => {
    const { search } = (getState() as RootState).tokens;
    const response = await axios.get(
      config.baseApiUrl + `v3/search?query=${search}`
    );
    return response.data.coins;
  }
);

export const fetechDetailCoin = createAsyncThunk(
  "coins/fetchDetail",
  async ({ tokenId }: { tokenId: string | undefined }) => {
    if (tokenId) {
      const response = await axios.get(
        config.baseApiUrl +
          `v3/coins/${tokenId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      return response.data;
    }
  }
);

export const fetchOHLCCoin = createAsyncThunk(
  "coins/fetchOHLCCoin",
  async ({
    tokenId,
    days = 1,
  }: {
    tokenId: string | undefined;
    days: number;
  }) => {
    if (tokenId) {
      const response = await axios.get(
        config.baseApiUrl +
          `v3/coins/${tokenId}/ohlc?vs_currency=usd&days=${days}`
      );
      return response.data;
    }
  }
);