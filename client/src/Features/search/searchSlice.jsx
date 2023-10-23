import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  graphData: null,
  logo: null,
  companyData: null,
  companyNews: null,
};

export const getStockData = createAsyncThunk(
  "search/getStockData",
  async (input, thunkAPI) => {
    try {
      const [graphResponse, logoResponse, newsResponse, companyResponse] =
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
            `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${input}&limit=14&apikey=${
              import.meta.env.VITE_ALPHAVANTAGE_API_KEY
            }`
          ),
          axios.request({
            method: "GET",
            url: "https://mboum-finance.p.rapidapi.com/mo/module/",
            params: {
              symbol: input,
              module:
                "asset-profile,default-key-statistics,financial-data,earnings",
            },
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_MBOUMFINANCE_API_KEY}`,
              "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
            },
          }),
        ]);
      return {
        graphData: graphResponse.data,
        logo: logoResponse.data.url,
        companyNews: newsResponse.data.feed,
        companyData: companyResponse.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearData: (state) => {
      state.graphData = null;
      state.logo = null;
      state.companyData = null;
      state.companyNews = null;
    },
  },
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
        state.companyData = action.payload.companyData;
      })
      .addCase(getStockData.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const { clearData } = searchSlice.actions;

export default searchSlice.reducer;