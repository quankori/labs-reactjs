import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/settings";
import { RootState } from "../../stores/stores";

const ActionType = {
  fetechCoins: "coins/fetchCoins",
  fetechTrending: "coins/fetchTrending",
  fetechSearch: "coins/fetchSearch",
  fetechDetail: "coins/fetchDetail",
  fetechOHLCChart: "coins/fetchOHLCCoin",
  fetechPriceChart: "coins/fetchPriceCoin",
};

export const fetchCoins = createAsyncThunk(
  ActionType.fetechCoins,
  async (_, { getState }) => {
    const { perPage, page } = (getState() as RootState).tokens;
    const url = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`;
    const response = await axios.get(config.baseApiUrlVersion3 + url);
    return response.data;
  }
);

export const fetchTrendCoins = createAsyncThunk(
  ActionType.fetechTrending,
  async (_, {}) => {
    const response = await axios.get(
      config.baseApiUrlVersion3 + "/search/trending"
    );
    return response.data.coins;
  }
);

export const fetechSearchCoin = createAsyncThunk(
  ActionType.fetechSearch,
  async (_, { getState }) => {
    const { search } = (getState() as RootState).tokens;
    const response = await axios.get(
      config.baseApiUrlVersion3 + `/search?query=${search}`
    );
    return response.data.coins;
  }
);

export const fetechDetailCoin = createAsyncThunk(
  ActionType.fetechDetail,
  async ({ tokenId }: { tokenId: string }) => {
    const url = `/coins/${tokenId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const response = await axios.get(config.baseApiUrlVersion3 + url);
    return response.data;
  }
);

export const fetchOHLCCoin = createAsyncThunk(
  ActionType.fetechOHLCChart,
  async ({ tokenId, days = 1 }: { tokenId: string; days: number }) => {
    const response = await axios.get(
      config.baseApiUrlVersion3 +
        `/coins/${tokenId}/ohlc?vs_currency=usd&days=${days}`
    );
    return response.data;
  }
);

export const fetchPriceCoin = createAsyncThunk(
  ActionType.fetechPriceChart,
  async ({
    tokenId,
    fromDate,
    toDate,
  }: {
    tokenId: string;
    fromDate: number;
    toDate: number;
  }) => {
    const response = await axios.get(
      config.baseApiUrlVersion3 +
        `/coins/${tokenId}/market_chart/range?vs_currency=usd&from=${Math.floor(
          fromDate / 1000
        )}&to=${Math.floor(toDate / 1000)}`
    );
    return response.data.prices;
  }
);
