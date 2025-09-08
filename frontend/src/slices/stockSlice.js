import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSummery,
  getReports,
  makeSale,
  salesmanLogs,
} from "../services/stockServices";

// Stock summary
export const fetchStockSummary = createAsyncThunk(
  "stock/fetchSummary",
  async () => await getSummery()
);

// Reports (daily/monthly/yearly)
export const fetchReports = createAsyncThunk(
  "stock/fetchReports",
  async (type) => {
    const res = await getReports(type);
    return { type, data: res };
  }
);

// Salesman logs
export const fetchSalesmanLogs = createAsyncThunk(
  "stock/fetchSalesmanLogs",
  async (type) => {
    const res = await salesmanLogs(type);
    return { type, data: res };
  }
);

// Make a sale
export const createSale = createAsyncThunk(
  "stock/createSale",
  async (data, { rejectWithValue }) => {
    try {
      return await makeSale(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Sale failed");
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    summary: null,
    reports: { daily: null, monthly: null, yearly: null },
    salesmanLogs: { daily: null, monthly: null, yearly: null },
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Summary
      .addCase(fetchStockSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
        state.loading = false;
        state.lastFetched = Date.now();
      })
      .addCase(fetchStockSummary.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Reports
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state.reports[type] = data;
        state.loading = false;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Salesman Logs
      .addCase(fetchSalesmanLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesmanLogs.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state.salesmanLogs[type] = data;
        state.loading = false;
      })
      .addCase(fetchSalesmanLogs.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // Sale
      .addCase(createSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSale.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSale.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export default stockSlice.reducer;
