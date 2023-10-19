import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinListState } from "../../types/token";
import { RejectedAction } from "../../types/redux";
import { fetchCoins, fetchTrendCoins, fetechSearchCoin } from "./tokenAction";

const initialState: CoinListState = {
  data: [],
  trending: [],
  search: "",
  loading: false,
  error: null,
  perPage: 10,
  page: 1,
};

const handlePending = (state: CoinListState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: CoinListState, action: RejectedAction) => {
  state.loading = false;
  if (action.error) {
    state.error = action.error.message || "Error fetching data.";
  } else if (action.payload) {
    state.error = action.payload as string;
  }
};

const handleCoinsFulfilled = (
  state: CoinListState,
  action: PayloadAction<any[]>
) => {
  state.loading = false;
  state.data = action.payload;
};

const handleTrendingFulfilled = (
  state: CoinListState,
  action: PayloadAction<any[]>
) => {
  state.loading = false;
  const results = action.payload;
  state.trending = results.map((result) => {
    return {...result.item, image: result.item.thumb}
  });
};

const handleSearchFulfilled = (
  state: CoinListState,
  action: PayloadAction<any[]>
) => {
  state.loading = false;
  const results = action.payload;
  state.trending = results.map((result) => {
    return {...result, image: result.thumb}
  });
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
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, handlePending)
      .addCase(fetchCoins.fulfilled, handleCoinsFulfilled)
      .addCase(fetchCoins.rejected, handleRejected)
      .addCase(fetchTrendCoins.pending, handlePending)
      .addCase(fetchTrendCoins.fulfilled, handleTrendingFulfilled)
      .addCase(fetchTrendCoins.rejected, handleRejected)
      .addCase(fetechSearchCoin.pending, handlePending)
      .addCase(fetechSearchCoin.fulfilled, handleSearchFulfilled)
      .addCase(fetechSearchCoin.rejected, handleRejected);
  },
});

export const { setPerPage, setPage, setSearch } = coinListSlice.actions;
export default coinListSlice.reducer;
