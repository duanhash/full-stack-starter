import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  graphData: null,
  logo: null,
  profileData: null,
  financialData: null,
  keyStatisticsData: null,
  companyNews: null,
};

export const getStockData = createAsyncThunk(
  "search/getStockData",
  async (input, thunkAPI) => {
    try {
      const [graphResponse, logoResponse, newsResponse, profileResponse, financialResponse, keyStatisticsResponse] =
        await Promise.all([
          axios.get(
            `https://api.twelvedata.com/time_series?symbol=${input}&interval=1day&outputsize=5000&order=ASC&apikey=${
              import.meta.env.VITE_TWELVEDATA_API_KEY
            }`
          ),
          axios.get(
            `https://api.twelvedata.com/logo?symbol=${input}&apikey=${
              import.meta.env.VITE_TWELVEDATA_API_KEY
            }`
          ),
          axios.get(
            `https://api.polygon.io/v2/reference/news?ticker=${input}&order=desc&limit=13&apiKey=${
              import.meta.env.VITE_POLYGON_API_KEY
            }`
          ),
          axios.request({
            method: 'GET',
            url: 'https://mboum-finance.p.rapidapi.com/qu/quote/asset-profile',
            params: {symbol: input},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_API_KEY}`,
              'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
            }
          }),
          axios.request({
            method: 'GET',
            url: 'https://mboum-finance.p.rapidapi.com/qu/quote/financial-data',
            params: {symbol: input},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_API_KEY}`,
              'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
            }
          }),
          axios.request({
            method: 'GET',
            url: 'https://mboum-finance.p.rapidapi.com/qu/quote/default-key-statistics',
            params: {symbol: input},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_API_KEY}`,
              'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
            }
          })
        ]);
      return {
        graphData: graphResponse.data,
        logo: logoResponse.data.url,
        companyNews: newsResponse.data.results,
        profileData: profileResponse.data.body,
        financialData: financialResponse.data.body,
        keyStatisticsData: keyStatisticsResponse.data.body,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStockData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockData.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.graphData = action.payload.graphData;
        state.logo = action.payload.logo;
        state.companyNews = action.payload.companyNews;
        state.profileData = action.payload.profileData;
        state.financialData = action.payload.financialData;
        state.keyStatisticsData = action.payload.keyStatisticsData;
      })
      .addCase(getStockData.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const {} = searchSlice.actions;

export default searchSlice.reducer;