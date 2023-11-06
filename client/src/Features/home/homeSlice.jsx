import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  globalNews: null,
  gainData: null,
  loseData: null,
  activeData: null,
  stockRoute: null,
};

export const getHomeData = createAsyncThunk(
  "home/getHomeData",
  async (input, thunkAPI) => {
    try {
      const [newsResponse, gainResponse, loseResponse, activeResponse] = await Promise.all([
        axios.get(
          `https://api.polygon.io/v2/reference/news?order=desc&limit=13&apiKey=${
            import.meta.env.VITE_POLYGON_API_KEY
          }`
        ),
        axios.request({
            method: 'GET',
            url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_gainers',
            params: {start: '0'},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_API_KEY}`,
              'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
            },
        }),
        axios.request({
            method: 'GET',
            url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_losers',
            params: {start: '0'},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_API_KEY}`,
              'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
            },
        }),
        axios.request({
            method: 'GET',
            url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/most_actives',
            params: {start: '0'},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_API_KEY}`,
              'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
            },
        })
      ]);
      return {
        globalNews: newsResponse.data.results,
        gainData: gainResponse.data,
        loseData: loseResponse.data,
        activeData: activeResponse.data
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
        state.loseData = action.payload.loseData;
        state.activeData = action.payload.activeData;
      })
      .addCase(getHomeData.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const { setStockRoute } = homeSlice.actions;

export default homeSlice.reducer;