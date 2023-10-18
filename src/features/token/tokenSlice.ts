import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/settings";
import { RootState } from "../../stores/stores";
import { CoinListState } from "../../types/token";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (_, { getState }) => {
    const { perPage, page } = (getState() as RootState).tokens;
    const response = await axios.get(
      config.baseApiUrl +
        `v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
    );
    return response.data;
  }
);

const initialState: CoinListState = {
  data: [],
  loading: false,
  error: null,
  perPage: 10,
  page: 1,
};

const coinListSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data.";
      });
  },
});

export const { setPerPage, setPage } = coinListSlice.actions;
export default coinListSlice.reducer;
