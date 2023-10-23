import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  globalNews: null,
  gainData: null,
  stockRoute: null,
};

export const getHomeData = createAsyncThunk(
  "home/getHomeData",
  async (input, thunkAPI) => {
    try {
      const [newsResponse, gainResponse] = await Promise.all([
        axios.get(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&limit=14&apikey=${
            import.meta.env.VITE_ALPHAVANTAGE_API_KEY
          }`
        ),
        axios.get(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${
            import.meta.env.VITE_ALPHAVANTAGE_API_KEY
          }`
        ),
      ]);
      return {
        globalNews: newsResponse.data.feed,
        gainData: gainResponse.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setStockRoute: (state, action) => {
      state.stockRoute = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.globalNews = action.payload.globalNews;
        state.gainData = action.payload.gainData;
      })
      .addCase(getHomeData.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const { setStockRoute } = homeSlice.actions;

export default homeSlice.reducer;